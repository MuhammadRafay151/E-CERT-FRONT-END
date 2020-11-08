<template>
  <div class="shadow bg-white ">
    <div class="row p-2 ">
      <div class="col d-flex justify-content-center">
        <temp path="/c1.PNG" tid="c1" v-on:select="select" />
      </div>
      <div class="col  d-flex justify-content-center">
        <temp path="/665858c95c31b60.jpg" tid="2" v-on:select="select" />
      </div>
    </div>
    <div class="row p-2 ">
      <div class="col d-flex justify-content-center">
        <temp path="/665858c95c31b60.jpg" tid="3" v-on:select="select" />
      </div>
      <div class="col  d-flex justify-content-center">
        <temp path="/665858c95c31b60.jpg" tid="4" v-on:select="select" />
      </div>
    </div>
  </div>
</template>
<script>
import temp from "../components/temp";

export default {
  name: "template_selector",
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
    
  }
};
</script>