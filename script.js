document.addEventListener('DOMContentLoaded', () => {
    // --------------------------------------------------------
    // Loader Logic (Session Based)
    // --------------------------------------------------------
    const loader = document.getElementById('loader-wrapper');
    const hasSeenLoader = sessionStorage.getItem('nss_camp_loader_shown');

    if (hasSeenLoader) {
        if (loader) {
            loader.style.display = 'none';
            loader.classList.add('hidden');
        }
        document.body.classList.add('loaded');
    } else {
        window.addEventListener('load', () => {
            setTimeout(() => {
                if (loader) {
                    loader.classList.add('hidden');
                    document.body.classList.add('loaded');
                    sessionStorage.setItem('nss_camp_loader_shown', 'true');
                }
            }, 1000); // Faster loader for mobile snappiness
        });

        setTimeout(() => {
            if (loader && !loader.classList.contains('hidden')) {
                loader.classList.add('hidden');
                document.body.classList.add('loaded');
                sessionStorage.setItem('nss_camp_loader_shown', 'true');
            }
        }, 3000);
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

            document.querySelectorAll('.accordion-item').forEach(item => {
                if (item !== currentItem && item.classList.contains('active')) {
                    item.classList.remove('active');
                    item.querySelector('.accordion-content').style.maxHeight = null;
                }
            });

            currentItem.classList.toggle('active');

            if (currentItem.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = null;
            }
        });
    });


    // --------------------------------------------------------
    // Navigation & Scroll Logic (No Animations on Mobile)
    // --------------------------------------------------------
    // --------------------------------------------------------
    // Navigation & Scroll Logic (Stationary Only)
    // --------------------------------------------------------
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const navbar = document.querySelector('.navbar');
        if (scrolled > 30) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
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

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) { target.scrollIntoView({ behavior: 'smooth' }); }
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
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 3D Tilt Effect Removed (Stationary Interface)

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
        document.body.style.overflow = 'hidden';
    }

    function closeSidebar() {
        sidebarMenu.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (menuToggle) { menuToggle.addEventListener('click', openSidebar); }
    if (closeMenu) { closeMenu.addEventListener('click', closeSidebar); }
    if (sidebarOverlay) { sidebarOverlay.addEventListener('click', closeSidebar); }
    sidebarLinks.forEach(link => { link.addEventListener('click', closeSidebar); });

    // Firefly Generator Removed (Stationary Interface)

    // --------------------------------------------------------
    // Background Music Logic (Direct Experience Mode)
    // --------------------------------------------------------
    const audio = document.getElementById('camp-audio');
    const musicBtn = document.querySelector('.music-toggle');
    const musicIcon = musicBtn ? musicBtn.querySelector('i') : null;
    const musicToast = document.getElementById('music-toast');
    const toastMsg = document.getElementById('toast-msg');
    const closeDisclaimerBtn = document.getElementById('close-disclaimer');

    if (audio && musicBtn) {
        audio.load();
        audio.volume = 0.15;

        // Function to start music
        const startMusic = () => {
            if (audio.paused) {
                audio.play().then(() => {
                    musicBtn.classList.add('playing');
                    if (musicIcon) { musicIcon.classList.replace('fa-play', 'fa-pause'); }
                    hideToast();
                    cleanup();
                }).catch(err => {
                    console.log("Autoplay still blocked by browser policy. Interaction needed.");
                });
            }
        };

        const handleInteraction = () => {
            startMusic();
        };

        const cleanup = () => {
            ['click', 'touchstart', 'scroll', 'mousedown'].forEach(evt =>
                document.removeEventListener(evt, handleInteraction)
            );
        };

        // Attempt direct autoplay on load
        window.addEventListener('load', startMusic);

        // Capture ANY interaction to play (effectively autoplay after first touch/scroll)
        ['click', 'touchstart', 'scroll', 'mousedown'].forEach(evt =>
            document.addEventListener(evt, handleInteraction, { once: true })
        );

        // Show disclaimer immediately on mobile
        if (window.innerWidth < 768) {
            setTimeout(() => {
                if (musicToast && audio.paused) {
                    musicToast.classList.add('active');
                }
            }, 800);
        }

        function hideToast() { if (musicToast) musicToast.classList.remove('active'); }

        if (closeDisclaimerBtn) {
            closeDisclaimerBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                startMusic(); // Also try playing when they dismiss
                hideToast();
            });
        }

        musicBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (audio.paused) {
                audio.play().then(() => {
                    musicBtn.classList.add('playing');
                    if (musicIcon) { musicIcon.classList.replace('fa-play', 'fa-pause'); }
                    hideToast();
                });
            } else {
                audio.pause();
                musicBtn.classList.remove('playing');
                if (musicIcon) { musicIcon.classList.replace('fa-pause', 'fa-play'); }
            }
        });
    }
});
