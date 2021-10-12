<template>
  <div>
    <h1>Login</h1>
    <form @submit="onSubmit">
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input v-model="auth.email" type="email" class="form-control" placeholder="Enter email" />
        <small
          id="emailHelp"
          class="form-text text-muted"
        >We'll never share your email with anyone else.</small>
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input v-model="auth.password" type="password" class="form-control" placeholder="Password" />
      </div>
      <div class="form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck1" />
        <label class="form-check-label">Check me out</label>
      </div>
      <button @click="onSubmit" type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action } from "vuex-class";
import { AC_LOGIN } from "../store/actions.names";

@Component
export default class Login extends Vue {
  @Action(AC_LOGIN) login: any;
  auth: any = {
    email: "",
    password: "",
  };

  onSubmit(event: any) {
    event.preventDefault();
    const data = {
      ["user_identity"]: this.auth.email,
      password: this.auth.password,
    };
    this.login(data);
  }
}
</script>

<style>
</style>