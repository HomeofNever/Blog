<template>
  <div>
    <Header :siteTitle="siteTitle" />
    <main class="page-content" aria-label="Content">
      <div class="wrapper">
        <slot></slot>
      </div>
    </main>
    <Footer :siteTitle="siteTitle" />
  </div>
</template>

<script>
import variables from "saber/variables";
import Header from "./Header.vue";
import Footer from "./Footer.vue";
export default {
  components: {
    Header: Header,
    Footer: Footer
  },
  props: ["page"],
  head: function head() {
    const title = this.page.title || this.siteTitle;
    const description = this.page.description || this.$siteConfig.description;
    let keywords = this.$siteConfig.keywords;
    if (this.page.tags)
      keywords += `,${this.page.tags.map(tag => tag.name).join(",")}`;

    const meta = [
      {
        name: "description",
        content: description,
        hid: "description"
      },
      {
        name: "keywords",
        content: keywords
      },
      {
        property: "og:title",
        content: title
      },
      {
        property: "og:description",
        content: description
      },
      {
        name: "twitter:title",
        content: title
      },
      {
        name: "twitter:description",
        content: description
      }
    ];

    if (this.page.assets.cover || this.page.assets.avatar) {
      const image = `${this.$siteConfig.url}${this.page.assets.cover ||
        this.page.assets.avatar}`;
      meta.push(
        {
          property: "og:image",
          content: image
        },
        {
          property: "twitter:image:src",
          content: image
        }
      );
    }

    return {
      title: title
        ? `${title} - ${this.$siteConfig.title}`
        : this.$siteConfig.title,
      meta: meta
    };
  },
  computed: {
    siteTitle() {
      return this.$siteConfig.title || "Your Awesome Title";
    }
  }
};
</script>