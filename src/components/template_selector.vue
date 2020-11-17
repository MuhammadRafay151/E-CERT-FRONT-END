<template>
  <div class="shadow bg-white ">
    <div class="row p-2" v-if="edit">
      <div class="col  d-flex justify-content-end">
         <b-icon icon="x-circle" font-scale="2" style="cursor: pointer" v-on:click="close"></b-icon>
      </div>
    </div>
    <div class="row p-2 ">
      <div class="col d-flex justify-content-center">
        <temp path="/templates/c1.PNG" tid="c1" v-on:select="select" />
      </div>
      <div class="col  d-flex justify-content-center">
        <temp path="/templates/c1.PNG" tid="c1" v-on:select="select" />
      </div>
    </div>
    <div class="row p-2 ">
      <div class="col d-flex justify-content-center">
        <temp path="/templates/c1.PNG" tid="c1" v-on:select="select" />
      </div>
      <div class="col  d-flex justify-content-center">
        <temp path="/templates/c1.PNG" tid="c1" v-on:select="select" />
      </div>
    </div>
  </div>
</template>
<script>
import temp from "../components/temp";

export default {
  name: "template_selector",
  props:{edit:Boolean},
  components: {
    temp,
  },
  data: () => {
    return {
      show: true
    };
  },
  methods: {
    select(tid) {
      this.$emit("select", tid);
    },
    close(){
      this.$emit("close")
    }
  }
};
</script>