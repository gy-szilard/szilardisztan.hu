document.addEventListener("DOMContentLoaded", () => {
    const titleContainer = document.querySelector('.title-container');
    const hamburger = document.querySelector('.hamburger');

    if (hamburger && titleContainer) {
        hamburger.addEventListener('click', (event) => {
            event.stopPropagation();
            titleContainer.classList.toggle('active');
        });
    }

    document.querySelectorAll('.pages').forEach(link => {
        link.addEventListener('click', () => {
            if (titleContainer) {
                titleContainer.classList.remove('active');
            }
        });
    });

    const smoothVissza = document.getElementById('smooth-vissza');
    if (smoothVissza) {
        smoothVissza.addEventListener('click', (event) => {
            if (window.location.pathname.endsWith('/') || window.location.pathname.endsWith('index.html')) {
                event.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
            if (titleContainer) {
                titleContainer.classList.remove('active');
            }
        });
    }

    document.addEventListener('click', (event) => {
        if (!titleContainer || !hamburger) return;

        const isOpen = titleContainer.classList.contains('active');
        const clickedOutsideMenu = !titleContainer.contains(event.target);
        const clickedOutsideHamburger = !hamburger.contains(event.target);

        if (isOpen && clickedOutsideMenu && clickedOutsideHamburger) {
            titleContainer.classList.remove('active');
        }
    });
});