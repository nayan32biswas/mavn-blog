<template>
  <div>
    <h3>{{comment.text}}</h3>
    <p>{{comment.created_at}}</p>
    <form @submit="onSubmit">
      <input type="text" v-model="text" />
      <input type="submit" class="btn" />
    </form>
    <template v-if="comment.child.length>0">
      <CommentChild v-bind:childComments="comment.child" />
    </template>
    <hr />
    <hr />
    <hr />
  </div>
</template>

<script lang="ts">
import CommentChild from "./CommentChild.vue";

import { Component, Vue, Prop } from "vue-property-decorator";
import { Action /*Getter, Mutation*/ } from "vuex-class";

@Component({
  components: {
    CommentChild
  }
})
export default class CommentCard extends Vue {
  @Prop() readonly comment: any;
  text = "";
  onSubmit(event: any) {
    event.preventDefault();
    this.$emit("onChildSubmit", this.comment._id, this.text);
    this.text = "";
  }
}
</script>

<style>
</style>