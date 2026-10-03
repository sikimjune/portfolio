(() => {
    'use strict';

    document.querySelectorAll('[data-sel]').forEach(el => {
        ['tl', 'tr', 'bl', 'br'].forEach(p => {
            const h = document.createElement('i');
            h.className = 'c ' + p;
            el.appendChild(h);
        });
    });

    const goTo = id => {
        const t = document.getElementById(id);

        if (t) {
            t.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    document.querySelectorAll('[data-go]').forEach(el => {
        el.addEventListener('click', e => {
            e.preventDefault();
            goTo(el.dataset.go);
        });
    });

    const tabs = document.querySelectorAll('.dock button[data-go]');
    const sections = [...document.querySelectorAll('[data-section]')];

    const spy = () => {
        if (!sections.length) return;

        let cur = sections[0].id;

        const atBottom =
            window.innerHeight + window.scrollY >=
            document.documentElement.scrollHeight - 4;

        if (atBottom) {
            cur = sections[sections.length - 1].id;
        } else {
            sections.forEach(s => {
                if (s.getBoundingClientRect().top < window.innerHeight * 0.4) {
                    cur = s.id;
                }
            });
        }

        tabs.forEach(b => {
            b.classList.toggle('on', b.dataset.go === cur);
        });
    };

    window.addEventListener('scroll', spy, { passive: true });
    window.addEventListener('resize', spy);

    spy();


    const certMore = document.getElementById('certMore');
    const moreCerts = document.getElementById('moreCerts');

    if (certMore && moreCerts) {
        certMore.addEventListener('click', () => {
            const isOpen = moreCerts.classList.toggle('show');

            certMore.innerHTML = isOpen
                ? `Show less <svg class="ic sms chev-up"><use href="#i-chev"></use></svg>`
                : `Show more <svg class="ic sms"><use href="#i-chev"></use></svg>`;
        });
    }


    const showMore = document.getElementById('showMore');
    const moreWorks = document.getElementById('moreWorks');

    if (showMore && moreWorks) {
        showMore.addEventListener('click', () => {
            const isOpen = moreWorks.classList.toggle('show');

            showMore.innerHTML = isOpen
                ? `Show less <svg class="ic sms chev-up"><use href="#i-chev"></use></svg>`
                : `Show more <svg class="ic sms"><use href="#i-chev"></use></svg>`;
        });
    }


    document.querySelectorAll('.gallery').forEach(gallery => {
        const scroll = gallery.querySelector('.gallery-scroll');
        const progress = gallery.parentElement.querySelector(
            '.gallery-progress span'
        );

        if (!scroll || !progress) return;

        const updateProgress = () => {
            const maxScroll = scroll.scrollWidth - scroll.clientWidth;

            if (maxScroll <= 0) {
                progress.style.left = '0px';
                return;
            }

            const trackWidth = progress.parentElement.clientWidth;
            const progressWidth = progress.offsetWidth;
            const maxLeft = trackWidth - progressWidth;

            const percentage = scroll.scrollLeft / maxScroll;

            progress.style.left = `${percentage * maxLeft}px`;
        };

        scroll.addEventListener('scroll', updateProgress, {
            passive: true
        });

        window.addEventListener('resize', updateProgress);

        requestAnimationFrame(updateProgress);
    });


    const createWord = document.querySelector('.create-word');

    if (createWord) {
        setInterval(() => {
            createWord.style.opacity = '0';
            createWord.style.transform = 'translateY(-10px)';

            setTimeout(() => {
                createWord.textContent =
                    createWord.textContent.trim() === 'create'
                        ? 'build'
                        : 'create';

                createWord.style.transform = 'translateY(10px)';

                requestAnimationFrame(() => {
                    createWord.style.opacity = '1';
                    createWord.style.transform = 'translateY(0)';
                });
            }, 400);

        }, 3000);
    }

})();

const theme = document.getElementById('theme');

if (theme) {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
        document.body.classList.add('dark');
    }

    theme.addEventListener('click', () => {
        const isDark = document.body.classList.toggle('dark');

        localStorage.setItem(
            'theme',
            isDark ? 'dark' : 'light'
        );
    });
}

const cursor = document.querySelector('.custom-cursor');

if (cursor) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
        cursor.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
    });

    document.querySelectorAll('a, button').forEach((element) => {
        element.addEventListener('mouseenter', () => {
            document.body.classList.add('cursor-hover');
        });

        element.addEventListener('mouseleave', () => {
            document.body.classList.remove('cursor-hover');
        });
    });
}

const dockLinks = document.querySelectorAll('.dock [data-go]');
const frame = document.querySelector('.frame');

dockLinks.forEach(link => {
    link.addEventListener('click', () => {
        const targetId = link.dataset.go;
        const target = document.getElementById(targetId);

        if (!target || !frame) return;

        frame.classList.add('page-changing');

        setTimeout(() => {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            setTimeout(() => {
                frame.classList.remove('page-changing');
            }, 250);
        }, 120);
    });
});

const loadingScreen = document.getElementById("loadingScreen");

if (loadingScreen) {
    setTimeout(() => {
        loadingScreen.classList.add("hide");

        setTimeout(() => {
            loadingScreen.remove();
        }, 400);
    }, 2500);
}

const frames = document.querySelectorAll(".frame-wrap");

const frameObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            } else {
                entry.target.classList.remove("show");
            }
        });
    },
    {
        rootMargin: "-10% 0px -10% 0px",
        threshold: 0
    }
);

frames.forEach((frame) => {
    frameObserver.observe(frame);
});

