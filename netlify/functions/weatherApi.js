const fetch = require("node-fetch");
const AWS = require("aws-sdk");

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.CUSTOM_REGION || "us-east-1",
});

const CACHE_DURATION = 3600000;
const S3_BUCKET = "my-weather-cache";
const S3_KEY = "weather-data.json";

async function getWeatherFromS3() {
    try {
        console.log("Checking S3 for cache...");
        const data = await s3.getObject({
            Bucket: S3_BUCKET,
            Key: S3_KEY,
        }).promise();
        return JSON.parse(data.Body.toString());
    } catch (error) {
        console.log("No cache in S3 or error:", error);
        return null;
    }
}

async function saveWeatherToS3(weatherCache) {
    try {
        console.log("Attempting to save to S3...");
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

async function fetchAllWeatherData(cities) {
    const weatherCache = {};
    for (const city of cities) {
        const cacheKey = `${city.lat},${city.lon}`;
        try {
            const response = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current=temperature_2m,relative_humidity_2m,weather_code`
            );
            if (!response.ok) throw new Error("Weather API failed");
            const data = await response.json();

            weatherCache[cacheKey] = {
                data: {
                    temp: data.current.temperature_2m,
                    humidity: data.current.relative_humidity_2m,
                    code: data.current.weather_code,
                },
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
    return weatherCache;
}

exports.handler = async (event) => {
    const params = event.queryStringParameters || {};
    const lat = params.lat;
    const lon = params.lon;
    const citiesParam = params.cities;

    if (!lat && !lon && citiesParam) {
        let cities;
        try {
            cities = JSON.parse(citiesParam);
        } catch (error) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Invalid cities data" }),
            };
        }

        let weatherCache = await getWeatherFromS3();
        const firstCityKey = `${cities[0].lat},${cities[0].lon}`;
        if (weatherCache && weatherCache[firstCityKey] && (Date.now() - weatherCache[firstCityKey].timestamp < CACHE_DURATION)) {
            console.log("Using S3 cache for all cities");
            return {
                statusCode: 200,
                body: JSON.stringify(weatherCache),
            };
        }

        weatherCache = await fetchAllWeatherData(cities);
        await saveWeatherToS3(weatherCache);

        return {
            statusCode: 200,
            body: JSON.stringify(weatherCache),
        };
    }

    if (!lat || !lon) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "lat, lon이 필요해요" }),
        };
    }

    const cacheKey = `${lat},${lon}`;
    let weatherCache = await getWeatherFromS3();
    if (!weatherCache) {
        weatherCache = {};
    }
    if (!weatherCache[cacheKey] || (Date.now() - weatherCache[cacheKey].timestamp >= CACHE_DURATION)) {
        console.log(`Fetching new weather data for ${cacheKey}`);
        try {
            const response = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,weather_code`
            );
            if (!response.ok) throw new Error("Weather API failed");
            const data = await response.json();
            weatherCache[cacheKey] = {
                data: {
                    temp: data.current.temperature_2m,
                    humidity: data.current.relative_humidity_2m,
                    code: data.current.weather_code,
                },
                timestamp: Date.now(),
            };
            await saveWeatherToS3(weatherCache);
        } catch (error) {
            console.error(`Failed to fetch weather for ${cacheKey}:`, error);
            weatherCache[cacheKey] = {
                data: { temp: "N/A", humidity: "N/A", code: 0 },
                timestamp: Date.now(),
            };
            await saveWeatherToS3(weatherCache);
        }
    }

    return {
        statusCode: 200,
        body: JSON.stringify(weatherCache[cacheKey].data),
    };
};
