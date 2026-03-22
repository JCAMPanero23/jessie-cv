# Categorized Work Gallery Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the "Additional Work" section into an interactive categorized gallery with deck-card preview effects and modal carousel viewer using Swiper.js.

**Architecture:** Replace static thumbnails with 6 category cards (3×2 grid) featuring CSS deck-card effects. Clicking a card opens a modal with Swiper.js carousel for browsing category images. Uses vanilla JS for modal management and Swiper.js for carousel functionality.

**Tech Stack:** Vanilla JavaScript, Swiper.js 9.4.1, CSS3 (transforms, grid, flexbox), existing portfolio-gallery images

**Spec Reference:** `docs/superpowers/specs/2026-03-22-categorized-work-gallery-design.md`

---

## File Structure

**Files to Create:**
- `js/portfolio-data.js` - Portfolio category data structure (37 images across 6 categories)
- `js/gallery.js` - Gallery modal and Swiper carousel management

**Files to Modify:**
- `index.html:526-563` - Replace "Additional Work" section with category cards, add modal HTML, add Swiper CDN links
- `css/styles.css` - Add category cards styling, deck-card effects, modal styles, responsive grid

**Files to Reference:**
- `docs/superpowers/specs/2026-03-22-categorized-work-gallery-design.md` - Complete spec with image mappings
- `images/portfolio-gallery/` - Source images (already optimized for web)

---

## Task 1: Add Swiper.js CDN and Portfolio Data

**Files:**
- Modify: `index.html:16-26` (head section)
- Create: `js/portfolio-data.js`

- [ ] **Step 1: Add Swiper.js CDN links to index.html**

In `index.html`, add Swiper CSS and JS after the Google Fonts and before closing `</head>`:

```html
    <!-- Swiper CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@9.4.1/swiper-bundle.min.css">

    <!-- Stylesheets -->
    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="css/print.css" media="print">
```

Before closing `</body>` tag (after `<script src="js/main.js"></script>`), add:

```html
    <!-- Swiper JS -->
    <script src="https://cdn.jsdelivr.net/npm/swiper@9.4.1/swiper-bundle.min.js"></script>
    <script src="js/portfolio-data.js"></script>
    <script src="js/gallery.js"></script>
</body>
```

- [ ] **Step 2: Create portfolio data structure**

Create `js/portfolio-data.js`:

