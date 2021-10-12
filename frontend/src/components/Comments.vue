<template>
  <div>
    <h1>Comments</h1>
    <form @submit="onSubmit">
      <textarea v-model="text" name="text" />
      <input type="submit" value="Submit" class="btn" />
    </form>
    <div v-for="comment in comments" :key="comment._id">
      <CommentCard v-bind:comment="comment" @onChildSubmit="onChildSubmit" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Action /*Getter, Mutation*/ } from "vuex-class";

import CommentCard from "./CommentCard.vue";
import {AC_ADD_COMMENT, AC_ADD_CHILD_COMMENT} from "../store/actions.names"

@Component({ components: { CommentCard } })
export default class Comments extends Vue {
  @Action(AC_ADD_COMMENT) addComment: any;
  @Action(AC_ADD_CHILD_COMMENT) addChildComment: any;
  @Prop() readonly comments: any;
  text = "";

  onSubmit(event: any) {
    event.preventDefault();
    const data = {
      postSlug: this.$route.params.postSlug,
      payload: { text: this.text }
    };
    this.addComment(data);
    this.text = "";
  }
  onChildSubmit(parentCommentId: any, text: string) {
    const data = {
      postSlug: this.$route.params.postSlug,
      parentCommentId: parentCommentId,
      payload: { text: text }
    };
    this.addChildComment(data);
  }
}
</script>

<style>
</style>