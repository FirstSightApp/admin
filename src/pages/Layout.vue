<template>
  <q-layout view="hHr lpR fFr">

    <q-header class="bg-dark text-white">
      <q-toolbar>
        <q-btn
          @click="toggleLeftDrawer"
          v-if="isSignedIn"
          dense flat round
          icon="menu" />

        <q-toolbar-title>
          <q-avatar>
            <img src="../assets/logo.png" width="36" height="36" />
          </q-avatar>
          Admin - FirstSight
        </q-toolbar-title>

        <span v-if="isSignedIn">
          <q-btn-dropdown stretch flat :label="`${email}`">
            <q-list>
              <q-item clickable v-ripple @click="signOut">
                <q-item-section avatar>
                  <q-icon name="logout" />
                </q-item-section>
                <q-item-section>Sign out</q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </span>
        <span v-else>
          <router-link v-bind:to="routes.login">
            <q-btn
              color="white"
              text-color="black">
              Sign in
            </q-btn>
          </router-link>
        </span>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-if="isSignedIn"
      show-if-above
      v-model="leftDrawerOpen"
      side="left"
      bordered>
      <NavigationBar />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>


<script setup lang="ts">
import NavigationBar from '@/components/NavigationBar.vue';
import { ref } from "vue";
import { getAuth, User } from "firebase/auth";
import { useRouter } from "vue-router";
import firebase from "@/facades/FirebaseFacade";
import { routes } from '@/router';

const router = useRouter();
const isSignedIn = ref(false);
const leftDrawerOpen = ref(false);
const email = ref("");

getAuth().onAuthStateChanged(function(user: User | null) {
  isSignedIn.value = !!user;
  if (!isSignedIn.value) {
    router.push(routes.login);
  }
  else {
    email.value = user!.email!;
  }
});

const signOut = async () => {
  await firebase.signOut();
  router.push(routes.login);
};

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>

<script module lang="ts">
export default {
  setup () {
    return {
      leftDrawerOpen,
    }
  }
}
</script>
