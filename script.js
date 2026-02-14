document.addEventListener('DOMContentLoaded', () => {
    // --------------------------------------------------------
    // Loader Logic
    // --------------------------------------------------------
    const loader = document.getElementById('loader-wrapper');
    if (loader) {
        window.addEventListener('load', () => {
            loader.style.display = 'none';
            document.body.classList.add('loaded');
        });
        // Backup
        setTimeout(() => {
            loader.style.display = 'none';
            document.body.classList.add('loaded');
        }, 2000);
    }

    // --------------------------------------------------------
    // Countdown Timer (Static Update)
    // --------------------------------------------------------
    const campDate = new Date("March 15, 2026 06:00:00").getTime();
    const timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = campDate - now;
        if (distance < 0) {
            clearInterval(timer);
            const countdownContainer = document.querySelector('.countdown-container');
            if (countdownContainer) countdownContainer.innerHTML = "<h3>The Camp Has Started! 🏕️</h3>";
            return;
        }
        const d = Math.floor(distance / (1000 * 60 * 60 * 24));
        const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((distance % (1000 * 60)) / 1000);

        const dEl = document.getElementById("days");
        const hEl = document.getElementById("hours");
        const mEl = document.getElementById("minutes");
        const sEl = document.getElementById("seconds");

        if (dEl) dEl.innerText = d < 10 ? "0" + d : d;
        if (hEl) hEl.innerText = h < 10 ? "0" + h : h;
        if (mEl) mEl.innerText = m < 10 ? "0" + m : m;
        if (sEl) sEl.innerText = s < 10 ? "0" + s : s;
    }, 1000);

    // --------------------------------------------------------
    // Navigation (Stationary)
    // --------------------------------------------------------
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 30) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --------------------------------------------------------
    // Sidebar Logic (Static Toggle)
    // --------------------------------------------------------
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebarMenu = document.querySelector('.sidebar-menu');
    const closeMenu = document.querySelector('.close-menu');
    const sidebarOverlay = document.querySelector('.sidebar-overlay');

    if (menuToggle) menuToggle.addEventListener('click', () => {
        sidebarMenu.classList.add('active');
        sidebarOverlay.classList.add('active');
    });

    const hideSidebar = () => {
        sidebarMenu.classList.remove('active');
        sidebarOverlay.classList.remove('active');
    };

    if (closeMenu) closeMenu.addEventListener('click', hideSidebar);
    if (sidebarOverlay) sidebarOverlay.addEventListener('click', hideSidebar);
    document.querySelectorAll('.sidebar-link').forEach(l => l.addEventListener('click', hideSidebar));

    // --------------------------------------------------------
    // Background Music (Static Experience)
    // --------------------------------------------------------
    const audio = document.getElementById('camp-audio');
    const musicBtn = document.querySelector('.music-toggle');
    const musicToast = document.getElementById('music-toast');
    const closeDisclaimerBtn = document.getElementById('close-disclaimer');

    if (audio && musicBtn) {
        audio.volume = 0.2;
        const startMusic = () => {
            if (audio.paused) {
                audio.play().then(() => {
                    musicBtn.classList.add('playing');
                    if (musicToast) musicToast.classList.remove('active');
                }).catch(() => { });
            }
        };

        const interactionEvents = ['click', 'touchstart', 'scroll'];
        const handleFirstInteraction = () => {
            startMusic();
            interactionEvents.forEach(e => document.removeEventListener(e, handleFirstInteraction));
        };
        interactionEvents.forEach(e => document.addEventListener(e, handleFirstInteraction, { once: true }));

        if (window.innerWidth < 768) {
            setTimeout(() => { if (audio.paused && musicToast) musicToast.classList.add('active'); }, 1000);
        }

        if (closeDisclaimerBtn) closeDisclaimerBtn.addEventListener('click', () => {
            startMusic();
            if (musicToast) musicToast.classList.remove('active');
        });

        musicBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (audio.paused) {
                audio.play();
                musicBtn.classList.add('playing');
            } else {
                audio.pause();
                musicBtn.classList.remove('playing');
            }
        });
    }

    // Back to Top (Static)
    const btt = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) btt.style.display = 'flex';
        else btt.style.display = 'none';
    });
    btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'auto' }));
});
