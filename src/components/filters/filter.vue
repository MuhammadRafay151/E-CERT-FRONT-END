<template>
  <div class="p-3">
    <b-form-group label="Sort by issue date" v-slot="{ ariaDescribedby }">
      <b-form-radio-group
        id="radio-group-1"
        v-model="selected"
        :options="options"
        :aria-describedby="ariaDescribedby"
        name="radio-options"
      ></b-form-radio-group>
    </b-form-group>

    <div class="row">
      <div class="col">
        <button class="btn btn-wb btn-block" v-on="{ click: apply }">
          Apply
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "SingleCertFilter",
  data: () => {
    return {
      selected: "dsc",
      options: [
        { text: "Acsendiing", value: "asc" },
        { text: "Descending", value: "dsc" },
        // { text: "This one is Disabled", value: "third", disabled: true },
        // { text: "This is the 4th radio", value: { fourth: 4 } },
      ],
    };
  },
  methods: {
    apply() {
      this.$emit("ApplyFilter", this.selected);
    },
  },
};
</script>