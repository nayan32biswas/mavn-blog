<template>
  <div>
    <div v-for="comment in childComments" :key="comment._id">
      <div class="text-danger">
        <p>{{comment.text}}</p>
        <p>{{comment.created_at}}</p>
        <hr />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class CommentChild extends Vue {
  @Prop() readonly childComments: any;
}
</script>

<style>
</style>