<template>
  <div class="row">
    <div class="col-8">
      <h1 class="text-center">Registration</h1>
      <form @submit="onSubmit">
        <div class="form-group">
          <label>Full Name</label>
          <input v-model="auth.fullName" type="text" class="form-control" placeholder="Full Name" />
        </div>
        <div class="form-group">
          <label>Email address</label>
          <input v-model="auth.email" type="email" class="form-control" placeholder="Enter email" />
          <small class="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div class="form-group">
          <label>Password</label>
          <input
            v-model="auth.password"
            type="password"
            class="form-control"
            placeholder="Password"
          />
        </div>

        <div class="form-group">
          <label>Password</label>
          <input
            v-model="auth.confirm_password"
            type="password"
            class="form-control"
            placeholder="Confirm Password"
          />
        </div>

        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Action /*Getter, Mutation*/ } from "vuex-class";
import { AC_REGISTRATION } from "../store/actions.names";

@Component
export default class Registration extends Vue {
  @Action(AC_REGISTRATION) registration: any;
  auth: any = {
    fullName: "",
    email: "",
    password: "",
    ["confirm_password"]: "",
  };

  onSubmit(event: any) {
    event.preventDefault();
    const data = {
      ["full_name"]: this.auth.fullName,
      ["email"]: this.auth.email,
      ["password"]: this.auth.password,
      ["confirm_password"]: this.auth.confirm_password,
    };
    this.registration(data);
  }
}
</script>

<style>
</style>