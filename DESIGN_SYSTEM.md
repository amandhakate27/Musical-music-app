# Musical - Design System & UI Guide

> **Purpose:** Single source of truth for AI and developers when creating new pages. Follow this strictly to keep visual consistency. All colors, fonts and component styles are extracted directly from the codebase (verified on 2026-09-09).

---

## 1. Project Overview

| Item | Value |
|------|-------|
| **App Name** | Musical (Music Player Application) |
| **Stack** | React 19.1.1, React Router 8.3.0, Vite 7.1.7, Tailwind CSS 4.3.3 (@tailwindcss/vite), lucide-react 1.43.0 |
| **Entry** | `src/main.jsx` -> wraps `<AuthProvider>` around `<AppRoutes />` |
| **Routing** | `src/router/AppRoutes.jsx` - `createBrowserRouter` with `MainLayout` as root |
| **State** | `src/context/AuthContext.jsx` - `AuthContext` (currently placeholder `someData`) |
| **Styling** | Tailwind arbitrary values + Google Fonts via `src/index.css` |
| **Planned Pages** | `Home.jsx`, `Favourite.jsx`, `Login.jsx`, `Register.jsx` (only implemented), `ArtistDashboard.jsx` |


### 1.2 Routes (`src/router/AppRoutes.jsx:9`)

```
/               -> Home (index)
/favourite      -> Favourite
/login          -> Login
/register       -> Register
/artist-dashboard -> ArtistDashboard
```

All routes share `MainLayout` (`src/layouts/MainLayout.jsx:1`).

---

## 2. Color System

### 2.1 Theory

*   **Vibe:** Dark, premium, moody nightclub / studio aesthetic. Low-light friendly, text high contrast. Not pure black - deep desaturated purple (`#211D27`) reduces eye strain vs `#000`.
*   **Palette Type:** Monochromatic dark base + single high-saturation accent (red). 80% dark neutrals, 15% muted text, 5% accent CTAs - ensures accent always pops.
*   **Accessibility:** `#FCFCFC` on `#211D27` = ~18:1 contrast. `#8C8B8F` on `#211D27` = ~6:1 (passes AA for secondary text). Focus border uses accent so keyboard nav is visible.
*   **Usage Rule:** Never introduce new hue (blue, green) without approval. All new pages must use only the 8 tokens below.

### 2.2 Palette - 8 Tokens (Extracted via grep from `src/pages/Register.jsx`)

| Token | Hex | RGB | Usage | Tailwind Class | Where Used |
|-------|-----|-----|-------|----------------|------------|
| **Bg-Page** | `#211D27` | 33, 29, 39 | App background, page canvas | `bg-[#211D27]` | `Register.jsx:13` - full screen wrapper |
| **Bg-Input** | `#1c1825` | 28, 24, 37 | Input / Card / Surface | `bg-[#1c1825]` | `Register.jsx:10` - inputClass |
| **Text-Primary** | `#FCFCFC` | 252, 252, 252 | Headings, primary text, active states | `text-[#FCFCFC]` | `Register.jsx:18` brand title |
| **Text-Secondary** | `#8C8B8F` | 140, 139, 143 | Subtitles, labels, icons, inactive tabs | `text-[#8C8B8F]` | `Register.jsx:21` + all icons |
| **Text-Placeholder** | `#8C8B8F` @ 50% | - | Input placeholders | `placeholder:text-[#8C8B8F]/50` | `Register.jsx:10` |
| **Border-Input** | `#38333f` | 56, 51, 63 | Input default border | `border-[#38333f]` | `Register.jsx:10` |
| **Border-Subtle** | `#2a2533` | 42, 37, 51 | Card/divider, segmented control border | `border-[#2a2533]` | `Register.jsx:30` role selector container |
| **Accent / CTA** | `#E6444F` | 230, 68, 79 | Primary button, active tab, focus border, hover links | `bg-[#E6444F]` `border-[#E6444F]` `text-[#E6444F]` | `Register.jsx:10` focus:border, `34` active role, `99` submit btn |
| **Accent-Hover** | `#d43c47` | 212, 60, 71 | CTA hover state only | `hover:bg-[#d43c47]` | `Register.jsx:99` submit button hover |

> **Do not use** `white` / `black` directly. Use `text-white` only for text on accent bg (white on `#E6444F` is intentional). For all other text use `#FCFCFC` or `#8C8B8F`.

