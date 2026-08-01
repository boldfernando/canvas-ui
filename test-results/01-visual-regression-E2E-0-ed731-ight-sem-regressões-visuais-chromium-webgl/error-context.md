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

  38002 pixels (ratio 0.05 of all image pixels) are different.

  Snapshot: landing-page-dark.png

Call log:
  - Expect "toHaveScreenshot(landing-page-dark.png)" with timeout 5000ms
    - verifying given screenshot expectation
  - taking page screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - 42040 pixels (ratio 0.05 of all image pixels) are different.
  - waiting 100ms before taking screenshot
  - taking page screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - captured a stable screenshot
  - 38002 pixels (ratio 0.05 of all image pixels) are different.

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
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
        - button "Switch to dark mode" [ref=e18]
        - link "Canvas UI on GitHub, 2878 stars" [ref=e27] [cursor=pointer]:
          - /url: https://github.com/DavidHDev/canvas-ui
          - generic [ref=e30]: 2.9k
  - main [ref=e31]:
    - generic [ref=e32]:
      - generic [ref=e35]:
        - generic [ref=e36]:
          - heading "Creative components, in a new dimension." [level=1] [ref=e37]
          - paragraph [ref=e38]: An open source library of tasteful html-in-canvas & WebGL components. Framework agnostic. Copy, paste, ship.
          - generic [ref=e39]:
            - link "Get started" [ref=e40] [cursor=pointer]:
              - /url: /docs
            - link "Browse components" [ref=e43] [cursor=pointer]:
              - /url: /components
        - generic [ref=e48]:
          - generic [ref=e49]:
            - paragraph [ref=e51]: Components
            - paragraph [ref=e52]: "33"
            - paragraph [ref=e53]: And counting
          - generic [ref=e54]:
            - paragraph [ref=e56]: Open source
            - paragraph [ref=e57]: 100%
            - paragraph [ref=e58]: Free forever
          - generic [ref=e59]:
            - generic [ref=e61]:
              - paragraph [ref=e62]: Install
              - paragraph [ref=e63]: One command
            - generic [ref=e64]:
              - code [ref=e65]: npx shadcn@latest add @canvas-ui/particle-reveal-react
              - button "Copy to clipboard" [ref=e66]
      - region [ref=e73]:
        - generic [ref=e76]:
          - generic [ref=e77]:
            - paragraph [ref=e78]: The library
            - heading "Every component, alive on canvas." [level=2] [ref=e79]
          - link "Browse all" [ref=e80] [cursor=pointer]:
            - /url: /components
        - generic [ref=e84]:
          - generic [ref=e86]:
            - list [ref=e87]:
              - listitem [ref=e88]:
                - link [ref=e89] [cursor=pointer]:
                  - /url: /docs/components/ascii-object
                  - generic [ref=e92]:
                    - heading "ASCII Object" [level=3] [ref=e93]
                    - paragraph [ref=e94]: Any GLB/glTF model, SVG, or image floating in a studio scene, redrawn as shape-matched ASCII characters.
              - listitem [ref=e95]:
                - link [ref=e96] [cursor=pointer]:
                  - /url: /docs/components/asciify
                  - generic [ref=e99]:
                    - heading "Asciify" [level=3] [ref=e100]
                    - paragraph [ref=e101]: A soft lens that follows your cursor and redraws the live HTML beneath it as ascii characters.
              - listitem [ref=e102]:
                - link [ref=e103] [cursor=pointer]:
                  - /url: /docs/components/bend
                  - generic [ref=e106]:
                    - heading "Bend" [level=3] [ref=e107]
                    - paragraph [ref=e108]: Folds the top and bottom of your live HTML over straight virtual edges, like scrolling on the face of a cube.
              - listitem [ref=e109]:
                - link [ref=e110] [cursor=pointer]:
                  - /url: /docs/components/blaze
                  - generic [ref=e113]:
                    - heading "Blaze" [level=3] [ref=e114]
                    - paragraph [ref=e115]: Fire sparks, smoke, and heat distortion rising over your live HTML.
              - listitem [ref=e116]:
                - link [ref=e117] [cursor=pointer]:
                  - /url: /docs/components/bubble
                  - generic [ref=e120]:
                    - heading "Bubble" [level=3] [ref=e121]
                    - paragraph [ref=e122]: A glassy droplet that trails the cursor as blending metaballs and refracts the live page beneath it.
              - listitem [ref=e123]:
                - link [ref=e124] [cursor=pointer]:
                  - /url: /docs/components/canvas
                  - generic [ref=e127]:
                    - heading "Canvas" [level=3] [ref=e128]
                    - paragraph [ref=e129]: Paints your live HTML onto woven artist canvas, with a cursor that drags ridges of wet paint across the weave.
              - listitem [ref=e130]:
                - link [ref=e131] [cursor=pointer]:
                  - /url: /docs/components/cloth
                  - generic [ref=e134]:
                    - heading "Cloth" [level=3] [ref=e135]
                    - paragraph [ref=e136]: Hangs your live HTML on fabric rippling in the wind. Cursor strokes send waves across the cloth.
              - listitem [ref=e137]:
                - link [ref=e138] [cursor=pointer]:
                  - /url: /docs/components/clouds
                  - generic [ref=e141]:
                    - heading "Clouds" [level=3] [ref=e142]
                    - paragraph [ref=e143]: Theme-aware mist that blurs and refracts your live HTML, parted by cursor wind.
              - listitem [ref=e144]:
                - link [ref=e145] [cursor=pointer]:
                  - /url: /docs/components/decrypt-reveal
                  - generic [ref=e148]:
                    - heading "Decrypt Reveal" [level=3] [ref=e149]
                    - paragraph [ref=e150]: Renders your live HTML as ASCII cipher text that decrypts into the crisp UI around the cursor.
              - listitem [ref=e151]:
                - link [ref=e152] [cursor=pointer]:
                  - /url: /docs/components/dithered-object
                  - generic [ref=e155]:
                    - heading "Dithered Object" [level=3] [ref=e156]
                    - paragraph [ref=e157]: Any GLB/glTF model, SVG, or image floating in a studio scene, rendered through a 1-bit dither.
              - listitem [ref=e158]:
                - link [ref=e159] [cursor=pointer]:
                  - /url: /docs/components/displacement
                  - generic [ref=e162]:
                    - heading "Displacement" [level=3] [ref=e163]
                    - paragraph [ref=e164]: A displacement grid that ripples your live HTML away from the cursor, with color fringing and grain.
              - listitem [ref=e165]:
                - link [ref=e166] [cursor=pointer]:
                  - /url: /docs/components/droplets
                  - generic [ref=e169]:
                    - heading "Droplets" [level=3] [ref=e170]
                    - paragraph [ref=e171]: Rain droplets that run down the screen and refract your live HTML.
              - listitem [ref=e172]:
                - link [ref=e173] [cursor=pointer]:
                  - /url: /docs/components/flame-wrap
                  - generic [ref=e176]:
                    - heading "Flame Wrap" [level=3] [ref=e177]
                    - paragraph [ref=e178]: Wraps any element in a border of fire with molten edges, sparks, and heat shimmer.
              - listitem [ref=e179]:
                - link [ref=e180] [cursor=pointer]:
                  - /url: /docs/components/force-field
                  - generic [ref=e183]:
                    - heading "Force Field" [level=3] [ref=e184]
                    - paragraph [ref=e185]: An energy shield over your live HTML where clicks detonate shockwaves that refract the page.
              - listitem [ref=e186]:
                - link [ref=e187] [cursor=pointer]:
                  - /url: /docs/components/frost
                  - generic [ref=e190]:
                    - heading "Frost" [level=3] [ref=e191]
                    - paragraph [ref=e192]: A frozen pane of ice over your live HTML that melts under the cursor and refreezes.
              - listitem [ref=e193]:
                - link [ref=e194] [cursor=pointer]:
                  - /url: /docs/components/glass
                  - generic [ref=e197]:
                    - heading "Glass" [level=3] [ref=e198]
                    - paragraph [ref=e199]: A cursor-following glass lens that refracts your live HTML and zooms in on targets like a crystal ball.
              - listitem [ref=e200]:
                - link [ref=e201] [cursor=pointer]:
                  - /url: /docs/components/glass-object
                  - generic [ref=e204]:
                    - heading "Glass Object" [level=3] [ref=e205]
                    - paragraph [ref=e206]: Turns any 3D model, SVG, or image into floating liquid glass with real refraction, dispersion, and frost.
            - list [ref=e207]:
              - listitem [ref=e208]:
                - link [ref=e209] [cursor=pointer]:
                  - /url: /docs/components/ascii-object
                  - generic [ref=e212]:
                    - heading [level=3] [ref=e213]: ASCII Object
                    - paragraph [ref=e214]: Any GLB/glTF model, SVG, or image floating in a studio scene, redrawn as shape-matched ASCII characters.
              - listitem [ref=e215]:
                - link [ref=e216] [cursor=pointer]:
                  - /url: /docs/components/asciify
                  - generic [ref=e219]:
                    - heading [level=3] [ref=e220]: Asciify
                    - paragraph [ref=e221]: A soft lens that follows your cursor and redraws the live HTML beneath it as ascii characters.
              - listitem [ref=e222]:
                - link [ref=e223] [cursor=pointer]:
                  - /url: /docs/components/bend
                  - generic [ref=e226]:
                    - heading [level=3] [ref=e227]: Bend
                    - paragraph [ref=e228]: Folds the top and bottom of your live HTML over straight virtual edges, like scrolling on the face of a cube.
              - listitem [ref=e229]:
                - link [ref=e230] [cursor=pointer]:
                  - /url: /docs/components/blaze
                  - generic [ref=e233]:
                    - heading [level=3] [ref=e234]: Blaze
                    - paragraph [ref=e235]: Fire sparks, smoke, and heat distortion rising over your live HTML.
              - listitem [ref=e236]:
                - link [ref=e237] [cursor=pointer]:
                  - /url: /docs/components/bubble
                  - generic [ref=e240]:
                    - heading [level=3] [ref=e241]: Bubble
                    - paragraph [ref=e242]: A glassy droplet that trails the cursor as blending metaballs and refracts the live page beneath it.
              - listitem [ref=e243]:
                - link [ref=e244] [cursor=pointer]:
                  - /url: /docs/components/canvas
                  - generic [ref=e247]:
                    - heading [level=3] [ref=e248]: Canvas
                    - paragraph [ref=e249]: Paints your live HTML onto woven artist canvas, with a cursor that drags ridges of wet paint across the weave.
              - listitem [ref=e250]:
                - link [ref=e251] [cursor=pointer]:
                  - /url: /docs/components/cloth
                  - generic [ref=e254]:
                    - heading [level=3] [ref=e255]: Cloth
                    - paragraph [ref=e256]: Hangs your live HTML on fabric rippling in the wind. Cursor strokes send waves across the cloth.
              - listitem [ref=e257]:
                - link [ref=e258] [cursor=pointer]:
                  - /url: /docs/components/clouds
                  - generic [ref=e261]:
                    - heading [level=3] [ref=e262]: Clouds
                    - paragraph [ref=e263]: Theme-aware mist that blurs and refracts your live HTML, parted by cursor wind.
              - listitem [ref=e264]:
                - link [ref=e265] [cursor=pointer]:
                  - /url: /docs/components/decrypt-reveal
                  - generic [ref=e268]:
                    - heading [level=3] [ref=e269]: Decrypt Reveal
                    - paragraph [ref=e270]: Renders your live HTML as ASCII cipher text that decrypts into the crisp UI around the cursor.
              - listitem [ref=e271]:
                - link [ref=e272] [cursor=pointer]:
                  - /url: /docs/components/dithered-object
                  - generic [ref=e275]:
                    - heading [level=3] [ref=e276]: Dithered Object
                    - paragraph [ref=e277]: Any GLB/glTF model, SVG, or image floating in a studio scene, rendered through a 1-bit dither.
              - listitem [ref=e278]:
                - link [ref=e279] [cursor=pointer]:
                  - /url: /docs/components/displacement
                  - generic [ref=e282]:
                    - heading [level=3] [ref=e283]: Displacement
                    - paragraph [ref=e284]: A displacement grid that ripples your live HTML away from the cursor, with color fringing and grain.
              - listitem [ref=e285]:
                - link [ref=e286] [cursor=pointer]:
                  - /url: /docs/components/droplets
                  - generic [ref=e289]:
                    - heading [level=3] [ref=e290]: Droplets
                    - paragraph [ref=e291]: Rain droplets that run down the screen and refract your live HTML.
              - listitem [ref=e292]:
                - link [ref=e293] [cursor=pointer]:
                  - /url: /docs/components/flame-wrap
                  - generic [ref=e296]:
                    - heading [level=3] [ref=e297]: Flame Wrap
                    - paragraph [ref=e298]: Wraps any element in a border of fire with molten edges, sparks, and heat shimmer.
              - listitem [ref=e299]:
                - link [ref=e300] [cursor=pointer]:
                  - /url: /docs/components/force-field
                  - generic [ref=e303]:
                    - heading [level=3] [ref=e304]: Force Field
                    - paragraph [ref=e305]: An energy shield over your live HTML where clicks detonate shockwaves that refract the page.
              - listitem [ref=e306]:
                - link [ref=e307] [cursor=pointer]:
                  - /url: /docs/components/frost
                  - generic [ref=e310]:
                    - heading [level=3] [ref=e311]: Frost
                    - paragraph [ref=e312]: A frozen pane of ice over your live HTML that melts under the cursor and refreezes.
              - listitem [ref=e313]:
                - link [ref=e314] [cursor=pointer]:
                  - /url: /docs/components/glass
                  - generic [ref=e317]:
                    - heading [level=3] [ref=e318]: Glass
                    - paragraph [ref=e319]: A cursor-following glass lens that refracts your live HTML and zooms in on targets like a crystal ball.
              - listitem [ref=e320]:
                - link [ref=e321] [cursor=pointer]:
                  - /url: /docs/components/glass-object
                  - generic [ref=e324]:
                    - heading [level=3] [ref=e325]: Glass Object
                    - paragraph [ref=e326]: Turns any 3D model, SVG, or image into floating liquid glass with real refraction, dispersion, and frost.
          - generic [ref=e328]:
            - list [ref=e329]:
              - listitem [ref=e330]:
                - link [ref=e331] [cursor=pointer]:
                  - /url: /docs/components/glitch
                  - generic [ref=e334]:
                    - heading "Glitch" [level=3] [ref=e335]
                    - paragraph [ref=e336]: Broadcast glitch bursts that tear your live HTML into shifted slices with RGB splits and corrupted blocks.
              - listitem [ref=e337]:
                - link [ref=e338] [cursor=pointer]:
                  - /url: /docs/components/glyph-rain
                  - generic [ref=e341]:
                    - heading "Glyph Rain" [level=3] [ref=e342]
                    - paragraph [ref=e343]: Falling glyph streams that light up your live HTML, with drop heads that surge where your cursor cuts through.
              - listitem [ref=e344]:
                - link [ref=e345] [cursor=pointer]:
                  - /url: /docs/components/grid
                  - generic [ref=e348]:
                    - heading "Grid" [level=3] [ref=e349]
                    - paragraph [ref=e350]: 3D tiles that ripple in staggered waves around the cursor over your live HTML.
              - listitem [ref=e351]:
                - link [ref=e352] [cursor=pointer]:
                  - /url: /docs/components/hex-float
                  - generic [ref=e355]:
                    - heading "Hex Float" [level=3] [ref=e356]
                    - paragraph [ref=e357]: Your live HTML on shiny floating hex tiles with perspective tilt and cursor lift.
              - listitem [ref=e358]:
                - link [ref=e359] [cursor=pointer]:
                  - /url: /docs/components/laser
                  - generic [ref=e362]:
                    - heading "Laser" [level=3] [ref=e363]
                    - paragraph [ref=e364]: A laser beam near the bottom of the viewport that reveals your live HTML from behind it on scroll.
              - listitem [ref=e365]:
                - link [ref=e366] [cursor=pointer]:
                  - /url: /docs/components/liquid
                  - generic [ref=e369]:
                    - heading "Liquid" [level=3] [ref=e370]
                    - paragraph [ref=e371]: A pointer-driven WebGL fluid simulation that runs over your live HTML.
              - listitem [ref=e372]:
                - link [ref=e373] [cursor=pointer]:
                  - /url: /docs/components/magnify
                  - generic [ref=e376]:
                    - heading "Magnify" [level=3] [ref=e377]
                    - paragraph [ref=e378]: A sci-fi scanner lens that magnifies your live HTML inside a HUD reticle, with click ripples that bend the page.
              - listitem [ref=e379]:
                - link [ref=e380] [cursor=pointer]:
                  - /url: /docs/components/particle-object
                  - generic [ref=e383]:
                    - heading "Particle Object" [level=3] [ref=e384]
                    - paragraph [ref=e385]: Rebuilds any 3D model, SVG, or image as particles that scatter around the cursor and spring back into shape.
              - listitem [ref=e386]:
                - link [ref=e387] [cursor=pointer]:
                  - /url: /docs/components/particle-reveal
                  - generic [ref=e390]:
                    - heading "Particle Reveal" [level=3] [ref=e391]
                    - paragraph [ref=e392]: Renders your live HTML as fine readable particles that merge into the crisp UI around the cursor.
              - listitem [ref=e393]:
                - link [ref=e394] [cursor=pointer]:
                  - /url: /docs/components/particle-scroll
                  - generic [ref=e397]:
                    - heading "Particle Scroll" [level=3] [ref=e398]
                    - paragraph [ref=e399]: Dissolves your live HTML below a chosen line into fine sand particles that reassemble on scroll.
              - listitem [ref=e400]:
                - link [ref=e401] [cursor=pointer]:
                  - /url: /docs/components/peel
                  - generic [ref=e404]:
                    - heading "Peel" [level=3] [ref=e405]
                    - paragraph [ref=e406]: Peels your live HTML back from a chosen edge on hover, revealing a second layer underneath.
              - listitem [ref=e407]:
                - link [ref=e408] [cursor=pointer]:
                  - /url: /docs/components/retro-dither
                  - generic [ref=e411]:
                    - heading "Retro Dither" [level=3] [ref=e412]
                    - paragraph [ref=e413]: A retro dither lens that pixelates your live HTML around the cursor.
              - listitem [ref=e414]:
                - link [ref=e415] [cursor=pointer]:
                  - /url: /docs/components/ripple
                  - generic [ref=e418]:
                    - heading "Ripple" [level=3] [ref=e419]
                    - paragraph [ref=e420]: Water ripples that spread from every click and refract your live HTML like a pond surface.
              - listitem [ref=e421]:
                - link [ref=e422] [cursor=pointer]:
                  - /url: /docs/components/shatter
                  - generic [ref=e425]:
                    - heading "Shatter" [level=3] [ref=e426]
                    - paragraph [ref=e427]: Breaks your live HTML into 3D glass shards that lift, float, and refract around the cursor, with perspective and soft shadows.
              - listitem [ref=e428]:
                - link [ref=e429] [cursor=pointer]:
                  - /url: /docs/components/liquid-object
                  - generic [ref=e432]:
                    - heading "Liquid Object" [level=3] [ref=e433]
                    - paragraph [ref=e434]: Drags any 3D model, SVG, or image through invisible liquid that swirls under the cursor and splits the light into color.
              - listitem [ref=e435]:
                - link [ref=e436] [cursor=pointer]:
                  - /url: /docs/components/vhs
                  - generic [ref=e439]:
                    - heading "VHS" [level=3] [ref=e440]
                    - paragraph [ref=e441]: Worn tape playback with wave, head-switching noise, chroma bleed, and grain over your live HTML.
            - list [ref=e442]:
              - listitem [ref=e443]:
                - link [ref=e444] [cursor=pointer]:
                  - /url: /docs/components/glitch
                  - generic [ref=e447]:
                    - heading [level=3] [ref=e448]: Glitch
                    - paragraph [ref=e449]: Broadcast glitch bursts that tear your live HTML into shifted slices with RGB splits and corrupted blocks.
              - listitem [ref=e450]:
                - link [ref=e451] [cursor=pointer]:
                  - /url: /docs/components/glyph-rain
                  - generic [ref=e454]:
                    - heading [level=3] [ref=e455]: Glyph Rain
                    - paragraph [ref=e456]: Falling glyph streams that light up your live HTML, with drop heads that surge where your cursor cuts through.
              - listitem [ref=e457]:
                - link [ref=e458] [cursor=pointer]:
                  - /url: /docs/components/grid
                  - generic [ref=e461]:
                    - heading [level=3] [ref=e462]: Grid
                    - paragraph [ref=e463]: 3D tiles that ripple in staggered waves around the cursor over your live HTML.
              - listitem [ref=e464]:
                - link [ref=e465] [cursor=pointer]:
                  - /url: /docs/components/hex-float
                  - generic [ref=e468]:
                    - heading [level=3] [ref=e469]: Hex Float
                    - paragraph [ref=e470]: Your live HTML on shiny floating hex tiles with perspective tilt and cursor lift.
              - listitem [ref=e471]:
                - link [ref=e472] [cursor=pointer]:
                  - /url: /docs/components/laser
                  - generic [ref=e475]:
                    - heading [level=3] [ref=e476]: Laser
                    - paragraph [ref=e477]: A laser beam near the bottom of the viewport that reveals your live HTML from behind it on scroll.
              - listitem [ref=e478]:
                - link [ref=e479] [cursor=pointer]:
                  - /url: /docs/components/liquid
                  - generic [ref=e482]:
                    - heading [level=3] [ref=e483]: Liquid
                    - paragraph [ref=e484]: A pointer-driven WebGL fluid simulation that runs over your live HTML.
              - listitem [ref=e485]:
                - link [ref=e486] [cursor=pointer]:
                  - /url: /docs/components/magnify
                  - generic [ref=e489]:
                    - heading [level=3] [ref=e490]: Magnify
                    - paragraph [ref=e491]: A sci-fi scanner lens that magnifies your live HTML inside a HUD reticle, with click ripples that bend the page.
              - listitem [ref=e492]:
                - link [ref=e493] [cursor=pointer]:
                  - /url: /docs/components/particle-object
                  - generic [ref=e496]:
                    - heading [level=3] [ref=e497]: Particle Object
                    - paragraph [ref=e498]: Rebuilds any 3D model, SVG, or image as particles that scatter around the cursor and spring back into shape.
              - listitem [ref=e499]:
                - link [ref=e500] [cursor=pointer]:
                  - /url: /docs/components/particle-reveal
                  - generic [ref=e503]:
                    - heading [level=3] [ref=e504]: Particle Reveal
                    - paragraph [ref=e505]: Renders your live HTML as fine readable particles that merge into the crisp UI around the cursor.
              - listitem [ref=e506]:
                - link [ref=e507] [cursor=pointer]:
                  - /url: /docs/components/particle-scroll
                  - generic [ref=e510]:
                    - heading [level=3] [ref=e511]: Particle Scroll
                    - paragraph [ref=e512]: Dissolves your live HTML below a chosen line into fine sand particles that reassemble on scroll.
              - listitem [ref=e513]:
                - link [ref=e514] [cursor=pointer]:
                  - /url: /docs/components/peel
                  - generic [ref=e517]:
                    - heading [level=3] [ref=e518]: Peel
                    - paragraph [ref=e519]: Peels your live HTML back from a chosen edge on hover, revealing a second layer underneath.
              - listitem [ref=e520]:
                - link [ref=e521] [cursor=pointer]:
                  - /url: /docs/components/retro-dither
                  - generic [ref=e524]:
                    - heading [level=3] [ref=e525]: Retro Dither
                    - paragraph [ref=e526]: A retro dither lens that pixelates your live HTML around the cursor.
              - listitem [ref=e527]:
                - link [ref=e528] [cursor=pointer]:
                  - /url: /docs/components/ripple
                  - generic [ref=e531]:
                    - heading [level=3] [ref=e532]: Ripple
                    - paragraph [ref=e533]: Water ripples that spread from every click and refract your live HTML like a pond surface.
              - listitem [ref=e534]:
                - link [ref=e535] [cursor=pointer]:
                  - /url: /docs/components/shatter
                  - generic [ref=e538]:
                    - heading [level=3] [ref=e539]: Shatter
                    - paragraph [ref=e540]: Breaks your live HTML into 3D glass shards that lift, float, and refract around the cursor, with perspective and soft shadows.
              - listitem [ref=e541]:
                - link [ref=e542] [cursor=pointer]:
                  - /url: /docs/components/liquid-object
                  - generic [ref=e545]:
                    - heading [level=3] [ref=e546]: Liquid Object
                    - paragraph [ref=e547]: Drags any 3D model, SVG, or image through invisible liquid that swirls under the cursor and splits the light into color.
              - listitem [ref=e548]:
                - link [ref=e549] [cursor=pointer]:
                  - /url: /docs/components/vhs
                  - generic [ref=e552]:
                    - heading [level=3] [ref=e553]: VHS
                    - paragraph [ref=e554]: Worn tape playback with wave, head-switching noise, chroma bleed, and grain over your live HTML.
      - region [ref=e555]:
        - generic [ref=e558]:
          - generic [ref=e559]:
            - paragraph [ref=e560]: How it works
            - heading "Copy, paste, ship." [level=2] [ref=e561]
          - generic [ref=e562]:
            - list [ref=e563]:
              - listitem [ref=e564]:
                - button [ref=e565]:
                  - paragraph [ref=e566]: "01"
                  - heading "Pick a component" [level=3] [ref=e567]
                  - paragraph [ref=e570]: Browse the library and find the effect that fits. Every demo on this site is the real component, running live.
              - listitem [ref=e573]:
                - button [ref=e574]:
                  - paragraph [ref=e575]: "02"
                  - heading "Run one command" [level=3] [ref=e576]
                  - paragraph [ref=e577]: The shadcn CLI pulls the full source into your project. No package to install, no version to pin.
              - listitem [ref=e579]:
                - button [ref=e580]:
                  - paragraph [ref=e581]: "03"
                  - heading "Make it yours" [level=3] [ref=e582]
                  - paragraph [ref=e583]: The code lives in your repo from day one. Tune the props, restyle it, or rip it apart. It's yours.
            - generic [ref=e586]:
              - generic [ref=e587]: canvasui.dev/components
              - generic [ref=e594]:
                - generic [ref=e595]: Blaze
                - generic [ref=e596]: Liquid
                - generic [ref=e597]: Glass
                - generic [ref=e598]: Shatter
                - generic [ref=e599]: Particle Reveal
                - generic [ref=e600]: VHS
      - region [ref=e603]:
        - generic [ref=e607]:
          - generic [ref=e608]:
            - paragraph [ref=e609]: Framework agnostic
            - heading "One component, six flavors." [level=2] [ref=e610]
            - paragraph [ref=e611]: Every effect ships as React, Solid, Preact, Vue, Svelte, and dependency-free vanilla TypeScript. Same engine, same props, native to your stack.
          - generic [ref=e613]:
            - generic [ref=e614]:
              - combobox "Framework" [ref=e615] [cursor=pointer]:
                - generic [ref=e616]: React
              - textbox [ref=e620]: react
              - generic [ref=e621]:
                - generic [ref=e622]: hero.tsx
                - button "Copy to clipboard" [ref=e623]
            - code [ref=e632]:
              - generic [ref=e633]: "import { ParticleReveal } from \"@/components/canvasui/ParticleReveal\";"
              - generic [ref=e634]: "export function Hero() {"
              - generic [ref=e635]: return (
              - generic [ref=e636]: "<ParticleReveal radius={300}>"
              - generic [ref=e637]: <YourContent />
              - generic [ref=e638]: </ParticleReveal>
              - generic [ref=e639]: );
              - generic [ref=e640]: "}"
      - region [ref=e641]:
        - generic [ref=e645]:
          - generic [ref=e647]:
            - generic [ref=e648]:
              - paragraph [ref=e649]: Agent
              - generic [ref=e650]: MCP connected
            - generic [ref=e652]:
              - paragraph [ref=e654]: Add a particle reveal effect to my hero section
              - paragraph [ref=e656]: Found particle-reveal in the Canvas UI registry. Installing it now.
              - generic [ref=e658]:
                - generic [ref=e659]:
                  - generic [ref=e660]: shadcn CLI
                  - img "Installing" [ref=e663]
                - paragraph [ref=e665]: npx shadcn@latest add @canvas-ui/particle-reveal-react
              - paragraph [ref=e667]: Done. ParticleReveal.tsx is in components/canvasui, wired into your hero.
            - generic [ref=e669]:
              - textbox:
                - /placeholder: Ask your agent anything…
              - button
          - generic [ref=e670]:
            - paragraph [ref=e671]: AI-ready
            - heading "Built for agents." [level=2] [ref=e672]
            - paragraph [ref=e673]: The registry speaks the shadcn protocol, so any assistant with the shadcn MCP server can browse the library, read the docs, and install components, all from a single prompt.
            - link "Set up the MCP server" [ref=e674] [cursor=pointer]:
              - /url: /docs/mcp
      - region [ref=e677]:
        - generic [ref=e681]:
          - generic [ref=e682]:
            - paragraph [ref=e683]: FAQ
            - heading "Good questions." [level=2] [ref=e684]
          - generic [ref=e686]:
            - generic [ref=e687]:
              - button "Is Canvas UI free to use?" [expanded] [ref=e688]
              - paragraph [ref=e695]: "Yes. Canvas UI is licensed under MIT + Commons Clause: use every component in any personal or commercial app or website, free forever. The only restriction is reselling or redistributing the components themselves, whether alone, in a bundle, or as a port."
            - generic [ref=e696]:
              - button "Which browsers are supported?" [ref=e697]
              - paragraph [ref=e700]: "Components that draw live HTML on canvas rely on an experimental browser capability, available today in Chrome behind a flag. Everywhere else they degrade gracefully: your content renders as regular HTML, and effects like Blaze, Liquid, Laser, Clouds, Bubble, Droplets, Glass, Magnify, Grid, and Ripple keep running as a pure WebGL overlay on top of it. WebGL-based components work in every modern browser."
            - generic [ref=e701]:
              - button "Will it slow my site down?" [ref=e702]
              - paragraph [ref=e705]: The effects render on the GPU via WebGL and animate outside React's render cycle. Each component initializes only when mounted, pauses when off-screen, and cleans up fully on unmount. Reduced-motion preferences are respected.
            - generic [ref=e706]:
              - button "Do I need React?" [ref=e707]
              - paragraph [ref=e710]: "No. Every component ships in six flavors: React, Solid, Preact, Vue, Svelte, and dependency-free vanilla TypeScript. Same engine and the same options in all of them."
            - generic [ref=e711]:
              - button "How do updates work?" [ref=e712]
              - paragraph [ref=e715]: The code is copied into your repo, so nothing updates from under you. When a component improves, re-run the install command to pull the latest version, or just keep your copy and evolve it yourself.
    - region [ref=e716]:
      - generic [ref=e721]:
        - generic [ref=e722]:
          - heading "Build in a new dimension." [level=2] [ref=e723]
          - paragraph [ref=e724]: Pick one of our components, run one command, and ship something people remember.
          - generic [ref=e725]:
            - link "Get started" [ref=e726] [cursor=pointer]:
              - /url: /docs
            - link "Browse components" [ref=e729] [cursor=pointer]:
              - /url: /components
        - generic [ref=e731]:
          - generic [ref=e732]:
            - generic [ref=e733]:
              - link "Canvas UI home" [ref=e734] [cursor=pointer]:
                - /url: /
                - img "Canvas UI" [ref=e735]
              - paragraph [ref=e736]: Tasteful html-in-canvas components. Framework agnostic, creative by nature.
            - navigation "Navigate" [ref=e737]:
              - heading "Navigate" [level=3] [ref=e738]
              - list [ref=e739]:
                - listitem [ref=e740]:
                  - link "Docs" [ref=e741] [cursor=pointer]:
                    - /url: /docs
                - listitem [ref=e742]:
                  - link "Components" [ref=e743] [cursor=pointer]:
                    - /url: /components
                - listitem [ref=e744]:
                  - link "Installation" [ref=e745] [cursor=pointer]:
                    - /url: /docs/installation
            - navigation "From The Creator" [ref=e746]:
              - heading "From The Creator" [level=3] [ref=e747]
              - list [ref=e748]:
                - listitem [ref=e749]:
                  - link "pro.reactbits.dev" [ref=e750] [cursor=pointer]:
                    - /url: https://pro.reactbits.dev
                - listitem [ref=e751]:
                  - link "reactbits.dev" [ref=e752] [cursor=pointer]:
                    - /url: https://reactbits.dev
              - generic [ref=e753]:
                - link "David Haz on X" [ref=e754] [cursor=pointer]:
                  - /url: https://x.com/davidhdev
                - link "Canvas UI on GitHub" [ref=e757] [cursor=pointer]:
                  - /url: https://github.com/DavidHDev/canvas-ui
          - paragraph [ref=e761]:
            - text: © 2026 Canvas UI. Built by
            - link "David Haz" [ref=e762] [cursor=pointer]:
              - /url: https://github.com/DavidHDev
            - text: .
  - button "Open Next.js Dev Tools" [ref=e768] [cursor=pointer]
  - alert [ref=e772]
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
> 17 |     await expect(page).toHaveScreenshot("landing-page-dark.png");
     |                        ^ Error: expect(page).toHaveScreenshot(expected) failed
  18 | 
  19 |     // 2. Alterna para Light Theme
  20 |     const themeToggle = page.locator("button[aria-label*='mode']").first();
  21 |     if (await themeToggle.isVisible()) {
  22 |       await themeToggle.click();
  23 |       await page.waitForTimeout(500);
  24 |       await expect(page).toHaveScreenshot("landing-page-light.png");
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