```javascript
/**
 * Portfolio Categories Data
 * All images from portfolio-gallery folders
 */

const portfolioCategories = {
  camps: {
    title: 'Camp Designs',
    preview: 'images/portfolio-gallery/camps/Elephant-rock-camp-01.jpg',
    count: 12,
    images: [
      { src: 'images/portfolio-gallery/camps/AbuDhabi_IslandCamp1.jpg', alt: 'Abu Dhabi Island Camp' },
      { src: 'images/portfolio-gallery/camps/Elephant-rock-camp-01.jpg', alt: 'Elephant Rock Camp Scene 1' },
      { src: 'images/portfolio-gallery/camps/Elephant-rock-camp-02.jpg', alt: 'Elephant Rock Camp Scene 2' },
      { src: 'images/portfolio-gallery/camps/kalba-camp-1.jpg', alt: 'Kalba Camp View 1' },
      { src: 'images/portfolio-gallery/camps/kalba-camp-2.jpg', alt: 'Kalba Camp View 2' },
      { src: 'images/portfolio-gallery/camps/PlatinumHeritage-P1camp_01.jpg', alt: 'Platinum Heritage P1 Camp Scene 1' },
      { src: 'images/portfolio-gallery/camps/PlatinumHeritage-P1camp_02.jpg', alt: 'Platinum Heritage P1 Camp Scene 2' },
      { src: 'images/portfolio-gallery/camps/PlatinumHeritage-P2camp_01.jpg', alt: 'Platinum Heritage P2 Camp Scene 1' },
      { src: 'images/portfolio-gallery/camps/PlatinumHeritage-P2camp_02.jpg', alt: 'Platinum Heritage P2 Camp Scene 2' },
      { src: 'images/portfolio-gallery/camps/Sheraan-Dining-experince-01.jpg', alt: 'Sheraan Dining Experience' },
      { src: 'images/portfolio-gallery/camps/wadi-shoka-1.jpg', alt: 'Wadi Shoka Camp View 1' },
      { src: 'images/portfolio-gallery/camps/wadi-shoka-2.jpg', alt: 'Wadi Shoka Camp View 2' }
    ]
  },
  tetheredBalloons: {
    title: 'Tethered Balloon Experiences',
    preview: 'images/portfolio-gallery/balloons-tethered/desert-rock-balloon2.jpg',
    count: 6,
    images: [
      { src: 'images/portfolio-gallery/balloons-tethered/desert-rock-balloon.jpg', alt: 'Desert Rock Balloon Scene 1' },
      { src: 'images/portfolio-gallery/balloons-tethered/desert-rock-balloon2.jpg', alt: 'Desert Rock Balloon Scene 2' },
      { src: 'images/portfolio-gallery/balloons-tethered/dubai-balloon at atlantis1.jpg', alt: 'Dubai Balloon at Atlantis Scene 1' },
      { src: 'images/portfolio-gallery/balloons-tethered/dubai-balloon-at-atlantis2.jpg', alt: 'Dubai Balloon at Atlantis Scene 2' },
      { src: 'images/portfolio-gallery/balloons-tethered/Qiddiya-Speed-park1.jpg', alt: 'Qiddiya Speed Park Balloon' },
      { src: 'images/portfolio-gallery/balloons-tethered/Yas-Marina_LV-Balloon.jpg', alt: 'Yas Marina LV Balloon' }
    ]
  },
  thermalAirships: {
    title: 'Thermal Airship Proposals',
    preview: 'images/portfolio-gallery/balloons-thermal/Hermes-airshipAtDesertRock_scene-2.jpg',
    count: 6,
    images: [
      { src: 'images/portfolio-gallery/balloons-thermal/Hermes-airshipAtDesertRock_scene-1.jpg', alt: 'Hermes Airship Scene 1' },
      { src: 'images/portfolio-gallery/balloons-thermal/Hermes-airshipAtDesertRock_scene-2.jpg', alt: 'Hermes Airship Scene 2' },
      { src: 'images/portfolio-gallery/balloons-thermal/Hermes-airshipAtDesertRock_scene-3.jpg', alt: 'Hermes Airship Scene 3' },
      { src: 'images/portfolio-gallery/balloons-thermal/RedSea-airshipAtDesertRock_scene-1.jpg', alt: 'Red Sea Airship Scene 1' },
      { src: 'images/portfolio-gallery/balloons-thermal/RedSea-airshipAtDesertRock_scene-2.jpg', alt: 'Red Sea Airship Scene 2' },
      { src: 'images/portfolio-gallery/balloons-thermal/RedSea-airshipAtDesertRock_scene-3.jpg', alt: 'Red Sea Airship Scene 3' }
    ]
  },
  events: {
    title: 'Events',
    preview: 'images/portfolio-gallery/events-commercial/Citrix-(2).jpg',
    count: 4,
    images: [
      { src: 'images/portfolio-gallery/events-commercial/Citrix-(2).jpg', alt: 'Citrix Event Design' },
      { src: 'images/portfolio-gallery/events-commercial/Dubai-Balloon-Kiosk.jpg', alt: 'Dubai Balloon Kiosk' },
      { src: 'images/portfolio-gallery/events-commercial/Hero_Kiosk_Mall.jpg', alt: 'Hero Kiosk Mall' },
      { src: 'images/portfolio-gallery/events-commercial/Hot-air-Balloon-at-World-trade.jpg', alt: 'Hot Air Balloon at World Trade Center' }
    ]
  },
  commercials: {
    title: 'Commercials',
    preview: 'images/portfolio-gallery/events-commercial/RK-Trends_jewelry-(1).jpg',
    count: 6,
    images: [
      { src: 'images/portfolio-gallery/events-commercial/RK-Trends_jewelry-(1).jpg', alt: 'RK Trends Jewelry Display Scene 1' },
      { src: 'images/portfolio-gallery/events-commercial/RK-Trends_jewelry-(2).jpg', alt: 'RK Trends Jewelry Display Scene 2' },
      { src: 'images/portfolio-gallery/events-commercial/RK-Trends_jewelry-_AI-enhance.jpg', alt: 'RK Trends Jewelry AI Enhanced' },
      { src: 'images/portfolio-gallery/events-commercial/Jcamp-Bistro_AI-enhance.jpg', alt: 'Jcamp Bistro AI Enhanced' },
      { src: 'images/portfolio-gallery/events-commercial/jcamp-bistro-1.jpg', alt: 'Jcamp Bistro Interior View 1' },
      { src: 'images/portfolio-gallery/events-commercial/jcamp-bistro-2.jpg', alt: 'Jcamp Bistro Interior View 2' }
    ]
  },
  residential: {
    title: 'Residential & Office Interiors',
    preview: 'images/portfolio-gallery/Residential and office/Bedroom01.jpg',
    count: 3,
    images: [
      { src: 'images/portfolio-gallery/Residential and office/Bedroom01.jpg', alt: 'Luxury Bedroom Design' },
      { src: 'images/portfolio-gallery/Residential and office/Royal-majlis.jpg', alt: 'Royal Majlis Interior' },
      { src: 'images/portfolio-gallery/Residential and office/Conference-room.png', alt: 'Conference Room Design' }
    ]
  }
};
```

