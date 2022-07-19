<style>
.center {
  margin: auto;
  width: 360px;
}
.card {
  margin: 12px;
}
</style>


<template>
  <div class="center">
    <q-card class="card">
      <q-card-section>
        <div class="text-h4">Sign in</div>
      </q-card-section>
      <q-card-section>

        <q-form
          @submit="onSubmit"
          @reset="onReset"
          class="q-gutter-md"
        >
          <q-input
            outlined
            type="text"
            v-model="email"
            label="Email"
            lazy-rules
            :rules="[
              val => val && val.length > 0 || 'Please fill this in',
              val => isValidEmail(val) || 'Invalid email format',
            ]"
          />

          <q-input
            outlined
            type="password"
            v-model="password"
            label="Password"
            lazy-rules
            :rules="[
              val => val !== null && val !== '' || 'Please fill this in',
              val => val.length >= 8 || 'Minimum 8 characters',
            ]"
          />

          <div>
            <q-btn label="Submit" type="submit" color="primary"/>
            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
          </div>

          <q-banner v-if="error" inline-actions class="text-white bg-red">
            {{ error }}
          </q-banner>

        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>


<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { routes } from "@/router";
import firebase from "@/facades/FirebaseFacade";
import { User } from "@/models";
import { Err } from "@/Err";

const router = useRouter();

const email = ref("");
const password = ref("");
const error = ref<string>();

let user: User | undefined;

const onSubmit = async () => {
  const userOrError = await firebase.signIn(email.value, password.value);
  if (userOrError instanceof Err) {
    error.value = userOrError.format();
  }
  else {
    user = userOrError;
  }
  router.push(routes.home);
};

const onReset = () => {
  email.value = "";
  password.value = "";
  error.value = undefined;
};

const isValidEmail = (val: string): boolean => {
  const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
  return emailPattern.test(val);
}
</script>
