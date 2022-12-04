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
    <div v-if="reportsState.matches('loading')">
      <div>Loading...</div>
    </div>
    <div v-else-if="!reportsState.context.reports">
      <div>No data.</div>
    </div>
    <div v-else>
      <q-table
        flat
        :rows="reportsState.context.reports"
        :columns="columns"
        row-key="name"
      >
        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th auto-width />
            <q-th
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
            >
              {{ col.label }}
            </q-th>
          </q-tr>
        </template>

        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td auto-width>
              <q-btn size="sm" color="accent" round flat @click="(evt: any) => showReport(props.row)" icon="gavel" />
            </q-td>
            <q-td
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
            >
              {{ col.value }}
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </q-card>

  <q-dialog v-model="alert">
    <q-card>
      <img :src="reportPicture.url">

      <q-card-section class="q-pt-none">
        <div>
          <q-checkbox
            v-model="reportReasons[0]"
            label="No-one appears in the picture, or multiple individuals with no clear subject" />
        </div>
        <div>
          <q-checkbox
            v-model="reportReasons[1]"
            label="Fake (impersonation, celebrity picture)" />
        </div>
        <div>
          <q-checkbox
            v-model="reportReasons[2]"
            label="Disrespectful (privacy violation, shaming)" />
        </div>
        <div>
          <q-checkbox
            v-model="reportReasons[3]"
            label="Inappropriate content (nudity, violence)" />
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn
          flat v-close-popup
          label="Validate"
          color="primary"
          :disable="!reportReasons.some((r) => r)"
          @click="submitModeration" />
        <q-btn
          flat v-close-popup
          label="Invalidate"
          color="dark"
          :disable="reportReasons.some((r) => r)"
          @click="submitModeration" />
      </q-card-actions>
    </q-card>
  </q-dialog>

</template>

<script setup lang="ts">
import { Picture, Report, ReportReason } from "@/models";
import useReports from "@/states/reports";
import { ref } from "vue";
import profileService from "@/services/ProfileService";

const {
  reportsState,
  reportsActions,
} = useReports();

reportsActions.refresh();

const alert = ref(false);
const selectedReport = ref(Report.empty());
const reportPicture = ref(Picture.empty());
const reportReasons = ref([false, false, false, false]);

const formatReportReasons = (
  reasons: ReportReason[]
) => {
  return reasons.map((reason) => ReportReason[reason]).join(", ");
}

const columns = [
  {
    required: true,
    name: "reportId",
    label: "Report ID",
    align: "left",
    field: (row: Report) => row.reportId,
    sortable: true,
  },
  {
    required: true,
    name: "fromUserId",
    label: "From user ID",
    align: "left",
    field: (row: Report) => row.userId,
    sortable: true,
  },
  {
    required: true,
    name: "fromProfileId",
    label: "From profile ID",
    align: "left",
    field: (row: Report) => row.profileId,
    sortable: true,
  },
  {
    required: true,
    name: "targetUserId",
    label: "Target user ID",
    align: "left",
    field: (row: Report) => row.targetUserId,
    sortable: true,
  },
  {
    required: true,
    name: "targetProfileId",
    label: "Target profile ID",
    align: "left",
    field: (row: Report) => row.targetProfileId,
    sortable: true,
  },
  {
    required: true,
    name: "reasons",
    label: "Reasons",
    align: "left",
    field: (row: Report) => row.reportReasons,
    format: formatReportReasons,
    sortable: true,
  },
]

const refresh = () => reportsActions.refresh(true);

const showReport = async (
  report: Report,
) => {
  let picture: Picture | undefined;
  try {
    picture = await profileService.getPicture(report.targetPictureId);
  }
  catch (e) {
    console.log(e);
    return;
  }
  selectedReport.value = report;
  reportPicture.value = picture ?? Picture.empty();
  alert.value = true;
}

const submitModeration = async (
) => {
  console.log("moderation submit");
}
</script>
