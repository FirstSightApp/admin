<template>
  <q-card class="q-ma-md">
    <div class="row no-wrap shadow-1">
      <q-toolbar class="col-8 bg-white">
        <q-btn
          flat round dense
          icon="refresh"
          @click="refresh" />
        <q-btn flat round dense icon="search" />
      </q-toolbar>
      <q-toolbar class="col-4 bg-primary text-white">
        <q-space />
        <q-btn flat round dense icon="help" class="q-mr-sm" />
        <q-btn flat round dense icon="more_vert" />
      </q-toolbar>
    </div>
    <q-separator />
    <div v-if="profilesState.matches('loading')">
      <div>Loading...</div>
    </div>
    <div v-else-if="!profilesState.context.profiles">
      <div>No data.</div>
    </div>
    <div v-else>
      <q-table
        flat
        :rows="profilesState.context.profiles"
        :columns="columns"
        row-key="name"
      />
    </div>
  </q-card>
</template>

<script setup lang="ts">
import { Profile } from "@/models";
import useProfiles from "@/states/profiles";

const {
  profilesState,
  profilesActions,
} = useProfiles();

profilesActions.refresh();

const columns = [
  {
    //name: "name",
    required: true,
    label: "User ID",
    align: "left",
    field: (row: Profile) => row.userId,
    //format: val => `${val}`,
    sortable: true,
  },
  {
    //name: "name",
    required: true,
    label: "Profile ID",
    align: "left",
    field: (row: Profile) => row.profileId,
    //format: val => `${val}`,
    sortable: true,
  },
  {
    //name: "name",
    required: true,
    label: "Name",
    align: "left",
    field: (row: Profile) => row.name,
    //format: val => `${val}`,
    sortable: true,
  },
]

const refresh = () => profilesActions.refresh(true);

</script>
