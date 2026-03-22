# Categorized Work Gallery with Modal Viewer

**Date:** 2026-03-22
**Status:** Approved
**Author:** Design session with Jessie Campanero

## Overview

Transform the "Additional Work" section on the main CV page into an interactive categorized gallery with deck-card preview effects and modal carousel viewer. This creates a more organized, professional presentation of portfolio work while maintaining print compatibility.

## Goals

- Replace static thumbnail grid with organized category-based navigation
- Showcase work variety through 6 distinct categories
- Enable detailed viewing via modal carousel gallery
- Maintain existing print PDF functionality (no changes to print.css)
- Use web-optimized images from portfolio-gallery folder

## Design Decisions

### Layout & Structure

**Category Grid:** 3×2 layout (6 categories total)

**Top Row:**
1. Camp Designs
2. Tethered Balloon Experiences
3. Thermal Airship Proposals

**Bottom Row:**
4. Events
5. Commercials
6. Residential & Office Interiors

**Card Design:**
- Deck-card effect: Preview image on top with 2 stacked semi-transparent layers behind
- Stacked layers rotated slightly (1deg, 2deg) for depth perception
- Category title and project count below image
- Clean, professional styling consistent with existing CV design

### Selected Preview Images

Using web-optimized images from `images/portfolio-gallery/`:

1. **Camp Designs** → Elephant Rock Camp (`camps/Elephant-rock-camp-01.jpg`)
2. **Tethered Balloon Experiences** → Desert Rock Scene 2 (`balloons-tethered/desert-rock-balloon2.jpg`)
3. **Thermal Airship Proposals** → Hermes Airship Scene 2 (`balloons-thermal/Hermes-airshipAtDesertRock_scene-2.jpg`)
4. **Events** → Citrix (2) (`events-commercial/Citrix-(2).jpg`)
5. **Commercials** → RK Trends (`events-commercial/RK-Trends_jewelry-(1).jpg` or similar)
6. **Residential & Office Interiors** → Bedroom (`Residential and office/Bedroom01.jpg`)

### Modal Gallery Design

**Chosen Approach:** Carousel/Slideshow with Swiper.js

**Modal Features:**
- Dark overlay background (rgba(0,0,0,0.85))
- Category title header with close button (X)
- Large responsive image display
- Navigation arrows (left/right)
- Thumbnail strip at bottom (4-5 visible previews)
- Current position indicator ("Image 3 of 8")
- Keyboard support (arrows, ESC)
- Touch/swipe support for mobile
- Click outside to close
- Body scroll lock when open

**User Flow:**
1. User clicks category card
2. Modal fades in with carousel
3. User browses images via arrows, thumbnails, or swipe
4. User closes via X button, ESC key, or clicking overlay
5. Focus returns to clicked card

## Implementation Approach

**Technology Stack:**
- Vanilla JavaScript for category cards and modal management
- Swiper.js (v8.x or v9.x) for carousel functionality
- Pure CSS for deck-card effects and responsive layout
- Web-optimized images from existing portfolio-gallery

**Why Swiper.js:**
- Battle-tested carousel with smooth animations
- Built-in accessibility features
- Touch/swipe support
- Keyboard navigation
- Thumbnail navigation support
- Small footprint (~20-30KB)
- Active maintenance and documentation

### HTML Structure

**Main Page Section:**
```html
<section class="work-categories">
  <div class="container">
    <h2 class="section-title">Work Categories</h2>
    <div class="categories-grid">
      <!-- 6 category cards -->
      <article class="category-card" data-category="camps">
        <div class="card-deck-wrapper">
          <div class="preview-image">
            <img src="..." alt="...">
          </div>
        </div>
        <h3 class="category-title">Camp Designs</h3>
        <p class="category-count">8 projects</p>
      </article>
      <!-- repeat for other 5 categories -->
    </div>
  </div>
</section>
```

**Modal Structure:**
```html
<div class="modal-gallery" id="galleryModal" aria-hidden="true" role="dialog">
  <div class="modal-overlay"></div>
  <div class="modal-content">
    <div class="modal-header">
      <h2 class="modal-title"><!-- Category name --></h2>
      <button class="modal-close" aria-label="Close gallery">×</button>
    </div>
    <div class="swiper">
      <!-- Swiper structure -->
    </div>
  </div>
</div>
```

### CSS Implementation

