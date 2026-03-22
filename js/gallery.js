/**
 * Portfolio Gallery Modal with Swiper Carousel
 */

const GalleryManager = (function() {
    let swiperMain = null;
    let swiperThumbs = null;
    let currentCategory = null;
    let lastFocusedElement = null;

    const modal = document.getElementById('galleryModal');
    const modalOverlay = modal?.querySelector('.modal-overlay');
    const modalClose = modal?.querySelector('.modal-close');
    const modalTitle = document.getElementById('modal-title');
    const swiperMainWrapper = modal?.querySelector('.gallery-swiper .swiper-wrapper');
    const swiperThumbsWrapper = modal?.querySelector('.gallery-thumbs .swiper-wrapper');

    /**
     * Initialize gallery - set up event listeners
     */
    function init() {
        if (!modal) {
            console.error('Gallery modal not found');
            return;
        }

        // Category card click handlers
        const categoryCards = document.querySelectorAll('.category-card');
        categoryCards.forEach(card => {
            card.addEventListener('click', handleCardClick);
            card.setAttribute('tabindex', '0');
            card.addEventListener('keydown', handleCardKeydown);
        });

        // Modal close handlers
        modalClose.addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', closeModal);
        document.addEventListener('keydown', handleEscapeKey);

        console.log('Gallery Manager initialized');
    }

    /**
     * Handle category card click
     */
    function handleCardClick(e) {
        const categoryId = e.currentTarget.getAttribute('data-category');
        openModal(categoryId);
    }

    /**
     * Handle keyboard on category cards (Enter/Space to open)
     */
    function handleCardKeydown(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const categoryId = e.currentTarget.getAttribute('data-category');
            openModal(categoryId);
        }
    }

    /**
     * Handle ESC key to close modal
     */
    function handleEscapeKey(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    }

    /**
     * Open modal and initialize Swiper with category images
     */
    function openModal(categoryId) {
        const category = portfolioCategories[categoryId];
        if (!category) {
            console.error('Category not found:', categoryId);
            return;
        }

        currentCategory = categoryId;
        lastFocusedElement = document.activeElement;

        // Set modal title
        modalTitle.textContent = category.title;

        // Build Swiper slides
        buildSwiperSlides(category.images);

        // Show modal
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');

        // Lock body scroll
        document.body.style.overflow = 'hidden';

        // Trigger reflow for CSS transition
        modal.offsetHeight;

        // Add visible class for fade-in
        modal.classList.add('visible');

        // Initialize Swiper
        initSwiper();

        // Focus on close button for accessibility
        setTimeout(() => modalClose.focus(), 100);
    }

    /**
     * Close modal and destroy Swiper
     */
    function closeModal() {
        // Fade out
        modal.classList.remove('visible');

        // Wait for transition, then hide
        setTimeout(() => {
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');

            // Destroy Swiper instances
            if (swiperMain) {
                swiperMain.destroy(true, true);
                swiperMain = null;
            }
            if (swiperThumbs) {
                swiperThumbs.destroy(true, true);
                swiperThumbs = null;
            }

            // Clear slides
            swiperMainWrapper.innerHTML = '';
            swiperThumbsWrapper.innerHTML = '';

            // Restore body scroll
            document.body.style.overflow = '';

            // Restore focus
            if (lastFocusedElement) {
                lastFocusedElement.focus();
                lastFocusedElement = null;
            }

            currentCategory = null;
        }, 300);
    }

    /**
     * Build Swiper slide HTML from images array
     */
    function buildSwiperSlides(images) {
        // Main slides
        const mainSlides = images.map(img => `
            <div class="swiper-slide">
                <img src="${img.src}" alt="${img.alt}" loading="lazy">
            </div>
        `).join('');
        swiperMainWrapper.innerHTML = mainSlides;

        // Thumbnail slides
        const thumbSlides = images.map(img => `
            <div class="swiper-slide">
                <img src="${img.src}" alt="${img.alt}" loading="lazy">
            </div>
        `).join('');
        swiperThumbsWrapper.innerHTML = thumbSlides;
    }

    /**
     * Initialize Swiper carousel
     */
    function initSwiper() {
        // Initialize thumbnail swiper first
        swiperThumbs = new Swiper('.gallery-thumbs', {
            spaceBetween: 10,
            slidesPerView: 'auto',
            freeMode: true,
            watchSlidesProgress: true,
        });

        // Initialize main swiper
        swiperMain = new Swiper('.gallery-swiper', {
            spaceBetween: 10,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                type: 'fraction',
            },
            thumbs: {
                swiper: swiperThumbs,
            },
            keyboard: {
                enabled: true,
            },
            a11y: {
                enabled: true,
                prevSlideMessage: 'Previous image',
                nextSlideMessage: 'Next image',
            },
            lazy: true,
        });
    }

    // Public API
    return {
        init: init
    };
})();

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', GalleryManager.init);
} else {
    GalleryManager.init();
}
