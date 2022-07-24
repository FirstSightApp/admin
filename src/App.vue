<template>
  <div v-if="isInitialized">
    <Layout />
  </div>
</template>


<script setup lang="ts">
import Layout from "@/pages/Layout.vue";
import { ref } from "vue";
import firebase from "@/facades/firebase";
import viewService from "@/services/ViewService";
import useRoute from "@/states/route";
import useAuth from "@/states/auth";

const {
  authState,
  authActions,
} = useAuth();

const {
  routeState,
  routeActions,
} = useRoute();

const isInitialized = ref(false);

firebase.auth.onAuthStateChanged((user) => {
  if (isInitialized.value) {
    return;
  }

  // Refresh auth machine first (might start a navigation).
  authActions.refresh();

  // "init" route machine with current route.
  const endpoint = viewService.getRoute();
  routeActions.navigate(endpoint);
  isInitialized.value = true;
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
