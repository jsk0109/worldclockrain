const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    try {
        const cities = JSON.parse(event.body || '[]');
        const weatherData = {};
        const batchSize = 30; // 50에서 30으로 줄임
        
        for (let i = 0; i < cities.length; i += batchSize) {
            const batch = cities.slice(i, i + batchSize);
            const promises = batch.map(async (city) => {
                try {
                    const response = await fetch(
                        `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current=temperature_2m,relative_humidity_2m,weather_code`
                    );
                    
                    if (!response.ok) {
                        throw new Error(`Weather API failed for ${city.name}`);
                    }

                    const data = await response.json();
                    if (!data.current || typeof data.current.temperature_2m === 'undefined') {
                        throw new Error('Invalid weather data format');
                    }

                    // 날짜 형식 통일
                    const now = new Date();
                    const formattedDate = new Intl.DateTimeFormat('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true
                    }).format(now);

                    return {
                        city: city.name,
                        data: {
                            temp: data.current.temperature_2m,
                            humidity: data.current.relative_humidity_2m,
                            code: data.current.weather_code,
                            lastUpdated: formattedDate
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

            // API 제한 회피를 위한 지연 시간 증가
            if (i + batchSize < cities.length) {
                await new Promise(resolve => setTimeout(resolve, 2000));
            }
        }

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