- [ ] **Step 3: Verify files load in browser**

Open `index.html` in browser and check Console (F12):
- Expected: No errors
- Expected: Swiper loaded (check Network tab for swiper-bundle.min.js - 200 status)
- Expected: `portfolioCategories` object available in console

- [ ] **Step 4: Commit**

```bash
git add index.html js/portfolio-data.js
git commit -m "feat: add Swiper.js CDN and portfolio categories data structure

Add Swiper.js 9.4.1 via CDN for carousel functionality
Create portfolio-data.js with all 37 images across 6 categories"
```

---

## Task 2: Replace Additional Work Section with Category Cards HTML

**Files:**
- Modify: `index.html:526-563`

- [ ] **Step 1: Replace Additional Work section with Work Categories**

In `index.html`, replace the entire `<section class="portfolio-thumbnails">` section (lines 526-563) with:

```html
    <section class="work-categories">
        <div class="container">
            <h2 class="section-title">Work Categories</h2>
            <div class="categories-grid">

                <!-- Card 1: Camp Designs -->
                <article class="category-card" data-category="camps">
                    <div class="card-deck-wrapper">
                        <div class="preview-image">
                            <img src="images/portfolio-gallery/camps/Elephant-rock-camp-01.jpg" alt="Camp Designs Preview - Elephant Rock Camp" loading="lazy">
                        </div>
                    </div>
                    <h3 class="category-title">Camp Designs</h3>
                    <p class="category-count">12 projects</p>
                </article>

                <!-- Card 2: Tethered Balloon Experiences -->
                <article class="category-card" data-category="tetheredBalloons">
                    <div class="card-deck-wrapper">
                        <div class="preview-image">
                            <img src="images/portfolio-gallery/balloons-tethered/desert-rock-balloon2.jpg" alt="Tethered Balloon Experiences Preview - Desert Rock" loading="lazy">
                        </div>
                    </div>
                    <h3 class="category-title">Tethered Balloon Experiences</h3>
                    <p class="category-count">6 projects</p>
                </article>

                <!-- Card 3: Thermal Airship Proposals -->
                <article class="category-card" data-category="thermalAirships">
                    <div class="card-deck-wrapper">
                        <div class="preview-image">
                            <img src="images/portfolio-gallery/balloons-thermal/Hermes-airshipAtDesertRock_scene-2.jpg" alt="Thermal Airship Proposals Preview - Hermes Airship" loading="lazy">
                        </div>
                    </div>
                    <h3 class="category-title">Thermal Airship Proposals</h3>
                    <p class="category-count">6 projects</p>
                </article>

                <!-- Card 4: Events -->
                <article class="category-card" data-category="events">
                    <div class="card-deck-wrapper">
                        <div class="preview-image">
                            <img src="images/portfolio-gallery/events-commercial/Citrix-(2).jpg" alt="Events Preview - Citrix Event" loading="lazy">
                        </div>
                    </div>
                    <h3 class="category-title">Events</h3>
                    <p class="category-count">4 projects</p>
                </article>

                <!-- Card 5: Commercials -->
                <article class="category-card" data-category="commercials">
                    <div class="card-deck-wrapper">
                        <div class="preview-image">
                            <img src="images/portfolio-gallery/events-commercial/RK-Trends_jewelry-(1).jpg" alt="Commercials Preview - RK Trends Jewelry" loading="lazy">
                        </div>
                    </div>
                    <h3 class="category-title">Commercials</h3>
                    <p class="category-count">6 projects</p>
                </article>

                <!-- Card 6: Residential & Office Interiors -->
                <article class="category-card" data-category="residential">
                    <div class="card-deck-wrapper">
                        <div class="preview-image">
                            <img src="images/portfolio-gallery/Residential and office/Bedroom01.jpg" alt="Residential & Office Interiors Preview - Bedroom Design" loading="lazy">
                        </div>
                    </div>
                    <h3 class="category-title">Residential & Office Interiors</h3>
                    <p class="category-count">3 projects</p>
                </article>

            </div>
        </div>
    </section>
```

