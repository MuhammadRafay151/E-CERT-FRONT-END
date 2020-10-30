<template>
  <div>
    <b-card no-body class="overflow-hidden shadow">
      <b-card-body>
        <b-row align-v="center">
          <b-col sm="3">
            <b-link href="#"><b-icon icon="plus"></b-icon> Add</b-link>
          </b-col>

          <b-col sm="6">
            <h3>XYZ batch 2020</h3>
          </b-col>

          <b-col sm="3">
            <b-nav-form @submit.prevent>
              <div class="form-group">
                <b-form-input placeholder="Search"></b-form-input>
                <b-button
                  variant="outline-dark"
                  class="my-2 my-sm-0"
                  type="submit"
                  ><b-icon icon="search"></b-icon
                ></b-button>
              </div>
            </b-nav-form>
          </b-col>
        </b-row>
      </b-card-body>
    </b-card>

    <div style="border: ridge" class="d-flex justify-content-end">
      <div style="border: ridge; width: 500px; margin: 5px">
        <b-row style="margin: 5px">
          <b-col sm="1" align-self="center">
            <b-icon icon="funnel-fill"></b-icon>
          </b-col>

          <b-col sm="5"
            ><input type="date" class="form-control" placeholder="From Date"
          /></b-col>

          <b-col sm="1"> ... </b-col>

          <b-col sm="5"
            ><input type="date" class="form-control" placeholder="To Date"
          /></b-col>
        </b-row>
      </div>
    </div>
    
    <BatchInformation />
  </div>
</template>

<script>
import BatchInformation from "./BatchInformation.vue";
export default {
  name: "BatchView",

  components: {
    BatchInformation,
  },
};
</script>