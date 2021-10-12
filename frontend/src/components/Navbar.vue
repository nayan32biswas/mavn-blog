<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <router-link class="navbar-brand" to="/">Home</router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link class="nav-link" to="/about">About</router-link>
        </li>
      </ul>
      <template v-if="!getIsAuthenticated">
        <router-link class="nav-link" to="/login/">Login</router-link>
        <router-link class="nav-link" to="/registration/">Registration</router-link>
      </template>
      <template v-else>
        <router-link class="nav-link" to="/create/post/">Create Post</router-link>
        <router-link class="nav-link" to="/settings/">Setting</router-link>
        <router-link class="nav-link" :to="`/user/${getThisUsername}/`">{{getThisUsername}}</router-link>
        <button @click="logout()">Logout</button>
      </template>
    </div>
  </nav>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Action, Getter /*, Mutation*/ } from "vuex-class";
import { AC_LOGOUT } from "../store/actions.names";
import { GT_GET_IS_AUTHENTICATED, GT_GET_THIS_USERNAME } from "../store/getters.names";

@Component
export default class Navbar extends Vue {
  @Getter(GT_GET_IS_AUTHENTICATED) getIsAuthenticated: any;
  @Getter(GT_GET_THIS_USERNAME) getThisUsername: any;
  @Action(AC_LOGOUT) logout: any;
  get nextUrl() {
    return "";
  }
}
</script>