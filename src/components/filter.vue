<template>
  <div>
    <b-dropdown
      id="dropdown-form"
      text="Dropdown with form"
      variant="link"
      toggle-class="text-decoration-none"
      ref="dropdown"
      class="m-2"
      no-caret
    >
      <template #button-content>
        <b-icon icon="funnel-fill"></b-icon>
      </template>
      <b-dropdown-form>
        <b-form-group label="From Date" label-for="from">
          <b-form-input
            id="from"
            type="date"
            size="sm"
            placeholder="From Date"
            v-model="fromdate"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="To Date" label-for="to">
          <b-form-input
            id="to"
            type="date"
            size="sm"
            placeholder="To Date"
            v-model="todate"
          ></b-form-input>
        </b-form-group>

        <b-button variant="primary" size="sm" @click="datesearch">Search</b-button>
      </b-dropdown-form>
      <b-dropdown-divider></b-dropdown-divider>
      <b-dropdown-form>
        <b-form-group  >
          <label for="">{{search_label}}</label>
          <div class="input-group " style="width:200px">
            <input
              type="text"
              class="form-control "
              v-bind:placeholder="search_label"
              v-model="code"
            />
            <div class="input-group-prepend">
              <div class="input-group-text">
                <b-icon icon="search" @click="textsearch"></b-icon>
              </div>
            </div>
          </div>
        </b-form-group>
      </b-dropdown-form>
    </b-dropdown>
  </div>
</template>
<script>
export default {
  name: "daterange",
  props:["search_label"],
  data: function() {
    return {
      todate: "",
      fromdate: "",
      code: ""
    };
  },
  methods: {
    datesearch() {
      this.$emit("DateSearch", {
        todate: this.todate,
        fromdate: this.fromdate
      });
    },
    textsearch() {
      this.$emit("TextSearch", this.code);
    }
  }
};
</script>