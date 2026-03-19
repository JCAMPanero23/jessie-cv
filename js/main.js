/**
 * 3D Visualizer CV - Main JavaScript
 * Jessie Campanero
 */

// Lazy Loading for Images
document.addEventListener('DOMContentLoaded', function() {

    // Lazy load images with loading="lazy" attribute (modern browsers handle this natively)
    // This script provides fallback for older browsers

    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports native lazy loading
        console.log('Native lazy loading supported');
    } else {
        // Fallback: Intersection Observer
        const images = document.querySelectorAll('img[loading="lazy"]');

        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // Smooth scroll for any internal links (if added later)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Print button already uses onclick="window.print()" in HTML
    // No additional JS needed for print functionality

    console.log('CV JavaScript initialized');
});
