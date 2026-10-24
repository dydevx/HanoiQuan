---
name: "Hà Nội Quán"
description: "Warm charcoal restaurant interface with food photography, burgundy regions and gold actions."
colors:
  ink: "#12100f"
  paper: "#171513"
  paper-2: "#211e1b"
  red: "#8e2922"
  red-dark: "#6f211c"
  gold: "#edb65c"
  muted: "#bbb3aa"
  line: "#453d35"
  white: "#faf7f2"
  gold-hover: "#f5cb89"
  selection-surface: "#3a2b20"
  action-surface: "#3c2b20"
  field-border: "#786857"
  photo-ground: "#6f211c"
typography:
  display:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(48px, 5.8vw, 84px)"
    fontWeight: 800
    lineHeight: 1.08
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(36px, 3.7vw, 52px)"
    fontWeight: 700
    lineHeight: 1.12
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Barlow Condensed, sans-serif"
    fontSize: "26px"
    fontWeight: 700
    lineHeight: 1.12
  body:
    fontFamily: "Manrope, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.6
  card-body:
    fontFamily: "Manrope, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "Manrope, sans-serif"
    fontSize: "13px"
    fontWeight: 800
  price:
    fontFamily: "Manrope, sans-serif"
    fontSize: "19px"
    fontWeight: 800
    lineHeight: 1
rounded:
  control: "8px"
  surface: "12px"
spacing:
  compact: "8px"
  small: "12px"
  mobile-grid: "16px"
  card: "22px"
  grid: "24px"
  shell: "28px"
  section-mobile: "60px"
  section: "88px"
components:
  button-primary:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "12px 24px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.gold-hover}"
  button-outline:
    backgroundColor: "rgb(20 16 13 / 45%)"
    textColor: "{colors.white}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "12px 24px"
    height: "48px"
  button-add:
    backgroundColor: "{colors.action-surface}"
    textColor: "{colors.gold}"
    rounded: "{rounded.control}"
    padding: "10px 14px"
    height: "44px"
  button-add-hover:
    backgroundColor: "{colors.gold}"
    textColor: "{colors.ink}"
  menu-card:
    backgroundColor: "{colors.paper-2}"
    textColor: "{colors.white}"
    rounded: "{rounded.surface}"
    padding: "22px"
  category:
    backgroundColor: "transparent"
    rounded: "{rounded.surface}"
    padding: "0; caption 16px 4px 8px"
    height: "auto; photo 4:3 plus 68px caption"
  category-active:
    backgroundColor: "transparent"
    textColor: "{colors.gold}"
  field:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.white}"
    rounded: "{rounded.control}"
    padding: "12px 13px"
---

# Design System: Hà Nội Quán

## Overview

**Creative North Star: "Warm charcoal, food first"**

This name describes the implemented direction; it is not an additional user-approved concept. Warm dark surfaces, generous food photography and direct gold actions present Hà Nội Quán. Raised warm charcoal anchors the closing order region. The retained restaurant logo carries the existing identity.

Text and navigation are restrained, while dish names use a compact condensed face. Tonal section changes connect browsing, restaurant information and checkout. This record was extracted from the final CSS cascade, HTML and menu renderer after a code-led refinement. Earlier light stylesheet declarations are superseded.

**Key Characteristics:**

- Warm charcoal backgrounds with slightly lighter containers.
- Gold for actions, prices and selection; burgundy for supporting regions.
- Manrope reading and headlines paired with Barlow Condensed dish headings.
- Rounded photo surfaces, native controls and visible keyboard focus.
- Dish photographs and explicit serving suggestions take priority over decoration.

## Colors

Warm neutrals support gold actions and deeper burgundy regions. The frontmatter records active values from the cascade.

### Primary

- **Warm gold (`gold`)** marks ordering actions, prices, selection borders and text links. The lighter hover variant indicates a state change.

### Secondary

- **Burgundy (`red`, `red-dark`)** remains in retained cart interactions. The closing order band uses raised charcoal (`paper-2`), keeping its gold action consistent with the rest of the page.

### Neutral

- **Charcoal ground (`paper`)** carries the page and header; **raised charcoal (`paper-2`)** carries cards, alternate sections and the drawer.
- **Deep ink (`ink`)** supplies dark text on gold and deeper cart regions.
- **Warm white (`white`)** carries main text; **warm grey (`muted`)** carries descriptions and supporting information.
- **Warm divider (`line`)** separates containers; fields use the stronger `field-border`.
- **Lacquer red photo ground (`photo-ground`)** provides the selected brand-colored fallback behind dish photography while images load.
- **Selection brown (`selection-surface`)** and **action brown (`action-surface`)** distinguish active categories and resting add buttons.

