const fetch = require("node-fetch");

// 메모리 캐싱 (서버리스 환경에서는 요청마다 초기화됨)
let weatherCache = {};
const CACHE_DURATION = 3600000; // 1시간

// 모든 도시 데이터를 가져오는 함수
async function fetchWeatherData(lat, lon) {
    const cacheKey = `${lat},${lon}`;
    if (weatherCache[cacheKey] && (Date.now() - weatherCache[cacheKey].timestamp < CACHE_DURATION)) {
        console.log(`Using server memory cache for ${cacheKey}`);
        return weatherCache[cacheKey].data;
    }

    try {
        console.log(`Fetching new weather data for ${cacheKey}`);
        const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code`
);
        if (!response.ok) throw new Error("Weather API failed");
        const data = await response.json();

        const weather = {
            temp: data.current.temperature_2m,
            humidity: data.current.relative_humidity_2m,
            code: data.current.weather_code,
        };

        weatherCache[cacheKey] = {
            data: weather,
            timestamp: Date.now(),
        };

        return weather;
    } catch (error) {
        console.error(`Failed to fetch weather for ${cacheKey}:`, error);
        return { temp: "N/A", humidity: "N/A", code: 0 };
    }
}

// Netlify Function 핸들러
exports.handler = async (event) => {
    const params = event.queryStringParameters || {};
    const lat = params.lat;
    const lon = params.lon;

    if (!lat || !lon) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "lat, lon이 필요해요" }),
        };
    }

    const weather = await fetchWeatherData(lat, lon);

    return {
        statusCode: 200,
        headers: {
            "Cache-Control": `public, max-age=${CACHE_DURATION / 1000}`, // 1시간 동안 캐싱
        },
        body: JSON.stringify(weather),
    };
};

async function saveWeatherToS3(weatherCache) {
    try {
        console.log("Saving to S3...");
        await s3.putObject({
            Bucket: S3_BUCKET,
            Key: S3_KEY,
            Body: JSON.stringify(weatherCache),
            ContentType: "application/json",
        }).promise();
        console.log("Successfully saved to S3");
    } catch (error) {
        console.error("Failed to save to S3:", error);
    }
}
