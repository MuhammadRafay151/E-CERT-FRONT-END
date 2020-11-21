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
        <b-icon icon="file-spreadsheet-fill"></b-icon>
      </template>
      <b-dropdown-form>
        <b-form-group label="Name Column" label-for="name">
          <b-form-input
            id="name"
            type="text"
            size="sm"
            placeholder="Name Column"
            v-model="namecol"
          ></b-form-input>
        </b-form-group>
        <b-form-group label="Email Column" label-for="email">
          <b-form-input
            id="email"
            type="text"
            size="sm"
            placeholder="Email Column"
            v-model="email"
          ></b-form-input>
        </b-form-group>
<label for="">Spread Sheet</label>
        <b-button variant="primary" block size="sm">Upload</b-button>
      </b-dropdown-form>
     
    </b-dropdown>
  </div>
</template>
<script>
export default {
  name: "excel",
  data: function() {
    return {
     namecol:null,
     email:null
    };
  },
  methods: {
   
  }
};
</script>