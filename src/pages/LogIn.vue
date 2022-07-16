<template>
  <div class="center">
    <div class="card">
      <h1>Sign in</h1>
      <p><input type="text" placeholder="Email" v-model="email" /></p>
      <p><input type="password" placeholder="Password" v-model="password" /></p>
      <p v-if="error">{{ error }}</p>
      <p><button @click="logIn">Submit</button></p>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { routes } from "../router";
import firebase from 'firebase/app';
import 'firebase/auth';

const email = ref("");
const password = ref("");
const error = ref<string>();

const router = useRouter();

const logIn = () => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email.value, password.value)
    .then((data) => {
      router.push(routes.home);
    })
    .catch(error => {
      switch (error.code) {
        case "auth/invalid-email":
          error.value = "Invalid email";
          break;
        case "auth/user-not-found":
          error.value = "No account with that email was found";
          break;
        case "auth/wrong-password":
          error.value = "Incorrect password";
          break;
        default:
          error.value = "Email or password was incorrect";
          break;
      };
    });
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
