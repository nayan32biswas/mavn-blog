<template>
  <div>
    <div v-if="isOwner" class="text-center">
      <router-link class="btn btn-danger" :to="`/post/edit/${postDetails.slug}/`">Edit</router-link>
    </div>
    <div class="row">
      <h1>{{postDetails.title}}</h1>
      <img v-bind:src="getImageURL(postDetails.post_image)" :alt="'adsfas'" />
      <p>{{postDetails.content}}</p>
    </div>
    <div>
      <Comments :comments="postDetails.comments" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";

import { getImageURL } from "@/global";
import Comments from "../components/Comments.vue";
import { GT_GET_THIS_USERNAME, GT_POST_DETAILS } from "../store/getters.names";
import { AC_FETCH_POST } from "../store/actions.names";

@Component({ components: { Comments } })
export default class PostDetails extends Vue {
  @Action(AC_FETCH_POST) fetchPost: any;
  @Getter(GT_GET_THIS_USERNAME) getThisUsername: any;
  @Getter(GT_POST_DETAILS) postDetails: any;
  getImageURL = getImageURL;
  get isOwner() {
    if (this.getThisUsername && this.postDetails.user) {
      return this.getThisUsername === this.postDetails.user.username;
    }
    return false;
  }
  mounted() {
    this.fetchPost(this.$route.params.postSlug);
  }
}
</script>

<style>
</style>