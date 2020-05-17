<template>
  <Wrap :page="page">
    <article class="post">
      <header class="post-header">
        <h1 class="post-title">{{ page.title }}</h1>
      </header>

      <div class="post-content">
        <slot name="default"></slot>
      </div>

      <Disqus
        v-if="page.comments !== false && $themeConfig.disqus"
        :url="$siteConfig.url"
        :permalink="page.permalink"
        :shortname="$themeConfig.disqus"
      />

      <a class="u-url" :href="page.permalink" hidden></a>
    </article>
  </Wrap>
</template>

<script>
import Wrap from "../components/Wrap.vue";
import Disqus from "../components/Disqus.vue";
export default {
  components: {
    Disqus: Disqus,
    Wrap: Wrap
  },
  props: ["page"]
};
</script>