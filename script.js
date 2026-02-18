(() => {
    // Custom cursor
    const cursor = document.getElementById('cursor');
    const ring = document.getElementById('cursorRing');
    let mx = 0, my = 0;
    let rx = 0, ry = 0;

    document.addEventListener('mousemove', e => {
        mx = e.clientX; my = e.clientY;
        cursor.style.left = mx + 'px';
        cursor.style.top = my + 'px';
    });

    function animateRing() {
        rx += (mx - rx) * 0.12;
        ry += (my - ry) * 0.12;
        ring.style.left = rx + 'px';
        ring.style.top = ry + 'px';
        requestAnimationFrame(animateRing);
    }
    animateRing();

    // Nav scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 60);
    });

    // Reveal on scroll
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(r => observer.observe(r));

    // Category card glow effect
    document.querySelectorAll('.cat-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width * 100).toFixed(1);
            const y = ((e.clientY - rect.top) / rect.height * 100).toFixed(1);
            card.style.setProperty('--mx', x + '%');
            card.style.setProperty('--my', y + '%');
        });
    });

    // Color swatches
    document.querySelectorAll('.swatch').forEach(s => {
        s.addEventListener('click', () => {
            document.querySelectorAll('.swatch').forEach(x => x.classList.remove('active'));
            s.classList.add('active');
        });
    });

    // Product tabs
    document.querySelectorAll('.ptab').forEach(t => {
        t.addEventListener('click', () => {
            document.querySelectorAll('.ptab').forEach(x => x.classList.remove('active'));
            t.classList.add('active');
        });
    });

    // Mobile Menu
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (mobileToggle && mobileMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
})();
