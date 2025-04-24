const fetch = require("node-fetch");

// Netlify Functions는 상태를 유지하지 않으므로, 임시로 메모리 캐싱 사용
let weatherCache = {};
const CACHE_DURATION = 3600000; // 1시간

// 326개 도시 데이터를 미리 정의 (실제 cities 배열은 index.js에서 가져와야 함)
// 여기서는 간단히 예시로 작성 (실제로는 index.js에서 cities 데이터를 전달받아야 함)
const cities = [
    { name: "New York", lat: 40.7128, lon: -74.0060 },
    { name: "London", lat: 51.5074, lon: -0.1278 },
    // ... 총 326개 도시 데이터가 있어야 함 (index.js의 cities 배열 사용)
];

// 모든 도시의 날씨 데이터를 한 번에 가져오는 함수
async function fetchAllWeatherData() {
    console.log("Fetching weather data for all cities...");
    weatherCache = {};

    for (const city of cities) {
        const cacheKey = `${city.lat},${city.lon}`;
        try {
            const response = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}¤t=temperature_2m,relative_humidity_2m,weather_code`
           露露

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
        } catch (error) {
            console.error(`Failed to fetch weather for ${city.name}:`, error);
            weatherCache[cacheKey] = {
                data: { temp: "N/A", humidity: "N/A", code: 0 },
                timestamp: Date.now(),
            };
        }
    }

    console.log("All weather data fetched and cached");
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

    const cacheKey = `${lat},${lon}`;

    // 캐싱된 데이터가 없거나 유효 기간이 지난 경우, 모든 데이터를 가져옴
    if (!weatherCache[cacheKey] || (Date.now() - weatherCache[cacheKey].timestamp >= CACHE_DURATION)) {
        await fetchAllWeatherData();
    }

    const weather = weatherCache[cacheKey]?.data || { temp: "N/A", humidity: "N/A", code: 0 };

    return {
        statusCode: 200,
        headers: {
            "Cache-Control": `public, max-age=${CACHE_DURATION / 1000}`, // 캐싱 헤더 설정
        },
        body: JSON.stringify(weather),
    };
};
