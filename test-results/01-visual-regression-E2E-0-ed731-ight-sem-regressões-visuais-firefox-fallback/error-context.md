# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 01-visual-regression.spec.ts >> E2E-01: Visual Regression & Canvas WebGL Snapshot Testing >> deve renderizar a Landing Page nos temas Dark e Light sem regressões visuais
- Location: e2e\01-visual-regression.spec.ts:8:7

# Error details

```
Error: expect(page).toHaveScreenshot(expected) failed

  53768 pixels (ratio 0.06 of all image pixels) are different.

  Snapshot: landing-page-light.png

Call log:
  - Expect "toHaveScreenshot(landing-page-light.png)" with timeout 5000ms
    - verifying given screenshot expectation
  - taking page screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - 50809 pixels (ratio 0.06 of all image pixels) are different.
  - waiting 100ms before taking screenshot
  - taking page screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - captured a stable screenshot
  - 53768 pixels (ratio 0.06 of all image pixels) are different.

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - banner [ref=e2]:
    - navigation "Main" [ref=e3]:
      - link "Canvas UI home" [ref=e4] [cursor=pointer]:
        - /url: /
        - img "Canvas UI" [ref=e5]
      - list [ref=e6]:
        - listitem [ref=e7]:
          - link "Docs" [ref=e8] [cursor=pointer]:
            - /url: /docs
        - listitem [ref=e9]:
          - link "Components" [ref=e10] [cursor=pointer]:
            - /url: /components
        - listitem [ref=e11]:
          - link "Playground" [ref=e12] [cursor=pointer]:
            - /url: /playground
      - generic [ref=e13]:
        - button "Search" [ref=e14]
        - button "Switch to light mode" [active] [ref=e18]
        - link "Canvas UI on GitHub, 2878 stars" [ref=e31] [cursor=pointer]:
          - /url: https://github.com/DavidHDev/canvas-ui
          - generic [ref=e34]: 2.9k
  - main [ref=e35]:
    - generic [ref=e36]:
      - generic [ref=e39]:
        - generic [ref=e40]:
          - heading "Creative components, in a new dimension." [level=1] [ref=e41]
          - paragraph [ref=e42]: An open source library of tasteful html-in-canvas & WebGL components. Framework agnostic. Copy, paste, ship.
          - generic [ref=e43]:
            - link "Get started" [ref=e44] [cursor=pointer]:
              - /url: /docs
            - link "Browse components" [ref=e48] [cursor=pointer]:
              - /url: /components
        - generic [ref=e53]:
          - generic [ref=e54]:
            - paragraph [ref=e56]: Components
            - paragraph [ref=e57]: "33"
            - paragraph [ref=e58]: And counting
          - generic [ref=e59]:
            - paragraph [ref=e61]: Open source
            - paragraph [ref=e62]: 100%
            - paragraph [ref=e63]: Free forever
          - generic [ref=e64]:
            - generic [ref=e66]:
              - paragraph [ref=e67]: Install
              - paragraph [ref=e68]: One command
            - generic [ref=e69]:
              - code [ref=e70]: npx shadcn@latest add @canvas-ui/particle-reveal-react
              - button "Copy to clipboard" [ref=e71]
      - region [ref=e78]:
        - generic [ref=e81]:
          - generic [ref=e82]:
            - paragraph [ref=e83]: The library
            - heading "Every component, alive on canvas." [level=2] [ref=e84]
          - link "Browse all" [ref=e85] [cursor=pointer]:
            - /url: /components
        - generic [ref=e90]:
          - generic [ref=e92]:
            - list [ref=e93]:
              - listitem [ref=e94]:
                - link [ref=e95] [cursor=pointer]:
                  - /url: /docs/components/ascii-object
                  - generic [ref=e98]:
                    - heading "ASCII Object" [level=3] [ref=e99]
                    - paragraph [ref=e100]: Any GLB/glTF model, SVG, or image floating in a studio scene, redrawn as shape-matched ASCII characters.
              - listitem [ref=e101]:
                - link [ref=e102] [cursor=pointer]:
                  - /url: /docs/components/asciify
                  - generic [ref=e105]:
                    - heading "Asciify" [level=3] [ref=e106]
                    - paragraph [ref=e107]: A soft lens that follows your cursor and redraws the live HTML beneath it as ascii characters.
              - listitem [ref=e108]:
                - link [ref=e109] [cursor=pointer]:
                  - /url: /docs/components/bend
                  - generic [ref=e112]:
                    - heading "Bend" [level=3] [ref=e113]
                    - paragraph [ref=e114]: Folds the top and bottom of your live HTML over straight virtual edges, like scrolling on the face of a cube.
              - listitem [ref=e115]:
                - link [ref=e116] [cursor=pointer]:
                  - /url: /docs/components/blaze
                  - generic [ref=e119]:
                    - heading "Blaze" [level=3] [ref=e120]
                    - paragraph [ref=e121]: Fire sparks, smoke, and heat distortion rising over your live HTML.
              - listitem [ref=e122]:
                - link [ref=e123] [cursor=pointer]:
                  - /url: /docs/components/bubble
                  - generic [ref=e126]:
                    - heading "Bubble" [level=3] [ref=e127]
                    - paragraph [ref=e128]: A glassy droplet that trails the cursor as blending metaballs and refracts the live page beneath it.
              - listitem [ref=e129]:
                - link [ref=e130] [cursor=pointer]:
                  - /url: /docs/components/canvas
                  - generic [ref=e133]:
                    - heading "Canvas" [level=3] [ref=e134]
                    - paragraph [ref=e135]: Paints your live HTML onto woven artist canvas, with a cursor that drags ridges of wet paint across the weave.
              - listitem [ref=e136]:
                - link [ref=e137] [cursor=pointer]:
                  - /url: /docs/components/cloth
                  - generic [ref=e140]:
                    - heading "Cloth" [level=3] [ref=e141]
                    - paragraph [ref=e142]: Hangs your live HTML on fabric rippling in the wind. Cursor strokes send waves across the cloth.
              - listitem [ref=e143]:
                - link [ref=e144] [cursor=pointer]:
                  - /url: /docs/components/clouds
                  - generic [ref=e147]:
                    - heading "Clouds" [level=3] [ref=e148]
                    - paragraph [ref=e149]: Theme-aware mist that blurs and refracts your live HTML, parted by cursor wind.
              - listitem [ref=e150]:
                - link [ref=e151] [cursor=pointer]:
                  - /url: /docs/components/decrypt-reveal
                  - generic [ref=e154]:
                    - heading "Decrypt Reveal" [level=3] [ref=e155]
                    - paragraph [ref=e156]: Renders your live HTML as ASCII cipher text that decrypts into the crisp UI around the cursor.
              - listitem [ref=e157]:
                - link [ref=e158] [cursor=pointer]:
                  - /url: /docs/components/dithered-object
                  - generic [ref=e161]:
                    - heading "Dithered Object" [level=3] [ref=e162]
                    - paragraph [ref=e163]: Any GLB/glTF model, SVG, or image floating in a studio scene, rendered through a 1-bit dither.
              - listitem [ref=e164]:
                - link [ref=e165] [cursor=pointer]:
                  - /url: /docs/components/displacement
                  - generic [ref=e168]:
                    - heading "Displacement" [level=3] [ref=e169]
                    - paragraph [ref=e170]: A displacement grid that ripples your live HTML away from the cursor, with color fringing and grain.
              - listitem [ref=e171]:
                - link [ref=e172] [cursor=pointer]:
                  - /url: /docs/components/droplets
                  - generic [ref=e175]:
                    - heading "Droplets" [level=3] [ref=e176]
                    - paragraph [ref=e177]: Rain droplets that run down the screen and refract your live HTML.
              - listitem [ref=e178]:
                - link [ref=e179] [cursor=pointer]:
                  - /url: /docs/components/flame-wrap
                  - generic [ref=e182]:
                    - heading "Flame Wrap" [level=3] [ref=e183]
                    - paragraph [ref=e184]: Wraps any element in a border of fire with molten edges, sparks, and heat shimmer.
              - listitem [ref=e185]:
                - link [ref=e186] [cursor=pointer]:
                  - /url: /docs/components/force-field
                  - generic [ref=e189]:
                    - heading "Force Field" [level=3] [ref=e190]
                    - paragraph [ref=e191]: An energy shield over your live HTML where clicks detonate shockwaves that refract the page.
              - listitem [ref=e192]:
                - link [ref=e193] [cursor=pointer]:
                  - /url: /docs/components/frost
                  - generic [ref=e196]:
                    - heading "Frost" [level=3] [ref=e197]
                    - paragraph [ref=e198]: A frozen pane of ice over your live HTML that melts under the cursor and refreezes.
              - listitem [ref=e199]:
                - link [ref=e200] [cursor=pointer]:
                  - /url: /docs/components/glass
                  - generic [ref=e203]:
                    - heading "Glass" [level=3] [ref=e204]
                    - paragraph [ref=e205]: A cursor-following glass lens that refracts your live HTML and zooms in on targets like a crystal ball.
              - listitem [ref=e206]:
                - link [ref=e207] [cursor=pointer]:
                  - /url: /docs/components/glass-object
                  - generic [ref=e210]:
                    - heading "Glass Object" [level=3] [ref=e211]
                    - paragraph [ref=e212]: Turns any 3D model, SVG, or image into floating liquid glass with real refraction, dispersion, and frost.
            - list [ref=e213]:
              - listitem [ref=e214]:
                - link [ref=e215] [cursor=pointer]:
                  - /url: /docs/components/ascii-object
                  - generic [ref=e218]:
                    - heading [level=3] [ref=e219]: ASCII Object
                    - paragraph [ref=e220]: Any GLB/glTF model, SVG, or image floating in a studio scene, redrawn as shape-matched ASCII characters.
              - listitem [ref=e221]:
                - link [ref=e222] [cursor=pointer]:
                  - /url: /docs/components/asciify
                  - generic [ref=e225]:
                    - heading [level=3] [ref=e226]: Asciify
                    - paragraph [ref=e227]: A soft lens that follows your cursor and redraws the live HTML beneath it as ascii characters.
              - listitem [ref=e228]:
                - link [ref=e229] [cursor=pointer]:
                  - /url: /docs/components/bend
                  - generic [ref=e232]:
                    - heading [level=3] [ref=e233]: Bend
                    - paragraph [ref=e234]: Folds the top and bottom of your live HTML over straight virtual edges, like scrolling on the face of a cube.
              - listitem [ref=e235]:
                - link [ref=e236] [cursor=pointer]:
                  - /url: /docs/components/blaze
                  - generic [ref=e239]:
                    - heading [level=3] [ref=e240]: Blaze
                    - paragraph [ref=e241]: Fire sparks, smoke, and heat distortion rising over your live HTML.
              - listitem [ref=e242]:
                - link [ref=e243] [cursor=pointer]:
                  - /url: /docs/components/bubble
                  - generic [ref=e246]:
                    - heading [level=3] [ref=e247]: Bubble
                    - paragraph [ref=e248]: A glassy droplet that trails the cursor as blending metaballs and refracts the live page beneath it.
              - listitem [ref=e249]:
                - link [ref=e250] [cursor=pointer]:
                  - /url: /docs/components/canvas
                  - generic [ref=e253]:
                    - heading [level=3] [ref=e254]: Canvas
                    - paragraph [ref=e255]: Paints your live HTML onto woven artist canvas, with a cursor that drags ridges of wet paint across the weave.
              - listitem [ref=e256]:
                - link [ref=e257] [cursor=pointer]:
                  - /url: /docs/components/cloth
                  - generic [ref=e260]:
                    - heading [level=3] [ref=e261]: Cloth
                    - paragraph [ref=e262]: Hangs your live HTML on fabric rippling in the wind. Cursor strokes send waves across the cloth.
              - listitem [ref=e263]:
                - link [ref=e264] [cursor=pointer]:
                  - /url: /docs/components/clouds
                  - generic [ref=e267]:
                    - heading [level=3] [ref=e268]: Clouds
                    - paragraph [ref=e269]: Theme-aware mist that blurs and refracts your live HTML, parted by cursor wind.
              - listitem [ref=e270]:
                - link [ref=e271] [cursor=pointer]:
                  - /url: /docs/components/decrypt-reveal
                  - generic [ref=e274]:
                    - heading [level=3] [ref=e275]: Decrypt Reveal
                    - paragraph [ref=e276]: Renders your live HTML as ASCII cipher text that decrypts into the crisp UI around the cursor.
              - listitem [ref=e277]:
                - link [ref=e278] [cursor=pointer]:
                  - /url: /docs/components/dithered-object
                  - generic [ref=e281]:
                    - heading [level=3] [ref=e282]: Dithered Object
                    - paragraph [ref=e283]: Any GLB/glTF model, SVG, or image floating in a studio scene, rendered through a 1-bit dither.
              - listitem [ref=e284]:
                - link [ref=e285] [cursor=pointer]:
                  - /url: /docs/components/displacement
                  - generic [ref=e288]:
                    - heading [level=3] [ref=e289]: Displacement
                    - paragraph [ref=e290]: A displacement grid that ripples your live HTML away from the cursor, with color fringing and grain.
              - listitem [ref=e291]:
                - link [ref=e292] [cursor=pointer]:
                  - /url: /docs/components/droplets
                  - generic [ref=e295]:
                    - heading [level=3] [ref=e296]: Droplets
                    - paragraph [ref=e297]: Rain droplets that run down the screen and refract your live HTML.
              - listitem [ref=e298]:
                - link [ref=e299] [cursor=pointer]:
                  - /url: /docs/components/flame-wrap
                  - generic [ref=e302]:
                    - heading [level=3] [ref=e303]: Flame Wrap
                    - paragraph [ref=e304]: Wraps any element in a border of fire with molten edges, sparks, and heat shimmer.
              - listitem [ref=e305]:
                - link [ref=e306] [cursor=pointer]:
                  - /url: /docs/components/force-field
                  - generic [ref=e309]:
                    - heading [level=3] [ref=e310]: Force Field
                    - paragraph [ref=e311]: An energy shield over your live HTML where clicks detonate shockwaves that refract the page.
              - listitem [ref=e312]:
                - link [ref=e313] [cursor=pointer]:
                  - /url: /docs/components/frost
                  - generic [ref=e316]:
                    - heading [level=3] [ref=e317]: Frost
                    - paragraph [ref=e318]: A frozen pane of ice over your live HTML that melts under the cursor and refreezes.
              - listitem [ref=e319]:
                - link [ref=e320] [cursor=pointer]:
                  - /url: /docs/components/glass
                  - generic [ref=e323]:
                    - heading [level=3] [ref=e324]: Glass
                    - paragraph [ref=e325]: A cursor-following glass lens that refracts your live HTML and zooms in on targets like a crystal ball.
              - listitem [ref=e326]:
                - link [ref=e327] [cursor=pointer]:
                  - /url: /docs/components/glass-object
                  - generic [ref=e330]:
                    - heading [level=3] [ref=e331]: Glass Object
                    - paragraph [ref=e332]: Turns any 3D model, SVG, or image into floating liquid glass with real refraction, dispersion, and frost.
          - generic [ref=e334]:
            - list [ref=e335]:
              - listitem [ref=e336]:
                - link [ref=e337] [cursor=pointer]:
                  - /url: /docs/components/glitch
                  - generic [ref=e340]:
                    - heading "Glitch" [level=3] [ref=e341]
                    - paragraph [ref=e342]: Broadcast glitch bursts that tear your live HTML into shifted slices with RGB splits and corrupted blocks.
              - listitem [ref=e343]:
                - link [ref=e344] [cursor=pointer]:
                  - /url: /docs/components/glyph-rain
                  - generic [ref=e347]:
                    - heading "Glyph Rain" [level=3] [ref=e348]
                    - paragraph [ref=e349]: Falling glyph streams that light up your live HTML, with drop heads that surge where your cursor cuts through.
              - listitem [ref=e350]:
                - link [ref=e351] [cursor=pointer]:
                  - /url: /docs/components/grid
                  - generic [ref=e354]:
                    - heading "Grid" [level=3] [ref=e355]
                    - paragraph [ref=e356]: 3D tiles that ripple in staggered waves around the cursor over your live HTML.
              - listitem [ref=e357]:
                - link [ref=e358] [cursor=pointer]:
                  - /url: /docs/components/hex-float
                  - generic [ref=e361]:
                    - heading "Hex Float" [level=3] [ref=e362]
                    - paragraph [ref=e363]: Your live HTML on shiny floating hex tiles with perspective tilt and cursor lift.
              - listitem [ref=e364]:
                - link [ref=e365] [cursor=pointer]:
                  - /url: /docs/components/laser
                  - generic [ref=e368]:
                    - heading "Laser" [level=3] [ref=e369]
                    - paragraph [ref=e370]: A laser beam near the bottom of the viewport that reveals your live HTML from behind it on scroll.
              - listitem [ref=e371]:
                - link [ref=e372] [cursor=pointer]:
                  - /url: /docs/components/liquid
                  - generic [ref=e375]:
                    - heading "Liquid" [level=3] [ref=e376]
                    - paragraph [ref=e377]: A pointer-driven WebGL fluid simulation that runs over your live HTML.
              - listitem [ref=e378]:
                - link [ref=e379] [cursor=pointer]:
                  - /url: /docs/components/magnify
                  - generic [ref=e382]:
                    - heading "Magnify" [level=3] [ref=e383]
                    - paragraph [ref=e384]: A sci-fi scanner lens that magnifies your live HTML inside a HUD reticle, with click ripples that bend the page.
              - listitem [ref=e385]:
                - link [ref=e386] [cursor=pointer]:
                  - /url: /docs/components/particle-object
                  - generic [ref=e389]:
                    - heading "Particle Object" [level=3] [ref=e390]
                    - paragraph [ref=e391]: Rebuilds any 3D model, SVG, or image as particles that scatter around the cursor and spring back into shape.
              - listitem [ref=e392]:
                - link [ref=e393] [cursor=pointer]:
                  - /url: /docs/components/particle-reveal
                  - generic [ref=e396]:
                    - heading "Particle Reveal" [level=3] [ref=e397]
                    - paragraph [ref=e398]: Renders your live HTML as fine readable particles that merge into the crisp UI around the cursor.
              - listitem [ref=e399]:
                - link [ref=e400] [cursor=pointer]:
                  - /url: /docs/components/particle-scroll
                  - generic [ref=e403]:
                    - heading "Particle Scroll" [level=3] [ref=e404]
                    - paragraph [ref=e405]: Dissolves your live HTML below a chosen line into fine sand particles that reassemble on scroll.
              - listitem [ref=e406]:
                - link [ref=e407] [cursor=pointer]:
                  - /url: /docs/components/peel
                  - generic [ref=e410]:
                    - heading "Peel" [level=3] [ref=e411]
                    - paragraph [ref=e412]: Peels your live HTML back from a chosen edge on hover, revealing a second layer underneath.
              - listitem [ref=e413]:
                - link [ref=e414] [cursor=pointer]:
                  - /url: /docs/components/retro-dither
                  - generic [ref=e417]:
                    - heading "Retro Dither" [level=3] [ref=e418]
                    - paragraph [ref=e419]: A retro dither lens that pixelates your live HTML around the cursor.
              - listitem [ref=e420]:
                - link [ref=e421] [cursor=pointer]:
                  - /url: /docs/components/ripple
                  - generic [ref=e424]:
                    - heading "Ripple" [level=3] [ref=e425]
                    - paragraph [ref=e426]: Water ripples that spread from every click and refract your live HTML like a pond surface.
              - listitem [ref=e427]:
                - link [ref=e428] [cursor=pointer]:
                  - /url: /docs/components/shatter
                  - generic [ref=e431]:
                    - heading "Shatter" [level=3] [ref=e432]
                    - paragraph [ref=e433]: Breaks your live HTML into 3D glass shards that lift, float, and refract around the cursor, with perspective and soft shadows.
              - listitem [ref=e434]:
                - link [ref=e435] [cursor=pointer]:
                  - /url: /docs/components/liquid-object
                  - generic [ref=e438]:
                    - heading "Liquid Object" [level=3] [ref=e439]
                    - paragraph [ref=e440]: Drags any 3D model, SVG, or image through invisible liquid that swirls under the cursor and splits the light into color.
              - listitem [ref=e441]:
                - link [ref=e442] [cursor=pointer]:
                  - /url: /docs/components/vhs
                  - generic [ref=e445]:
                    - heading "VHS" [level=3] [ref=e446]
                    - paragraph [ref=e447]: Worn tape playback with wave, head-switching noise, chroma bleed, and grain over your live HTML.
            - list [ref=e448]:
              - listitem [ref=e449]:
                - link [ref=e450] [cursor=pointer]:
                  - /url: /docs/components/glitch
                  - generic [ref=e453]:
                    - heading [level=3] [ref=e454]: Glitch
                    - paragraph [ref=e455]: Broadcast glitch bursts that tear your live HTML into shifted slices with RGB splits and corrupted blocks.
              - listitem [ref=e456]:
                - link [ref=e457] [cursor=pointer]:
                  - /url: /docs/components/glyph-rain
                  - generic [ref=e460]:
                    - heading [level=3] [ref=e461]: Glyph Rain
                    - paragraph [ref=e462]: Falling glyph streams that light up your live HTML, with drop heads that surge where your cursor cuts through.
              - listitem [ref=e463]:
                - link [ref=e464] [cursor=pointer]:
                  - /url: /docs/components/grid
                  - generic [ref=e467]:
                    - heading [level=3] [ref=e468]: Grid
                    - paragraph [ref=e469]: 3D tiles that ripple in staggered waves around the cursor over your live HTML.
              - listitem [ref=e470]:
                - link [ref=e471] [cursor=pointer]:
                  - /url: /docs/components/hex-float
                  - generic [ref=e474]:
                    - heading [level=3] [ref=e475]: Hex Float
                    - paragraph [ref=e476]: Your live HTML on shiny floating hex tiles with perspective tilt and cursor lift.
              - listitem [ref=e477]:
                - link [ref=e478] [cursor=pointer]:
                  - /url: /docs/components/laser
                  - generic [ref=e481]:
                    - heading [level=3] [ref=e482]: Laser
                    - paragraph [ref=e483]: A laser beam near the bottom of the viewport that reveals your live HTML from behind it on scroll.
              - listitem [ref=e484]:
                - link [ref=e485] [cursor=pointer]:
                  - /url: /docs/components/liquid
                  - generic [ref=e488]:
                    - heading [level=3] [ref=e489]: Liquid
                    - paragraph [ref=e490]: A pointer-driven WebGL fluid simulation that runs over your live HTML.
              - listitem [ref=e491]:
                - link [ref=e492] [cursor=pointer]:
                  - /url: /docs/components/magnify
                  - generic [ref=e495]:
                    - heading [level=3] [ref=e496]: Magnify
                    - paragraph [ref=e497]: A sci-fi scanner lens that magnifies your live HTML inside a HUD reticle, with click ripples that bend the page.
              - listitem [ref=e498]:
                - link [ref=e499] [cursor=pointer]:
                  - /url: /docs/components/particle-object
                  - generic [ref=e502]:
                    - heading [level=3] [ref=e503]: Particle Object
                    - paragraph [ref=e504]: Rebuilds any 3D model, SVG, or image as particles that scatter around the cursor and spring back into shape.
              - listitem [ref=e505]:
                - link [ref=e506] [cursor=pointer]:
                  - /url: /docs/components/particle-reveal
                  - generic [ref=e509]:
                    - heading [level=3] [ref=e510]: Particle Reveal
                    - paragraph [ref=e511]: Renders your live HTML as fine readable particles that merge into the crisp UI around the cursor.
              - listitem [ref=e512]:
                - link [ref=e513] [cursor=pointer]:
                  - /url: /docs/components/particle-scroll
                  - generic [ref=e516]:
                    - heading [level=3] [ref=e517]: Particle Scroll
                    - paragraph [ref=e518]: Dissolves your live HTML below a chosen line into fine sand particles that reassemble on scroll.
              - listitem [ref=e519]:
                - link [ref=e520] [cursor=pointer]:
                  - /url: /docs/components/peel
                  - generic [ref=e523]:
                    - heading [level=3] [ref=e524]: Peel
                    - paragraph [ref=e525]: Peels your live HTML back from a chosen edge on hover, revealing a second layer underneath.
              - listitem [ref=e526]:
                - link [ref=e527] [cursor=pointer]:
                  - /url: /docs/components/retro-dither
                  - generic [ref=e530]:
                    - heading [level=3] [ref=e531]: Retro Dither
                    - paragraph [ref=e532]: A retro dither lens that pixelates your live HTML around the cursor.
              - listitem [ref=e533]:
                - link [ref=e534] [cursor=pointer]:
                  - /url: /docs/components/ripple
                  - generic [ref=e537]:
                    - heading [level=3] [ref=e538]: Ripple
                    - paragraph [ref=e539]: Water ripples that spread from every click and refract your live HTML like a pond surface.
              - listitem [ref=e540]:
                - link [ref=e541] [cursor=pointer]:
                  - /url: /docs/components/shatter
                  - generic [ref=e544]:
                    - heading [level=3] [ref=e545]: Shatter
                    - paragraph [ref=e546]: Breaks your live HTML into 3D glass shards that lift, float, and refract around the cursor, with perspective and soft shadows.
              - listitem [ref=e547]:
                - link [ref=e548] [cursor=pointer]:
                  - /url: /docs/components/liquid-object
                  - generic [ref=e551]:
                    - heading [level=3] [ref=e552]: Liquid Object
                    - paragraph [ref=e553]: Drags any 3D model, SVG, or image through invisible liquid that swirls under the cursor and splits the light into color.
              - listitem [ref=e554]:
                - link [ref=e555] [cursor=pointer]:
                  - /url: /docs/components/vhs
                  - generic [ref=e558]:
                    - heading [level=3] [ref=e559]: VHS
                    - paragraph [ref=e560]: Worn tape playback with wave, head-switching noise, chroma bleed, and grain over your live HTML.
      - region [ref=e561]:
        - generic [ref=e564]:
          - generic [ref=e565]:
            - paragraph [ref=e566]: How it works
            - heading "Copy, paste, ship." [level=2] [ref=e567]
          - generic [ref=e568]:
            - list [ref=e569]:
              - listitem [ref=e570]:
                - button [ref=e571]:
                  - paragraph [ref=e572]: "01"
                  - heading "Pick a component" [level=3] [ref=e573]
                  - paragraph [ref=e576]: Browse the library and find the effect that fits. Every demo on this site is the real component, running live.
              - listitem [ref=e579]:
                - button [ref=e580]:
                  - paragraph [ref=e581]: "02"
                  - heading "Run one command" [level=3] [ref=e582]
                  - paragraph [ref=e583]: The shadcn CLI pulls the full source into your project. No package to install, no version to pin.
              - listitem [ref=e585]:
                - button [ref=e586]:
                  - paragraph [ref=e587]: "03"
                  - heading "Make it yours" [level=3] [ref=e588]
                  - paragraph [ref=e589]: The code lives in your repo from day one. Tune the props, restyle it, or rip it apart. It's yours.
            - generic [ref=e592]:
              - generic [ref=e593]: canvasui.dev/components
              - generic [ref=e600]:
                - generic [ref=e601]: Blaze
                - generic [ref=e602]: Liquid
                - generic [ref=e603]: Glass
                - generic [ref=e604]: Shatter
                - generic [ref=e605]: Particle Reveal
                - generic [ref=e606]: VHS
      - region [ref=e609]:
        - generic [ref=e613]:
          - generic [ref=e614]:
            - paragraph [ref=e615]: Framework agnostic
            - heading "One component, six flavors." [level=2] [ref=e616]
            - paragraph [ref=e617]: Every effect ships as React, Solid, Preact, Vue, Svelte, and dependency-free vanilla TypeScript. Same engine, same props, native to your stack.
          - generic [ref=e619]:
            - generic [ref=e620]:
              - combobox "Framework" [ref=e621] [cursor=pointer]:
                - generic [ref=e622]: React
              - textbox [ref=e626]: react
              - generic [ref=e627]:
                - generic [ref=e628]: hero.tsx
                - button "Copy to clipboard" [ref=e629]
            - code [ref=e638]:
              - generic [ref=e639]: "import { ParticleReveal } from \"@/components/canvasui/ParticleReveal\";"
              - generic [ref=e640]: "export function Hero() {"
              - generic [ref=e641]: return (
              - generic [ref=e642]: "<ParticleReveal radius={300}>"
              - generic [ref=e643]: <YourContent />
              - generic [ref=e644]: </ParticleReveal>
              - generic [ref=e645]: );
              - generic [ref=e646]: "}"
      - region [ref=e647]:
        - generic [ref=e651]:
          - generic [ref=e653]:
            - generic [ref=e654]:
              - paragraph [ref=e655]: Agent
              - generic [ref=e656]: MCP connected
            - generic [ref=e658]:
              - paragraph [ref=e660]: Add a particle reveal effect to my hero section
              - paragraph [ref=e662]: Found particle-reveal in the Canvas UI registry. Installing it now.
              - generic [ref=e664]:
                - generic [ref=e665]:
                  - generic [ref=e666]: shadcn CLI
                  - img "Installing" [ref=e670]
                - paragraph [ref=e672]: npx shadcn@latest add @canvas-ui/particle-reveal-react
              - paragraph [ref=e674]: Done. ParticleReveal.tsx is in components/canvasui, wired into your hero.
            - generic [ref=e676]:
              - textbox:
                - /placeholder: Ask your agent anything…
              - button
          - generic [ref=e677]:
            - paragraph [ref=e678]: AI-ready
            - heading "Built for agents." [level=2] [ref=e679]
            - paragraph [ref=e680]: The registry speaks the shadcn protocol, so any assistant with the shadcn MCP server can browse the library, read the docs, and install components, all from a single prompt.
            - link "Set up the MCP server" [ref=e681] [cursor=pointer]:
              - /url: /docs/mcp
      - region [ref=e685]:
        - generic [ref=e689]:
          - generic [ref=e690]:
            - paragraph [ref=e691]: FAQ
            - heading "Good questions." [level=2] [ref=e692]
          - generic [ref=e694]:
            - generic [ref=e695]:
              - button "Is Canvas UI free to use?" [expanded] [ref=e696]
              - paragraph [ref=e703]: "Yes. Canvas UI is licensed under MIT + Commons Clause: use every component in any personal or commercial app or website, free forever. The only restriction is reselling or redistributing the components themselves, whether alone, in a bundle, or as a port."
            - generic [ref=e704]:
              - button "Which browsers are supported?" [ref=e705]
              - paragraph [ref=e710]: "Components that draw live HTML on canvas rely on an experimental browser capability, available today in Chrome behind a flag. Everywhere else they degrade gracefully: your content renders as regular HTML, and effects like Blaze, Liquid, Laser, Clouds, Bubble, Droplets, Glass, Magnify, Grid, and Ripple keep running as a pure WebGL overlay on top of it. WebGL-based components work in every modern browser."
            - generic [ref=e711]:
              - button "Will it slow my site down?" [ref=e712]
              - paragraph [ref=e717]: The effects render on the GPU via WebGL and animate outside React's render cycle. Each component initializes only when mounted, pauses when off-screen, and cleans up fully on unmount. Reduced-motion preferences are respected.
            - generic [ref=e718]:
              - button "Do I need React?" [ref=e719]
              - paragraph [ref=e724]: "No. Every component ships in six flavors: React, Solid, Preact, Vue, Svelte, and dependency-free vanilla TypeScript. Same engine and the same options in all of them."
            - generic [ref=e725]:
              - button "How do updates work?" [ref=e726]
              - paragraph [ref=e731]: The code is copied into your repo, so nothing updates from under you. When a component improves, re-run the install command to pull the latest version, or just keep your copy and evolve it yourself.
    - region [ref=e732]:
      - generic [ref=e737]:
        - generic [ref=e738]:
          - heading "Build in a new dimension." [level=2] [ref=e739]
          - paragraph [ref=e740]: Pick one of our components, run one command, and ship something people remember.
          - generic [ref=e741]:
            - link "Get started" [ref=e742] [cursor=pointer]:
              - /url: /docs
            - link "Browse components" [ref=e746] [cursor=pointer]:
              - /url: /components
        - generic [ref=e748]:
          - generic [ref=e749]:
            - generic [ref=e750]:
              - link "Canvas UI home" [ref=e751] [cursor=pointer]:
                - /url: /
                - img "Canvas UI" [ref=e752]
              - paragraph [ref=e753]: Tasteful html-in-canvas components. Framework agnostic, creative by nature.
            - navigation "Navigate" [ref=e754]:
              - heading "Navigate" [level=3] [ref=e755]
              - list [ref=e756]:
                - listitem [ref=e757]:
                  - link "Docs" [ref=e758] [cursor=pointer]:
                    - /url: /docs
                - listitem [ref=e759]:
                  - link "Components" [ref=e760] [cursor=pointer]:
                    - /url: /components
                - listitem [ref=e761]:
                  - link "Installation" [ref=e762] [cursor=pointer]:
                    - /url: /docs/installation
            - navigation "From The Creator" [ref=e763]:
              - heading "From The Creator" [level=3] [ref=e764]
              - list [ref=e765]:
                - listitem [ref=e766]:
                  - link "pro.reactbits.dev" [ref=e767] [cursor=pointer]:
                    - /url: https://pro.reactbits.dev
                - listitem [ref=e768]:
                  - link "reactbits.dev" [ref=e769] [cursor=pointer]:
                    - /url: https://reactbits.dev
              - generic [ref=e770]:
                - link "David Haz on X" [ref=e771] [cursor=pointer]:
                  - /url: https://x.com/davidhdev
                - link "Canvas UI on GitHub" [ref=e774] [cursor=pointer]:
                  - /url: https://github.com/DavidHDev/canvas-ui
          - paragraph [ref=e778]:
            - text: © 2026 Canvas UI. Built by
            - link "David Haz" [ref=e779] [cursor=pointer]:
              - /url: https://github.com/DavidHDev
            - text: .
  - button "Open Next.js Dev Tools" [ref=e785] [cursor=pointer]
  - alert [ref=e790]
```

