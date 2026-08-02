    document.addEventListener('DOMContentLoaded', () => {
        // Reveal Elements on Scroll
        const revealElements = document.querySelectorAll('.reveal');

        const revealOptions = {
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        };

        const revealOnScroll = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    return;
                } else {
                    entry.target.classList.add('active');
                    // Optional: Stop observing once revealed
                    observer.unobserve(entry.target);
                }
            });
        }, revealOptions);

        revealElements.forEach(el => {
            revealOnScroll.observe(el);
        });

        // Hero Typewriter — cycles through the roles one at a time
        const typedRole = document.getElementById('typed-role');

        if (typedRole) {
            const roles = ['SAP Change Management', 'AI Workflow Automation'];
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

            if (prefersReducedMotion) {
                // Skip the animation entirely and show the roles as plain text
                typedRole.textContent = roles.join(' and ');
                document.querySelector('.caret')?.remove();
            } else {
                const TYPE_SPEED = 75;      // ms per character while typing
                const DELETE_SPEED = 35;    // ms per character while deleting
                const HOLD_FULL = 1900;     // pause once a role is fully typed
                const HOLD_EMPTY = 400;     // pause before the next role starts

                let roleIndex = 0;
                let charIndex = 0;
                let isDeleting = false;

                const tick = () => {
                    const role = roles[roleIndex];
                    charIndex += isDeleting ? -1 : 1;
                    typedRole.textContent = role.slice(0, charIndex);

                    let delay = isDeleting ? DELETE_SPEED : TYPE_SPEED;

                    if (!isDeleting && charIndex === role.length) {
                        isDeleting = true;
                        delay = HOLD_FULL;
                    } else if (isDeleting && charIndex === 0) {
                        isDeleting = false;
                        roleIndex = (roleIndex + 1) % roles.length;
                        delay = HOLD_EMPTY;
                    }

                    setTimeout(tick, delay);
                };

                setTimeout(tick, 700);
            }
        }

        // Header Background on Scroll
        const header = document.querySelector('header');
        const scrollCue = document.querySelector('.scroll-cue');

        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            // Once they've started scrolling, the hint has done its job
            if (scrollCue) {
                scrollCue.classList.toggle('hidden', window.scrollY > 80);
            }
        });

        // Smooth Scrolling for Anchor Links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if(targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Theme Toggle Logic
        const themeToggle = document.getElementById('theme-toggle');
        const toggleIcon = themeToggle.querySelector('i');
        
        // Check local storage for preference
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
            toggleIcon.classList.replace('fa-moon', 'fa-sun');
        }

        themeToggle.addEventListener('click', () => {
            let theme = document.documentElement.getAttribute('data-theme');
            if (theme === 'light') {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'dark');
                toggleIcon.classList.replace('fa-sun', 'fa-moon');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
                toggleIcon.classList.replace('fa-moon', 'fa-sun');
            }
        });
    });
