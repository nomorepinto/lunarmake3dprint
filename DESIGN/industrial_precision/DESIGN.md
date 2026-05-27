---
name: Industrial Precision
colors:
  surface: '#faf9f7'
  surface-dim: '#dbdad8'
  surface-bright: '#faf9f7'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f3f1'
  surface-container: '#efeeec'
  surface-container-high: '#e9e8e6'
  surface-container-highest: '#e3e2e0'
  on-surface: '#1a1c1b'
  on-surface-variant: '#3f484a'
  inverse-surface: '#2f3130'
  inverse-on-surface: '#f1f1ef'
  outline: '#6f797a'
  outline-variant: '#bec8ca'
  surface-tint: '#176870'
  primary: '#00484e'
  on-primary: '#ffffff'
  primary-container: '#096169'
  on-primary-container: '#93d9e2'
  inverse-primary: '#8cd2db'
  secondary: '#5d5e61'
  on-secondary: '#ffffff'
  secondary-container: '#e2e2e5'
  on-secondary-container: '#636467'
  tertiary: '#3b4146'
  on-tertiary: '#ffffff'
  tertiary-container: '#52585e'
  on-tertiary-container: '#c8ced5'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#a7eef7'
  primary-fixed-dim: '#8cd2db'
  on-primary-fixed: '#001f23'
  on-primary-fixed-variant: '#004f56'
  secondary-fixed: '#e2e2e5'
  secondary-fixed-dim: '#c6c6c9'
  on-secondary-fixed: '#1a1c1e'
  on-secondary-fixed-variant: '#454749'
  tertiary-fixed: '#dde3ea'
  tertiary-fixed-dim: '#c1c7ce'
  on-tertiary-fixed: '#161c21'
  on-tertiary-fixed-variant: '#41474d'
  background: '#faf9f7'
  on-background: '#1a1c1b'
  surface-variant: '#e3e2e0'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  title-md:
    fontFamily: Hanken Grotesk
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  container_max_width: 1280px
  gutter: 24px
  margin_mobile: 16px
  margin_desktop: 40px
  stack_sm: 4px
  stack_md: 12px
  stack_lg: 24px
---

## Brand & Style
The design system is engineered for a high-end 3D printing service, balancing technical industrial capability with a premium, approachable user experience. The brand personality is precise, reliable, and sophisticated. 

The aesthetic follows a **Modern Minimalist** approach with a focus on structural clarity. It leverages a "Studio" feel—using the off-white background as a clean gallery space to showcase high-fidelity 3D renders. The interface uses subtle depth and intentional whitespace to mirror the precision of additive manufacturing, avoiding unnecessary decorative elements in favor of functional elegance.

## Colors
This design system utilizes a sophisticated, low-chroma palette centered around an industrial deep teal.

- **Primary Accent (#096169):** Used for primary actions, progress indicators, and key brand moments. It conveys stability and technical depth.
- **Background (#f7f6f4):** A warm off-white that reduces eye strain and provides a soft, paper-like quality to the workspace.
- **Neutrals:** We use a range of "Cool Grays" for secondary text and UI borders to maintain a clean, architectural feel. 
- **Surface Strategy:** Interactions happen on pure white (#ffffff) cards to create a distinct "layered" effect against the off-white background.

## Typography
The typography strategy emphasizes clarity and technical precision.

- **Headlines:** Uses **Hanken Grotesk** for a sharp, contemporary feel. Tight letter-spacing in larger sizes gives it a high-end, editorial look.
- **Body:** Uses **Inter** for its exceptional readability in data-dense environments (e.g., print settings, dimensions).
- **Technical Labels:** Uses **JetBrains Mono** for specialized data such as filament types, print times, and coordinate values. This monospaced touch reinforces the industrial, machine-led nature of the service.

## Layout & Spacing
The layout follows a **Fixed Grid** philosophy on desktop to maintain a controlled, professional structure, while transitioning to a fluid model on mobile.

- **Grid:** A 12-column grid system with 24px gutters.
- **Rhythm:** An 8px linear scale governs all padding and margins. 
- **Card Layouts:** Content should be grouped into cards with generous internal padding (32px) to ensure the 3D assets have "room to breathe." 
- **Mobile Adaptation:** On mobile, margins shrink to 16px and multi-column card layouts reflow into a single vertical stack.

## Elevation & Depth
This design system uses a **Tonal Layering** approach combined with **Ambient Shadows**.

- **Level 0 (Background):** #f7f6f4. The base canvas.
- **Level 1 (Cards/Surfaces):** #ffffff. Used for the primary content containers. 
- **Shadows:** Shadows are highly diffused and low-opacity (4-8% alpha) using the Deep Teal color as a shadow tint rather than pure black. This creates a more natural, "physical" presence on the off-white background.
- **Interaction:** Upon hover, cards should slightly lift (increase shadow spread) to signify interactivity.

## Shapes
The shape language is **Soft (0.25rem)**. 

While the 3D printing industry is often associated with sharp edges, this design system uses soft rounding to make the technology feel more approachable and user-friendly. 
- **Standard UI Elements:** (Buttons, Inputs) use a 4px radius.
- **Containers:** (Cards, Modals) use a 8px (Large) radius to differentiate them from smaller components.
- **Icons:** Should follow a 2px stroke weight with slightly rounded caps to match the UI's geometry.

## Components

- **Buttons:** Primary buttons are solid Deep Teal with white text. Secondary buttons use a ghost style with a 1px border (#e1e2e1) and Teal text.
- **Cards:** Cards are the primary vessel for information. They must have a subtle 1px border (#e1e2e1) and the Ambient Shadow defined in the Elevation section.
- **Input Fields:** Use a white background with a light gray border. On focus, the border transitions to Deep Teal with a 2px thickness.
- **Status Chips:** Use a pill-shaped geometry. For technical states (e.g., "Printing", "Cooling"), use the monospaced Label font.
- **Progress Indicators:** Use the Deep Teal for the active track. Use the off-white background color for the inactive track to maintain a "cut-out" look.
- **3D Preview Container:** A dedicated viewport component with a subtle inner shadow to give the impression of a physical printing chamber.