### 2.3 Semantic Mapping

```
background: page       = #211D27
background: surface    = #1c1825
background: accent     = #E6444F -> hover #d43c47
text: primary          = #FCFCFC
text: secondary/muted  = #8C8B8F
border: default        = #38333f
border: subtle         = #2a2533
border: focus/active   = #E6444F
icon: default          = #8C8B8F
icon: onAccent         = white
```

### 2.4 How to Use (Copy-Paste Tokens for AI)

```js
// For any new page/component, reuse exactly:
const inputClass = "w-full bg-[#1c1825] text-[#FCFCFC] text-[15px] pl-11 pr-4 py-3.5 rounded-md outline-none placeholder:text-[#8C8B8F]/50 border border-[#38333f] focus:border-[#E6444F] transition-colors duration-150"
const pageClass = "min-h-screen w-screen bg-[#211D27]"
const cardClass = "bg-[#1c1825] border border-[#38333f] rounded-md"
const primaryBtn = "bg-[#E6444F] hover:bg-[#d43c47] active:scale-[0.99] text-white font-semibold rounded-md transition-all duration-150"
const secondaryText = "text-[#8C8B8F]"
const primaryText = "text-[#FCFCFC]"
```

---

## 3. Typography

Defined in `src/index.css:1`

| Role | Font | Weight | Class | Example |
|------|------|--------|-------|---------|
| **Brand / Display** | Playfair Display | 900 (black) | `font-playfair font-black text-5xl` | `Register.jsx:18` "Musical" |
| **Body / UI** | Inter | 400, 500, 600, 700 | `font-inter` (default via body) | All inputs, buttons |
| **Subtitle** | Inter | 400 | `text-[15px] text-[#8C8B8F]` | `Register.jsx:21` "Create your account..." |
| **Button** | Inter | 500 / 600 | `text-[15px] font-medium` / `font-semibold tracking-wide` | Role tabs vs Submit btn |
| **Small Link** | Inter | 500 | `text-[14px]` | `Register.jsx:107` "Already have an account?" |

**Google Import:** `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@400;500;600;700&display=swap')`

**Rule for AI:** Headings = Playfair, everything else = Inter. Never use system sans for headings.

---

## 4. Layout & Spacing (from Register.jsx)

*   **Page Container:** `h-screen w-screen bg-[#211D27] flex items-center justify-center` + inner `w-full max-w-[420px] px-4` - centered card layout for auth pages. Reuse for `Login.jsx`.
*   **Form Gap:** `space-y-2.5` (10px) between inputs, `!mt-6` (24px) before CTA.
*   **Input:** `pl-11 pr-4 py-3.5` -> icon space left 44px, text 15px, rounded `rounded-md` (6px), border 1px.
*   **Icon in Input:** Absolute `left-3`, `w-[14px] h-[14px] text-[#8C8B8F]`, centered `top-1/2 -translate-y-1/2`.
*   **Radius:** Consistently `rounded-md` (6px) for inputs, buttons, segmented control. Use `overflow-hidden` on segmented control parent.
*   **Transitions:** `transition-colors duration-150` for inputs/icons, `transition-all duration-150` for CTAs + `active:scale-[0.99]` for press feedback.

---

## 5. Component Patterns (Reference: `src/pages/Register.jsx:4`)

### 5.1 Input Field Pattern

```jsx
<div className="relative">
  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-[14px] h-[14px] text-[#8C8B8F]" />
  <input name="fullName" placeholder="Full Name" className={inputClass} />
</div>
```

### 5.2 Password with Toggle

```jsx
<div className="relative">
  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-[14px] h-[14px] text-[#8C8B8F]" />
  <input type={showPassword ? "text" : "password"} className={`${inputClass} pr-10`} />
  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8C8B8F] hover:text-[#E6444F] transition-colors duration-150">
    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
  </button>
</div>
```

### 5.3 Segmented Control (Role Selector)

