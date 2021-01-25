<template>
  <div class="p-3">
    <div class="row">
      <div class="col">
        <div class="form-group">
          <label for="">Title</label>
          <input type="text" v-model.trim="title" class="form-control col-15" />
        </div>
      </div>
      <div class="col">
        <div class="form-group">
          <label for="">Candidate Name</label>
          <input type="text" v-model.trim="name" class="form-control" />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="form-group">
          <label for="">From date</label>
          <input type="date" v-model.trim="fromdate" class="form-control" />
        </div>
      </div>
      <div class="col">
        <div class="form-group">
          <label for="">To date</label>
          <input type="date" v-model.trim="todate" class="form-control" />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <button class="btn btn-wb btn-block" v-on:click="Search">Search</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "SingleCertSearch",
  data: () => {
    return {
      name: "",
      title: "",
      fromdate: "",
      todate: "",
    };
  },
  methods: {
    Search() {
      let query = "?";
      for (const [key, value] of Object.entries(this.$data)) {
        if (value) {
          query += `${key}=${value}&`;
        }
      }
      query = query.slice(0, query.length - 1);
      this.$emit("search", { query: query, data: this.$data });
    },
  },
};
</script>