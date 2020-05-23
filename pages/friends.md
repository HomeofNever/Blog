---
title: 友情链接
layout: showcase
description: wow, these ARE my friends
---

这里应该是一些一起玩的小伙伴们，他们都超级棒的!!1

不妨也去溜达溜达 XD

<table>
<thead><tr><th style="text-align: center;">Avatar</th> <th style="text-align: center;">Site</th> <th style="text-align: center;">Slogan</th></tr></thead>
<tbody>
  <tr v-for="(value, name) in friends">
    <td style="text-align:center;"><img v-if="value.img" :src="value.img" width="200"><span v-else>头</span></td>
    <td style="text-align:center;"><a :href="value.link">{{ name }}</a></td>
    <td style="text-align:center;">{{ value.slogan }}</td>
  </tr>
</tbody>
</table>

# 交换友链

交换链接请移步[这个仓库](https://github.com/HomeofNever/Friends), 阅读说明后发起 pr 提交你的信息

等你哦w

<br>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      friends: {}
    }
  },
  created() {
    this.getFriendList()
  },
  methods: {
    getFriendList() {
      axios.get('https://cdn.jsdelivr.net/gh/homeofnever/friends@gh-pages/friends.json').then(res => res.data).then(res => this.friends = res)
    }
  }
}
</script>