- [ ] **Step 2: Add modal HTML before closing body tag**

Before `<script src="js/main.js"></script>`, add the modal structure:

```html
    <!-- Gallery Modal -->
    <div class="modal-gallery" id="galleryModal" aria-hidden="true" role="dialog" aria-modal="true">
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h2 class="modal-title" id="modal-title"></h2>
                <button class="modal-close" aria-label="Close gallery">×</button>
            </div>
            <div class="modal-body">
                <div class="swiper gallery-swiper">
                    <div class="swiper-wrapper"></div>
                    <div class="swiper-button-prev"></div>
                    <div class="swiper-button-next"></div>
                    <div class="swiper-pagination"></div>
                </div>
                <div class="swiper gallery-thumbs">
                    <div class="swiper-wrapper"></div>
                </div>
            </div>
        </div>
    </div>

    <script src="js/main.js"></script>
```

- [ ] **Step 3: Verify HTML structure in browser**

Open `index.html` in browser:
- Expected: 6 category cards visible (no styling yet - will be plain HTML)
- Expected: Modal hidden (not visible)
- Expected: No broken image links (all preview images load)

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: replace Additional Work with Work Categories HTML

Replace static thumbnails with 6 category cards
Add modal HTML structure for Swiper carousel
Include all preview images and data attributes"
```

---

## Task 3: Add Category Cards CSS Styling

**Files:**
- Modify: `css/styles.css` (end of file, before print media query if exists)

- [ ] **Step 1: Add Work Categories section styles**

At the end of `css/styles.css` (before any `@media print` rules), add:

```css
/* ==========================================
   WORK CATEGORIES SECTION
   ========================================== */

.work-categories {
    padding: 80px 0;
    background-color: #f8f9fa;
}

.categories-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 40px;
    margin-top: 40px;
}

.category-card {
    background: white;
    border-radius: 12px;
    padding: 25px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
}

.category-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.category-card:focus {
    outline: 2px solid #D4A574;
    outline-offset: 4px;
}

.category-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin-top: 20px;
    margin-bottom: 8px;
    text-align: center;
    color: #333;
}

.category-count {
    font-size: 0.9rem;
    color: #666;
    text-align: center;
    margin: 0;
}
```

- [ ] **Step 2: Add deck-card effect CSS**

Add deck-card effect styling immediately after previous block:

```css
/* Deck Card Effect */
.card-deck-wrapper {
    position: relative;
    width: 100%;
    padding-bottom: 75%; /* 4:3 aspect ratio */
    margin-bottom: 15px;
}

.card-deck-wrapper::before,
.card-deck-wrapper::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 8px;
    background: rgba(208, 208, 208, 0.6);
    z-index: 0;
}

.card-deck-wrapper::before {
    top: 12px;
    left: 12px;
    transform: rotate(2deg);
}

.card-deck-wrapper::after {
    top: 6px;
    left: 6px;
    transform: rotate(1deg);
    background: rgba(224, 224, 224, 0.7);
}

.preview-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.preview-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.category-card:hover .preview-image img {
    transform: scale(1.05);
}
```

- [ ] **Step 3: Add responsive grid breakpoints**

Add responsive styles after deck-card effect:

```css
/* Responsive Grid */
@media (max-width: 1023px) {
    .categories-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 30px;
    }
}

