<template>
  <div style="margin-top: 120px">
    <b-iconstack
      font-scale="4"
      class="position-fixed mr-auto"
      style="left: -22px; top: 50%"
      v-on:mouseover="Display = true"
    >
      <b-icon
        stacked
        icon="chevron-compact-right"
        variant="dark"
        scale="0.75"
      ></b-icon>
      <b-icon stacked icon="circle" variant="dark" shift-h="-3"></b-icon>
    </b-iconstack>

    <b-sidebar
      v-model="Display"
      id="sidebar-1"
      bg-variant="dark"
      text-variant="white"
      :title="'UIT ' + 'Config'"
      backdrop-variant="dark"
      backdrop
      shadow
    >
      <div class="p-3">
        <div v-b-hover="handleHover1" class=" p-2 mt-3  text-white border-bottom border-white " :class="isHovered1 ? 'bg-secondary' : ''">
           <b-icon icon="file-earmark-plus-fill" class="float-left" font-scale="1.5" variant="white"></b-icon>
          <h5>Certificate Count</h5>
        </div>
        <div v-b-hover="handleHover2" class="p-2 mt-3  text-white border-bottom border-white" :class="isHovered2 ? 'bg-secondary' : ''">
           <b-icon icon="person-lines-fill" class="float-left" font-scale="1.5" variant="white"></b-icon>
         
          <h5 class="d-inline-block">User Management</h5>
        </div>
        <div v-b-hover="handleHover3" class=" p-2 mt-3  text-white border-bottom border-white" :class="isHovered3 ? 'bg-secondary' : ''">
           <b-icon icon="info-square-fill" class="float-left" font-scale="1.5" variant="white"></b-icon>
          <h5 class="d-inline-block">Basic Info</h5>
        </div>
      </div>
    </b-sidebar>
  </div>
</template>
<script>
export default {
  name: "OrganizationConfig",
  props: ["id"],
  components: {},
  data: () => {
    return {
      Display: false,
      isHovered1: false,
      isHovered2: false,
      isHovered3: false,
    };
  },
  methods: {
    handleHover1(hovered) {
      this.isHovered1 = hovered;
    },
    handleHover2(hovered) {
      this.isHovered2 = hovered;
    },
    handleHover3(hovered) {
      this.isHovered3 = hovered;
    },
  },
};
</script>
<style  scoped>
.ax:hover {
  background-color: rgb(15, 226, 191);
}
</style>