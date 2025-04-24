const fetch = require("node-fetch");

// 간단한 캐싱 저장소 (메모리 캐싱, 요청마다 초기화됨)
const weatherCache = {};
const CACHE_DURATION = 3600000; // 1시간

exports.handler = async (event) => {
    const params = event.queryStringParameters || {};
    const lat = params.lat;
    const lon = params.lon;
    const city = params.city;

    if (!lat || !lon || !city) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "lat, lon, city가 필요해요" }),
        };
    }

    const cacheKey = `${lat},${lon}`;

    // 캐싱된 데이터가 있는지 확인
    if (weatherCache[cacheKey] && (Date.now() - weatherCache[cacheKey].timestamp < CACHE_DURATION)) {
        return {
            statusCode: 200,
            body: JSON.stringify(weatherCache[cacheKey].data),
        };
    }

    // 날씨 데이터 가져오기
    try {
        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}¤t=temperature_2m,relative_humidity_2m,weather_code`
        );
        const data = await response.json();

        if (!response.ok) {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: "날씨 데이터를 가져오지 못했어요" }),
            };
        }

        const weather = {
            temp: data.current.temperature_2m,
            humidity: data.current.relative_humidity_2m,
            code: data.current.weather_code,
        };

        // 캐시에 저장
        weatherCache[cacheKey] = {
            data: weather,
            timestamp: Date.now(),
        };

        return {
            statusCode: 200,
            body: JSON.stringify(weather),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "문제가 생겼어요", details: error.message }),
        };
    }
};
