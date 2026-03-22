# Categorized Work Gallery Feature

**Date:** 2026-03-23
**Version:** 1.0
**Status:** Production Ready

## Overview

The Categorized Work Gallery transforms the portfolio presentation from a simple thumbnail grid into an organized, interactive gallery system with category-based navigation and full-screen modal carousel viewing.

## Feature Summary

**What it does:**
- Organizes portfolio work into 6 distinct categories
- Displays category cards with deck-card preview effect (stacked layers)
- Opens modal carousel viewer when category is clicked
- Provides full navigation (arrows, thumbnails, keyboard, swipe)
- Maintains print compatibility (hidden in PDF output)

**User Experience:**
1. User sees 6 category cards in a responsive grid (3×2 on desktop)
2. Each card shows preview image with deck-card stacking effect
3. User clicks a category to open modal carousel
4. User browses all images in that category via arrows/thumbnails/swipe
5. User closes modal via X, ESC, or overlay click
6. Focus returns to clicked card

## Categories

**Total:** 6 categories, 37 images

| Category | Images | Preview Image | Description |
|----------|--------|---------------|-------------|
| **Camp Designs** | 12 | Elephant Rock Camp | Desert camp installations and experiences |
| **Tethered Balloon Experiences** | 6 | Desert Rock Scene 2 | Tethered balloon installations at venues |
| **Thermal Airship Proposals** | 6 | Hermes Airship Scene 2 | Luxury airship visualization concepts |
| **Events** | 4 | Citrix Event | Event installations and exhibits |
| **Commercials** | 6 | RK Trends Jewelry | Commercial visualization work |
| **Residential & Office Interiors** | 3 | Bedroom Design | Interior design visualizations |

## Technical Architecture

### Technology Stack

**Frontend:**
- Vanilla JavaScript (ES6+ modules)
- Swiper.js 9.4.1 (carousel library via CDN)
- CSS Grid for layout
- CSS pseudo-elements for deck-card effect

**Libraries:**
- Swiper.js - MIT License
- CDN: https://cdn.jsdelivr.net/npm/swiper@9.4.1/

### File Structure

```
D:\Jcamp_CV\
├── index.html                  # Category cards + modal HTML
├── css/
│   └── styles.css              # Lines 991-1352 (gallery + modal CSS)
├── js/
│   ├── portfolio-data.js       # Portfolio data structure (6 categories)
│   └── gallery.js              # GalleryManager module
├── images/
│   └── portfolio-gallery/      # Web-optimized images
│       ├── camps/              # 12 camp images
│       ├── balloons-tethered/  # 6 tethered balloon images
│       ├── balloons-thermal/   # 6 thermal airship images
│       ├── events-commercial/  # 10 images (split: 4 events, 6 commercials)
│       └── Residential and office/  # 3 interior images
└── docs/
    ├── gallery-feature.md      # This file
    └── gallery-testing-checklist.md  # Testing guide
```

### Code Organization

**HTML (index.html):**
- Lines 529-602: Category cards section
- Lines 808-828: Modal HTML structure
- Line 24: Swiper CSS CDN
- Lines 833-835: Scripts (Swiper JS, portfolio-data.js, gallery.js)

**CSS (css/styles.css):**
- Lines 991-1122: Work categories section + deck-card effect
- Lines 1124-1352: Modal + Swiper carousel styles
- Lines 1098-1121: Responsive media queries (3/2/1 columns)
- Lines 1298-1341: Modal responsive (mobile adjustments)
- Lines 1344-1352: Print CSS (hide gallery sections)

**JavaScript:**
- `js/portfolio-data.js` (86 lines): Data structure with all categories and images
- `js/gallery.js` (219 lines): GalleryManager module with modal/carousel logic

## Key Features

### 1. Deck-Card Preview Effect

**Implementation:** CSS pseudo-elements (::before, ::after)

```css
.card-deck-wrapper::before {
    /* Back layer - rotated 2deg */
    top: 12px;
    left: 12px;
    transform: rotate(2deg);
    background: rgba(208, 208, 208, 0.6);
}

.card-deck-wrapper::after {
    /* Middle layer - rotated 1deg */
    top: 6px;
    left: 6px;
    transform: rotate(1deg);
    background: rgba(224, 224, 224, 0.7);
}

.preview-image {
    /* Top layer - main image */
    z-index: 1;
}
```

**Result:** Visual depth perception with 3 stacked layers

### 2. Responsive Grid Layout

**Breakpoints:**
- Desktop (>1024px): 3 columns, 40px gap
- Tablet (768-1023px): 2 columns, 30px gap
- Mobile (<768px): 1 column, 25px gap

**Implementation:**
```css
.categories-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 40px;
}

@media (max-width: 1023px) {
    .categories-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 30px;
    }
}

@media (max-width: 767px) {
    .categories-grid {
        grid-template-columns: 1fr;
        gap: 25px;
    }
}
```

### 3. Modal Carousel Gallery

**Features:**
- Dark overlay (rgba(0,0,0,0.85))
- Category title header with close button
- Main image carousel with left/right arrows
- Thumbnail strip navigation (bottom)
- Position indicator ("3 / 12")
- Keyboard support (arrows, ESC)
- Touch/swipe support
- Lazy loading
- Focus management
- Body scroll lock

**Swiper Configuration:**
```javascript
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
```

### 4. Accessibility

**Keyboard Navigation:**
- Tab: Navigate through category cards
- Enter/Space: Open modal from card
- Arrow keys: Navigate carousel images
- ESC: Close modal
- Focus trap: Tab stays within modal when open
- Focus restoration: Returns to clicked card on close

