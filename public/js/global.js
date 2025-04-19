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

fetch('/html/footer.html')
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
