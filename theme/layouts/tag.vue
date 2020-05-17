<script>
import Index from './default.vue'
export default {
  extends: Index,
  head () {
    this.page.title = this.page.tag || this.page.title
    return {
      title: `${this.page.title} - ${this.$siteConfig.title}`
    }
  }
}
</script>