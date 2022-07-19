<template>
  <q-list bordered separator>

    <q-item
      clickable v-ripple
      @click="$router.push(routes.home)"
      :active="$router.currentRoute.value.path === routes.home"
      active-class="bg-teal-2 text-grey-8">
      <q-item-section avatar>
        <q-icon name="dashboard" />
      </q-item-section>
      <q-item-section>Dashboard</q-item-section>
    </q-item>

    <q-item
      clickable v-ripple
      @click="$router.push(routes.users)"
      :active="$router.currentRoute.value.path === routes.users"
      active-class="bg-teal-2 text-grey-8">
      <q-item-section avatar>
        <q-icon name="people" />
      </q-item-section>
      <q-item-section>Users</q-item-section>
    </q-item>

    <q-item
      clickable v-ripple
      @click="$router.push(routes.reports)"
      :active="$router.currentRoute.value.path === routes.reports"
      active-class="bg-teal-1 text-grey-8">
      <q-item-section avatar>
        <q-icon name="outlined_flag" />
      </q-item-section>
      <q-item-section>Reports</q-item-section>
    </q-item>

  </q-list>
</template>

<script setup lang="ts">
import { routes } from '@/router';
</script>
