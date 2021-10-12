<template>
  <div>
    <h1>User Profile</h1>
    <Posts v-bind:posts="userAllPosts" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";

import {AC_FETCH_USER_POST} from "../store/actions.names"
import {GT_USER_ALL_POSTS} from "../store/getters.names"

import Posts from "../components/Posts.vue";
@Component({ components: { Posts } })
export default class Profile extends Vue {
  @Action(AC_FETCH_USER_POST) fetchUserPost: any;
  @Getter(GT_USER_ALL_POSTS) userAllPosts: any;
  mounted(){
    this.fetchUserPost(this.$route.params.username);
  }
}
</script>

<style>
</style>