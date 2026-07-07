# MD-Copilot Investor Portal — Design System

## Brand
**Archetype:** Sage + Ruler (AUGUR Consulting)
**Tone:** Warm, calm, authoritative. Minimal decoration. Space and typography first.

## Color Palette

| Token | Hex | Usage |
|---|---|---|
| Accent (Primary) | `#C17817` | CTAs, links, active states, borders, icons |
| Accent Hover | `#A86814` | Hover states |
| Canvas (Bg) | `#F5F0E8` | Page background |
| Ink (Text) | `#1A1A1A` | Primary text, headings |
| Mid Gray | `#5A5A5A` | Secondary text, captions (WCAG AA) |
| Panel/Card | `#FFFFFF` | Cards, panels, modals |
| Dark (Header/Footer) | `#121212` | Header, footer, dark sections |
| Light Border | `#E8E2D6` | Card borders, dividers |
| Muted Bg | `#EDE8DE` | Alternate rows, subtle backgrounds |
| Success | `#2D6A4F` | Positive indicators, high scores |
| Warning | `#B58900` | Medium scores, cautions |
| Danger | `#9B2335` | Red flags, low scores, risks |
| Info | `#4A6FA5` | Neutral highlights |

## Typography

- **Headings:** Playfair Display (Google Fonts), serif
- **Body / UI:** system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif
- **Base size:** 14px (0.875rem)
- **Line height:** 1.6 body, 1.2 headings

| Level | Size | Weight | Font |
|---|---|---|---|
| H1 | 2.5rem (40px) | 700 | Playfair Display |
| H2 | 1.75rem (28px) | 600 | Playfair Display |
| H3 | 1.25rem (20px) | 600 | system-ui |
| H4 | 1rem (16px) | 600 | system-ui |
| Body | 0.875rem (14px) | 400 | system-ui |
| Small | 0.75rem (12px) | 400 | system-ui |
| Caption | 0.6875rem (11px) | 500 | system-ui, uppercase, tracking-wide |

## Spacing System

Base unit: 8px

| Token | Value |
|---|---|
| xs | 4px |
| sm | 8px |
| md | 16px |
| lg | 24px |
| xl | 32px |
| 2xl | 48px |
| 3xl | 64px |

## Border Radius

| Token | Value |
|---|---|
| sm | 4px |
| md | 8px |
| lg | 12px |

## Shadows

| Token | Value |
|---|---|
| sm | 0 1px 3px rgba(26,26,26,0.06) |
| md | 0 4px 12px rgba(26,26,26,0.08) |
| lg | 0 8px 24px rgba(26,26,26,0.12) |

## Transitions

| Token | Duration |
|---|---|
| fast | 150ms ease |
| normal | 200ms ease-out |
| slow | 300ms ease-in-out |

## Layout

- **Desktop:** Sidebar 240px fixed left / Content fluid / Right panel 400px (optional on detail pages)
- **<1024px:** Sidebar collapses to 56px icon-only
- **<768px:** Single column, cards stack, sidebar becomes bottom nav or hamburger
- **Max content width:** 1200px
- **Generous whitespace:** 48-64px vertical between major sections

## Components

### Buttons
- **Primary:** bg Accent, text White, radius md, px-4 py-2, hover darken, transition fast
- **Secondary:** border 1px Accent, text Accent, bg transparent, hover bg Accent/10
- **Ghost:** text Mid Gray, hover text Ink

### Cards
- bg White, radius md, border 1px Light Border, shadow sm
- Hover: shadow md, border Accent/30, transition normal
- Padding: 24px

### Score Badges
- High (≥8): bg Success/10, text Success, border Success/30
- Medium (5-7.9): bg Warning/10, text Warning, border Warning/30
- Low (<5): bg Danger/10, text Danger, border Danger/30

### Navigation
- Header: bg Dark, text White, height 64px
- Sidebar: bg Canvas, border-r Light Border, sticky top
- Nav links: text Mid Gray, hover text Accent, active text Accent + left border 3px Accent
- Mobile: hamburger menu

### Tables
- Header: bg Muted Bg, text Ink, font-weight 600
- Rows: alternating White / Muted Bg
- Hover: bg Accent/5
- Border: 1px Light Border

### Toast
- Fixed bottom-right, max 3 visible, 4s auto-dismiss
- Left border 4px Accent, bg White, shadow lg

### Focus Ring
- 2px solid Accent, offset 2px, outline none

## Accessibility
- Skip-link to main content
- ARIA labels on all interactive elements
- Semantic HTML (nav, main, section, article, aside)
- Color contrast AA minimum
- Keyboard navigation fully supported

## Page Structure (each page)

```
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[Page] | MD-Copilot Investor Portal</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
  <a href="#main" class="skip-link">Перейти к содержимому</a>
  
  <!-- Header -->
  <header class="site-header">...</header>
  
  <div class="layout">
    <!-- Sidebar Navigation -->
    <nav class="sidebar" aria-label="Основная навигация">...</nav>
    
    <!-- Main Content -->
    <main id="main" class="content">...</main>
  </div>
  
  <!-- Footer -->
  <footer class="site-footer">...</footer>
  
  <script src="assets/js/main.js"></script>
</body>
</html>
```

## Score Visualization

### Radial Gauge (for overall scores)
- SVG circle, stroke-dasharray based on percentage
- Colors: Success (#2D6A4F) for ≥7, Warning (#B58900) for 4-6.9, Danger (#9B2335) for <4
- Size: 120px diameter
- Label inside: score value + /10

### Horizontal Bar (for weighted criteria)
- Background track: Muted Bg
- Fill: Accent for MD-Copilot, Mid Gray for competitors
- Height: 8px, radius: 4px
- Label: criterion name left, value right

### Competitor Matrix
- Table with colored cells
- Green gradient for high scores, red gradient for low
- MD-Copilot column highlighted with left border Accent
