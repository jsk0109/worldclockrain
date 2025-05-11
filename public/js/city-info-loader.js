document.addEventListener('DOMContentLoaded', async () => {
    const cityDetailContainer = document.getElementById('city-detail-container');
    const loadingMessageElement = document.querySelector('#city-detail-container .loading-message');

    const params = new URLSearchParams(window.location.search);
    const cityNameFromUrl = params.get('city'); // 이전 수정에서 'city'로 변경된 것을 유지합니다.

    if (!cityNameFromUrl) {
        const errorMsg = '<p>City name not provided in URL.</p>';
        if (loadingMessageElement && cityDetailContainer.contains(loadingMessageElement)) {
            loadingMessageElement.innerHTML = errorMsg;
        } else if (cityDetailContainer) {
            cityDetailContainer.innerHTML = errorMsg;
        }
        document.title = "Error: City Not Specified | WorldClocks";
        return;
    }

    const decodedCityName = decodeURIComponent(cityNameFromUrl);
    document.title = `Loading ${decodedCityName}... | WorldClocks`;

    const jsonFiles = [
        '/data/json/cities1.json',
        '/data/json/cities2.json',
        '/data/json/cities3.json',
        '/data/json/cities4.json',
        '/data/json/cities5.json',
        '/data/json/cities6.json'
    ];

    let cityData = null;
    let foundInFile = '';

    try {
        for (const filePath of jsonFiles) {
            try {
                const response = await fetch(filePath);
                if (!response.ok) {
                    // console.warn(`Failed to load ${filePath}. Status: ${response.status}`);
                    continue;
                }
                const citiesList = await response.json();
                cityData = citiesList.find(c => c.name?.trim().toLowerCase() === decodedCityName.toLowerCase());
                if (cityData) {
                    foundInFile = filePath; // 데이터를 찾은 파일 경로 저장
                    break;
                }
            } catch (fileError) {
                // console.error(`Error processing file ${filePath}:`, fileError.message);
            }
        }

        if (cityData) {
            // ================================================================================
            // !!!!! 중요: 브라우저 콘솔에서 이 로그를 확인해주세요 !!!!!
            // 스크립트가 "London" (또는 다른 도시)에 대해 JSON 파일로부터 어떤 데이터를 받았는지 정확히 보여줍니다.
            console.log(`Complete cityData object for '${decodedCityName}' (found in ${foundInFile}):`, JSON.stringify(cityData, null, 2));
            // ================================================================================

            const pageTitle = cityData.name || decodedCityName;
            document.title = `${pageTitle} - Detailed Information | WorldClocks`;

            const metaDescTag = document.querySelector('meta[name="description"]');
            if (metaDescTag) {
                metaDescTag.setAttribute('content', `Find detailed information for ${pageTitle}, including timezone, standard business hours, major public holidays, business tips, and recommended attractions. Discover everything about ${pageTitle} on WorldClocks.`);
            }

            const heroTitle = document.querySelector('.city-info-hero h1');
            if (heroTitle) heroTitle.textContent = pageTitle;
            const heroSubtitle = document.querySelector('.city-info-hero p');
            if (heroSubtitle) heroSubtitle.textContent = `Explore the wonders of ${pageTitle}.`;

            const flagUrl = cityData.flag ? `https://flagcdn.com/w40/${cityData.flag.toLowerCase()}.png` : '';
            // countryName은 국기 alt 텍스트와 본문에 모두 사용되므로, cityData.country가 없을 경우를 대비합니다.
            const countryName = (typeof cityData.country === 'string' && cityData.country) ? cityData.country : 'N/A';
            // cityName은 h1 태그에 사용되므로, cityData.name이 없을 경우를 대비합니다.
            const cityNameForDisplay = (typeof cityData.name === 'string' && cityData.name) ? cityData.name : decodedCityName;


            // 필드 값 확인 및 기본값 설정
            const continent = cityData.continent || 'Data not available';
            const population = cityData.population ? cityData.population.toLocaleString() : 'Data not available';
            const area_sq_km = cityData.area_sq_km ? cityData.area_sq_km.toLocaleString() + ' km²' : 'Data not available';
            const description = cityData.description || 'No specific description available for this city.';
            
            let attractionsHtml = '';
            if (cityData.attractions && Array.isArray(cityData.attractions) && cityData.attractions.length > 0) {
                attractionsHtml = `
                    <h2>Main Attractions</h2>
                    <ul>
                        ${cityData.attractions.map(attraction => `<li>${typeof attraction === 'string' ? attraction : JSON.stringify(attraction)}</li>`).join('')}
                    </ul>
                `;
            }

            let funFactsHtml = '';
            if (cityData.fun_facts && Array.isArray(cityData.fun_facts) && cityData.fun_facts.length > 0) {
                funFactsHtml = `
                    <h2>Fun Facts</h2>
                    <ul>
                        ${cityData.fun_facts.map(fact => `<li>${typeof fact === 'string' ? fact : JSON.stringify(fact)}</li>`).join('')}
                    </ul>
                `;
            }
            
            let coordinatesHtml = '';
            if (cityData.coordinates && typeof cityData.coordinates.lat !== 'undefined' && typeof cityData.coordinates.lon !== 'undefined') {
                coordinatesHtml = `
                    <h2>Geographical Coordinates</h2>
                    <p>Latitude: ${cityData.coordinates.lat}, Longitude: ${cityData.coordinates.lon}</p>
                `;
            }

            cityDetailContainer.innerHTML = `
                <article class="city-info-content">
                    <h1>
                        ${flagUrl ? `<img src="${flagUrl}" alt="${countryName} Flag">` : ''}
                        <span>${cityNameForDisplay}</span>
                    </h1>
                    <p><strong>Country:</strong> ${countryName}</p>
                    <p><strong>Continent:</strong> ${continent}</p>
                    <p><strong>Population:</strong> ${population}</p>
                    <p><strong>Area:</strong> ${area_sq_km}</p>
                    
                    <h2>Description</h2>
                    <p>${description}</p>
                    
                    ${attractionsHtml}
                    ${funFactsHtml}
                    ${coordinatesHtml}
                </article>
            `;
        } else {
            // console.warn(`Information for '${decodedCityName}' not found.`);
            const notFoundMessage = `<p>Detailed information for '${decodedCityName}' could not be found. Please check the city name or try a different one.</p>`;
            if (loadingMessageElement && cityDetailContainer.contains(loadingMessageElement)) {
                loadingMessageElement.innerHTML = notFoundMessage;
            } else if (cityDetailContainer) {
                cityDetailContainer.innerHTML = notFoundMessage;
            }
            document.title = `Information Not Found | ${decodedCityName} | WorldClocks`;
        }
    } catch (error) {
        // console.error('Error loading city details:', error);
        const errorMessageText = `<p>An error occurred while loading information. Please try again later.</p>`;
        if (loadingMessageElement && cityDetailContainer.contains(loadingMessageElement)) {
            loadingMessageElement.innerHTML = errorMessageText;
        } else if (cityDetailContainer) {
            cityDetailContainer.innerHTML = errorMessageText;
        }
        document.title = "Error Loading Data | WorldClocks";
    }
});
