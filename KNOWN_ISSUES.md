# Known Issues

## Full Portfolio PDF - AI Workflow Arrows Display Vertically

**Status:** Open
**Priority:** Medium
**Date Reported:** 2026-03-22

### Issue Description
The arrows between workflow boxes in the "AI-Integrated Workflow" section display as downward arrows (↓) instead of horizontal rightward arrows (→) when printing the Full Portfolio PDF.

### Expected Behavior
- Arrows should display horizontally: Box 1 → Box 2 → Box 3 → Box 4

### Actual Behavior
- Arrows display vertically pointing downward between boxes

### Attempted Fixes
1. Added `writing-mode: horizontal-tb !important`
2. Added `transform: rotate(0deg) !important`
3. Used CSS `::before` pseudo-element with `content: "→"`
4. Set explicit font-size and display properties
5. Adjusted flexbox alignment properties

### Current CSS (print.css lines ~260-272)
```css
.workflow-arrow {
    font-size: 0;
    color: #D4A574 !important;
    flex-shrink: 0;
    line-height: 1;
    align-self: center;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20pt;
}

.workflow-arrow::before {
    content: "→";
    font-size: 20pt;
    display: block;
}
```

### HTML Structure (index.html lines ~346-358)
```html
<div class="workflow-arrow">→</div>
```

### Next Steps to Try
1. Replace arrow character with HTML entity (`&rarr;` or `&#8594;`)
2. Use SVG arrow instead of text character
3. Use border-based arrow (CSS triangle)
4. Try different Unicode characters (⟶, ⇒, ➔)
5. Check if font-family affects arrow rendering in print
6. Test with explicit `direction: ltr` property
7. Consider using background-image with arrow graphic

### Notes
- Web version displays correctly
- Only affects print/PDF output
- All other workflow styling (boxes, spacing, rounded corners) working correctly
- Issue may be browser-specific print rendering