**ARIA Attributes:**
```html
<div role="dialog" aria-modal="true" aria-hidden="true">
<button aria-label="Close gallery">×</button>
<button aria-label="Previous image">←</button>
<button aria-label="Next image">→</button>
```

**Screen Reader Support:**
- Descriptive alt text for all images
- Semantic HTML structure (article, h3, etc.)
- Live region announcements (carousel position)
- Hidden state management (aria-hidden)

**Visual Accessibility:**
- Focus indicators for keyboard users (2px solid outline)
- Sufficient color contrast
- Large touch targets (44×44px minimum)

### 5. Performance Optimizations

**Image Loading:**
- Web-optimized images from portfolio-gallery folder
- Lazy loading (loading="lazy" attribute)
- Swiper lazy loading (load on demand in carousel)
- Responsive image sizing

**JavaScript:**
- Event delegation (single listener for all cards)
- IIFE module pattern (no global pollution)
- Destroy Swiper instance on modal close
- Minimal DOM manipulation

**CSS:**
- Hardware-accelerated transforms
- Efficient animations (transform, opacity)
- No layout thrashing

### 6. Print Compatibility

**Requirement:** No changes to existing print PDF functionality

**Implementation:**
```css
@media print {
    .work-categories {
        display: none;
    }

    .modal-gallery {
        display: none !important;
    }
}
```

**Result:**
- Category section hidden in print
- Modal hidden in print
- Existing portfolio-gallery-print section unchanged
- PDF shows full galleries with all images

## Data Structure

**Portfolio Data (js/portfolio-data.js):**
```javascript
const portfolioCategories = {
    camps: {
        title: 'Camp Designs',
        preview: 'images/portfolio-gallery/camps/Elephant-rock-camp-01.jpg',
        count: 12,
        images: [
            {
                src: 'images/portfolio-gallery/camps/Elephant-rock-camp-01.jpg',
                alt: 'Elephant Rock Camp Scene 1'
            },
            // ... 11 more images
        ]
    },
    tetheredBalloons: { /* 6 images */ },
    thermalAirships: { /* 6 images */ },
    events: { /* 4 images */ },
    commercials: { /* 6 images */ },
    residential: { /* 3 images */ }
};
```

**Alt Text Pattern:** `[Project Name] [Descriptor]`
- Example: "Elephant Rock Camp Scene 1"
- Example: "Hermes Airship Scene 2"
- Example: "RK Trends Jewelry Display"

## Browser Support

**Target Browsers:**
- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Mobile browsers (iOS Safari, Chrome Android)

**Tested:** [To be updated after manual testing]

## Usage

**For Users:**
1. Scroll to "Work Categories" section on main page
2. Click any category card to open modal
3. Browse images using arrows, thumbnails, or swipe
4. Close modal via X button, ESC key, or clicking outside

**For Developers:**

**Add a new category:**
1. Add category data to `js/portfolio-data.js`
2. Add category card to `index.html` (section .work-categories)
3. Update category count in this documentation

**Add images to existing category:**
1. Place images in appropriate `images/portfolio-gallery/` subfolder
2. Add image objects to category array in `js/portfolio-data.js`
3. Update count in HTML and documentation

**Change preview image:**
1. Update `preview` property in `js/portfolio-data.js`
2. Update `<img src="">` in corresponding card in `index.html`

## Maintenance

**Dependencies:**
- Swiper.js 9.4.1 via CDN
- No local dependencies
- No build process required

**Updates:**
- To update Swiper version, change CDN URLs in index.html (lines 24, 833)
- Test thoroughly after Swiper updates (breaking changes possible)

**Known Issues:**
- None at this time

## Testing

**See:** `docs/gallery-testing-checklist.md` for comprehensive testing guide

**Quick Test:**
1. Open index.html in browser
2. Click each category card
3. Verify modal opens with correct images
4. Test arrows, thumbnails, keyboard navigation
5. Test on mobile device (touch/swipe)
6. Print to PDF and verify gallery hidden

## Commits

**Feature Implementation:**
- 83f8a9e: Add Swiper.js CDN and portfolio data structure
- 2e4d3c8: Add category cards HTML section
- d7b1563: Add category cards CSS with deck-card effect
- 6ac92f4: Add modal and Swiper carousel CSS
- 547b424: Implement gallery modal JavaScript
- 40edc4c: Add comprehensive testing checklist

**Total:** 6 commits, 5 implementation + 1 documentation

## Future Enhancements

**Not in scope for v1.0, but possible additions:**

1. **Image Captions:** Add descriptive text overlay on carousel images
2. **Fullscreen Mode:** Dedicated fullscreen view for images
3. **Image Download:** Allow downloading individual images
4. **Filtering:** Filter categories by type/technology
5. **Search:** Search across all portfolio images
6. **Sharing:** Share individual images or categories via URL
7. **Animation:** Enhanced card entrance/hover animations
8. **Statistics:** Show view counts or popularity metrics
9. **Lightbox:** Alternative to carousel (grid of images)
10. **Video Support:** Support for video portfolio items

## Credits

**Design & Specification:** Jessie Campanero + Claude Sonnet 4.5
**Implementation:** Claude Sonnet 4.5 via Subagent-Driven Development
**Date:** March 22-23, 2026

## License

Part of Jessie Campanero's portfolio website. All rights reserved.

Swiper.js: MIT License - https://github.com/nolimits4web/swiper

---

*Last updated: 2026-03-23*