**Deck Card Effect:**
```css
.card-deck-wrapper {
  position: relative;
  /* Two pseudo-elements for stacked layers */
}

.card-deck-wrapper::before {
  /* First stacked layer - slight offset and rotation */
  position: absolute;
  transform: rotate(1deg);
  background: rgba(208, 208, 208, 0.8);
}

.card-deck-wrapper::after {
  /* Second stacked layer */
  position: absolute;
  transform: rotate(2deg);
  background: rgba(224, 224, 224, 0.8);
}

.preview-image {
  /* Main preview on top */
  position: relative;
  z-index: 1;
}
```

**Responsive Grid:**
```css
.categories-grid {
  display: grid;
  gap: 30px;
}

/* Desktop: 3 columns */
@media (min-width: 1024px) {
  .categories-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Tablet: 2 columns */
@media (min-width: 768px) and (max-width: 1023px) {
  .categories-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Mobile: 1 column */
@media (max-width: 767px) {
  .categories-grid {
    grid-template-columns: 1fr;
  }
}
```

### JavaScript Architecture

**Data Structure:**
```javascript
const portfolioCategories = {
  camps: {
    title: 'Camp Designs',
    preview: 'images/portfolio-gallery/camps/Elephant-rock-camp-01.jpg',
    images: [
      { src: 'images/portfolio-gallery/camps/...', alt: '...' },
      // ... all camp images
    ]
  },
  // ... other 5 categories
};
```

**Module Structure:**
```javascript
const GalleryManager = {
  init() {
    // Initialize event listeners
    // Setup modal
    // Bind keyboard events
  },

  openModal(categoryId) {
    // Load category images
    // Initialize Swiper
    // Show modal with fade-in
    // Lock body scroll
  },

  closeModal() {
    // Destroy Swiper instance
    // Hide modal with fade-out
    // Restore body scroll
    // Return focus
  },

  initSwiper(images) {
    // Configure and initialize Swiper carousel
  }
};
```

**Event Handling:**
- Event delegation for category card clicks
- Keyboard event listeners (ESC to close, arrows in carousel)
- Overlay click to close
- Focus trap management in modal

### Accessibility Features

**Keyboard Navigation:**
- Tab through category cards
- Enter/Space to open modal
- Arrow keys to navigate carousel
- ESC to close modal
- Focus trap within modal
- Focus restoration on close

**ARIA Attributes:**
```html
<div role="dialog" aria-modal="true" aria-labelledby="modal-title">
<button aria-label="Close gallery">
<button aria-label="Previous image">
<button aria-label="Next image">
```

**Screen Reader Support:**
- Descriptive alt text for all images
- Live region announcements for carousel position
- Semantic HTML structure
- Hidden state management (aria-hidden)

**Visual Accessibility:**
- Sufficient color contrast (existing design standards)
- Focus indicators for keyboard users
- Large touch targets for mobile (min 44×44px)

### Performance Considerations

**Image Optimization:**
- Use existing web-optimized images from portfolio-gallery
- Lazy load carousel images (load on demand as user navigates)
- Responsive image sizing based on viewport

**JavaScript Performance:**
- Event delegation to minimize listeners
- Swiper lazy loading configuration
- Destroy Swiper instance when modal closes
- Minimal DOM manipulation

**Load Time Impact:**
- Modal HTML can be pre-rendered or injected on first use
- Swiper.js loaded via CDN or bundled (~20-30KB gzipped)
- Category cards use lightweight CSS effects
- No impact on initial page load

### Print CSS Compatibility

**Requirements:**
- No changes to existing print.css
- Category section hidden in print view
- Existing portfolio-gallery-print section continues to show in PDF

**Implementation:**
```css
@media print {
  .work-categories {
    display: none;
  }

  .modal-gallery {
    display: none;
  }
}
```

Print version continues using existing `portfolio-gallery-print` section which shows full galleries with all images.

## Image Sources & Organization

**Source Folders:**
All images from `images/portfolio-gallery/` subdirectories:

