document.addEventListener('DOMContentLoaded', () => {
    // --------------------------------------------------------
    // --------------------------------------------------------
    // Loader Logic (Session Based)
    // --------------------------------------------------------
    const loader = document.getElementById('loader-wrapper');
    const hasSeenLoader = sessionStorage.getItem('nss_camp_loader_shown');

    if (hasSeenLoader) {
        // If seen, hide immediately
        if (loader) {
            loader.style.display = 'none'; // distinct from class hidden to ensure no flicker
            loader.classList.add('hidden');
        }
        document.body.classList.add('loaded');
    } else {
        // If not seen, show animation and save state
        window.addEventListener('load', () => {
            setTimeout(() => {
                if (loader) {
                    loader.classList.add('hidden');
                    // Start Hero Animations after loader clears
                    document.body.classList.add('loaded');
                    sessionStorage.setItem('nss_camp_loader_shown', 'true');
                }
            }, 2500);
        });

        // Fallback if load event already fired or takes too long
        setTimeout(() => {
            if (loader && !loader.classList.contains('hidden')) {
                loader.classList.add('hidden');
                document.body.classList.add('loaded');
                sessionStorage.setItem('nss_camp_loader_shown', 'true');
            }
        }, 5000); // slightly longer fallback just in case
    }


    // --------------------------------------------------------
    // Countdown Timer
    // --------------------------------------------------------
    const campDate = new Date("March 15, 2026 06:00:00").getTime();

    const timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = campDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        const dEl = document.getElementById("days");
        const hEl = document.getElementById("hours");
        const mEl = document.getElementById("minutes");
        const sEl = document.getElementById("seconds");

        if (dEl && hEl && mEl && sEl) {
            dEl.innerText = days < 10 ? "0" + days : days;
            hEl.innerText = hours < 10 ? "0" + hours : hours;
            mEl.innerText = minutes < 10 ? "0" + minutes : minutes;
            sEl.innerText = seconds < 10 ? "0" + seconds : seconds;
        }

        if (distance < 0) {
            clearInterval(timer);
            const countdownContainer = document.querySelector('.countdown-container');
            if (countdownContainer) countdownContainer.innerHTML = "<h3>The Camp Has Started! 🏕️</h3>";
        }
    }, 1000);


    // --------------------------------------------------------
    // Accordion Logic
    // --------------------------------------------------------
    const accHeaders = document.querySelectorAll('.accordion-header');

    accHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const currentItem = header.parentElement;
            const content = header.nextElementSibling;

            // Close other items
            document.querySelectorAll('.accordion-item').forEach(item => {
                if (item !== currentItem && item.classList.contains('active')) {
                    item.classList.remove('active');
                    item.querySelector('.accordion-content').style.maxHeight = null;
                }
            });

            // Toggle current
            currentItem.classList.toggle('active');

            if (currentItem.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = null;
            }
        });
    });


    // --------------------------------------------------------
    // Existing Parallax & Scroll Logic
    // --------------------------------------------------------
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.scrollY;

                const hill1 = document.querySelector('.hill-layer-1');
                const hill2 = document.querySelector('.hill-layer-2');
                const sun = document.querySelector('.sun-layer');

                if (hill1) hill1.style.transform = `scaleX(1.5) translateY(${scrolled * 0.1}px)`;
                if (hill2) hill2.style.transform = `translateY(${scrolled * 0.05}px)`;
                if (sun) sun.style.transform = `translateY(${scrolled * 0.15}px)`;

                const navbar = document.querySelector('.navbar');
                if (scrolled > 30) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }

                ticking = false;
            });
            ticking = true;
        }
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-on-scroll').forEach(el => observer.observe(el));

    // Tap Feedback
    const interactables = document.querySelectorAll('.feature-card, .glass-pill, .btn-cta, .footer-link-pill, .social-btn, .accordion-header');
    interactables.forEach(el => {
        el.addEventListener('touchstart', () => {
            el.style.transform = 'scale(0.96)';
        });
        el.addEventListener('touchend', () => {
            el.style.transform = '';
        });
    });

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --------------------------------------------------------
    // Back to Top Button
    // --------------------------------------------------------
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // --------------------------------------------------------
    // 3D Tilt Effect for Cards
    // --------------------------------------------------------
    const tiltCards = document.querySelectorAll('.about-card, .cta-box, .accordion-item');

    tiltCards.forEach(card => {
        card.classList.add('card-3d');

        card.addEventListener('mousemove', (e) => {
            if (window.innerWidth < 768) return; // Disable on mobile

            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });

    // --------------------------------------------------------
    // Mouse Parallax for Background Layers
    // --------------------------------------------------------
    const parallaxContainer = document.querySelector('.parallax-container');

    document.addEventListener('mousemove', (e) => {
        if (window.innerWidth < 768) return; // Disable on mobile

        const mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        const mouseY = (e.clientY / window.innerHeight - 0.5) * 2;

        const sun = document.querySelector('.sun-layer');
        const clouds = document.querySelector('.cloud-layer-back');
        const mountains = document.querySelector('.mountain-layer');
        const hill1 = document.querySelector('.hill-layer-1');
        const hill2 = document.querySelector('.hill-layer-2');
        const trees = document.querySelector('.tree-layer');

        if (sun) sun.style.transform = `translate(${mouseX * 30}px, ${mouseY * 20}px)`;
        if (clouds) clouds.style.transform = `translate(${mouseX * 20}px, ${mouseY * 10}px)`;
        if (mountains) mountains.style.transform = `translate(${mouseX * 15}px, ${mouseY * 8}px)`;
        if (hill1) hill1.style.transform = `scaleX(1.5) translate(${mouseX * 10}px, ${mouseY * 5}px)`;
        if (hill2) hill2.style.transform = `translate(${mouseX * 5}px, ${mouseY * 3}px)`;
        if (trees) trees.style.transform = `translate(${mouseX * 25}px, ${mouseY * 15}px)`;
    });

    // --------------------------------------------------------
    // 3D Title Mouse Follow
    // --------------------------------------------------------
    const mainTitle = document.querySelector('.main-title');

    if (mainTitle) {
        mainTitle.addEventListener('mousemove', (e) => {
            if (window.innerWidth < 768) return;

            const rect = mainTitle.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            mainTitle.style.transform = `perspective(500px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
        });

        mainTitle.addEventListener('mouseleave', () => {
            mainTitle.style.transform = 'perspective(500px) rotateX(0) rotateY(0)';
        });
    }

    // --------------------------------------------------------
    // Interactive Packing List (LocalStorage)
    // --------------------------------------------------------
    const checklistItems = document.querySelectorAll('.check-item input[type="checkbox"]');

    // Load saved state
    checklistItems.forEach((checkbox, index) => {
        const savedState = localStorage.getItem(`nss_camp_check_${index}`);
        if (savedState === 'true') {
            checkbox.checked = true;
        }

        checkbox.addEventListener('change', () => {
            localStorage.setItem(`nss_camp_check_${index}`, checkbox.checked);
        });
    });

    // --------------------------------------------------------
    // Timeline Scroll Progressive Drawing
    // --------------------------------------------------------
    const timeline = document.querySelector('.timeline');

    if (timeline) {
        window.addEventListener('scroll', () => {
            const rect = timeline.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Start drawing when top of timeline hits 80% viewport height
            const startOffset = windowHeight * 0.8;

            // Calculate how much of the timeline is "past" that point
            // rect.top is distance from top of viewport to top of element
            // As we scroll down, rect.top decreases (becomes negative)

            // Progress = (Start Point - Current Top) / Total Height
            // We want 0% when rect.top = startOffset
            // We want 100% when rect.bottom = startOffset (or slightly before)

            const totalHeight = rect.height;
            const scrolledPast = startOffset - rect.top;

            let percentage = (scrolledPast / totalHeight) * 100;

            // Clamping
            if (percentage < 0) percentage = 0;
            if (percentage > 100) percentage = 100;

            timeline.style.setProperty('--line-height', `${percentage}%`);
        });
    }
    // --------------------------------------------------------
    // Sidebar Navigation Logic
    // --------------------------------------------------------
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebarMenu = document.querySelector('.sidebar-menu');
    const closeMenu = document.querySelector('.close-menu');
    const sidebarOverlay = document.querySelector('.sidebar-overlay');
    const sidebarLinks = document.querySelectorAll('.sidebar-link');

    function openSidebar() {
        sidebarMenu.classList.add('active');
        sidebarOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    function closeSidebar() {
        sidebarMenu.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (menuToggle) {
        menuToggle.addEventListener('click', openSidebar);
    }

    if (closeMenu) {
        closeMenu.addEventListener('click', closeSidebar);
    }

    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', closeSidebar);
    }

    sidebarLinks.forEach(link => {
        link.addEventListener('click', closeSidebar);
    });
});


