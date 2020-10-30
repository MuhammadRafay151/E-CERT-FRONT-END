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
          ></b-form-input>
        </b-form-group>
        <b-form-group label="To Date" label-for="to">
          <b-form-input
            id="to"
            type="date"
            size="sm"
            placeholder="To Date"
          ></b-form-input>
        </b-form-group>

        <b-button variant="primary" size="sm" @click="onClick"
          >Sign In</b-button
        >
      </b-dropdown-form>
    </b-dropdown>
  </div>
</template>
<script>
export default {
    name:"daterange"
}
</script>