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
        :items="items"
        :fields="fields"
      >
        <template #cell(status)="data">
          <b-badge v-if="data.value === 'pending'" variant="secondary">{{
            data.value
          }}</b-badge>
          <b-badge v-else-if="data.value === 'success'" variant="success">{{
            data.value
          }}</b-badge>
          <b-badge v-else variant="danger">{{ data.value }}</b-badge>
        </template>
      </b-table>
      <div class="d-flex justify-content-end">
        <b-pagination pills></b-pagination>
      </div>
    </b-overlay>
  </div>
</template>
<script>
import loader from "../js/loader";
export default {
  name: "LogTable",
  mixins: [loader],
  data() {
    return {
      fields: [
        {
          key: "Date",
          sortable: true,
          class: "text-left",
        },
        {
          key: "request",
          sortable: true,
          class: "text-left",
        },
        {
          key: "status",
          sortable: true,
          class: "text-left",
        },
      ],
      items: [
        {
          Date: Date.now().toLocaleString(),
          request: "Dickerson",
          status: "pending",
        },
        {
          Date: Date.now().toLocaleString(),
          request: "Dickerson",
          status: "success",
        },
        {
          Date: Date.now().toLocaleString(),
          request: "Dickerson",
          status: "failed",
        },
      ],
    };
  },
  created() {
    //this.show_loader("...Loading");
  },
};
</script>