<template>
  <Posts v-bind:posts="allPosts" />
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";
import Posts from "../components/Posts.vue";

import {AC_FETCH_POSTS} from "../store/actions.names"
import {GT_ALL_POSTS} from "../store/getters.names"


@Component({ components: { Posts } })
export default class Home extends Vue {
  @Action(AC_FETCH_POSTS) fetchPosts: any;
  @Getter(GT_ALL_POSTS) allPosts: any;

  mounted() {
    this.fetchPosts();
  }
}
</script>

<style>
</style>
