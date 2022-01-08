const { withContentlayer } = require("next-contentlayer");

module.exports = withContentlayer()({
  reactStrictMode: true,
  images: {
    domains: ["source.unsplash.com", "unsplash.com"],
  },
});
