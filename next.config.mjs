/** @type {import('next').NextConfig} */
const nextConfig = {
  // Every page URL on the site is slash-canonical (see the route map that
  // used to live in src/App.jsx). Next adds the slash for us and 308s the
  // slash-less form, which replaces the hand-written redirects that did the
  // same job under React Router. Note this applies to /api/* too - the
  // client (src/api/client.js) appends the slash itself so no POST is ever
  // turned into a GET by the redirect.
  trailingSlash: true,

  // A stray package-lock.json in the home directory makes Next guess the
  // workspace root wrongly; pin it here.
  outputFileTracingRoot: import.meta.dirname,

  images: {
    // The codebase has ~150 `import img from "../assets/x.webp"` imports
    // (and `src: importedImg` fields in src/content and src/data) that all
    // expect a URL string, which is what Vite gave them. Next's default
    // static-image import returns { src, width, height } and breaks every
    // <img src={x}>. Turn that off and let the webpack rule below emit a
    // plain URL instead.
    disableStaticImages: true,
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|webp|avif|svg)$/i,
      type: "asset/resource",
    });
    return config;
  },

  async redirects() {
    return [
      // Old route, kept as a redirect so external links and bookmarks don't
      // 404 - the page it pointed at was split into /our-story/ and
      // /gut-health/.
      { source: "/ingredients-sourcing", destination: "/gut-health/", permanent: true },
      // Old blueprint URL for the manufacturing page.
      { source: "/our-story/how-its-made", destination: "/our-story/manufacturing/", permanent: true },
      // "Our Social Mission" was removed; its content is folded into the Our
      // Story overview and Our Mission.
      { source: "/our-story/social-mission", destination: "/our-story/", permanent: true },
      { source: "/signin", destination: "/sign-in/", permanent: true },
      { source: "/account", destination: "/account/orders/", permanent: true },
    ];
  },
};

export default nextConfig;
