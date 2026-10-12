# Home surface

Target: `index.html`, including ordering, restaurant information and checkout.
Visitor mode: Persuade — discover the restaurant, browse dishes, act through WhatsApp, telephone or directions.

## Direction contract

**THESIS:** A direct restaurant introduction leads into an image-rich menu. This was a targeted, code-led evolution inspired by the user-provided Yobi restaurant reference, retaining Hà Nội Quán identity and its ordering workflow.

**OWN-WORLD:** Inherit `DESIGN.md`: warm charcoal sections, burgundy regions, gold controls, native fields, rounded photographic cards, Manrope and Barlow Condensed. The original restaurant logo remains the identity anchor.

**STORY:** Visitors see the cuisine and restaurant name, find local contact details, choose categories and priced variants, then send a cart for restaurant confirmation through WhatsApp. Original menu cards remain accessible in a lightbox.

**FIRST VIEWPORT:** A compact sticky header precedes an overhead photograph combining phở, fried spring rolls and sushi from restaurant source photos. “Hà Nội Quán” leads in large gold type, with the smaller warm-white “Smak Azji.” above it. The heading, description and two actions are centered in the dark table space on desktop; local information closes the hero. Mobile centers the same content while shifting the photograph toward the right-hand dishes and strengthening the overlay. The signature lightweight interaction is a CSS scroll-progress line.

**FORM:** Code-led targeted refinement of the existing restaurant landing page and menu. No decision comp was selected or approved. No randomized form-selection seed was used; none is retroactively invented.

**FINISH:** unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Content and asset constraints

- Retain the logo, restaurant name, Polish content, Srebrna 14 in Cieszyn, telephone `+48 579 344 577`, menu scans and WhatsApp cart.
- Preserve original protein prices. Dish 10 Kung Bao defaults to beef at 39 zł, matching the photographed protein and selected price. Tofu and other original variants remain selectable.
- Asian dishes 18 and 19 name the pictured sauce “Sos pekiński” (Peking sauce), as verified against the printed menu. There is no Kimchi sauce requirement. Asian dish 18 remains 39 zł; sushi S18 is a different dish at 30 zł.
- Asian dish numbers follow the printed menu: curry 13, sweet-and-sour 14, Bún bò Nam Bộ 28, dry chicken phở 29. Photo mappings are independent of dish numbering.
- Sushi serving suggestions show ginger, wasabi, wakame and soy sauce with visible Polish copy. Do not turn imagery into an inclusion or pricing promise.
- Wasabi is contained in a tiny ceramic condiment bowl across all 40 catalog photos and the hero. S32, S33 and S40 retain their existing bowls; the other 37 catalog images and hero have targeted wasabi-bowl edits. Prompts and follow-up framing corrections are recorded in `assets/sushi-edited/wasabi-bowls.json`.
- Hero and historical transparent garnish prompts are in `assets/image-prompts.json`. The current hero is `assets/hero-vietnamese-table.webp` with a 960px mobile derivative; its PNG and three restaurant food sources are retained. All 40 individually edited sushi prompts and source mappings are in `assets/sushi-edited/manifest.json`. Original photos remain; responsive hero WebP, Asian `assets/web/menu` copies and integrated sushi WebP photographs are delivery assets.
- S17/S18 photo references match their corrected source dishes; S35 uses the balanced-exposure derivative.
- Fonts load locally as WOFF2; TTF sources and OFL notices remain in `assets/fonts`.
- Category filters use rounded 4:3 photographs on dark backgrounds and centered captions, without outer card borders or filled captions. Gold text and a short underline identify selection. Existing local imagery is served through 480px WebP category derivatives. The seven-column desktop row becomes a snapping horizontal rail below 1120px; all categories, counts and filtering remain available. The all-dishes category uses the current hero photograph.
- Asian photographs use per-dish focal crops and taller frames for overhead or multi-plate servings. Desktop pairs align their image heights; mobile uses each dish's own frame. Sushi uses full landscape (4:3) photographs with serving-suggestion accompaniments integrated on the same table, without CSS overlays or side bars.

## Evidence and authority

Documentation was extracted from `css/style.css`, `index.html`, `js/main.js`, local font declarations and image provenance. Final evidence is `.impeccable/review/desktop-hero.png`, `desktop-menu.png`, `desktop-sushi.png`, `mobile-hero.png`, `mobile-menu.png`, `desktop.png` and `mobile.png`. The reviewer returned ship with no required visual fixes. Implementation verification asserted every original dish and variant price equal to HEAD.

The final parent report owns performance measurements and detailed verification. This brief does not claim a separate comp approval or accessibility certification. Existing legacy `PRODUCT.md` is preserved; schema migration was outside the authorized refinement.

The current wasabi-bowl refinement was visually checked across all 40 photographs and on desktop/mobile in `sushi-wasabi-bowl-desktop.png`, `sushi-wasabi-bowl-futomaki.png`, `sushi-wasabi-bowl-sets-desktop.png`, `sushi-wasabi-bowl-mobile.png`, `sushi-wasabi-bowl-set-mobile.png` and `wasabi-bowl-hero-desktop.png` / `wasabi-bowl-hero-mobile.png` under `.impeccable/review`. All 40 delivery photographs decode at 800×600; the menu no longer requests the transparent garnish. Current menu copies total 2,881,096 bytes. All 72 original dish and variant prices still match HEAD; category filters, sushi cart imagery and price, Asian note corrections, four viewport widths and responsive layouts were verified without JavaScript errors.
