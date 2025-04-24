// weatherApi.js
// 서버에서 캐시된 날씨 데이터를 가져오는 로직으로 전환

// 메모리 캐싱 객체
const weatherCache = new Map();
const CACHE_DURATION = 3600000; // 1시간 (서버 캐싱 주기와 동일)

async function fetchWeather(lat, lon, city) {
    const cacheKey = `${lat},${lon}`;
    const cached = weatherCache.get(cacheKey);

    // 캐시가 있고, 1시간 이내 데이터면 재사용
    if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
        return cached.data;
    }

    try {
        const response = await fetch(`/weather?lat=${lat}&lon=${lon}`);
        if (!response.ok) {
            throw new Error('Failed to fetch weather from server');
        }
        const weatherData = await response.json();

        // 캐시에 저장
        weatherCache.set(cacheKey, {
            data: weatherData,
            timestamp: Date.now()
        });

        return weatherData;
    } catch (error) {
        console.error(`Failed to fetch weather for ${city}:`, error);
        return {
            temp: "N/A",
            humidity: "N/A",
            code: 0
        };
    }
}

export { fetchWeather };
