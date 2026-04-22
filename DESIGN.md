---
name: Murgia Liquori Visual Identity
version: 1.0.0
description: A high-fidelity, noir-brutalist heritage brand identity for Murgia Liquori, focusing on tradition and modern elegance.
colors:
  primary: "#F4B400"      # Villacidro Yellow
  secondary: "#FFFFFF"    # Pristine White
  background: "#000000"   # Obsidian Noir
  foreground: "#FFFFFF"   # Text Color
  accent: "#F4B400"       # High-contrast highlight
  muted: "#888888"        # Subtle metadata
  glass-bg: "rgba(10, 10, 10, 0.8)"
  glass-border: "rgba(244, 180, 0, 0.2)" # Subtle yellow border for glass

typography:
  display:
    fontFamily: "Bebas Neue"
    fontWeight: 400
    letterSpacing: "0.05em"
    textTransform: "uppercase"
  sans:
    fontFamily: "Poppins"
    fontWeight: 400
  brand:
    fontFamily: "Bebas Neue"
    fontWeight: 700

spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 32px
  xl: 64px
  xxl: 128px

rounded:
  none: 0px
  sm: 0px
  md: 0px
  lg: 0px
  full: 9999px

components:
  card:
    backgroundColor: "{colors.background}"
    borderColor: "{colors.primary}"
    borderWidth: "1px"
    padding: "{spacing.lg}"
  button-primary:
    backgroundColor: "transparent"
    borderColor: "{colors.primary}"
    textColor: "{colors.primary}"
    textTransform: "uppercase"
    padding: "{spacing.sm} {spacing.md}"
    hover:
      backgroundColor: "{colors.primary}"
      textColor: "{colors.background}"
  navbar:
    backgroundColor: "rgba(0, 0, 0, 0.95)"
    backdropBlur: "20px"
    borderColor: "{colors.primary}"
    height: "80px"
  bottle-spec:
    backgroundColor: "{colors.glass-bg}"
    borderColor: "{colors.glass-border}"
    textColor: "{colors.foreground}"
    padding: "{spacing.md}"
  ritual-step:
    numberColor: "{colors.primary}"
    titleColor: "{colors.foreground}"
    borderColor: "{colors.muted}"
---

## Overview
The Murgia brand is defined by its "Obsidian Noir" aesthetic, punctuated by the iconic "Villacidro Yellow." It blends Sardinian heritage with brutalist minimalism.

## Design Principles
1. **Heritage Brutalism**: Use sharp 90-degree corners (radius: 0) to evoke a sense of permanence and tradition.
2. **High-Contrast Narrative**: Text should almost always be White or Yellow on a deep Black background.
3. **Cinematic Motion**: Transitions should feel heavy and purposeful, using slow ease-in-out curves to mimic the viscosity of the spirits.
4. **Glass & Gold**: Utilize subtle glassmorphism with golden/yellow borders to highlight premium product details.

## Implementation Notes
- All borders should be exactly `1px` unless specified.
- Avoid using standard border-radius; buttons and containers must remain sharp.
- Typography for headlines must always be `Bebas Neue` with uppercase transform.
