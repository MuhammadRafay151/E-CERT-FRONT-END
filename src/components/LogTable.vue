<template>
  <div class="shadow p-3">
    <b-overlay :show="loading" rounded="sm">
      <template #overlay>
        <div class="text-center">
          <b-spinner
            style="width: 3rem; height: 3rem"
            label="Large Spinner"
          ></b-spinner>
          <p id="cancel-label">{{ loading_text }}</p>
        </div>
      </template>
      <b-table
        bordered
        white
        hover
        sticky-header="500px"
        responsive
        no-border-collapse
        :items="Logs.List"
        :fields="fields"
        v-on:row-clicked="ShowDetails"
      >
       <template #cell(date)="data">
          {{ new Date(data.value).toLocaleString() }}
        </template>
        <template #cell(description)="data">
          {{ data.value.substring(0, 150) + "..." }}
        </template>
        <template #cell(status)="data">
          <b-badge v-if="data.value === 'Pending'" variant="secondary">{{
            data.value
          }}</b-badge>
          <b-badge v-else-if="data.value === 'Success'" variant="success">{{
            data.value
          }}</b-badge>
          <b-badge v-else variant="danger">{{ data.value }}</b-badge>
        </template>
      </b-table>
      <div class="d-flex justify-content-end">
        <b-pagination
          pills
          v-model="CurrentPage"
          per-page="5"
          :total-rows="Logs.Count"
          v-on:change="
            (pageno) => {
              $router.push('/logs?pageno=' + pageno);
            }
          "
        ></b-pagination>
      </div>
    </b-overlay>
    <b-modal v-model="ShowDetailedView" scrollable title="Detailed View" hide-footer centered>
      <p class="my-4">
        {{ currentRow?currentRow.description:"" }}
      </p>
      <p class="border border-danger">
        {{currentRow?currentRow.message:""}}
      </p>
    </b-modal>
  </div>
</template>
<script>
import loader from "../js/loader";
import { mapState } from "vuex";
export default {
  name: "LogTable",
  mixins: [loader],
  props: ["pageno"],
  computed: {
    ...mapState("logs_state", ["Logs", "Count"]),
  },
  watch: {
    pageno: function (pageno) {
      this.Load(pageno);
    },
  },
  data() {
    return {
      CurrentPage: 1,
      currentRow: null,
      ShowDetailedView: false,
      fields: [
        {
          key: "date",
          sortable: true,
          class: "text-left",
        },
        {
          key: "description",
          sortable: true,
          class: "text-left",
        },
        {
          key: "status",
          sortable: true,
          class: "text-left",
        },
      ],
    };
  },
  methods: {
    Load(PageNo) {
      this.show_loader("...Loading");
      this.$store
        .dispatch("logs_state/GetLogs", PageNo)
        .then(() => {
          this.Hide_loader();
          this.CurrentPage = PageNo;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    ShowDetails(x) {
      this.ShowDetailedView = true;
      this.$nextTick(() => {
        this.currentRow = x;
      });
    },
  },
  created() {
    this.Load();
  },
};
</script>