<template>  
  <div>
    <Header :siteTitle="siteTitle"/>
    <main class="page-content" aria-label="Content">
      <div class="wrapper">
        <slot></slot>
      </div>
    </main>
    <Footer :siteTitle="siteTitle"/>
  </div>
</template>

<script>
import variables from 'saber/variables';
import Header from './Header.vue';
import Footer from './Footer.vue';
export default {
  components: {
    Header: Header,
    Footer: Footer
  },
  props: ['page'],
  head: function head() {
    var excerpt = this.page.excerpt;
    var _this$page = this.page,
        title = _this$page.title,
        layout = _this$page.layout;
    var description = this.$siteConfig.description;

    if (layout === 'page' || layout === 'post') {
      if (excerpt) {
        description = excerpt.replace(/<(?:.|\n)*?>/gm, '');
      }
    }

    return {
      title: title ? "".concat(title, " - ").concat(this.siteTitle) : this.siteTitle,
      meta: [description && {
        name: 'description',
        content: description
      }].filter(Boolean),
      link: this.$feed ? [{
        rel: 'alternate',
        title: "".concat(this.siteTitle, " - Feed"),
        type: "application/".concat(this.$feed.type === 'atom' ? 'atom+xml' : this.$feed.type === 'rss' ? 'rss+xml' : 'json'),
        href: this.$feed.permalink
      }].filter(Boolean) : []
    };
  },
  computed: {
    siteTitle: function siteTitle() {
      return this.$siteConfig.title || 'Your Awesome Title';
    }
  }
};
</script>