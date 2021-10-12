<template>
  <div>
    <button @click="onDeleteHandler" class="btn btn-danger">Delete</button>
    <PostCreateUpdateForm
      v-bind:post="getEditablePost"
      :formName="postDetails.title"
      @onPostSubmit="updatePostHandler"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action, Getter /*, Mutation*/ } from "vuex-class";

import PostCreateUpdateForm from "../components/PostCreateUpdateForm.vue";

import {AC_FETCH_POST, AC_UPDATE_POST, AC_DELETE_POST} from "../store/actions.names"
import {GT_POST_DETAILS} from "../store/getters.names"


@Component({ components: { PostCreateUpdateForm } })
export default class PostDetails extends Vue {
  @Action(AC_FETCH_POST) fetchPost: any;
  @Action(AC_UPDATE_POST) updatePost: any;
  @Action(AC_DELETE_POST) deletePost: any;
  @Getter(GT_POST_DETAILS) postDetails: any;
  mounted() {
    this.fetchPost(this.$route.params.postSlug);
  }
  get getEditablePost() {
    const postCopy = {
      title: this.postDetails.title,
      content: this.postDetails.content,
      postImage: this.postDetails.post_image,
      published: this.postDetails.published
    };
    return postCopy;
  }
  updatePostHandler(formData: any) {
    this.updatePost({
      postSlug: this.$route.params.postSlug,
      payload: formData
    });
  }
  onDeleteHandler() {
    this.deletePost(this.$route.params.postSlug);
  }
}
</script>

<style>
</style>