1. **camps/** → Camp Designs category
2. **balloons-tethered/** → Tethered Balloon Experiences
3. **balloons-thermal/** → Thermal Airship Proposals
4. **events-commercial/** → Split between Events and Commercials categories
5. **Residential and office/** → Residential & Office Interiors

**Image Assignment Logic:**
- Events: Event-specific images from events-commercial (Citrix, UEFA, balloon domes, WTC, etc.)
- Commercials: Commercial/retail from events-commercial (RK Trends, Hero Kiosk, Jcamp Bistro, Conference room)

## Browser Support

**Target Browsers:**
- Chrome/Edge (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Mobile browsers (iOS Safari, Chrome Android)

**Graceful Degradation:**
- Cards remain clickable even if Swiper fails to load
- Basic image grid fallback possible
- No changes to existing browser support policy

## Edge Cases & Error Handling

**Missing Images:**
- Skip/filter out images that fail to load
- Show placeholder if entire category empty (unlikely)

**Large Image Sets:**
- Thumbnail strip shows subset with scroll
- Lazy loading prevents memory issues
- Swiper handles large sets efficiently

**Mobile Considerations:**
- Touch gestures for swipe navigation
- Optimized modal sizing for small screens
- Prevent body scroll issues on iOS
- Handle orientation changes

**Network Issues:**
- Progressive loading (show what's available)
- Retry logic for failed image loads
- Loading indicators for slow connections

## Testing Checklist

**Functionality:**
- [ ] All 6 category cards display correctly with deck effect
- [ ] Preview images load for all categories
- [ ] Clicking card opens modal with correct images
- [ ] Carousel navigation works (arrows, thumbnails, keyboard)
- [ ] Modal closes via X, ESC, and overlay click
- [ ] Body scroll locks when modal open
- [ ] Focus management works correctly

**Responsive:**
- [ ] Grid responds correctly at all breakpoints (3/2/1 columns)
- [ ] Modal works on mobile devices
- [ ] Touch/swipe gestures work
- [ ] Images scale properly on all screens

**Accessibility:**
- [ ] Keyboard navigation works throughout
- [ ] Screen reader announcements work
- [ ] ARIA labels present and correct
- [ ] Focus trap works in modal
- [ ] Focus restoration works on close

**Performance:**
- [ ] Page load time not impacted
- [ ] Images lazy load in carousel
- [ ] No memory leaks (Swiper destroyed on close)
- [ ] Smooth animations/transitions

**Print:**
- [ ] Category section hidden in print
- [ ] Existing print layout unaffected
- [ ] PDF output still shows full galleries

**Cross-browser:**
- [ ] Works in Chrome, Firefox, Safari, Edge
- [ ] Mobile browsers work correctly
- [ ] No console errors in any browser

## Future Enhancement Options

**Potential additions (not in scope for initial implementation):**

1. **Image Captions:** Add descriptive text to carousel images
2. **Fullscreen Mode:** Dedicated fullscreen view for images
3. **Image Download:** Allow downloading images
4. **Filtering:** Filter categories by type/technology
5. **Search:** Search across all portfolio images
6. **Sharing:** Share individual images or categories
7. **Animation:** Enhanced card hover animations
8. **Statistics:** Show view counts or popularity

## Success Metrics

**User Experience:**
- Easy navigation to specific work categories
- Professional, polished gallery presentation
- Smooth, intuitive modal interactions
- Accessible to all users

**Technical:**
- Fast load times maintained
- No breaking changes to existing functionality
- Print PDF quality unchanged
- Cross-browser compatibility maintained

## Dependencies

**External Libraries:**
- Swiper.js (v8.x or v9.x) - MIT License
  - CDN: `https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.js`
  - CSS: `https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.css`

**Internal Resources:**
- Existing styles.css (design tokens, variables)
- Portfolio-gallery images (already optimized)
- Existing JavaScript patterns (if any)

## Implementation Notes

**Code Location:**
- New section replaces lines 526-563 in index.html (current "Additional Work" section)
- CSS additions go in styles.css (new `.work-categories` and `.modal-gallery` sections)
- JavaScript in new file `js/gallery.js` or append to existing `js/main.js`
- Swiper.js loaded via CDN in `<head>` (or before closing `</body>`)

**Naming Conventions:**
- Follow existing class naming patterns (kebab-case)
- Use semantic class names
- Maintain consistency with existing codebase

**Git Workflow:**
- Create feature branch for development
- Commit HTML, CSS, and JS changes separately
- Test thoroughly before merging to main
- Update documentation if needed

## Approval Sign-off

**Design Approved:** ✅ 2026-03-22
**Ready for Implementation:** ✅

---

*This design document captures the complete specification for the categorized work gallery feature. Implementation should follow this spec closely, with any deviations documented and approved.*
