<template>
  <q-layout view="hHr lpR fFr">

    <q-header class="bg-dark text-white">
      <q-toolbar>
        <q-btn
          @click="toggleLeftDrawer"
          v-if="authState.matches('authenticated')"
          dense flat round
          icon="menu" />

        <q-toolbar-title>
          <q-avatar>
            <img src="../assets/logo.png" width="36" height="36" />
          </q-avatar>
          Admin - FirstSight
        </q-toolbar-title>

        <span v-if="authState.matches('authenticated')">
          <q-btn-dropdown stretch flat :label="`${authState.context.user?.email}`">
            <q-list>
              <q-item clickable v-ripple @click="authActions.logout()">
                <q-item-section avatar>
                  <q-icon name="logout" />
                </q-item-section>
                <q-item-section>Sign out</q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </span>
        <span v-else>
          <q-btn
            @click="routeActions.navigate(routes.login)"
            color="white"
            text-color="black">
            Sign in
          </q-btn>
        </span>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-if="authState.matches('authenticated')"
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
import { routes } from '@/router';
import useAuth from "@/states/auth";
import useRoute from "@/states/route";

const {
  authState,
  authActions,
} = useAuth();

const {
  routeState,
  routeActions,
} = useRoute();

const leftDrawerOpen = ref(false);

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
