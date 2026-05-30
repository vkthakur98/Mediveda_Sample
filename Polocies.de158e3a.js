// Carousel scroll function
function scrollCarousel(carouselId, direction) {
    const carousel = document.getElementById(carouselId);
    if (!carousel) return;
    const cardWidth = 235; // card width + gap
    carousel.scrollBy({
        left: direction * cardWidth,
        behavior: 'smooth'
    });
}
// Make scrollCarousel globally accessible
window.scrollCarousel = scrollCarousel;
// Initialize carousels with drag support
document.addEventListener('DOMContentLoaded', ()=>{
    const carousels = document.querySelectorAll('[id$="-carousel"]');
    carousels.forEach((carousel)=>{
        let isDown = false;
        let startX;
        let scrollLeft;
        carousel.style.overflowX = 'auto';
        carousel.style.scrollbarWidth = 'none'; // Firefox
        carousel.style.msOverflowStyle = 'none'; // IE
        carousel.addEventListener('mousedown', (e)=>{
            isDown = true;
            startX = e.pageX - carousel.offsetLeft;
            scrollLeft = carousel.scrollLeft;
            carousel.style.cursor = 'grabbing';
        });
        carousel.addEventListener('mouseleave', ()=>{
            isDown = false;
            carousel.style.cursor = 'grab';
        });
        carousel.addEventListener('mouseup', ()=>{
            isDown = false;
            carousel.style.cursor = 'grab';
        });
        carousel.addEventListener('mousemove', (e)=>{
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - carousel.offsetLeft;
            const walk = (x - startX) * 1.5;
            carousel.scrollLeft = scrollLeft - walk;
        });
        // Touch support
        let touchStartX = 0;
        carousel.addEventListener('touchstart', (e)=>{
            touchStartX = e.touches[0].clientX;
        });
        carousel.addEventListener('touchend', (e)=>{
            const diff = touchStartX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 50) carousel.scrollBy({
                left: diff > 0 ? 235 : -235,
                behavior: 'smooth'
            });
        });
    });
    // Smooth entrance animation for stats
    const observer = new IntersectionObserver((entries)=>{
        entries.forEach((entry)=>{
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    document.querySelectorAll('.card-hover, .disease-card').forEach((el)=>{
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease, box-shadow 0.3s ease';
        observer.observe(el);
    });
    // Nav highlight on scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    window.addEventListener('scroll', ()=>{
        // Navbar shadow on scroll
        const nav = document.querySelector('nav');
        if (window.scrollY > 10) nav.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        else nav.style.boxShadow = '0 1px 3px rgba(0,0,0,0.05)';
    });
});

//# sourceMappingURL=Polocies.de158e3a.js.map
