<template>
  <div>
    <!-- <h3 style="text-decoration: underline" class="text-center">Certificate Count</h3> -->
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
export default {
  name: "AddCertCount",
  props: ["id"],
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
        this.$store
          .dispatch("certcount_state/AddCount", {
            count: this.count,
            id: this.id,
          })
          .then(() => {
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