<template>
  <Wrap :page="page">
    <article class="post h-entry" itemscope itemtype="http://schema.org/BlogPosting">
      <header class="post-header">
        <h1 class="post-title p-name" itemprop="name headline">{{ page.title }}</h1>
        <div class="post-meta" align="left">
          <time
            class="dt-published"
            :datetime="page.createdAt"
            itemprop="datePublished"
            style="display: inline-block"
          >{{ formatDate(page.createdAt) }}</time>
          <section class="page-categories" v-if="page.categoriesInfo">
            <span v-for="(item, index) in page.categoriesInfo" :key="index">
              <span v-if="index > 0">,</span>
              <saber-link class="category" :to="item.permalink">{{ item.name }}</saber-link>
            </span>
          </section>
          <section class="page-block-action" v-if="$themeConfig.share || page.tagsInfo">
            <div class="page-share"></div>
            <div class="page-tags" v-if="page.tagsInfo">
              <span v-for="(item, index) in page.tagsInfo" :key="index">
                <span v-if="index > 0">,</span>
                <span class="tag">{{item.name}}</span>
              </span>
            </div>
          </section>
        </div>
      </header>

      <div class="post-content e-content" itemprop="articleBody">
        <slot name="default" />
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
import formatDate from "../utils/formatDate";
import Wrap from "../components/Wrap.vue";
import Disqus from "../components/Disqus.vue";

export default {
  components: {
    Wrap: Wrap,
    Disqus: Disqus
  },
  props: ["page"],
  methods: {
    formatDate: formatDate
  }
};
</script>