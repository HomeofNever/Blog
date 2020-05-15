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
  mounted: function mounted() {
    var permalink = this.permalink,
        url = this.url;

    window.disqus_config = function () {
      this.page.url = "".concat(url).concat(permalink);
      this.page.identifier = permalink;
    };

    var script = document.createElement('script');
    script.async = true;
    script.src = "https://".concat(this.shortname, ".disqus.com/embed.js");
    script.setAttribute('data-timestamp', +new Date());
    document.body.appendChild(script);
  }
};
</script>