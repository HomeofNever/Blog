<template>
  <Wrap :page="page">
    <div class="home">
      <h1 class="page-heading" v-if="page.title">{{ page.title }}</h1>

      <slot name="default"></slot>

      <h2
        class="post-list-heading"
        v-if="page.posts && page.posts.length > 0"
      >{{ page.listTitle || 'Posts' }}</h2>

      <ul class="post-list" v-if="page.posts && page.posts.length > 0">
        <li v-for="post in page.posts" :key="post.permalink">
          <span class="post-meta">{{ formatDate(post.createdAt) }}</span>
          <h3>
            <saber-link class="post-link" :to="post.permalink">{{ post.title }}</saber-link>
          </h3>
        </li>
      </ul>

      <div
        class="pagination"
        v-if="page.pagination && (page.pagination.hasNext || page.pagination.hasPrev)"
      >
        <router-link
          class="prev-link"
          :to="page.pagination.prevLink"
          v-if="page.pagination.hasPrev"
        >← Previous</router-link>
        <router-link
          class="next-link"
          :to="page.pagination.nextLink"
          v-if="page.pagination.hasNext"
        >Next →</router-link>
      </div>

      <p class="feed-subscribe" v-if="feedLink">
        <svg
          class="svg-icon organge"
          enable-background="new 0 0 24 24"
          height="512"
          viewBox="0 0 24 24"
          width="512"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="3.429" cy="20.571" r="3.429" />
          <path
            d="m11.429 24h4.57c0-8.821-7.178-15.999-15.999-16v4.572c6.302.001 11.429 5.126 11.429 11.428z"
          />
          <path d="m24 24c0-13.234-10.766-24-24-24v4.571c10.714 0 19.43 8.714 19.43 19.429z" />
        </svg>
        <a :href="feedLink">Subscribe</a>
      </p>
    </div>
  </Wrap>
</template>

<script>
import { formatDate } from "../utils/date";
import Wrap from "../components/Wrap.vue";

export default {
  components: {
    Wrap
  },
  props: ["page"],
  computed: {
    feedLink: function feedLink() {
      return this.$feed && this.$feed.permalink;
    }
  },
  methods: {
    formatDate
  }
};
</script>