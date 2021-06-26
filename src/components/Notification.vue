<template>
  <div class="test w-25 scroll">
    <div v-if="loading" class="list-group">
      <div  class="list-group-item list-group-item-action p-4">
        <b-spinner label="Spinning" v-show="loading"></b-spinner>
       <p>{{loading_text}}</p>
      </div>
    </div>
    <div v-else class="list-group">
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
import loader from "../js/loader";
import { mapState } from "vuex";
export default {
  name: "Notification",
  mixins: [loader],
  computed: {
    ...mapState("notification_state", ["Notifications", "NewCount"]),
  },
  async created() {
    this.show_loader("...Loading");
    await this.$store.dispatch("notification_state/GetNewNotification");
    this.Hide_loader();
  },
  async beforeDestroy() {
    if (this.NewCount > 0) {
      await this.$store.dispatch("notification_state/MarkAsRead");
      await this.$store.dispatch("notification_state/GetNewNotificationCount");
    }
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