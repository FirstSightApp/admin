<template>
  <q-list separator>

    <q-item
      clickable v-ripple
      @click="routeActions.navigate(routes.dashboard)"
      :active="routeState.context.endpoint === routes.home || routeState.context.endpoint === routes.dashboard"
      active-class="bg-teal-2 text-grey-8">
      <q-item-section avatar>
        <q-icon name="dashboard" />
      </q-item-section>
      <q-item-section>Dashboard</q-item-section>
    </q-item>

    <q-item
      clickable v-ripple
      @click="routeActions.navigate(routes.users)"
      :active="routeState.context.endpoint === routes.users"
      active-class="bg-teal-2 text-grey-8">
      <q-item-section avatar>
        <q-icon name="people" />
      </q-item-section>
      <q-item-section>Users</q-item-section>
    </q-item>

    <q-item
      clickable v-ripple
      @click="routeActions.navigate(routes.reports)"
      :active="routeState.context.endpoint === routes.reports"
      active-class="bg-teal-1 text-grey-8">
      <q-item-section avatar>
        <q-icon name="outlined_flag" />
      </q-item-section>
      <q-item-section>Reports</q-item-section>
    </q-item>

  </q-list>
</template>

<script setup lang="ts">
import { routes } from "@/router";
import useRoute from "@/states/route";

const {
  routeState,
  routeActions,
} = useRoute();

</script>
