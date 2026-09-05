# Dynamic Logo System - Setup Guide

## Overview

Your site now supports **automatic logo switching** based on background color:
- **Light logo** (white/cream) displays on dark backgrounds
- **Dark logo** (black) displays on light backgrounds

The switch happens automatically as users scroll through different sections.

## How to Add Your Logos

### Step 1: Prepare Your Logo Files

Create two versions of your logo:

1. **Light Logo** (`logo-light.svg`) - For dark backgrounds
   - Use white or cream color (#F2ECDF)
   - Save as: `logo-light.svg`

2. **Dark Logo** (`logo-dark.svg`) - For light backgrounds
   - Use black or dark color (#0D0C0A)
   - Save as: `logo-dark.svg`

### Step 2: Add Files to Your Project

Place both logo files in the same directory as `index.html`:

```
/site
  ├── index.html
  ├── logo-light.svg  ← Light logo for dark backgrounds
  ├── logo-dark.svg   ← Dark logo for light backgrounds
  ├── logo.svg        (your original - can keep or remove)
  └── kordexflow-demo.mp4
```

### Step 3: Test It

1. Open your site
2. Scroll through the page
3. Watch the logo change automatically:
   - **Hero section** (dark) → Light logo shows
   - **Problem section** (light) → Dark logo shows
   - **Video section** (dark) → Light logo shows
   - And so on...

## Logo File Requirements

### Recommended Format: SVG
- **Size**: 200-300px width recommended
- **Height**: Auto-adjusting (maintains aspect ratio)
- **Format**: SVG (preferred) or PNG with transparent background

### Alternative Formats Supported

The system will automatically try these filenames in order:

**For Light Logo:**
1. `logo-light.svg` ← Recommended
2. `logo-white.svg`
3. `logo-light.png`
4. `logo-white.png`

**For Dark Logo:**
1. `logo-dark.svg` ← Recommended
2. `logo-black.svg`
3. `logo-dark.png`
4. `logo-black.png`

## Example Logo Colors

### Light Logo (for dark backgrounds)
```css
color: #F2ECDF; /* Cream */
/* or */
color: #FFFFFF; /* White */
```

### Dark Logo (for light backgrounds)
```css
color: #0D0C0A; /* Black */
/* or */
color: #171310; /* Ink */
```

## Fallback Behavior

If logo files are not found, the site will use the original typographic wordmark:
- "KORDEX" + "FLOW" text treatment
- Still switches colors automatically

## Testing Checklist

✅ Both logo files are in the correct directory  
✅ Filenames match exactly (case-sensitive)  
✅ Light logo is visible on dark backgrounds  
✅ Dark logo is visible on light backgrounds  
✅ Logo switches smoothly while scrolling  
✅ Logo appears in header, preloader, and footer  
✅ Logo displays correctly on mobile devices  

## Customizing Logo Sizes

If you want to adjust logo sizes, modify these CSS variables in `index.html`:

```css
:root {
  --logo-h: 48px;      /* Header logo height */
  --hh: 78px;          /* Header height */
}
```

## Logo Placement Locations

Your logo appears in three places:

1. **Preloader** (opening animation) - Large version
2. **Header** (navigation) - Small version, switches dynamically
3. **Footer** - Small version, always light color

## Troubleshooting

### Logo doesn't appear
- Check that file is in the same directory as `index.html`
- Verify filename spelling (case-sensitive)
- Check browser console for loading errors
- Try hard refresh (Cmd+Shift+R or Ctrl+Shift+R)

### Logo doesn't switch colors
- Verify both `logo-light.svg` AND `logo-dark.svg` exist
- Check that you deployed both files to Vercel
- Clear browser cache and reload

### Logo looks pixelated
- Use SVG format instead of PNG
- If using PNG, ensure it's at least 2x the display size
- Export PNG at 2x or 3x resolution for retina displays

### Logo is too big/small
- For SVG: The viewBox will scale automatically
- For PNG: Save at correct pixel dimensions (400-600px width recommended)
- Or adjust CSS `--logo-h` variable

## Deploying to Vercel

When deploying, make sure both logo files are uploaded:

```bash
git add logo-light.svg logo-dark.svg
git commit -m "Add dynamic logos"
git push origin main
```

Vercel will automatically redeploy with the new logos.

## Design Tips

### For Best Results:
- Keep logos simple and readable at small sizes
- Ensure sufficient contrast with backgrounds
- Test on both desktop and mobile
- Use consistent line weights between light/dark versions
- Maintain the same aspect ratio for both versions

### Color Contrast Guidelines:
- Light logo on dark bg: Minimum 4.5:1 contrast ratio
- Dark logo on light bg: Minimum 4.5:1 contrast ratio
- Use online tools like WebAIM Contrast Checker

---

Questions? The dynamic switching is handled automatically by the JavaScript in `index.html` (see the `initColors()` function).
