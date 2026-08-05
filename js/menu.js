const titleContainer = document.querySelector('.title-container');
const hamburger = document.querySelector('.hamburger');

hamburger.addEventListener('click', (esemeny) => {
    esemeny.stopPropagation(); 
    titleContainer.classList.toggle('active');
});

document.querySelectorAll('.pages').forEach(link => {
    link.addEventListener('click', () => {
        titleContainer.classList.remove('active');
    });
});

document.getElementById('smooth-vissza').addEventListener('click', function(esemeny) {
    esemeny.preventDefault(); 
    
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });

    titleContainer.classList.remove('active');
});

document.addEventListener('click', function(esemeny) {
    const isOpen = titleContainer.classList.contains('active');
    const clickedOutsideMenu = !titleContainer.contains(esemeny.target);
    const clickedOutsideHamburger = !hamburger.contains(esemeny.target);

    if (isOpen && clickedOutsideMenu && clickedOutsideHamburger) {
        titleContainer.classList.remove('active');
    }
});