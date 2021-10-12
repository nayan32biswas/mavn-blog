<template>
  <div>
    <h1>{{formName}}</h1>
    <form @submit="onSubmit">
      <div class="form-group">
        <label>Title</label>
        <input v-model="postForm.title" type="text" class="form-control" placeholder="Title" />
      </div>
      <div class="form-group">
        <label for="exampleFormControlTextarea1">Example textarea</label>
        <textarea v-model="postForm.content" rows="6" class="form-control" placeholder="Content"></textarea>
      </div>
      <div class="form-group">
        <label>Post Image</label>
        <input @change="onPostImageChange" type="file" class="form-control-file" />
      </div>
      <div class="form-check">
        <input v-model="postForm.published" type="checkbox" class="form-check-input" />
        <label class="form-check-label">Publish</label>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { isValidData } from "@/global";

@Component
export default class PostCreateUpdateForm extends Vue {
  @Prop() post: any;
  @Prop() formName: any;
  assigned = false;
  postImageUrl = "";
  postForm = {
    title: "",
    content: "",
    ["post_image"]: null,
    published: false,
  };
  mounted() {
    if (this.post && this.post.title && !this.assigned) {
      this.postForm = this.post;
      this.assigned = true;
    }
  }
  beforeUpdate() {
    if (this.post && this.post.title && !this.assigned) {
      this.postForm = this.post;
    }
    this.assigned = true;
  }
  onPostImageChange(event: any) {
    this.postForm["post_image"] = event.target.files[0];
    this.postImageUrl = URL.createObjectURL(this.postForm.post_image);
  }
  onSubmit(event: any) {
    event.preventDefault();
    const data = {
      title: this.postForm.title,
      content: this.postForm.content,
      ["post_image"]: this.postForm.post_image,
      published: this.postForm.published,
    };
    const formData = new FormData();
    Object.entries(data).forEach(([key, value], index) => {
      if (isValidData(value)) {
        formData.append(key, value);
      }
    });
    this.$emit("onPostSubmit", formData);
  }
}
</script>

<style>
</style>
