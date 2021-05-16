<template>
  <div class="test w-25 scroll">
    <div class="list-group">
      <a
        v-for="(i, index) in Notifications.list"
        v-bind:key="index"
        href="#"
        class="list-group-item list-group-item-action"
        v-bind:class="{ 'bg-secondary': !i.Isread }"
      >
        <p class="mb-1 text-left" v-bind:class="{ 'text-white': !i.Isread }">
          {{ i.message }}
        </p>
        <div
          class="d-flex w-100 justify-content-end"
          v-bind:class="{ 'text-white': !i.Isread }"
        >
          <small>{{ new Date(i.date).toLocaleString() }}</small>
        </div>
      </a>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "Notification",
  computed: {
    ...mapState("notification_state", ["Notifications"]),
  },
  async created() {
    await this.$store.dispatch("notification_state/GetNewNotification");
  },
};
</script>
<style scoped >
.scroll {
  max-height: 80vh;
  overflow-y: scroll;
}
.test {
  position: fixed;
  right: 4%;
  top: 8%;
  z-index: 100;
}
</style>