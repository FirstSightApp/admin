<template>
  <div class="center">
    <div class="card">
      <h1>Sign in</h1>
      <p><input type="text" placeholder="Email" v-model="email" /></p>
      <p><input type="password" placeholder="Password" v-model="password" /></p>
      <p v-if="error">{{ error }}</p>
      <p><button @click="signIn">Submit</button></p>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { routes } from "@/router";
import firebase from "@/facades/FirebaseFacade";
import { User } from "@/models";
import { Err } from "@/Err";

const email = ref("");
const password = ref("");
const error = ref<string>();

const router = useRouter();

let user: User | undefined;

const signIn = async () => {
  const userOrError = await firebase.signIn(email.value, password.value);
  if (userOrError instanceof Err) {
    error.value = userOrError.format();
  }
  else {
    user = userOrError;
  }
  router.push(routes.home);
}
</script>

<style>
.center {
  margin: auto;
  width: 260px;
}
.card {
  margin: 12px;
  padding: 24px;
  background-color: white;
}
</style>
