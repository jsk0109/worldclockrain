// Define CORS headers centrally
const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*', // IMPORTANT: For production, restrict this to your actual frontend domain(s)
  'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type', // Adjust if your client sends other custom headers
};

// Custom error class to include HTTP status and the original response
class HttpError extends Error {
  constructor(message, status, response = undefined) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
    this.response = response; // Store the original response object if available
  }
}

async function fetchWeatherFromOpenMeteo(latitude, longitude) {
    const API_BASE_URL = 'https://api.open-meteo.com/v1/forecast';
    // Request specific current weather variables needed by the client
    const params = `?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code&timezone=auto`;
    const url = `${API_BASE_URL}${params}`;

    const response = await fetch(url);
    if (!response.ok) {
        const errorText = await response.text();
        // Use HttpError to include status and the original response
        throw new HttpError(`Open-Meteo API request failed: ${response.statusText}. Details: ${errorText}`, response.status, response);
    }
    const data = await response.json();
    // Return the "current" object which contains the requested weather variables
    return data.current;
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
  // OPTIONS 요청은 먼저 처리합니다.
  if (request.method === 'OPTIONS') {
    return handleOptions(request);
  }

  const url = new URL(request.url);
  // URL에서 위도와 경도 파라미터를 가져옵니다.
  const latitude = url.searchParams.get('lat');
  const longitude = url.searchParams.get('lon');

  if (!latitude || !longitude) {
    return new Response(JSON.stringify({ error: 'lat and lon query parameters are required' }), {
      status: 400,
      // 오류 응답에도 CORS 헤더를 포함합니다.
      headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
    });
  }

  const cacheKey = new Request(url.toString(), request);
  const cache = caches.default;
  const CACHE_DURATION_SECONDS = 6 * 60 * 60; // 6 hours

  let response = await cache.match(cacheKey);

  if (response) {
    // 캐시된 응답을 반환할 때도 CORS 헤더를 확인하고 추가합니다.
    // 헤더를 수정하기 위해 응답을 복제합니다.
    let newHeaders = new Headers(response.headers);
    Object.entries(CORS_HEADERS).forEach(([key, value]) => {
      newHeaders.set(key, value);
    });

    // 새 헤더로 새 응답 객체를 생성합니다.
    response = new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: newHeaders
    });
    return response;
  }

  // 캐시 미스: Open-Meteo API에서 날씨 데이터를 가져옵니다.
  try {
    const weatherData = await fetchWeatherFromOpenMeteo(latitude, longitude);
    const jsonResponse = JSON.stringify(weatherData);
    response = new Response(jsonResponse, {
      status: 200, // Explicitly set success status
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': `public, s-maxage=${CACHE_DURATION_SECONDS}`, // CDN 같은 공유 캐시를 위해 public으로 설정
        ...CORS_HEADERS
      }
    });
    // 응답 본문은 한 번만 읽을 수 있으므로 캐시에 넣기 전에 복제합니다.
    event.waitUntil(cache.put(cacheKey, response.clone()));
  } catch (error) {
    // Worker 측에서 오류를 로깅하여 디버깅을 용이하게 합니다.
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStatus = error instanceof HttpError ? error.status : (error.status || 500);

    console.error(`Worker error processing request for lat=${latitude}, lon=${longitude}: ${errorMessage}`, `Status: ${errorStatus}`);

    // Check if the error is an HttpError and has a response property that is a Response object
    if (error instanceof HttpError && error.response && typeof error.response.text === 'function') {
        try {
            const errorBody = await error.response.text();
            if (errorBody) console.error("Worker: Underlying error response body (HttpError):", errorBody);
        } catch (e) {
            console.error("Worker: Failed to read error response body (HttpError):", e);
        }
    } else if (error.response && typeof error.response.text === 'function') { // Fallback for generic errors that might have a response
        try {
            const errorBody = await error.response.text();
            if (errorBody) console.error("Worker: Underlying error response body (generic error):", errorBody);
        } catch (e) {
            console.error("Worker: Failed to read error response body (generic error):", e);
        }
    }

    // 오류 응답을 생성합니다.
    response = new Response(JSON.stringify({ error: errorMessage || 'Failed to fetch weather data' }), {
      status: errorStatus,
      // 오류 응답에도 CORS 헤더를 포함합니다.
      headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
    });
  }

  return response;
}
