<template>
  <div>
    <PostCreateUpdateForm :formName="getTitle" @onPostSubmit="createPostHandler" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action } from "vuex-class";
import PostCreateUpdateForm from "../components/PostCreateUpdateForm.vue";
import {AC_CREATE_POST} from "../store/actions.names"

@Component({ components: { PostCreateUpdateForm } })
export default class CreatePost extends Vue {
  @Action(AC_CREATE_POST) createPost: any;
  get getTitle() {
    return "Create Post";
  }
  createPostHandler(formData: any) {
    this.createPost(formData);
  }
}
</script>

<style>
</style>