**The Action Gold Rule.** Use gold consistently for ordering, prices and selected states; keep long descriptive text neutral.

## Typography

**Display and Body Font:** Manrope, with a sans-serif fallback.

**Dish and Compact Heading Font:** Barlow Condensed, with a sans-serif fallback.

Local WOFF2 files load through `assets/fonts/fonts.css` with `font-display: swap`. Manrope provides weights 400, 600, 700 and 800; Barlow Condensed provides 600, 700 and 800. OFL notices remain in `assets/fonts/LICENSE-manrope.txt` and `assets/fonts/LICENSE-barlowcondensed.txt`.

### Hierarchy

- **Display:** The centered hero makes “Hà Nội Quán” the largest line in gold. “Smak Azji.” appears above in warm white at 56% of the main size, weight 700, with (12px) separation. Its maximum width is (800px), with a soft dark text shadow and (28px) separation from the description. At mobile widths it becomes `clamp(46px, 8.8vw, 68px)` and then `clamp(36px, 11.8vw, 50px)` at the narrowest breakpoint.
- **Headline:** Section headings use the headline role and become (34px) on mobile. Normal case and balanced wrapping remain.
- **Title:** Dish names use the title role and become (27px) on narrow screens. The menu toolbar uses Barlow Condensed at (28px), weight (700), line height (1.2).
- **Body:** General reading uses the body role; menu descriptions use card-body and become (14px) on narrow screens. Centered hero copy is warm white at (18px), line height (1.7), maximum width (500px), reducing to (15px) and (360px) on mobile. A stronger central overlay keeps the headline and description clear over the photograph.
- **Label:** Gold actions use the label role. Navigation is (13px), weight (600), without uppercase or tracking.
- **Price:** The price role uses tabular numerals to stabilize variant prices.

**The Two Voices Rule.** Use Manrope for reading and broad statements, and Barlow Condensed for dish identity and compact menu headings.

## Layout

The shared container caps at (1280px), with total horizontal subtraction of (64px) on desktop and (36px) on mobile. The sticky header is (80px) tall on desktop and (68px) on mobile.

Categories use seven equal columns with an (18px) gap. At (1120px) and below they become a horizontally scrollable rail with (156px) items and proximity snapping, reducing to (138px) items on mobile. Dish cards form two columns with a (24px) gap, reducing to (16px) on mobile and one column at (520px) and below.

The order shell combines the flexible menu with a (280px) sticky cart and (28px) separation. The cart sticks at (104px) from the top. At (1120px) and below, the summary hides and the floating cart accesses the drawer. The drawer width caps at (520px) and its height follows `100dvh`.

Section spacing generally spans (80–96px) on desktop, moving to (60px) for menu, story and contact on mobile. Story, full-menu and contact grids collapse at (780px). Page composition lives in `.impeccable/surfaces/home.md`.

## Elevation & Depth

Tonal layering and subtle borders establish most depth. Menu cards and the desktop cart have no resting shadow. Scrolled navigation, the drawer and floating cart use soft shadows; modal backdrops separate overlays. The hero's directional dark gradient keeps text legible over food photography.

### Shadow Vocabulary

- **Scrolled header** (`0 8px 24px rgb(0 0 0 / 20%)`): separates navigation during scrolling.
- **Drawer** (`-20px 0 60px rgba(0,0,0,.25)`): separates checkout from the page.
- **Floating cart** (`0 10px 30px rgba(0,0,0,.25)`): distinguishes the fixed mobile action.

**The Tonal Surface Rule.** Separate resting content through charcoal tone and spacing; reserve broad shadows for overlays and scrolled navigation.

## Shapes

Photos, cards, category tiles, menu-document links and the map share the surface radius. Buttons, fields and quantity controls share the tighter control radius. Menu cards clip imagery and have no outer border; category borders shift from warm divider to gold when selected.

