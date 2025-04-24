// weatherApi.js
// 서버에서 캐시된 날씨 데이터를 가져오는 로직으로 전환

// 서버에서 날씨 데이터를 가져오는 함수
async function fetchWeather(lat, lon, city) {
    try {
        // 서버의 캐시된 날씨 데이터를 요청
        const response = await fetch(`/weather?lat=${lat}&lon=${lon}`);
        if (!response.ok) {
            throw new Error('Failed to fetch weather from server');
        }
        const weatherData = await response.json();
        return weatherData; // 서버에서 반환된 데이터 사용
    } catch (error) {
        console.error(`Failed to fetch weather for ${city}:`, error);
        return {
            temp: "N/A",
            humidity: "N/A",
            code: 0
        }; // 에러 시 기본값 반환
    }
}

export { fetchWeather };
