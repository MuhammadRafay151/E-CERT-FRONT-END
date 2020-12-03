<template>
  <div>
    <b-overlay :show="loading" rounded="sm" no-wrap>
      <template #overlay>
        <div class="text-center">
          <b-spinner
            v-if="spinner"
            style="width: 3rem; height: 3rem"
            label="Large Spinner"
          ></b-spinner>
          <b-icon
            v-else
            icon="exclamation-circle-fill"
            font-scale="2"
            variant="danger"
          ></b-icon>
          <p id="cancel-label">{{ loading_text }}</p>
        </div>
      </template>
    </b-overlay>
    <form>
      <div class="form-group">
        <label>User Limit</label>
        <input type="number" class="form-control" v-model="$v.count.$model" />
        <sub class="text-danger" v-if="$v.count.$error && !$v.count.required">
          the field is required
        </sub>
        <sub
          class="text-danger"
          v-else-if="$v.count.$error && !$v.count.numeric"
        >
          value must be positive integer
        </sub>
        <sub v-if="!$v.count.$error && !IsMinimumLimit" class="text-danger"
          >Error: Count should be greater then total enrolled users:
          {{ enrolled_count }}
        </sub>
      </div>
    </form>
    <button type="button" class="btn btn-dark btn-block" @click="submit">
      Update
    </button>
  </div>
</template>
<script>
import { required, numeric } from "vuelidate/lib/validators";
import loader from "../js/loader";
export default {
  name: "UserLimit",
  props: ["userlimit", "id", "enrolled_count"],
  mixins: [loader],
  data() {
    return {
      count: this.userlimit || 0,
    };
  },
  computed: {
    IsMinimumLimit() {
      if (this.count < this.enrolled_count) {
        return false;
      } else {
        return true;
      }
    },
  },
  methods: {
    submit() {
      this.$v.$touch();
      if (!this.$v.$invalid && this.IsMinimumLimit) {
        this.show_loader("Processing...");
        this.$store
          .dispatch("org_state/SetUserLimit", {
            id: this.id,
            count: this.count,
          })
          .then(() => {
            this.Hide_loader();
            this.$emit("done");
          })
          .catch((err) => {
            this.show_error(err);
          });
      }
    },
  },
  validations: {
    count: { required, numeric },
  },
};
</script>