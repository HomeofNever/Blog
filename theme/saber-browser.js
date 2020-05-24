import "./styles/minima.css";
import 'saber-highlight-css/default.css'

export default ({ Vue, setHead }) => {
  // Manipulating <head>
  setHead((vm) => ({
    htmlAttrs: {
      lang: "zh-CN",
      class: "serif",
    },
    meta: [
      {
        name: "author",
        content: vm.$siteConfig.author,
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        property: "og:image",
        content: vm.$siteConfig.icon,
      },
      {
        name: "twitter:card",
        content: "summary",
      },
      {
        name: "twitter:site",
        content: vm.$siteConfig.twitter,
      },
      {
        name: "twitter:image",
        content: vm.$siteConfig.icon,
      },
      {
        name: "twitter:creator",
        content: vm.$siteConfig.author,
      },
    ],
    link: [
      {
        rel: "manifest",
        href: "/manifest.json",
      },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/icons/apple-icon-180x180.png",
      },
      {
        rel: "alternate",
        title: `${vm.$siteConfig.title} - Feed`,
        href: `${vm.$siteConfig.url}${vm.$feed.permalink}`,
        type:
          vm.$feed.type === "atom"
            ? "application/atom+xml"
            : vm.$feed.type === "rss2"
            ? "application/rss+xml"
            : "application/json",
      },
      {
        href: "https://cdn.jsdelivr.net/",
        rel: "preconnect",
        crossorigin: true,
      },
    ],
  }));
};
