// weatherApi.js
const fetch = require('node-fetch');

// 메모리 캐싱 (단일 함수 실행 동안만 유효)
const weatherCache = new Map();
const CACHE_DURATION = 3600000; // 1시간 (ms)

exports.handler = async (event, context) => {
    // 요청 파라미터에서 lat, lon 추출
    const { lat, lon, city } = event.queryStringParameters || {};
    if (!lat || !lon || !city) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Missing lat, lon, or city parameter' }),
        };
    }

    const cacheKey = `${lat},${lon}`;

    // 캐싱된 데이터 확인
    const cached = weatherCache.get(cacheKey);
    if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
        return {
            statusCode: 200,
            body: JSON.stringify(cached.data),
        };
    }

    try {
        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code`
        );
        if (!response.ok) throw new Error('Weather API failed');
        const data = await response.json();
        const weather = {
            temp: data.current.temperature_2m,
            humidity: data.current.relative_humidity_2m,
            code: data.current.weather_code,
        };

        // 캐시에 저장
        weatherCache.set(cacheKey, { data: weather, timestamp: Date.now() });

        return {
            statusCode: 200,
            body: JSON.stringify(weather),
        };
    } catch (error) {
        console.error(`Failed to fetch weather for ${city}:`, error);
        return {
            statusCode: 500,
            body: JSON.stringify({ temp: 'N/A', humidity: 'N/A', code: 0 }),
        };
    }
};
