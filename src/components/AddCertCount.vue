<template>
  <div>
    <!-- <h3 style="text-decoration: underline" class="text-center">Certificate Count</h3> -->
    <b-overlay :show="loading" rounded="sm" no-wrap>
      <template #overlay>
        <div class="text-center">
          <b-spinner
            style="width: 3rem; height: 3rem"
            label="Large Spinner"
          ></b-spinner>
          <p id="cancel-label">{{ loading_text }}</p>
        </div>
      </template>
    </b-overlay>
    <div class="form-group text-left">
      <label><sup class="text-danger">*</sup> Enter Count</label>
      <input
        type="number"
        class="form-control"
        v-model.trim="$v.count.$model"
        placeholder="Count"
      />
      <sub class="text-danger" v-if="$v.count.$error"> Field is required </sub>
    </div>
    <button type="submit" @click="AddCount" class="btn btn-dark btn-block mt-5">
      <span>Add Count</span>
    </button>
  </div>
</template>
<script>
import { required } from "vuelidate/lib/validators";
import loader from "../js/loader";
export default {
  name: "AddCertCount",
  props: ["id"],
  mixins: [loader],
  data: function () {
    return {
      count: null,
    };
  },
  validations: {
    count: { required },
  },
  methods: {
    AddCount() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.show_loader("processing");
        this.$store
          .dispatch("certcount_state/AddCount", {
            count: this.count,
            id: this.id,
          })
          .then(() => {
            this.Hide_loader();
            this.$emit("Inserted");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
};
</script>