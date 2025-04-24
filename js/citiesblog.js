// 대륙 매핑 (JSON에 대륙 정보 없으므로 수동 추가)
const continentMap = {
  'New York': 'North America', 'London': 'Europe', 'Tokyo': 'Asia', 'Sydney': 'Australia',
  'Rio de Janeiro': 'South America', 'Cape Town': 'Africa', 'Moscow': 'Europe', 'Dubai': 'Asia',
  'Mexico City': 'North America', 'Johannesburg': 'Africa', 'Mumbai': 'Asia', 'Perth': 'Australia',
  'Miami': 'North America', 'Bogota': 'South America', 'Amsterdam': 'Europe', 'Accra': 'Africa',
  'Shanghai': 'Asia', 'Adelaide': 'Australia', 'San Francisco': 'North America', 'Quito': 'South America',
  'Paris': 'Europe', 'Nairobi': 'Africa', 'Bangkok': 'Asia', 'Melbourne': 'Australia', 'Chicago': 'North America',
  'Lima': 'South America', 'Berlin': 'Europe', 'Lagos': 'Africa', 'Singapore': 'Asia', 'Brisbane': 'Australia'
};

// 블로그 데이터 로드
async function loadCityData() {
  try {
    console.log('Fetching citiesblog1.json...');
    const response = await fetch('data/blog/citiesblog1.json');
    console.log('Fetch response:', response);
    const cities = await response.json();
    console.log('Loaded cities:', cities);
    return cities.map(city => ({
      ...city,
      continent: continentMap[city.city] || 'Unknown'
    }));
  } catch (error) {
    console.error('Error loading city data:', error);
    return [];
  }
}

// 로컬 시간 계산
function calculateLocalTime(utcOffset) {
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const offsetHours = parseInt(utcOffset.split(':')[0], 10);
  const offsetMinutes = parseInt(utcOffset.split(':')[1], 10);
  const localTime = new Date(utc + (offsetHours * 3600000) + (offsetMinutes * 60000));
  
  const hours = localTime.getHours();
  const minutes = localTime.getMinutes().toString().padStart(2, '0');
  const seconds = localTime.getSeconds().toString().padStart(2, '0');
  const period = hours >= 12 ? 'PM' : 'AM';
  const adjustedHours = hours % 12 || 12;
  return `${adjustedHours.toString().padStart(2, '0')}:${minutes}:${seconds} ${period}`;
}

// 도시 렌더링 (필터링 및 검색 적용)
async function renderCities(filter = 'all', searchQuery = '') {
  const cities = await loadCityData();
  const cityContainer = document.getElementById('city-list');
  if (!cityContainer) return; // city-list가 없으면 종료
  cityContainer.innerHTML = ''; // 기존 내용 초기화

  // 필터링 및 검색 적용
  let filteredCities = cities;

  // 대륙별 필터링
  if (filter !== 'all') {
    filteredCities = cities.filter(city => city.continent === filter);
  }

  // 검색 적용
  if (searchQuery) {
    filteredCities = filteredCities.filter(city =>
      city.city.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // 필터링 및 검색된 도시 렌더링
  filteredCities.forEach(city => {
    const previewContent = city.content
      .substring(0, 200)
      .replace(/\n/g, '<br>')
      .replace(/##/g, '</h2>')
      .replace(/#/g, '<h2>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      + '...';

    const cityCard = `
      <div class="city-card">
        <h2>${city.city}, ${city.country}</h2>
        <p>UTC Offset: ${city.utc_offset}</p>
        <p>${previewContent}</p>
        <a href="/city/${city.city.toLowerCase().replace(/\s+/g, '-')}" class="city-link">Read More</a>
        <a href="index.html" class="back-to-home">Back to World Clocks</a>
      </div>
    `;
    cityContainer.innerHTML += cityCard;
  });

  // 도시가 없을 경우 메시지 표시
  if (filteredCities.length === 0) {
    cityContainer.innerHTML = '<p>No cities found.</p>';
  }
}

// 도시 세부 정보 렌더링
async function renderCityDetails() {
  console.log('renderCityDetails started');
  const cities = await loadCityData();
  console.log('Cities loaded:', cities);
  let citySlug;
  const urlPath = window.location.pathname;

  if (urlPath.startsWith('/city/')) {
    citySlug = urlPath.split('/city/')[1] || 'new-york';
  } else if (urlPath.includes('city-details.html')) {
    citySlug = window.location.hash ? window.location.hash.replace('#', '') : 'new-york';
  } else {
    citySlug = 'new-york';
  }

  const cityName = citySlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  console.log('City name:', cityName);
  console.log('Available cities:', cities.map(c => c.city));

  const city = cities.find(c => c.city.toLowerCase() === cityName.toLowerCase());
  if (!city) {
    console.log('City not found');
    document.getElementById('city-title').textContent = 'City not found';
    document.getElementById('city-meta').textContent = '';
    document.getElementById('city-content').innerHTML = '';
    return;
  }

  document.getElementById('city-title').textContent = `${city.city}, ${city.country}`;
  document.getElementById('city-meta').textContent = `UTC Offset: ${city.utc_offset}`;
  document.getElementById('city-content').innerHTML = city.content
    .replace(/\n/g, '<br>')
    .replace(/##/g, '</h2>')
    .replace(/#/g, '<h2>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  const updateLocalTime = () => {
    const localTime = calculateLocalTime(city.utc_offset);
    console.log('Local time calculated:', localTime);
    document.getElementById('local-time').textContent = `${city.city}: ${localTime}`;
  };
  updateLocalTime();
  setInterval(updateLocalTime, 1000);
}

// 초기화 및 이벤트 리스너
document.addEventListener('DOMContentLoaded', () => {
  // citiesblog.html에서 실행
  if (window.location.pathname.includes('citiesblog.html')) {
    // 초기 렌더링
    renderCities();

    // 필터 버튼 이벤트
    const filterButtons = document.querySelectorAll('#continent-filter button');
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        const filter = button.getAttribute('data-continent');
        const searchQuery = document.getElementById('city-search').value || '';
        renderCities(filter, searchQuery);
      });
    });

    // 검색창 이벤트
    const searchInput = document.getElementById('city-search');
    if (searchInput) {
      searchInput.addEventListener('input', () => {
        const searchQuery = searchInput.value;
        const activeFilter = document.querySelector('#continent-filter button.active')?.getAttribute('data-continent') || 'all';
        renderCities(activeFilter, searchQuery);
      });
    }
  }

  // city-details.html 또는 /city/ 경로에서 실행
  if (window.location.pathname.includes('/city/') || window.location.pathname.includes('city-details.html')) {
    console.log('Path includes /city/ or city-details.html, rendering details...');
    console.log('Current pathname:', window.location.pathname);
    renderCityDetails();
  }
});

console.log('citiesblog.js loaded');
