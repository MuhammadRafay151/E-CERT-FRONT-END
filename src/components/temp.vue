<template>
  <div>
     <imageviewer ref="i1" v-bind:path="path" />
    <div class="card shadow" style="width: 25rem;">
      <img :src="path" class="card-img-top p-1" alt="..." />
      <div class="card-body">
        <p class="card-text text-justify">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </p>
      </div>
      <div class="row mb-3 mr-2 ml-2">
        <div class="col">
          <b-button squared block class="btn-wb" v-on:click="view">View</b-button>
        </div>
        <div class="col">
          <b-button squared block class="btn-wb" v-on:click="select">Start</b-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import imageviewer from "../components/imageviewer";
export default {
  props: ["path", "tid"],
  name: "temp",
  components:{ imageviewer},
  methods: {
    select() {
      this.$emit("select",this.tid)
    },
    view(){
      this.$refs.i1.modalShow=true
    }
  }
};
</script>