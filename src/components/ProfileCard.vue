<template>
  <div
    class="d-flex shadow"
    @mouseover="ShowDetails = true"
    @mouseleave="ShowDetails = false"
  >
    <div class=" p-1">
      <img :src="data.img" width="350" alt="" />
      <hr />
      <div>
        <h4>{{ data.name }}</h4>
      </div>
    </div>
    <transition name="fade">
      <div v-if="ShowDetails" class="detail bg-white shadow">
        <div class="shadow p-1">
          <div>
            <img :src="data.img" width="100%" alt="" />
          </div>
          <hr />
          <div>
            <h4>{{ data.name }}</h4>
            <h5 style="text-decoration: underline">
              Project contributions & Roles
            </h5>
            <ul>
              <li
                class="cont"
                v-for="(cont, index) in data.contributions"
                :key="index"
              >
                {{ cont }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  name: "ProfileCard",
  props: ["data"],
  data() {
    return {
      ShowDetails: false,
    };
  },
};
</script>
<style scoped>
.detail {
  position: absolute;
  top: -20%;
  z-index: 2;
  /* transition: all 0.2s ease; */
}
.cont {
  text-align: left;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>