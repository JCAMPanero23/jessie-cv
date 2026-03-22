# Known Issues

## ~~Full Portfolio PDF - AI Workflow Arrows Display Vertically~~ (RESOLVED)

**Status:** Resolved
**Priority:** Medium
**Date Reported:** 2026-03-22
**Date Resolved:** 2026-03-22

### Issue Description
The arrows between workflow boxes in the "AI-Integrated Workflow" section displayed as downward arrows (↓) instead of horizontal rightward arrows (→) when printing the Full Portfolio PDF.

### Root Cause
Unicode arrow characters (→) are subject to font rendering and PDF engine interpretation, which can cause them to render incorrectly in print output. The character itself may be substituted by fallback fonts or rendered based on text-direction heuristics.

### Solution
Replaced Unicode arrow character with CSS border-based triangle arrows. This approach:
- Uses pure CSS geometry (no font dependency)
- Renders consistently across all browsers and PDF engines
- Creates a clean triangular arrow pointing right

### Final CSS (print.css)
```css
.workflow-arrow {
    font-size: 0; /* Hide original text content */
    flex-shrink: 0;
    align-self: center;
    display: block;
    width: 0;
    height: 0;
    /* CSS border triangle pointing right */
    border-top: 8pt solid transparent;
    border-bottom: 8pt solid transparent;
    border-left: 12pt solid #D4A574;
    margin: 0 4pt;
}

.workflow-arrow::before {
    content: none; /* Remove pseudo-element */
}
```

### Attempted Fixes (Before Resolution)
1. Added `writing-mode: horizontal-tb !important` - Did not work
2. Added `transform: rotate(0deg) !important` - Did not work
3. Used CSS `::before` pseudo-element with `content: "→"` - Did not work
4. Set explicit font-size and display properties - Did not work
5. Adjusted flexbox alignment properties - Did not work

### Notes
- Web version always displayed correctly (font rendering works in browser)
- Issue only affected print/PDF output
- CSS border triangles are a reliable cross-platform solution for arrows