@media (max-width: 767px) {
    .work-categories {
        padding: 60px 0;
    }

    .categories-grid {
        grid-template-columns: 1fr;
        gap: 25px;
    }

    .category-card {
        padding: 20px;
    }

    .category-title {
        font-size: 1.1rem;
    }
}
```

- [ ] **Step 4: Verify styling in browser**

Open `index.html` in browser:
- Expected: 6 cards in 3×2 grid with deck-card effect
- Expected: Hover effects work (card lifts, image zooms slightly)
- Expected: Stacked layers visible behind preview image
- Expected: Responsive: resize to tablet width (<1024px) shows 2 columns
- Expected: Responsive: resize to mobile width (<768px) shows 1 column

- [ ] **Step 5: Commit**

```bash
git add css/styles.css
git commit -m "feat: add category cards CSS with deck-card effects

Add work-categories section styling with 3x2 grid
Implement deck-card effect using CSS pseudo-elements
Add hover effects and responsive breakpoints (3/2/1 columns)"
```

---

## Task 4: Add Modal and Swiper Carousel CSS

**Files:**
- Modify: `css/styles.css` (after Work Categories section)

- [ ] **Step 1: Add modal base styles**

Add to `css/styles.css` after responsive grid styles:

```css
/* ==========================================
   GALLERY MODAL
   ========================================== */

.modal-gallery {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9999;
    display: none;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.modal-gallery.active {
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-gallery.visible {
    opacity: 1;
}

.modal-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.85);
    cursor: pointer;
}

