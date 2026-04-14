---
description: Structured onboarding for new platform managers. Explains the Control Room and common management rituals.
---

# /onboarding - Platform Management Rituals

## Purpose
This workflow introduces a new manager to the **Murgia Control Room** architecture, explaining how to manage visits, marketing parameters, and platform thresholds without touching complex UI logic.

---

## Behavior
When `/onboarding` is triggered:

1. **Scan Current Levers**: Check `src/manifest/visit.ts` and `src/manifest/marketing.ts`.
2. **Display Status Board**: Present an Artifact showing:
   - **Visit Ritual**: Current date, price, and status.
   - **Marketing Ritual**: Active promo code, discount %, and shipping thresholds.
3. **Interactive Examples**: Show the manager exactly what to type to AG to change things.

---

## The Control Room Architecture

Instead of searching through UI components, always look in `src/manifest/`:

| File | Purpose |
|------|---------|
| `visit.ts` | Controls the Factory Visit date, price, and auto-expiration logic. |
| `marketing.ts` | Controls Promo Codes, Discount Percentages, and Free Shipping thresholds. |

---

## Component Registry (UI Mapping)

If you need to change a specific UI element, use these keywords to help AG find the right file:

| Component Name | File | Purpose |
| :--- | :--- | :--- |
| **Global Navbar** | `Navbar.tsx` | Main navigation, cart trigger, and visit status. |
| **Global Footer** | `Footer.tsx` | Newsletter, legal links, and social rituals. |
| **Visit Banner** | `VisitBanner.tsx` | The notification bar at the top for factory visits. |
| **Visit Drawer** | `VisitDrawer.tsx` | The sliding booking terminal for events. |
| **Promo Banner** | `PromoBanner.tsx` | The floating discount/promo code widget. |
| **Bag Drawer** | `BagDrawer.tsx` | The main shopping cart terminal. |
| **Aperitivo Section** | `AperitivoSection.tsx` | The interactive cocktail section on the homepage. |
| **Narrative Flow** | `NarrativeFlow.tsx` | The cinematic scrolling story on the homepage. |
| **Locations Map** | `LocationsSection.tsx` | The interactive store locator map. |

---

## Common Rituals (Prompt Examples)

### 1. Updating the Next Visit
> "AG, the next visit is now on May 15th. Price is 20€. Update the visit manifest."

### 2. Changing Promo Codes
> "AG, deactivate the current promo and create a new one: 'GOLDEN20' for 20% discount."

### 3. Adjusting Shipping Rituals
> "AG, increase the free shipping threshold to 100€."

---

## Key Principles for Managers
- **Centralized Truth**: Never edit hardcoded strings in `.tsx` files directly. Always use the Manifests.
- **Agent-First**: Talk to Antigravity. It knows the architecture and will ensure that changing a date in one place doesn't break the layout in another.
- **Verification**: Always ask AG to "Check the mobile view" after updating a banner.