# Test source

```ts
  1  | import { test, expect } from "./fixtures/canvas-fixture";
  2  | 
  3  | test.describe("E2E-01: Visual Regression & Canvas WebGL Snapshot Testing", () => {
  4  |   test.beforeEach(async ({ canvasPage }) => {
  5  |     await canvasPage.freezeTime();
  6  |   });
  7  | 
  8  |   test("deve renderizar a Landing Page nos temas Dark e Light sem regressões visuais", async ({ page }) => {
  9  |     await page.goto("/");
  10 |     await page.waitForLoadState("networkidle");
  11 | 
  12 |     const canvas = page.locator("canvas").first();
  13 |     await expect(canvas).toBeAttached();
  14 | 
  15 |     // 1. Snapshot da Landing Page no Dark Theme (padrão)
  16 |     await page.waitForTimeout(500);
  17 |     await expect(page).toHaveScreenshot("landing-page-dark.png");
  18 | 
  19 |     // 2. Alterna para Light Theme
  20 |     const themeToggle = page.locator("button[aria-label*='mode']").first();
  21 |     if (await themeToggle.isVisible()) {
  22 |       await themeToggle.click();
  23 |       await page.waitForTimeout(500);
> 24 |       await expect(page).toHaveScreenshot("landing-page-light.png");
     |                          ^ Error: expect(page).toHaveScreenshot(expected) failed
  25 | 
  26 |       // 3. Alterna de volta para Dark Theme para validar reversão
  27 |       await themeToggle.click();
  28 |       await page.waitForTimeout(500);
  29 |       await expect(page).toHaveScreenshot("landing-page-dark-reverted.png");
  30 |     }
  31 |   });
  32 | 
  33 |   test("deve renderizar o Playground nos temas Dark e Light sem regressões visuais", async ({ page }) => {
  34 |     await page.goto("/playground");
  35 |     await page.waitForLoadState("networkidle");
  36 | 
  37 |     const canvas = page.locator("canvas").first();
  38 |     await expect(canvas).toBeAttached();
  39 | 
  40 |     // 1. Snapshot do Playground no Dark Theme
  41 |     await page.waitForTimeout(500);
  42 |     await expect(page).toHaveScreenshot("playground-dark.png");
  43 | 
  44 |     // 2. Alterna para Light Theme
  45 |     const themeToggle = page.locator("button[aria-label*='mode']").first();
  46 |     if (await themeToggle.isVisible()) {
  47 |       await themeToggle.click();
  48 |       await page.waitForTimeout(500);
  49 |       await expect(page).toHaveScreenshot("playground-light.png");
  50 |     }
  51 |   });
  52 | });
  53 | 
```