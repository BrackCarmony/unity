# Snow Globe of Wonder (source)

React 0.14 + D3 3.5 toy from 2015–16, served at `/snowGlobe`. This folder is the source; `public/snowGlobe/` holds
what the site serves (`index.html`, `main.css`, `images/`, and the built `bundle.js` + `bundle.js.map`).

## Build

```sh
cd snowGlobe
npm install        # webpack 1, Babel 5 and the exact library versions the original bundle used
npm run build      # writes ../public/snowGlobe/bundle.js and bundle.js.map
```

Builds with the original 2015 toolchain on current Node (checked on Node 24).

## Where this code came from

The globe started life in [BrackCarmony/brackPortfolio](https://github.com/BrackCarmony/brackPortfolio), and its
built bundle was copied into this repo in March 2016. A later commit here ("minor tweaks to globe") then edited the
**compiled** `bundle.js` by hand instead of the source: it renamed the six face links to "Rotate", swapped the
lorempixel placeholder images for portfolio thumbnails, and commented out debug logging. The `bundle.js.map` that
came along was also stale (from an earlier build).

To get source that matches what was live, this folder takes `brackPortfolio`'s last commit (`63aabca`, Feb 2016,
whose build is byte-identical to the bundle first copied here) and applies those hand edits to the source:

- `app/App.js`: the six links read "Rotate"; the image list uses `../elo.png`, `../globe.png`, `../poke.png`,
  `../q.png`, `../unity.png` in place of `images/java-4.svg` and nine lorempixel images
- `app/components/Card.js`, `DCube.js`, `VerticleDotDistribution.js`: debug `console.log` calls commented out

Rebuilding from it produces the same app code as the hand-edited bundle (checked module by module; only quote style
and comment text differ) and the same page. Unused experiments in brackPortfolio (`App1.js`, `App1.ts`,
`components/Header`) aren't copied, since the build never included them.