Asian dish photographs fill their frame with `object-fit: cover` and per-dish focal positions. Most use (4:3); overhead plates use square frames, and servings with separate rice, noodles or sauce bowls use (4:5). Desktop pairs share the taller required frame, while single-column mobile cards use their own ratio. Preserve the photographed food when choosing a crop. All 40 sushi photographs are individually edited landscape (4:3) serving suggestions, with accompaniments integrated into the same photographed table. Sushi frames use `object-fit: cover` without a separate garnish layer. Editorial photographs and the hero use `object-fit: cover`.

## Components

### Buttons

Primary actions use gold and ink, the control radius and a minimum height of (48px). Outline actions use a translucent dark ground, warm white text and a muted warm border. Add buttons use brown and gold at rest, switching to gold and ink on hover or success; their minimum height is (44px). The header cart is also (44px) tall.

State changes are brief and generally avoid positional movement. Global keyboard focus uses a (3px) warm gold outline with (3px) offset. The inherited checkout field focus treatment is recorded as current source behavior in the sidecar, without promoting it into a preferred pattern.

### Category Selector

Each category presents a rounded (4:3) food photograph on a dark background above a centered name and count, without an outer card or filled caption. Captions have (16px 4px 8px) padding and a (68px) minimum height. Selection uses gold text and a short (36px) underline. Pointer hover gently lifts the image and brightens it, with reduced motion respected. Category thumbnails reuse representative wine-red menu photographs from `assets/menu-burgundy`. `aria-pressed` follows selection. Tablet and mobile scrolling preserve the full category set.

### Cards / Containers

A menu card places photography above a body with the card spacing token. A numbered title, neutral description and optional variant field lead to price and add action. Flexible layout holds the action row at the bottom. Descriptions remain visible. The cart shares raised charcoal and the surface radius.

### Inputs / Fields

Inputs and selects use page charcoal, warm white, stronger warm borders and the control radius. Variant selects are at least (44px) tall. Radio choices use a gold border when checked. Field errors use warm light red. Forms remain native and keyboard operable.

### Navigation

The retained logo and restaurant name sit opposite plain links and a gold cart control. Links shift to gold on hover. At (780px) and below, a (44px) menu button reveals a dark navigation panel. Brand text hides at (520px) and below; the original logo remains.

### Food Imagery and Serving Suggestions

The hero is an overhead composition based on the restaurant's phở, fried spring roll and sushi photographs, with dark table space for centered text and actions. The selected menu-background direction is wine red (`#6f211c`) and is deployed across all 72 production menu photographs: 32 Asian dishes and 40 sushi items. The same collection supplies the category thumbnails and story food photography so the visual system remains continuous. Each image keeps the photographed dish, serving pieces and accompaniments while recoloring the surrounding table/backdrop to a seamless wine-red surface while preserving texture, light and contact shadows. A visible Polish note identifies accompaniments as a serving suggestion; imagery does not establish price or inclusion promises.

Sources and exact generation prompts are in `assets/image-prompts.json`, `assets/sushi-edited/manifest.json`, `assets/sushi-edited/wasabi-bowls.json`, `assets/menu-red/manifest.json` and `assets/menu-burgundy/manifest.json`. The site serves responsive `hero-vietnamese-table` WebP derivatives and optimized production menu files from `assets/menu-burgundy`. The lacquer-red collection and original restaurant photographs remain in their prior directories. The previous transparent garnish is retained as a historical asset and is no longer rendered. New generated assets need equivalent provenance.

### Motion

Content is visible by default. Hero copy has one short entrance (650ms), easing `cubic-bezier(.22,1,.36,1)`, with a (14px) rise. The top (2px) progress line uses a CSS scroll timeline when supported. Dish images do not zoom on hover and menu cards do not replay entrances. Reduced-motion preferences suppress animation and transitions and disable smooth scrolling.

## Do's and Don'ts

### Do:

- **Do** preserve the original logo and Vietnamese diacritics.
- **Do** connect page sections and checkout with warm charcoal tones.
- **Do** pair gold actions and prices with neutral descriptive text.
- **Do** frame Asian dishes around the serving, using taller frames for multiple plates; keep sushi and its integrated accompaniments fully visible in landscape (4:3) photographs.
- **Do** retain serving-suggestion copy and raster provenance.
- **Do** keep focus visible, controls comfortably tappable and reduced motion supported.

### Don't:

- **Don't** infer the current palette from superseded light stylesheet declarations.
- **Don't** crop away food or shrink portrait dishes into wide side bars.
- **Don't** replace the original logo with a generated identity.
- **Don't** add decorative gold frames throughout the interface.
- **Don't** hide essential menu content behind entrance animations.
