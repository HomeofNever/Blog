<template>
  <div id="disqus_thread"></div>
</template>

<script>
export default {
  props: {
    url: {
      type: String,
      required: true
    },
    permalink: {
      type: String,
      required: true
    },
    shortname: {
      type: String,
      required: true
    }
  },
  computed: {
    disqus_url() {
      return "".concat(this.url).concat(this.permalink);
    },
    identifier() {
      return this.permalink;
    }
  },
  mounted() {
    if (window.DISQUS) {
      this.reset(window.DISQUS);
      return;
    }
    this.init();
  },
  methods: {
    reset(dsq) {
      const self = this;
      dsq.reset({
        reload: true,
        config: function() {
          self.setBaseConfig(this);
        }
      });
    },
    init() {
      const self = this;
      window.disqus_config = function() {
        self.setBaseConfig(this);
      };
      setTimeout(() => {
        let d = document,
          s = d.createElement("script");
        s.setAttribute("id", "embed-disqus");
        s.setAttribute("data-timestamp", +new Date());
        s.type = "text/javascript";
        s.async = true;
        s.src = `//${this.shortname}.disqus.com/embed.js`;
        (d.head || d.body).appendChild(s);
      }, 0);
    },
    setBaseConfig(disqusConfig) {
      disqusConfig.page.identifier = this.identifier
      disqusConfig.page.url = this.disqus_url
      if (this.title) {
        disqusConfig.page.title = this.title;
      }
      disqusConfig.callbacks.onReady = [
        () => {
          this.$emit("ready");
        }
      ];

      disqusConfig.callbacks.onNewComment = [
        comment => {
          this.$emit("new-comment", comment);
        }
      ];
    }
  }
};
</script>