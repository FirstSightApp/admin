<template>
  <div>
    <nav>
      <router-link v-bind:to="routes.home">
        <img src="./assets/logo.png" width="36" height="36" />
      </router-link>
      <router-link v-bind:to="routes.home">Home</router-link>
      <span> - </span>
      <span v-if="isLoggedIn">
        <button @click="signOut">Sign out</button>
      </span>
      <span v-else>
        <router-link v-bind:to="routes.login">Sign in</router-link>
      </span>
    </nav>
    <router-view />
  </div>
</template>


<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { routes } from "./router";
import firebase from 'firebase/app';
import 'firebase/auth';

const isLoggedIn = ref(false);

const router = useRouter();

router.beforeEach((to, from, next) => {
  if (isLoggedIn.value) {
    return next(true);
  }
  if (to.path === routes.login) {
    return next(true);
  }
  if (from.path !== routes.login) {
    return next(routes.login);
  }
  next(false);
});

firebase.auth().onAuthStateChanged(function(user) {
  isLoggedIn.value = !!user;
  if (!isLoggedIn.value) {
    router.push(routes.login);
  }
});

const signOut = () => {
  firebase.auth().signOut();
  router.push(routes.login);
};
</script>


<style>
#app {
  min-height: 100%;
  background-color: whitesmoke;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
