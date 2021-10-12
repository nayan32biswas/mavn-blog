<template>
  <div>
    <router-link :to="`/post/${post.slug}/`">{{post.title}}</router-link>-----
    <router-link :to="`/user/${post.user.username}/`">{{post.user.username}}</router-link>
    <img v-bind:src="getImageURL(post.post_image)" :alt="'adsfas'" />
    <p>{{post.content.substring(0, 100)}}</p>
    <hr />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { getImageURL } from "@/global";

@Component
export default class PostCard extends Vue {
  @Prop() readonly post: any;
  getImageURL: any = getImageURL;
}
</script>

<style>
</style>