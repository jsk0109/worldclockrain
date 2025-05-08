// Define CORS headers centrally
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*', // IMPORTANT: For production, restrict this to your actual frontend domain(s)
  'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type', // Adjust if your client sends other custom headers
};

async function fetchWeatherFromOpenMeteo(latitude, longitude) {
    const API_BASE_URL = 'https://api.open-meteo.com/v1/forecast';
    // Ensure current_weather is requested as current for the new API structure if needed,
    // or adjust based on the actual fields returned by your worker (temperature_2m, relative_humidity_2m, weather_code)
    const params = `?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=auto`;
    const url = `${API_BASE_URL}${params}`;

    const response = await fetch(url);
    if (!response.ok) {
        const errorText = await response.text();
        const err = new Error(`Open-Meteo API request failed: ${response.statusText}. Details: ${errorText}`);
        err.status = response.status;
        throw err;
    }
    const data = await response.json();
    // The client (index.js) expects { temperature_2m, relative_humidity_2m, weather_code }
    // The OpenMeteo /forecast endpoint with current_weather=true returns data.current_weather
    // Ensure this function returns what the client expects or adjust client.
    // For now, assuming data.current_weather contains the necessary fields or is what's intended.
    return data.current_weather;
}

// Handler for OPTIONS preflight requests
function handleOptions(request) {
  const headers = request.headers;
  if (
    headers.get('Origin') !== null &&
    headers.get('Access-Control-Request-Method') !== null &&
    headers.get('Access-Control-Request-Headers') !== null
  ) {
    // Handle CORS preflight requests.
    let respHeaders = {
      ...CORS_HEADERS,
      'Access-Control-Allow-Headers': headers.get('Access-Control-Request-Headers'), // Echo back requested headers
      'Access-Control-Max-Age': '86400', // 1 day (optional)
    };
    return new Response(null, { headers: respHeaders });
  } else {
    // Handle standard OPTIONS request.
    return new Response(null, {
      headers: {
        Allow: 'GET, HEAD, OPTIONS',
      },
    });
  }
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event))
})

async function handleRequest(event) {
  const request = event.request;
  if (request.method === 'OPTIONS') {
    return handleOptions(request);
  }

  const url = new URL(request.url);
  const latitude = url.searchParams.get('lat');
  const longitude = url.searchParams.get('lon');

  if (!latitude || !longitude) {
    return new Response(JSON.stringify({ error: 'lat and lon query parameters are required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
    });
  }

  const cacheKey = new Request(url.toString(), request);
  const cache = caches.default;
  const CACHE_DURATION_SECONDS = 6 * 60 * 60; // 6 hours

  let response = await cache.match(cacheKey);

  if (response) {
    // Response from cache. Ensure it has fresh CORS headers.
    // Clone the response to modify headers, as headers on a Response object are immutable.
    let newHeaders = new Headers(response.headers);
    Object.entries(CORS_HEADERS).forEach(([key, value]) => {
      newHeaders.set(key, value);
    });

    response = new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: newHeaders
    });
    return response;
  }

  // Cache miss
  try {
    const weatherData = await fetchWeatherFromOpenMeteo(latitude, longitude);
    const jsonResponse = JSON.stringify(weatherData);
    response = new Response(jsonResponse, {
      status: 200, // Explicitly set success status
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': `public, s-maxage=${CACHE_DURATION_SECONDS}`, // public for shared caches like CDNs
        ...CORS_HEADERS
      }
    });
    // Clone the response to put it in the cache, as a Response body can only be read once.
    event.waitUntil(cache.put(cacheKey, response.clone()));
  } catch (error) {
    // Log the error on the worker side for better debugging
    console.error(`Worker error processing request for lat=${latitude}, lon=${longitude}: ${error.message}`, error.status ? `Status: ${error.status}` : '');
    try {
      const errorBody = await error.response?.text(); // If error has a response object
      if (errorBody) console.error("Underlying error response body:", errorBody);
    } catch (e) { /* ignore if can't read body */ }

    response = new Response(JSON.stringify({ error: error.message || 'Failed to fetch weather data' }), {
      status: error.status || 500,
      headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
    });
    }

  return response;
}

