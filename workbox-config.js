module.exports = {
    globDirectory: "public/",
    globPatterns: [
      '**/*.{js,css,html,jpg,png,svg,webp}'
    ],
    swDest: "public/sw.js",
    ignoreURLParametersMatching: [
      /^utm_/,
      /^fbclid$/
    ],
    skipWaiting: true,
    clientsClaim: true
  };