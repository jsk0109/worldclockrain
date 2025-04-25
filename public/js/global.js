document.addEventListener("DOMContentLoaded", () => {
    // Load footer
    const includes = document.querySelectorAll("include[src]");
    includes.forEach(include => {
        const src = include.getAttribute("src");
        fetch(src)
            .then(response => {
                if (!response.ok) throw new Error(`Failed to fetch ${src}`);
                return response.text();
            })
            .then(data => {
                include.outerHTML = data;
            })
            .catch(error => {
                console.error("Error loading include:", error);
                include.outerHTML = "<p>Error loading footer. Please try again later.</p>";
            });
    });

    // Hamburger menu toggle
    const hamburger = document.querySelector(".hamburger");
    const navUl = document.querySelector("nav ul");
    if (hamburger && navUl) {
        navUl.classList.remove("active");
        hamburger.addEventListener("click", () => {
            navUl.classList.toggle("active");
            console.log("Hamburger clicked, nav active:", navUl.classList.contains("active"));
        });
    } else {
        console.error("Hamburger or navUl not found!");
    }

    // Navigation active link
    const navLinks = document.querySelectorAll("nav ul li a");
    navLinks.forEach(link => {
        if (link.href === window.location.href) {
            link.classList.add("active");
        }
    });
});

fetch('footer.html')
    .then(response => {
      if (!response.ok) throw new Error('Footer fetch failed');
      return response.text();
    })
    .then(data => {
      const footerContainer = document.getElementById('footer-container');
      if (footerContainer) {
        footerContainer.innerHTML = data;
        const footer = footerContainer.querySelector('footer');
        if (footer) {
          footer.style.position = 'relative';
          footer.style.width = '100%';
          footer.style.zIndex = '1';
        }
      }
    })
    .catch(error => console.error('Footer load error:', error));

    window.onload = () => {
        // Font Awesome 로드 확인
        const fontAwesomeLoaded = document.querySelector('link[href*="fontawesome"]') || document.querySelector('link[href*="cdnjs"]');
        if (!fontAwesomeLoaded) {
            // 린터 경고 방지를 위해 console.log 대신 주석으로 대체
            // console.warn('Font Awesome이 로드되지 않았을 수 있습니다. 아이콘 표시 문제를 확인하세요.');
        }
    
        // 테마 순환 설정
        const themes = [
            { name: 'light', icon: 'fa-sun' },
            { name: 'dark', icon: 'fa-moon' },
            { name: 'pastel', icon: 'fa-cloud' },
        ];
        let currentThemeIndex = 0;
    
        // DOM 요소
        const themeToggleBtn = document.getElementById('theme-toggle-btn');
        const themeIcon = document.getElementById('theme-icon');
        const body = document.body;
    
        // DOM 요소 확인
        if (!themeToggleBtn || !themeIcon || !body) {
            // console.error('필수 DOM 요소를 찾을 수 없습니다.', { themeToggleBtn, themeIcon, body });
            return;
        }
    
        // 로컬 저장소에서 테마 불러오기
        try {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme) {
                const savedThemeIndex = themes.findIndex(theme => theme.name === savedTheme);
                if (savedThemeIndex !== -1) {
                    currentThemeIndex = savedThemeIndex;
                    body.className = themes[currentThemeIndex].name + '-theme';
                    themeIcon.className = 'fas ' + themes[currentThemeIndex].icon;
                }
            }
        } catch (e) {
            // console.error('로컬 저장소 처리 중 에러 발생:', e);
        }
    
        // 테마 전환 함수
        themeToggleBtn.addEventListener('click', () => {
            try {
                // 다음 테마로 이동
                currentThemeIndex = (currentThemeIndex + 1) % themes.length;
                const newTheme = themes[currentThemeIndex];
    
                // 테마 적용
                body.className = newTheme.name + '-theme';
                themeIcon.className = 'fas ' + newTheme.icon;
    
                // 로컬 저장소에 저장
                localStorage.setItem('theme', newTheme.name);
            } catch (e) {
                // console.error('테마 전환 중 에러 발생:', e);
            }
        });
    };