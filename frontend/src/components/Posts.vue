<template>
  <div class="row">
    <div class="col-10" v-for="post in posts" :key="post.slug">
      <PostCard v-bind:post="post" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

import PostCard from "./PostCard.vue";

@Component({ name: "Posts", components: { PostCard } })
export default class Posts extends Vue {
  @Prop() readonly posts: any;
}
</script>

<style>
</style>