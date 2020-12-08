<template>
  <div>
    <b-nav-item-dropdown
      size="lg"
      variant="link"
      toggle-class="text-decoration-none"
      no-caret
      right
      menu-class="myDropdown"
    >
      <template #button-content>
        <b-avatar badge="7" variant="wb" badge-variant="danger">
          <template #default
            ><b-icon icon="bell-fill" variant="white"></b-icon
          ></template>
        </b-avatar>
      </template>
      <b-dropdown-item
        v-for="i in [1, 2, 3, 4, 5, 6, 8, 9, 10, 11]"
        v-bind:key="i"
      >
        <b-card header="Default" class="text-center">
          <b-card-text
            >Lorem ipsum dolor sit amet, consectetur adipiscing
            elit.</b-card-text
          >
        </b-card>
      </b-dropdown-item>
    </b-nav-item-dropdown>
    <!-- <b-button v-b-modal.modal-tall>Launch overflowing modal</b-button> -->

    <b-modal id="modal-tall" title="Overflowing Content">
      <b-card
        header="Default"
        class="text-center"
        v-for="i in [1, 2, 3, 4, 5, 6, 8, 9, 10, 11]"
        v-bind:key="i"
      >
        <b-card-text
          >Lorem ipsum dolor sit amet, consectetur adipiscing elit.</b-card-text
        >
      </b-card>
    </b-modal>
  </div>
</template>
<script>
export default {
  name: "Notification",
};
</script>
<style >
.myDropdown {
  height: 80vh;
  overflow-y: scroll;
}
</style>