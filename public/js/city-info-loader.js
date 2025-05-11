document.addEventListener('DOMContentLoaded', async () => {
    const cityDetailContainer = document.getElementById('city-detail-container');
    const loadingMessageElement = document.querySelector('#city-detail-container .loading-message'); // 로딩 메시지 요소 직접 참조

    const params = new URLSearchParams(window.location.search);
    const cityNameFromUrl = params.get('city'); // URL 파라미터 이름을 'city'로 변경

    if (!cityNameFromUrl) {
        if (loadingMessageElement) {
            loadingMessageElement.textContent = 'City name not provided in URL.';
        } else if (cityDetailContainer) {
            cityDetailContainer.innerHTML = '<p>City name not provided in URL.</p>';
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

    try {
        for (const filePath of jsonFiles) {
            try {
                const response = await fetch(filePath);
                if (!response.ok) {
                    
                    continue;
                }
                const citiesList = await response.json();
                cityData = citiesList.find(c => c.name?.trim().toLowerCase() === decodedCityName.toLowerCase());
                if (cityData) {
                    break;
                }
            } catch (fileError) {
            }
        }

        if (cityData) {
            document.title = `${cityData.name} - Detailed Information | WorldClocks`;
            const metaDescTag = document.querySelector('meta[name="description"]');
            if (metaDescTag) {
                metaDescTag.setAttribute('content', `Find detailed information for ${cityData.name}, including timezone, standard business hours, major public holidays, business tips, and recommended attractions. Discover everything about ${cityData.name} on WorldClocks.`);
            }

            const heroTitle = document.querySelector('.city-info-hero h1');
            if (heroTitle) heroTitle.textContent = cityData.name;
            const heroSubtitle = document.querySelector('.city-info-hero p');
            if (heroSubtitle) heroSubtitle.textContent = `Explore the wonders of ${cityData.name}.`;

            const flagUrl = cityData.flag ? `https://flagcdn.com/w40/${cityData.flag.toLowerCase()}.png` : '';
            const countryName = typeof cityData.country === 'string' ? cityData.country : 'N/A';
            const cityName = typeof cityData.name === 'string' ? cityData.name : 'N/A';

            cityDetailContainer.innerHTML = `
                <article class="city-info-content">
                    <h1>
                        ${flagUrl ? `<img src="${flagUrl}" alt="${countryName} Flag">` : ''}
                        <span>${cityName}</span>
                    </h1>
                    <p><strong>Country:</strong> ${countryName}</p>
                    <p><strong>Continent:</strong> ${cityData.continent || 'Not available'}</p>
                    <p><strong>Population:</strong> ${cityData.population ? cityData.population.toLocaleString() : 'Not available'}</p>
                    <p><strong>Area:</strong> ${cityData.area_sq_km ? cityData.area_sq_km.toLocaleString() + ' km²' : 'Not available'}</p>
                    
                    <h2>Description</h2>
                    <p>${cityData.description || 'No description available.'}</p>
                    
                    ${cityData.attractions && cityData.attractions.length > 0 ? `
                        <h2>Main Attractions</h2>
                        <ul>
                            ${cityData.attractions.map(attraction => `<li>${attraction}</li>`).join('')}
                        </ul>
                    ` : ''}
                    
                    ${cityData.fun_facts && cityData.fun_facts.length > 0 ? `
                        <h2>Fun Facts</h2>
                        <ul>
                            ${cityData.fun_facts.map(fact => `<li>${fact}</li>`).join('')}
                        </ul>
                    ` : ''}

                    ${cityData.coordinates ? `
                        <h2>Coordinates</h2>
                        <p>Latitude: ${cityData.coordinates.lat}, Longitude: ${cityData.coordinates.lon}</p>
                    ` : ''}
                </article>
            `;
        } else {
            const notFoundMessage = `<p>Detailed information for '${decodedCityName}' could not be found. Please check the city name or try a different one.</p>`;
            if (loadingMessageElement && cityDetailContainer.contains(loadingMessageElement)) {
                loadingMessageElement.innerHTML = notFoundMessage;
            } else if (cityDetailContainer) {
                cityDetailContainer.innerHTML = notFoundMessage;
            }
            document.title = `Information Not Found | ${decodedCityName} | WorldClocks`;
        }
    } catch (error) {
        const errorMessageText = `<p>An error occurred while loading information. Please try again later.</p>`;
        if (loadingMessageElement && cityDetailContainer.contains(loadingMessageElement)) {
            loadingMessageElement.innerHTML = errorMessageText;
        } else if (cityDetailContainer) {
            cityDetailContainer.innerHTML = errorMessageText;
        }
        document.title = "Error Loading Data | WorldClocks";
    }
});
