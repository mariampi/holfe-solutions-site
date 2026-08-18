# DAKIPATI Branding Guide

This guide documents the branding system used across the Dakipati website, customer portal, admin dashboard, demo showcase, and browser-generated menu/PDF materials.

## 1. Official Logo Usage

Official source artwork:

- `/dakipati/images/logo/dakipati-official-brand.jpg`

Optimized web lockups:

- `/dakipati/images/logo/dakipati-logo-lockup.webp`
- `/dakipati/images/logo/dakipati-wordmark.webp`

Use the official artwork or lockup on dark navy, black, or clean white surfaces. Keep generous spacing around the logo and avoid placing it over busy food photography unless a dark overlay is present.

## 2. Primary Font

Font: Montserrat

Source: Google Fonts

Use for:

- D'AKI' PA'TI title treatments
- Hero headlines
- Major section headings
- Customer portal and admin dashboard headers
- Browser-generated menu/PDF titles

Reason: The exact logo font could not be reliably identified from the provided artwork. Montserrat was selected because its heavy weights provide a clean, geometric, premium restaurant feel with similar bold proportions to the logo lettering.

## 3. Secondary Font

Font: Lobster

Source: Google Fonts

Use for:

- Puerto Rican Cuisine
- De la isla para ti
- Brand subtitles
- Promotional accent lines

Reason: The exact script font could not be reliably identified from the artwork. Lobster was selected because it closely matches the friendly connected script style, weight, and restaurant-forward personality of the official tagline.

## 4. Color Palette

Core colors:

- Puerto Rican Flag Red: `#d62839`
- Puerto Rican Flag Blue: `#0b4ea2`
- White: `#ffffff`
- Dark Navy: `#07152f`
- Deep Navy: `#0b1f44`
- Gold Accent: `#f8bd2a`
- Cream Background: `#fff7df`
- Black Ink: `#070707`

## 5. CSS Variables

Defined in `src/app/globals.css`:

- `--dakipati-red`
- `--dakipati-blue`
- `--dakipati-white`
- `--dakipati-navy`
- `--dakipati-navy-2`
- `--dakipati-gold`
- `--dakipati-cream`
- `--dakipati-ink`
- `--dakipati-muted`
- `--dakipati-card-shadow`

## 6. PDF Standards

The current site links to an external menu PDF. No local PDF generation service exists in this static demo.

For browser-generated PDFs or future generated menus:

- Use the official lockup at the top of the menu.
- Use Montserrat Black or ExtraBold for the main menu title.
- Use Lobster for the subtitle line.
- Use the red, blue, white, and dark navy palette.
- Keep food categories readable and avoid overusing backgrounds behind menu text.
- Maintain strong contrast for print.

The menu page includes print-specific CSS and a print-only brand header for browser export.

## 7. Mobile Branding Guidelines

- Prefer the compact logo lockup in headers.
- Keep logo containers rounded and dark for contrast.
- Avoid oversized logo art that pushes calls to action below the first mobile viewport.
- Use strong, short headings and keep ordering actions visible.

## 8. Future Expansion Guidelines

Future ordering, loyalty, and admin pages should reuse:

- `BrandLogo`
- `brand-title`
- `brand-script`
- Dakipati CSS variables
- The centralized asset paths above

If the exact commercial fonts from the logo are later identified and licensed, replace Montserrat and Lobster in `src/app/layout.tsx` while keeping the same CSS variable names.
