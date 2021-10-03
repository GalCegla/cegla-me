const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => (m && m.default) || m


exports.components = {
  "component---cache-dev-404-page-js": hot(preferDefault(require("E:\\Website\\cegla-me\\cegla-me\\.cache\\dev-404-page.js"))),
  "component---src-pages-404-tsx": hot(preferDefault(require("E:\\Website\\cegla-me\\cegla-me\\src\\pages\\404.tsx"))),
  "component---src-pages-coffee-index-tsx": hot(preferDefault(require("E:\\Website\\cegla-me\\cegla-me\\src\\pages\\coffee\\index.tsx"))),
  "component---src-pages-index-tsx": hot(preferDefault(require("E:\\Website\\cegla-me\\cegla-me\\src\\pages\\index.tsx")))
}

