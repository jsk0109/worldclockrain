const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    try {
        const cities = JSON.parse(event.body || '[]');
        const weatherData = {};
        const batchSize = 50;
        
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

                    return {
                        city: city.name,
                        data: {
                            temp: data.current.temperature_2m,
                            humidity: data.current.relative_humidity_2m,
                            code: data.current.weather_code,
                            lastUpdated: new Date().toISOString()
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

            if (i + batchSize < cities.length) {
                await new Promise(resolve => setTimeout(resolve, 1000));
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