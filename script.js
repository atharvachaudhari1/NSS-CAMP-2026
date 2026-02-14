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
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.scrollY;

                // Disable parallax on mobile to prevent jitters/movement issues
                if (window.innerWidth >= 768) {
                    const hill1 = document.querySelector('.hill-layer-1');
                    const hill2 = document.querySelector('.hill-layer-2');
                    const sun = document.querySelector('.sun-layer');

                    if (hill1) hill1.style.transform = `scaleX(1.5) translateY(${scrolled * 0.1}px)`;
                    if (hill2) hill2.style.transform = `translateY(${scrolled * 0.05}px)`;
                    if (sun) sun.style.transform = `translateY(${scrolled * 0.15}px)`;
                }

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

    // Tap Feedback (Only on Desktop/High End)
    if (window.innerWidth >= 768) {
        const interactables = document.querySelectorAll('.feature-card, .glass-pill, .btn-cta, .footer-link-pill, .social-btn, .accordion-header');
        interactables.forEach(el => {
            el.addEventListener('touchstart', () => { el.style.transform = 'scale(0.96)'; });
            el.addEventListener('touchend', () => { el.style.transform = ''; });
        });
    }

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

    // --------------------------------------------------------
    // 3D Tilt Effect for Cards (Desktop Only)
    // --------------------------------------------------------
    const tiltCards = document.querySelectorAll('.about-card, .cta-box, .accordion-item');
    if (window.innerWidth >= 768) {
        tiltCards.forEach(card => {
            card.classList.add('card-3d');
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
            });
            card.addEventListener('mouseleave', () => { card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)'; });
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

    // --------------------------------------------------------
    // Firefly Generator (Desktop Only)
    // --------------------------------------------------------
    const heroSection = document.querySelector('.hero');
    if (heroSection && window.innerWidth >= 768) {
        for (let i = 0; i < 25; i++) {
            const firefly = document.createElement('div');
            firefly.classList.add('firefly');
            firefly.style.left = `${Math.random() * 100}%`;
            firefly.style.top = `${Math.random() * 80 + 10}%`;
            firefly.style.setProperty('--move-x', (Math.random() - 0.5) * 200 + 'px');
            firefly.style.setProperty('--move-y', (Math.random() - 0.5) * 150 + 'px');
            firefly.style.animation = `drift ${10 + Math.random() * 10}s linear infinite, flash 3s ease-in-out infinite`;
            firefly.style.animationDelay = `${Math.random() * -20}s`;
            heroSection.appendChild(firefly);
        }
    }

    // --------------------------------------------------------
    // Background Music Logic (Optimized for Mobile)
    // --------------------------------------------------------
    const audio = document.getElementById('camp-audio');
    const musicBtn = document.querySelector('.music-toggle');
    const musicIcon = musicBtn ? musicBtn.querySelector('i') : null;
    const musicToast = document.getElementById('music-toast');
    const toastMsg = document.getElementById('toast-msg');
    const musicCue = document.getElementById('music-cue');

    if (audio && musicBtn) {
        audio.load();
        audio.volume = 0.15;

        // Immediate interaction capture for ANY element on the page
        const handleInteraction = () => {
            if (audio.paused) {
                audio.play().then(() => {
                    musicBtn.classList.add('playing');
                    if (musicIcon) { musicIcon.classList.replace('fa-play', 'fa-pause'); }
                    hideToast();
                    hideCue();
                    cleanup();
                }).catch(err => console.log("Still blocked", err));
            }
        };

        const cleanup = () => {
            ['click', 'touchstart', 'scroll', 'mousedown'].forEach(evt =>
                document.removeEventListener(evt, handleInteraction)
            );
        };

        // Show the slide-out cue near the button
        setTimeout(() => {
            if (audio.paused && musicCue) {
                musicCue.classList.add('visible');
            }
        }, 1500); // Show slightly earlier

        // On mobile, if music isn't started after 5s, show the toast as a backup
        if (window.innerWidth < 768) {
            setTimeout(() => {
                if (musicToast && audio.paused) {
                    musicToast.classList.add('active');
                    if (toastMsg) toastMsg.innerText = "Tap anywhere to play music 🎵";
                }
            }, 5000);
        }

        ['click', 'touchstart', 'scroll', 'mousedown'].forEach(evt =>
            document.addEventListener(evt, handleInteraction, { once: true })
        );

        function hideToast() { if (musicToast) musicToast.classList.remove('active'); }
        function hideCue() { if (musicCue) musicCue.classList.remove('visible'); }

        musicBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Don't trigger document listener
            if (audio.paused) {
                audio.play().then(() => {
                    musicBtn.classList.add('playing');
                    if (musicIcon) { musicIcon.classList.replace('fa-play', 'fa-pause'); }
                    hideToast();
                    hideCue();
                });
            } else {
                audio.pause();
                musicBtn.classList.remove('playing');
                if (musicIcon) { musicIcon.classList.replace('fa-pause', 'fa-play'); }
            }
        });
    }
});
