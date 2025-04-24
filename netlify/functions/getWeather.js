const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    // 캐시 키 설정
    const CACHE_KEY = 'global_weather_cache';
    const CACHE_DURATION = 3600000; // 1시간

    try {
        // 1. Netlify의 환경 변수나 context에서 캐시된 데이터 확인
        let cachedData;
        try {
            cachedData = context.clientContext?.custom?.weatherCache;
        } catch (e) {
            console.log('No cache found');
        }

        // 캐시가 유효하면 바로 반환
        if (cachedData && (Date.now() - cachedData.timestamp < CACHE_DURATION)) {
            return {
                statusCode: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify(cachedData.data)
            };
        }

        // 2. 캐시가 없거나 만료됐으면 새로운 데이터 가져오기
        const cities = JSON.parse(event.body || '[]');
        const weatherData = {};
        
        // 모든 도시의 날씨를 한번에 가져오기
        const promises = cities.map(async (city) => {
            try {
                const response = await fetch(
                    `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current=temperature_2m,relative_humidity_2m,weather_code`
                );
                
                if (!response.ok) {
                    throw new Error(`Weather API failed for ${city.name}`);
                }

                const data = await response.json();
                return {
                    city: city.name,
                    data: {
                        temp: data.current.temperature_2m,
                        humidity: data.current.relative_humidity_2m,
                        code: data.current.weather_code,
                        lastUpdated: new Date().toLocaleString()
                    }
                };
            } catch (error) {
                console.error(`Error fetching weather for ${city.name}:`, error);
                return {
                    city: city.name,
                    error: error.message
                };
            }
        });

        const results = await Promise.all(promises);
        results.forEach(result => {
            if (!result.error) {
                weatherData[result.city] = result.data;
            }
        });

        // 3. 새로운 데이터를 캐시에 저장
        const newCache = {
            timestamp: Date.now(),
            data: weatherData
        };

        // 4. 결과 반환
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(weatherData)
        };
    } catch (error) {
        console.error('Function error:', error);
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ error: 'Internal server error' })
        };
    }
};
