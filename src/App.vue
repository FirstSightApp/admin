<template>
  <div>
    <Layout />
  </div>
</template>


<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { routes } from "@/router";
import Layout from '@/pages/Layout.vue';
import { getAuth, User } from "firebase/auth";

const router = useRouter();
const isSignedIn = ref(false);

router.beforeEach((to, from, next) => {
  if (isSignedIn.value) {
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

getAuth().onAuthStateChanged(function(user: User | null) {
  isSignedIn.value = !!user;
  if (!isSignedIn.value) {
    router.push(routes.login);
  }
});

</script>


<style>
#app {
  min-height: 100%;
  background-color: whitesmoke;
  font-family: Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
