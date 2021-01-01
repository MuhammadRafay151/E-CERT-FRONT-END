<template>
  <div class="shadow bg-white">
    <div class="row p-2" v-if="edit">
      <div class="col d-flex justify-content-end">
        <b-icon
          icon="x-circle"
          font-scale="2"
          style="cursor: pointer"
          v-on:click="close"
        ></b-icon>
      </div>
    </div>
    <div class="row p-2" v-for="(arr, index) in templates" :key="index">
      <div class="col d-flex justify-content-center">
        <temp :path="arr[0].img" :tid="arr[0].id" v-on:select="select" />
      </div>
      <div v-if="arr.length > 1" class="col d-flex justify-content-center">
        <temp :path="arr[1].img" :tid="arr[1].id" v-on:select="select" />
      </div>
      <div v-else class="col"></div>
    </div>
  </div>
</template>
<script>
import temp from "../components/temp";
import templates from "../js/Templates";
export default {
  name: "template_selector",
  props: { edit: Boolean },
  mixins: [templates],
  components: {
    temp,
  },
  data: () => {
    return {
      show: true,
    };
  },
  methods: {
    select(tid) {
      this.$emit("select", tid);
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>