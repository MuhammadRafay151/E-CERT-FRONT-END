<template>
  <div class="w-100">
    <confirm ref="c1" v-on:yes="$router.go(-1)" />
    <confirm ref="c2" v-on:yes="RegisterOrg" />
    <div class="row justify-content-center">
      <div class="col-lg-6 col-md-8 col-sm-12 col-10 shadow p-3">
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
        <div>
          <b-icon
            style="cursor: pointer"
            icon="arrow-left-circle"
            v-on:click="goback"
            font-scale="2"
            class="float-left"
          ></b-icon>
          <h3>{{ Title }}</h3>
        </div>
        <form v-if="step == 1">
          <div class="form-group text-left">
            <label><sup class="text-danger">*</sup>Organization Id</label>
            <input
              class="form-control"
              v-model.trim="$v.org.id.$model"
              type="text"
              placeholder="CERTIFISMSP"
            />
            <sub class="text-danger text-left" v-if="$v.org.id.$error">
              Field is required
            </sub>
          </div>
          <div class="form-group text-left">
            <label><sup class="text-danger">*</sup> Organization Name</label>
            <input
              class="form-control"
              v-model.trim="$v.org.name.$model"
              type="text"
              placeholder="CERTIFIS"
            />
            <sub class="text-danger text-left" v-if="$v.org.name.$error">
              Field is required
            </sub>
          </div>
          <div class="form-group text-left">
            <label><sup class="text-danger">*</sup>Organization Email</label>
            <input
              class="form-control"
              type="text"
              placeholder="mail@certifis.cf"
              v-model.trim="$v.org.email.$model"
            />
            <sub
              class="text-danger text-left"
              v-if="$v.org.email.$error && !$v.org.email.required"
            >
              Field is required
            </sub>
            <sub class="text-danger" v-if="!$v.org.email.email">
              Not a valid email
            </sub>
          </div>
        </form>
        <div class="row">
          <div class="col text-right">
            <button
              class="btn btn_fr btn-block"
              v-if="step == 1"
              @click="confirm_submit"
            >
              Register Organization
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import confirm from "./confirmbox";
import { required, email } from "vuelidate/lib/validators";
import loader from "../js/loader";
export default {
  name: "RegisterOrganization",
  mixins: [loader],
  data: () => {
    return {
      step: 1,
      Title: "Organization Registeration",
      org: { id: null, name: null, email: null },
      user: { name: null, email: null, password: null },
    };
  },
  methods: {
    goback() {
      this.$refs.c1.show(
        "Are you sure you want to cancel registeration process?"
      );
    },
    confirm_submit() {
      this.$v.$touch();
      if (!this.$v.$invalid)
        this.$refs.c2.show("Are you sure you want to submit the form?");
    },
    RegisterOrg() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.show_loader("Processing...");
        this.$store
          .dispatch("org_state/RegisterOrg",this.org)
          .then(() => {
            this.org = { id: null, name: null, email: null };
            this.user = { name: null, email: null, password: null };
            this.Hide_loader();
            this.$router.push("/organizations");
          })
          .catch((err) => {
            console.log(err);
          });
        // setTimeout(() => {}, 3000);
      }
    },
  },
  components: {
    confirm,
  },
  validations: {
    org: {
      id: { required },
      name: { required },
      email: { required, email },
    },
  },
};
</script>