.modal-content {
    position: relative;
    width: 90%;
    max-width: 1200px;
    max-height: 90vh;
    background: #1a1a1a;
    border-radius: 12px;
    overflow: hidden;
    z-index: 10000;
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 30px;
    background: rgba(0, 0, 0, 0.5);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.modal-title {
    color: white;
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0;
}

.modal-close {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    color: white;
    font-size: 28px;
    line-height: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.3s ease;
}

.modal-close:hover {
    background: rgba(255, 255, 255, 0.3);
}

.modal-close:focus {
    outline: 2px solid white;
    outline-offset: 2px;
}

.modal-body {
    padding: 30px;
}
```

- [ ] **Step 2: Add Swiper carousel styles**

Add Swiper-specific styles after modal base styles:

```css
/* Swiper Main Carousel */
.gallery-swiper {
    margin-bottom: 20px;
}

.gallery-swiper .swiper-slide {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #000;
}

.gallery-swiper .swiper-slide img {
    max-width: 100%;
    max-height: 60vh;
    object-fit: contain;
}

.gallery-swiper .swiper-button-prev,
.gallery-swiper .swiper-button-next {
    color: white;
    background: rgba(255, 255, 255, 0.2);
    width: 50px;
    height: 50px;
    border-radius: 50%;
}

.gallery-swiper .swiper-button-prev:hover,
.gallery-swiper .swiper-button-next:hover {
    background: rgba(255, 255, 255, 0.3);
}

.gallery-swiper .swiper-button-prev::after,
.gallery-swiper .swiper-button-next::after {
    font-size: 20px;
}

.gallery-swiper .swiper-pagination {
    bottom: 10px;
}

.gallery-swiper .swiper-pagination-bullet {
    background: white;
    opacity: 0.5;
}

.gallery-swiper .swiper-pagination-bullet-active {
    opacity: 1;
    background: #D4A574;
}

/* Swiper Thumbnail Strip */
.gallery-thumbs {
    height: 80px;
    box-sizing: border-box;
    padding: 0;
}

.gallery-thumbs .swiper-slide {
    width: 100px;
    height: 80px;
    opacity: 0.4;
    cursor: pointer;
    border-radius: 6px;
    overflow: hidden;
    border: 2px solid transparent;
    transition: opacity 0.3s ease, border-color 0.3s ease;
}

.gallery-thumbs .swiper-slide:hover {
    opacity: 0.7;
}

.gallery-thumbs .swiper-slide-thumb-active {
    opacity: 1;
    border-color: #D4A574;
}

.gallery-thumbs .swiper-slide img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
```

- [ ] **Step 3: Add responsive modal styles**

Add responsive adjustments after Swiper styles:

```css
/* Modal Responsive */
@media (max-width: 767px) {
    .modal-content {
        width: 95%;
        max-height: 95vh;
    }

    .modal-header {
        padding: 15px 20px;
    }

    .modal-title {
        font-size: 1.2rem;
    }

    .modal-close {
        width: 35px;
        height: 35px;
        font-size: 24px;
    }

    .modal-body {
        padding: 20px 15px;
    }

    .gallery-swiper .swiper-slide img {
        max-height: 50vh;
    }

    .gallery-swiper .swiper-button-prev,
    .gallery-swiper .swiper-button-next {
        width: 40px;
        height: 40px;
    }

    .gallery-thumbs {
        height: 60px;
    }

    .gallery-thumbs .swiper-slide {
        width: 80px;
        height: 60px;
    }
}
```

- [ ] **Step 4: Add print hide rules**

Add print styles to hide modal and category section in print:

```css
/* Hide in Print */
@media print {
    .work-categories {
        display: none;
    }

    .modal-gallery {
        display: none !important;
    }
}
```

- [ ] **Step 5: Verify modal styling**

Open `index.html` in browser and manually add `active` and `visible` classes to modal via DevTools:
```javascript
document.getElementById('galleryModal').classList.add('active', 'visible');
```

- Expected: Modal appears with dark overlay
- Expected: Modal content centered with header visible
- Expected: Close button styled correctly
- Expected: Remove classes to hide modal again

- [ ] **Step 6: Commit**

```bash
git add css/styles.css
git commit -m "feat: add modal and Swiper carousel CSS

Add gallery modal base styles with dark overlay
Implement Swiper carousel and thumbnail strip styling
Add responsive modal styles for mobile devices
Hide modal and categories in print view"
```

---

## Task 5: Implement Gallery Modal JavaScript

**Files:**
- Create: `js/gallery.js`

- [ ] **Step 1: Create gallery manager module**

Create `js/gallery.js`:

```javascript
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
```

- [ ] **Step 2: Test modal opening**

Open `index.html` in browser:
1. Click any category card
- Expected: Modal opens with fade-in animation
- Expected: Modal title shows category name
- Expected: Body scroll locked
- Expected: Swiper carousel initialized with images
- Expected: Thumbnail strip shows at bottom

2. Click close button (×)
- Expected: Modal closes with fade-out
- Expected: Body scroll restored
- Expected: Focus returns to clicked card

3. Click category card, then click outside modal (on overlay)
- Expected: Modal closes

4. Click category card, press ESC key
- Expected: Modal closes

- [ ] **Step 3: Test keyboard navigation**

1. Tab to a category card, press Enter
- Expected: Modal opens

2. Inside modal, press Arrow keys
- Expected: Navigate between images

3. Press ESC
- Expected: Modal closes, focus returns to card

- [ ] **Step 4: Test all categories**

Click each of the 6 category cards:
- Expected: Camp Designs shows 12 images
- Expected: Tethered Balloons shows 6 images
- Expected: Thermal Airships shows 6 images
- Expected: Events shows 4 images
- Expected: Commercials shows 6 images
- Expected: Residential shows 3 images

- [ ] **Step 5: Commit**

```bash
git add js/gallery.js
git commit -m "feat: implement gallery modal with Swiper carousel

Add GalleryManager module for modal and carousel management
Implement category card click handlers
Add Swiper initialization with thumbnails and navigation
Implement keyboard support (ESC, arrows, Enter)
Add focus management and body scroll lock"
```

---

## Task 6: Test Responsive Behavior and Cross-Browser

**Files:**
- No file changes (testing only)

- [ ] **Step 1: Test responsive grid**

Resize browser window:

**Desktop (>1024px):**
- Expected: 3 columns grid
- Expected: Cards well-spaced with 40px gap

**Tablet (768px - 1023px):**
- Expected: 2 columns grid
- Expected: Cards adjust spacing to 30px gap

**Mobile (<768px):**
- Expected: 1 column grid
- Expected: Cards stack vertically with 25px gap

- [ ] **Step 2: Test responsive modal**

Open modal on different screen sizes:

**Desktop:**
- Expected: Modal 90% width, max 1200px
- Expected: Large images (max-height 60vh)
- Expected: Thumbnail strip 80px tall

**Mobile (<768px):**
- Expected: Modal 95% width
- Expected: Smaller images (max-height 50vh)
- Expected: Thumbnail strip 60px tall
- Expected: Smaller navigation arrows (40px)

- [ ] **Step 3: Test touch gestures on mobile device or DevTools**

Open DevTools mobile emulation (iPhone/Android):
1. Open modal
2. Swipe left/right on main image
- Expected: Navigate between images smoothly

3. Tap thumbnails
- Expected: Jump to that image

- [ ] **Step 4: Test in different browsers**

Test in available browsers:
- Chrome: All features work
- Firefox: All features work
- Edge: All features work
- Safari (if available): All features work
- Expected: Swiper loads correctly in all
- Expected: Modal animations work
- Expected: Deck-card effects render correctly

- [ ] **Step 5: Test print view**

1. Open browser print preview (Ctrl+P or Cmd+P)
- Expected: Work Categories section hidden
- Expected: Modal hidden
- Expected: Existing portfolio-gallery-print section shows
- Expected: No layout breaks

- [ ] **Step 6: Document test results**

Create a simple test log if needed:
```
✓ Desktop grid: 3 columns
✓ Tablet grid: 2 columns
✓ Mobile grid: 1 column
✓ Modal responsive sizing
✓ Touch swipe gestures
✓ Keyboard navigation
✓ All 6 categories load correctly
✓ Image counts correct (12,6,6,4,6,3)
✓ Print view hides categories
✓ Cross-browser compatible
```

- [ ] **Step 7: Commit if any fixes were needed**

If no code changes were needed:
```bash
# No commit needed, testing passed
```

If fixes were made during testing:
```bash
git add [files]
git commit -m "fix: responsive/browser issues found during testing

[describe what was fixed]"
```

---

## Task 7: Final Integration and Documentation

**Files:**
- Modify: `README.md` or create `docs/gallery-feature.md` (if README exists)

- [ ] **Step 1: Test full user journey**

Complete end-to-end test:
1. Load page in browser
2. Scroll to Work Categories section
3. Observe 6 cards with deck-card effects
4. Hover over cards - see lift effect
5. Click "Camp Designs"
6. Verify modal opens with 12 images
7. Navigate through images using arrows
8. Click thumbnails to jump
9. Close modal
10. Repeat for all 6 categories
11. Test on mobile viewport
12. Test print preview

All steps should work smoothly.

- [ ] **Step 2: Verify performance**

Check browser DevTools Performance tab:
- Expected: No console errors
- Expected: Images lazy load as needed
- Expected: Smooth animations (60fps)
- Expected: Modal opens/closes without lag

- [ ] **Step 3: Verify accessibility**

Use browser accessibility tools (Lighthouse, axe DevTools):
- Expected: All images have alt text
- Expected: Modal has proper ARIA attributes
- Expected: Keyboard navigation works
- Expected: Focus management works correctly
- Expected: Color contrast sufficient

- [ ] **Step 4: Add documentation comment**

If creating new docs file `docs/gallery-feature.md`:

```markdown
# Work Categories Gallery Feature

## Overview
Interactive categorized portfolio gallery with modal carousel viewer.

## Components
- **Category Cards**: 6 categories in 3×2 responsive grid with deck-card effects
- **Modal Gallery**: Full-screen modal with Swiper.js carousel
- **Data**: Portfolio images organized in `js/portfolio-data.js`

## Files
- `index.html`: Category cards section + modal HTML
- `css/styles.css`: Category cards, deck effects, modal styles
- `js/portfolio-data.js`: Image data (37 images, 6 categories)
- `js/gallery.js`: Modal and Swiper management
- External: Swiper.js 9.4.1 via CDN

## Categories
1. Camp Designs (12 images)
2. Tethered Balloon Experiences (6 images)
3. Thermal Airship Proposals (6 images)
4. Events (4 images)
5. Commercials (6 images)
6. Residential & Office Interiors (3 images)

## Usage
Click any category card to open modal carousel.
Navigate with arrows, thumbnails, or keyboard.
Close with X, ESC, or click outside.

## Maintenance
To update images: Edit `js/portfolio-data.js`
To update styles: Edit `.work-categories` and `.modal-gallery` sections in `css/styles.css`
```

- [ ] **Step 5: Final commit**

```bash
git add docs/gallery-feature.md  # if created
git commit -m "docs: add gallery feature documentation

Document Work Categories gallery feature
Include component overview and maintenance guide"
```

- [ ] **Step 6: Create summary commit (optional)**

If you want a summary of all changes:

```bash
git log --oneline -7
```

Expected recent commits:
- docs: add gallery feature documentation
- feat: implement gallery modal with Swiper carousel
- feat: add modal and Swiper carousel CSS
- feat: add category cards CSS with deck-card effects
- feat: replace Additional Work with Work Categories HTML
- feat: add Swiper.js CDN and portfolio categories data structure

---

## Task 8: Cleanup and Final Verification

**Files:**
- All project files (verification only)

- [ ] **Step 1: Verify all images load**

Open browser Network tab, refresh page:
- Expected: All 6 preview images load (200 status)
- Expected: Swiper.js loads from CDN (200 status)
- Expected: No 404 errors
- Expected: All portfolio-gallery images accessible

- [ ] **Step 2: Verify git status clean**

```bash
git status
```

Expected:
```
On branch main
nothing to commit, working tree clean
```

Or only untracked files that shouldn't be committed (.superpowers/, Debug/, etc.)

- [ ] **Step 3: Verify print PDF still works**

1. Open print preview (Ctrl+P / Cmd+P)
2. Verify:
- Expected: Work Categories section hidden
- Expected: Existing portfolio-gallery-print section visible
- Expected: Featured projects intact
- Expected: Layout not broken
- Expected: Can save/print to PDF successfully

- [ ] **Step 4: Run accessibility check**

Use browser Lighthouse or similar:
1. Run audit
2. Check scores:
- Expected: Accessibility score remains high (90+)
- Expected: No new a11y issues introduced
- Expected: Performance acceptable

- [ ] **Step 5: Final feature verification checklist**

Complete checklist:

```
✅ Deck-card effect displays correctly on all cards
✅ All 6 categories clickable
✅ Modal opens with correct category title
✅ Swiper carousel initialized correctly
✅ Image counts accurate (12,6,6,4,6,3)
✅ Thumbnail navigation works
✅ Arrow navigation works
✅ Keyboard navigation (ESC, arrows, Enter)
✅ Focus management and restoration
✅ Body scroll lock when modal open
✅ Close via X, ESC, overlay click
✅ Responsive: 3/2/1 column layouts
✅ Mobile touch/swipe gestures
✅ Print view hides categories correctly
✅ No console errors
✅ Cross-browser compatible
✅ Accessibility features working
```

All items should be checked.

- [ ] **Step 6: Create final implementation summary**

Summary of what was built:

```
IMPLEMENTATION COMPLETE

Feature: Categorized Work Gallery with Modal Viewer
Spec: docs/superpowers/specs/2026-03-22-categorized-work-gallery-design.md

Components Delivered:
✅ 6 category cards with deck-card preview effects
✅ 3×2 responsive grid (3/2/1 columns by breakpoint)
✅ Modal gallery with Swiper.js carousel
✅ 37 portfolio images across 6 categories
✅ Thumbnail navigation strip
✅ Full keyboard and touch support
✅ ARIA accessibility attributes
✅ Print compatibility maintained

Files Modified:
- index.html (HTML structure)
- css/styles.css (styles added)
- js/portfolio-data.js (created)
- js/gallery.js (created)

External Dependencies:
- Swiper.js 9.4.1 (CDN)

Testing Complete:
✅ Responsive layouts
✅ Cross-browser compatibility
✅ Accessibility (WCAG)
✅ Print PDF output
✅ Performance verified
```

Feature is ready for production use.

---

## Implementation Complete

All tasks completed. The categorized work gallery with modal carousel viewer is fully functional, tested, and documented.

**Next Steps:**
- Review implementation against spec
- Deploy to production if ready
- Monitor user feedback
- Consider future enhancements (image captions, fullscreen mode, etc.)
