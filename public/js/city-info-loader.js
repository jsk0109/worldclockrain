document.addEventListener('DOMContentLoaded', async () => {
    const cityDetailContainer = document.getElementById('city-detail-container');
    const loadingMessage = document.querySelector('.loading-message');

    if (!cityDetailContainer) {
        console.error('[city-info-loader.js - EN] City detail container not found.');
        if (loadingMessage) loadingMessage.textContent = 'Error: Page layout components not found.';
        return;
    }

    console.log('[city-info-loader.js - EN] Current page URL:', window.location.href);
    const urlParams = new URLSearchParams(window.location.search);
    // 영어 사이트에서는 'city' 파라미터를 우선적으로 사용
    let cityNameFromUrl = urlParams.get('city');
    if (!cityNameFromUrl) {
        // 'city' 파라미터가 없으면 '도시' 파라미터도 확인 (혹시 모를 경우 대비)
        cityNameFromUrl = urlParams.get('도시');
        if (cityNameFromUrl) {
            console.log('[city-info-loader.js - EN] "city" param missing, using "도시" param:', cityNameFromUrl);
        }
    }
    console.log('[city-info-loader.js - EN] cityNameFromUrl (from "city" or "도시" param):', cityNameFromUrl);


    if (!cityNameFromUrl) {
        cityDetailContainer.innerHTML = '<p>No city specified to display. Please specify a city in the URL, e.g., ?city=CityName.</p>';
        document.title = "City Not Specified | World Clock Rainbow";
        return;
    }

    const decodedCityName = decodeURIComponent(cityNameFromUrl);
    document.title = `Loading ${decodedCityName} Information... | World Clock Rainbow`;
    if (loadingMessage) loadingMessage.textContent = `Loading detailed information for ${decodedCityName}...`;

    // SEO 태그 업데이트 함수 (영어 사이트용)
    function updateSEOTags(currentCityName) {
        const encodedCityName = encodeURIComponent(currentCityName); // URL 파라미터용

        const englishSiteBaseUrl = 'https://worldclocks.it.com/city-info.html';
        const koreanSiteBaseUrl = 'https://ko.worldclocks.it.com/city-info.html';

        // 현재 영어 페이지의 Canonical URL
        const canonicalUrl = `${englishSiteBaseUrl}?city=${encodedCityName}`;
        // 영어 버전 페이지 URL (현재 페이지)
        const hreflangEnUrl = canonicalUrl;
        // 한국어 버전 페이지 URL
        const hreflangKoUrl = `${koreanSiteBaseUrl}?도시=${encodedCityName}`; // 한국어 사이트는 '?도시=' 파라미터 사용 가정
        // 기본값 페이지 URL (현재 영어 페이지)
        const hreflangXDefaultUrl = canonicalUrl;

        let canonicalTag = document.querySelector('link[rel="canonical"]');
        if (canonicalTag) {
            canonicalTag.setAttribute('href', canonicalUrl);
        } else {
            canonicalTag = document.createElement('link');
            canonicalTag.setAttribute('rel', 'canonical');
            canonicalTag.setAttribute('href', canonicalUrl);
            document.head.appendChild(canonicalTag);
        }

        let hreflangEnTag = document.querySelector('link[rel="alternate"][hreflang="en"]');
        if (hreflangEnTag) {
            hreflangEnTag.setAttribute('href', hreflangEnUrl);
        } else {
            hreflangEnTag = document.createElement('link');
            hreflangEnTag.setAttribute('rel', 'alternate');
            hreflangEnTag.setAttribute('hreflang', 'en');
            hreflangEnTag.setAttribute('href', hreflangEnUrl);
            document.head.appendChild(hreflangEnTag);
        }

        let hreflangKoTag = document.querySelector('link[rel="alternate"][hreflang="ko"]');
        if (hreflangKoTag) {
            hreflangKoTag.setAttribute('href', hreflangKoUrl);
        } else {
            hreflangKoTag = document.createElement('link');
            hreflangKoTag.setAttribute('rel', 'alternate');
            hreflangKoTag.setAttribute('hreflang', 'ko');
            hreflangKoTag.setAttribute('href', hreflangKoUrl);
            document.head.appendChild(hreflangKoTag);
        }

        let hreflangXDefaultTag = document.querySelector('link[rel="alternate"][hreflang="x-default"]');
        if (hreflangXDefaultTag) {
            hreflangXDefaultTag.setAttribute('href', hreflangXDefaultUrl);
        } else {
            hreflangXDefaultTag = document.createElement('link');
            hreflangXDefaultTag.setAttribute('rel', 'alternate');
            hreflangXDefaultTag.setAttribute('hreflang', 'x-default');
            hreflangXDefaultTag.setAttribute('href', hreflangXDefaultUrl);
            document.head.appendChild(hreflangXDefaultTag);
        }
        console.log('[city-info-loader.js - EN] SEO tags updated:', {canonicalUrl, hreflangEnUrl, hreflangKoUrl, hreflangXDefaultUrl});
    }

    // 페이지 로드 시 URL 파라미터 기준으로 우선 SEO 태그 업데이트 시도
    updateSEOTags(decodedCityName);

    const jsonFiles = [
        // 영어 사이트에서 JSON 파일 경로 (루트 기준)
        '/data/json/cities1.json',
        '/data/json/cities2.json',
        '/data/json/cities3.json',
        '/data/json/cities4.json',
        '/data/json/cities5.json',
    ];
    let cityData = null;
    let foundInFile = null;

    try {
        for (const filePath of jsonFiles) {
            console.log(`[city-info-loader.js - EN] Attempting to fetch city data for "${decodedCityName}" from ${filePath}`);
            try {
                const response = await fetch(filePath);
                if (!response.ok) {
                    console.warn(`[city-info-loader.js - EN] Failed to load ${filePath}. (Status: ${response.status}) - Will try next file.`);
                    continue;
                }
                const citiesList = await response.json();
                console.log(`[city-info-loader.js - EN] Successfully parsed ${filePath}, found ${citiesList.length} cities.`);

                // 영어 사이트이므로, 영어 도시명 키(예: 'name' 또는 'City Name')를 우선적으로 찾고,
                // 없을 경우 한국어 키('도시명')도 확인 (JSON 데이터 구조에 따라 유연하게)
                cityData = citiesList.find(c =>
                    c.name?.trim().toLowerCase() === decodedCityName.toLowerCase() ||
                    (c.도시명 && c.도시명.trim().toLowerCase() === decodedCityName.toLowerCase() && !c.name) // 한국어 키만 있고 영어 키가 없을 때
                );

                if (cityData) {
                    foundInFile = filePath;
                    console.log(`[city-info-loader.js - EN] Found "${decodedCityName}" in ${foundInFile}`);
                    break;
                }
            } catch (fileError) {
                console.error(`[city-info-loader.js - EN] Error processing file ${filePath}:`, fileError.message, "- Will try next file.");
            }
        }

        if (cityData) {
            console.log('[city-info-loader.js - EN] City data found:', cityData);
            // 영어 사이트이므로 영어 도시명(cityData.name 또는 cityData.City Name 등)을 사용
            // JSON 파일에 영어 도시명 키가 'name'으로 되어 있다고 가정
            const displayCityName = cityData.name || cityData.도시명; // 영어 이름이 우선, 없으면 한국어 이름 (JSON 구조에 따라 조정)

            document.title = `${displayCityName} - Detailed Information | World Clock Rainbow`;
            updateSEOTags(displayCityName); // 실제 찾은 도시명(URL 파라미터에 사용될)으로 SEO 태그 최종 업데이트

            const metaDescTag = document.querySelector('meta[name="description"]');
            if (metaDescTag) {
                metaDescTag.setAttribute('content', `Find detailed information for ${displayCityName}, including timezone, standard business hours, major public holidays, business tips, and recommended attractions. Discover everything about ${displayCityName} on World Clock Rainbow.`);
            }

            // 영어 키를 사용하도록 수정 (JSON 파일에 영어 키가 있다고 가정)
            // 만약 JSON 파일에 영어 키가 없다면, cityData.한국어키 || 'N/A' 형태로 사용
            const attractionsHtml = (cityData.topAttractionsForProfessionals || cityData.전문가를위한최고명소 || [])
                .map(attr => `<li><strong>${attr.attractionName || attr.명소명 || 'N/A'}</strong>: ${attr.description || attr.설명 || 'N/A'} (Proximity to Business District: ${attr.proximityToBusinessDistrict || attr.비즈니스지구와의근접성 || 'N/A'})</li>`)
                .join('');

            const eventsHtml = (cityData.networkingEvents || cityData.네트워킹이벤트 || [])
                .map(event => `<li><strong>${event.eventName || event.이벤트명 || 'N/A'}</strong> (${event.date || event.날짜 || 'N/A'}): ${event.description || event.설명 || 'N/A'})</li>`)
                .join('');

            const holidaysHtml = (cityData.majorPublicHolidays || cityData.주요공휴일 || [])
                .map(holiday => `<li>${holiday}</li>`).join('');

            const flagCode = cityData.flag?.toLowerCase() || cityData.국기?.toLowerCase() || '';
            const flagImageHtml = flagCode ? `<img src="https://flagcdn.com/w40/${flagCode}.png" alt="${cityData.country || cityData.국가 || ''} Flag" style="margin-right: 10px; vertical-align: middle;">` : '';

            cityDetailContainer.innerHTML = `
                <article class="city-info-content">
                    <h1>
                        ${flagImageHtml}
                        ${displayCityName}
                    </h1>
                    <p><strong>Country:</strong> ${cityData.country || cityData.국가 || 'N/A'}</p>
                    <p><strong>Continent:</strong> ${cityData.continent || cityData.대륙 || 'N/A'}</p>
                    <p><strong>Timezone:</strong> ${cityData.timezone || cityData.시간대 || 'N/A'} (${cityData.offset || cityData.시간차이 || 'N/A'})</p>

                    <h2>General Information</h2>
                    <p><strong>Standard Business Hours:</strong> ${cityData.standardBusinessHours || cityData.표준업무시간 || 'N/A'}</p>
                    <p><strong>Recommended Meeting Hours:</strong> ${cityData.recommendedMeetingHours || cityData.추천회의시간 || 'N/A'}</p>

                    <h2>Major Public Holidays</h2>
                    <ul>${holidaysHtml || '<li>No public holiday information available.</li>'}</ul>

                    <h2>Business Environment</h2>
                    <p><strong>Business Hub Information:</strong> ${cityData.businessHub || cityData.비즈니스중심지 || 'N/A'}</p>
                    <p><strong>Business Etiquette:</strong> ${cityData.businessEtiquette || cityData.비즈니스예절 || 'N/A'}</p>
                    <p><strong>Business Tips:</strong> ${cityData.businessTips || cityData.비즈니스팁 || 'N/A'}</p>

                    <h2>Local Life & Culture</h2>
                    <p><strong>Lifestyle:</strong> ${cityData.localLifestyle || cityData.지역생활방식 || 'N/A'}</p>
                    <p><strong>Cultural Highlights:</strong> ${cityData.culturalHighlights || cityData.지역문화 || 'N/A'}</p>
                    <p><strong>Signature Dishes:</strong> ${cityData.signatureDishes || cityData.대표음식 || 'N/A'}</p>

                    <h2>Top Attractions for Professionals</h2>
                    <ul>${attractionsHtml || '<li>No recommended attractions information available.</li>'}</ul>

                    <h2>Networking Events</h2>
                    <ul>${eventsHtml || '<li>No networking event information available.</li>'}</ul>
                </article>
            `;
            if (loadingMessage) loadingMessage.style.display = 'none';
        } else {
            console.warn(`[city-info-loader.js - EN] Information for '${decodedCityName}' not found in any of the checked JSON files.`);
            cityDetailContainer.innerHTML = `<p>Detailed information for '${decodedCityName}' could not be found. Please check the city name.</p>`;
            document.title = `Information Not Found | ${decodedCityName} | World Clock Rainbow`;
            // updateSEOTags(decodedCityName); // 이미 위에서 호출됨
            if (loadingMessage) loadingMessage.style.display = 'none';
        }
    } catch (error) {
        console.error('[city-info-loader.js - EN] Error loading city details:', error);
        cityDetailContainer.innerHTML = `<p>An error occurred while loading information: ${error.message}. Please try again later.</p>`;
        document.title = "Error Loading Data | World Clock Rainbow";
        if (loadingMessage) loadingMessage.style.display = 'none';
    }
});
