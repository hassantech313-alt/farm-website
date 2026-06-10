# 🏡 Dream Farms — Ultra-Premium Luxury Farmhouse Website

> **"Where Luxury Meets Your Comfort"**  
> A cinematic, luxury single-page website for Dream Farms farmhouse rental brand.

---

## ✅ Completed Features

### Design & Theme
- Dark navy + gold luxury theme (inspired by Taj Hotels / Airbnb Luxe)
- Premium glassmorphism effects
- Gold accent (#C9A84C) throughout
- Custom cursor (gold dot + outline ring)
- Cinematic CSS art backgrounds for all property showcases
- Cormorant Garamond serif + Jost sans-serif typography stack

### Pages & Sections
1. **Preloader** — Animated logo reveal with gold glow + progress bar
2. **Navbar** — Transparent → glassmorphism on scroll, mobile hamburger menu
3. **Hero** — Full-screen cinematic background slider, parallax, floating feature card, WhatsApp CTA
4. **About** — Split-layout with CSS art property visual, pillar highlights, counter stats
5. **Stats Bar** — Animated counters (500+ guests, 5 properties, 5 pools, 5.0 rating)
6. **Facilities** — 16 facility cards with hover animation, gold icons
7. **Property Highlights** — 4 alternating left-right feature blocks (Pool, Living, Bedroom, Garden)
8. **Gallery** — 15-item masonry grid with filter tabs (All/Exterior/Pool/Interior/Garden), linked to actual PDF brochures
9. **Experience Section** — 6 experience cards (Family, Birthday, Friends, Weekend, Photography, Corporate)
10. **Google Reviews** — Swiper auto-slider with 7 premium review cards
11. **Instagram Feed** — 6-column CSS art grid linking to @dreamfarms5
12. **Location** — Google Maps embed + location highlights + direction links
13. **Booking CTA** — Call Now, WhatsApp, Directions buttons
14. **Footer** — Dark premium footer with brand, links, facilities, contact
15. **Floating WhatsApp** — Always-visible WhatsApp bubble with tooltip

### Technical
- GSAP ScrollTrigger animations (fade-up, slide-in, stagger)
- GSAP Parallax effects on hero and sections
- Lenis smooth scroll with GSAP integration
- Hero background auto-slider (5-second intervals)
- Gold particle system in hero
- Gallery filter with animated show/hide
- Swiper reviews carousel with autoplay
- GLightbox integration
- Back-to-top button
- Active nav link tracking
- SEO meta tags + Open Graph + Twitter Card
- JSON-LD Schema markup (LodgingBusiness)
- Mobile-first responsive design
- Image error fallbacks

---

## 🔗 Functional URIs / Entry Points

| Section | URL Path |
|---------|---------|
| Homepage | `/index.html` (or `/`) |
| WhatsApp Booking | `https://wa.me/919574572652?text=Hello%2C%20I%20would%20like%20to%20book%20Dream%20Farms.` |
| Phone | `tel:+919574572652` |
| Google Maps | `https://goo.gl/maps/S1FQwJF2YdmDDcGS6` |
| Instagram | `https://www.instagram.com/dreamfarms5` |
| PDF Brochure 1 | `https://www.genspark.ai/api/files/s/Ppv69u6h` |
| PDF Brochure 2 | `https://www.genspark.ai/api/files/s/ZfSbnRTe` |
| PDF Brochure 3 | `https://www.genspark.ai/api/files/s/qOXEsdI4` |
| PDF Brochure 4 | `https://www.genspark.ai/api/files/s/lLcAf6Be` |
| PDF Brochure 5 | `https://www.genspark.ai/api/files/s/QwCQK3Lj` |

---

## 📁 File Structure

```
index.html          — Main single-page website
css/
  style.css         — All styles (luxury theme, animations, responsive)
js/
  main.js           — GSAP, Lenis, Swiper, GLightbox, all interactions
images/
  (logo attempted download — use CSS fallback)
README.md
```

---

## 🚧 Features Not Yet Implemented

- **Real property images** — PDF parsing not available in browser; gallery uses CSS art backgrounds. To add real images: export photos from PDFs and add to `images/` folder
- **Live Google Reviews API** — Requires Google Places API key (backend needed); currently uses curated review cards
- **Live Instagram Feed** — Instagram API requires OAuth; currently uses CSS art grid linking to profile
- **Booking form** — Inline date-picker booking form with availability calendar
- **Payment integration** — Online payment processing
- **Image gallery with real photos** — Replace CSS art with actual property photos

---

## 🚀 Recommended Next Steps

1. **Export photos from PDFs** and upload to `images/` folder
2. Replace CSS art backgrounds in gallery/property sections with real property photos
3. Connect to Google Places API for live reviews (requires backend)
4. Add a booking form with WhatsApp/email notification
5. Set up proper domain (`dreamfarms.in`) and SSL
6. Add Google Analytics tracking
7. Implement real Instagram feed widget

---

## 📞 Brand Information

- **Brand**: Dream Farms
- **Tagline**: Where Your Comfort Meets Excellence
- **Phone**: +91 95745 72652
- **Instagram**: @dreamfarms5
- **Location**: Palsana, Surat, Gujarat, India
- **Google Maps**: https://goo.gl/maps/S1FQwJF2YdmDDcGS6

---

## 🛠️ Tech Stack

| Library | Version | Purpose |
|---------|---------|---------|
| GSAP | 3.12.5 | Animations & ScrollTrigger |
| Lenis | 1.1.14 | Smooth scroll |
| Swiper | 11 | Reviews carousel |
| GLightbox | Latest | Gallery lightbox |
| Font Awesome | 6.4.0 | Icons |
| Google Fonts | — | Cormorant Garamond, Jost |

---

*© 2025 Dream Farms. All Rights Reserved.*
