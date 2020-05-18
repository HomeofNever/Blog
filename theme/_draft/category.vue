<script>
import Index from './default.vue'
export default {
  extends: Index,
  head () {
    this.page.title = this.page.category || this.page.title
    return {
      title: `${this.page.title} - ${this.$siteConfig.title}`
    }
  }
}
</script>