<template>
    <Tweet :id="id" error-message="很抱歉, 推文没有加载成功...">
        <div>
                正在尝试加载推文...
        </div>
    </Tweet>
</template>

<script>
import { Tweet } from "vue-tweet-embed";

export default {
  components: {
    Tweet
  },
  props: {
      id: {
          type: String, 
          required: true
      }
  }
};
</script>