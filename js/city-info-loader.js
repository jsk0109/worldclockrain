document.addEventListener('DOMContentLoaded', async () => {
    const cityDetailContainer = document.getElementById('city-detail-container');
    const loadingMessage = document.querySelector('.loading-message');

    if (!cityDetailContainer) {
        console.error('City detail container not found.');
        if (loadingMessage) loadingMessage.textContent = 'Error: Page layout components not found.';
        return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const cityNameFromUrl = urlParams.get('city');

    if (!cityNameFromUrl) {
        cityDetailContainer.innerHTML = '<p>No city specified to display. Please specify a city in the URL using the format: ?city=CityName.</p>';
        document.title = "Error | WorldClocks";
        return;
    }

    const decodedCityName = decodeURIComponent(cityNameFromUrl);
    document.title = `Loading ${decodedCityName} Information... | WorldClocks`;
    if (loadingMessage) loadingMessage.textContent = `Loading detailed information for ${decodedCityName}...`;

    const jsonFiles = [
        '/data/json/cities1.json',
        '/data/json/cities2.json',
        '/data/json/cities3.json',
        '/data/json/cities4.json',
        '/data/json/cities5.json',
        '/data/json/cities6.json'
    ];
    let cityData = null;
    let foundInFile = null;

    try {
        for (const filePath of jsonFiles) {
            console.log(`Attempting to fetch city data for "${decodedCityName}" from ${filePath}`);
            try {
                const response = await fetch(filePath);
                if (!response.ok) {
                    console.warn(`Failed to load ${filePath}. (Status: ${response.status}) - Will try next file.`);
                    continue; 
                }
                const citiesList = await response.json();
                console.log(`Successfully parsed ${filePath}, found ${citiesList.length} cities.`);
                
                cityData = citiesList.find(c => c.name?.trim().toLowerCase() === decodedCityName.toLowerCase());
                
                if (cityData) {
                    foundInFile = filePath;
                    console.log(`Found "${decodedCityName}" in ${foundInFile}`);
                    break; 
                }
            } catch (fileError) {
                console.error(`Error processing file ${filePath}:`, fileError.message, "- Will try next file.");
            }
        }

        if (cityData) {
            console.log('Found city data:', cityData);
            document.title = `${cityData.name} - Detailed Information | WorldClocks`;
            const metaDescTag = document.querySelector('meta[name="description"]');
            if (metaDescTag) {
                metaDescTag.setAttribute('content', `Find detailed information for ${cityData.name}, including timezone, standard business hours, major public holidays, business tips, and recommended attractions. Discover everything about ${cityData.name} on WorldClocks.`);
            }

            const attractionsHtml = (cityData.topAttractionsForProfessionals || [])
                .map(attr => `<li><strong>${attr.name || 'Not available'}</strong>: ${attr.description || 'Not available'} (Proximity: ${attr.proximityToBusinessDistrict || 'Not available'})</li>`)
                .join('');

            const eventsHtml = (cityData.networkingEvents || [])
                .map(event => `<li><strong>${event.name || 'Not available'}</strong> (${event.date || 'Date not available'}): ${event.description || 'Not available'}</li>`)
                .join('');
            
            const holidaysHtml = (cityData.majorPublicHolidays || [])
                .map(holiday => `<li>${holiday}</li>`).join('');

            cityDetailContainer.innerHTML = `
                <article class="city-info-content">
                    <h1>
                        <img src="https://flagcdn.com/w40/${cityData.flag?.toLowerCase()}.png" alt="${cityData.country} Flag" style="margin-right: 10px; vertical-align: middle;">
                        ${cityData.name}
                    </h1>
                    <p><strong>Country:</strong> ${cityData.country || 'Not available'}</p>
                    <p><strong>Continent:</strong> ${cityData.continent || 'Not available'}</p>
                    <p><strong>Timezone:</strong> ${cityData.timezone || 'Not available'} (${cityData.timeDifference || 'Not available'})</p>
                    
                    <h2>General Information</h2>
                    <p><strong>Standard Business Hours:</strong> ${cityData.standardBusinessHours || 'Not available'}</p>
                    <p><strong>Recommended Meeting Times:</strong> ${cityData.recommendedMeetingTimes || 'Not available'}</p>
                    
                    <h2>Major Public Holidays</h2>
                    <ul>${holidaysHtml || '<li>Public holiday information not available.</li>'}</ul>
                    
                    <h2>Business Environment</h2>
                    <p><strong>Business Hub Information:</strong> ${cityData.businessHub || 'Not available'}</p>
                    <p><strong>Business Etiquette:</strong> ${cityData.businessEtiquette || 'Not available'}</p>
                    <p><strong>Business Tips:</strong> ${cityData.businessTip || 'Not available'}</p>
                    
                    <h2>Local Life & Culture</h2>
                    <p><strong>Lifestyle:</strong> ${cityData.localLifestyle || 'Not available'}</p>
                    <p><strong>Cultural Highlights:</strong> ${cityData.localCulture || 'Not available'}</p>
                    <p><strong>Signature Dish:</strong> ${cityData.signatureDish || 'Not available'}</p>
                    
                    <h2>Recommended Attractions for Professionals</h2>
                    <ul>${attractionsHtml || '<li>Attraction information not available.</li>'}</ul>
                    
                    <h2>Networking Events</h2>
                    <ul>${eventsHtml || '<li>Networking event information not available.</li>'}</ul>
                </article>
            `;
        } else {
            console.warn(`Information for '${decodedCityName}' not found in any of the checked JSON files.`);
            cityDetailContainer.innerHTML = `<p>Detailed information for '${decodedCityName}' could not be found. Please check the city name.</p>`;
            document.title = `Information Not Found | ${decodedCityName} | WorldClocks`;
        }
    } catch (error) {
        console.error('Error loading city details:', error);
        cityDetailContainer.innerHTML = `<p>An error occurred while loading information: ${error.message}. Please try again later.</p>`;
        document.title = "Error Loading Data | WorldClocks";
    }
});