```jsx
<div className="flex rounded-md border border-[#2a2533] overflow-hidden">
  <button onClick={() => setRole("listener")} className={`${role==="listener" ? "bg-[#E6444F] text-white" : "text-[#8C8B8F] hover:text-[#FCFCFC]"}`}>Listener</button>
  <button onClick={() => setRole("artist")} className={`border-l border-[#2a2533] ${role==="artist" ? "bg-[#E6444F] text-white" : "text-[#8C8B8F]"}`}>Artist</button>
</div>
<input type="hidden" name="role" value={role} /> // carry to FormData
```

### 5.4 Primary CTA

```jsx
<button type="submit" className="w-full !mt-6 py-3.5 bg-[#E6444F] hover:bg-[#d43c47] active:scale-[0.99] text-white font-semibold text-[15px] rounded-md transition-all duration-150 tracking-wide">
  Create Account
</button>
```

### 5.5 Links / Secondary Action

```jsx
<p className="text-center text-[14px] text-[#8C8B8F] mt-5">
  Already have an account? <span className="text-[#FCFCFC] font-medium hover:text-[#E6444F] cursor-pointer transition-colors duration-150">Sign in</span>
</p>
```

---

## 6. Iconography

*   **Library:** `lucide-react` only (`src/pages/Register.jsx:2`).
*   **Size:** `w-[14px] h-[14px]` or `w-3.5 h-3.5` (=14px) for input icons, `w-[15px] h-[15px]` for tabs.
*   **Color:** Default `text-[#8C8B8F]`, hover `hover:text-[#E6444F]`, on accent `text-white`.
*   **Available in Register:** `User`, `AtSign`, `Mail`, `Lock`, `Eye`, `EyeOff`, `Music4`, `Mic2`.

---

## 7. Interaction & Motion

*   **Hover:** Inputs -> border to accent, icons -> `hover:text-[#E6444F]`, secondary text -> `hover:text-[#FCFCFC]`.
*   **Focus:** `focus:border-[#E6444F]` + `outline-none`.
*   **Active:** CTA `active:scale-[0.99]`.
*   **Duration:** Always `duration-150`.

---

## 8. Guidelines for AI - When Generating New Pages

### DO

*   Use exactly the 8 hex tokens above. Copy classes verbatim.
*   Wrap pages in `bg-[#211D27]` and use `text-[#FCFCFC]` / `text-[#8C8B8F]`.
*   Use `lucide-react` for icons, Inter for body, Playfair for brand.
*   Keep `rounded-md`, `border-[#38333f]` / `border-[#2a2533]`, `transition-colors duration-150`.
*   For auth pages (`Login.jsx`), clone `Register.jsx` structure: centered `max-w-[420px]`, brand header, form, link footer.
*   For dashboards (`Home.jsx`, `Favourite.jsx`, `ArtistDashboard.jsx`), use dark surface cards: `bg-[#1c1825] border border-[#2a2533] rounded-md p-4`.

### DON'T

*   Don't add new colors (e.g., `bg-blue-500`, `bg-green-600`). If needed, derive from existing: e.g., for success use `#8C8B8F` muted, not green.
*   Don't use light theme (`bg-white`, `bg-gray-100`).
*   Don't use other icon libs (FontAwesome, Heroicons).
*   Don't change font weights outside 400-700 (Inter) / 900 (Playfair).
*   Don't use `rounded-full` or `rounded-xl` - stick to `rounded-md`.

### Prompt Template for AI

```
Create [PageName] for Musical app.
- Background: bg-[#211D27]
- Surface: bg-[#1c1825] border-[#38333f]
- Text: #FCFCFC primary, #8C8B8F secondary
- Accent: #E6444F (CTA/active), hover #d43c47
- Fonts: Playfair for title, Inter for UI
- Icons: lucide-react 14px
- Style: rounded-md, transition-colors duration-150, reuse Register.jsx patterns
```

---

## 9. File References for AI Context

*   Reference UI: `src/pages/Register.jsx:1`
*   Fonts/Theme: `src/index.css:1`
*   Routes: `src/router/AppRoutes.jsx:9`
*   Layout: `src/layouts/MainLayout.jsx:1`
*   Entry: `src/main.jsx:1`

---

## 10. Future Tokens (If Needed)

If new states are required, derive from existing without adding hue:

*   **Error:** Use `text-[#E6444F]` already accent red (same as CTA).
*   **Disabled:** `bg-[#1c1825] opacity-50` + `cursor-not-allowed`.
*   **Overlay/Modal:** `bg-[#211D27]/80 backdrop-blur`.

> Any new token must be documented here before use.

---
Generated for AI assistance - keep this file updated when palette evolves.
