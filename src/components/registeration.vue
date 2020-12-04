<template>
  <div class="row justify-content-center">
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
    <div class="col">
      <!-- <h3>{{ pagetitle }}</h3> -->

      <form>
        <div class="form-group text-left">
          <label for="exampleInputEmail1">
            <sup class="text-danger">*</sup> Name</label
          >
          <input
            type="text"
            class="form-control"
            placeholder="Name"
            v-model.trim="$v.user.name.$model"
          />
          <sub class="text-danger text-left" v-if="$v.user.name.$error">
            Field is required
          </sub>
        </div>

        <div class="form-group text-left">
          <label for="exampleInputEmail1"
            ><sup class="text-danger">*</sup>Email address</label
          >
          <input
            type="email"
            class="form-control"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            v-model.trim="$v.user.email.$model"
          />
          <sub
            class="text-danger text-left"
            v-if="$v.user.email.$error && !$v.user.email.required"
          >
            Field is required
          </sub>
          <sub class="text-danger" v-if="!$v.user.email.email">
            Not a valid email
          </sub>
          <sub v-if="IsSearching"> Checking email... </sub>
          <sub class="text-success" v-if="IsAvailable">Email is availabel</sub>
          <sub class="text-danger" v-if="IsNotAvailable"
            >Email is not availabel</sub
          >
        </div>
        <div class="form-group- text-left">
          <label><sup class="text-danger">*</sup>Password</label>
          <div class="input-group mb-2">
            <input
              type="password"
              class="form-control"
              placeholder="Password"
              autocomplete="new-password"
              ref="p1"
              v-model.trim="$v.user.password.$model"
            />
            <div class="input-group-prepend">
              <div class="input-group-text">
                <b-icon
                  icon="eye-fill"
                  style="cursor: pointer"
                  v-on:mousedown="show_password"
                  v-on:mouseup="hide_password"
                >
                </b-icon>
              </div>
            </div>
          </div>
          <sub class="text-danger text-left" v-if="$v.user.password.$error">
            Field is required
          </sub>
        </div>

        <button
          type="button"
          v-on:click="submit"
          class="btn btn-dark btn-block mt-5"
        >
          Submit
        </button>
      </form>
    </div>
  </div>
</template>
<script>
import { required, email } from "vuelidate/lib/validators";
import loader from "../js/loader";
import debounce from "../js/debounce";
export default {
  props: ["id","ULimit"],
  mixins: [loader, debounce],
  name: "registeration",
  data: function () {
    return {
      IsAvailable: false,
      IsNotAvailable: false,
      pagetitle: "Register Issuer",
      user: {
        name: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    show_password() {
      this.$refs.p1.type = "text";
    },
    hide_password() {
      this.$refs.p1.type = "password";
    },
    submit() {
      this.$v.$touch();
      if (!this.$v.$invalid && this.IsAvailable) {
        this.show_loader("Processing...");
        this.$store
          .dispatch("user_state/RegisterUser", {
            orgid: this.id,
            user: this.user,
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
    CheckEmail() {
      // let myPromise = new Promise(function (myResolve) {
      //   // "Producing Code" (May take some time)
      //   setTimeout(function () {
      //     myResolve();
      //   }, 2000);
      //   // when successful
      // });
      // myPromise.then(() => {
      //   this.IsSearching = false;
      //   this.IsAvailable = true;
      //   console.log("email avialble");
      // });
      this.$store
        .dispatch("user_state/CheckEmail", this.user.email)
        .then((response) => {
          this.IsSearching = false;
          if (response.IsAvailable) {
            this.IsAvailable = true;
          } else {
            this.IsNotAvailable = true;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  watch: {
    "user.email": function () {
      this.IsAvailable = false;
      this.IsNotAvailable = false;
      if (!this.$v.user.email.$invalid) {
        this.debounce(this.CheckEmail);
      } else {
        this.cleardebounce();
      }
    },
  },
  validations: {
    user: {
      name: { required },
      email: { required, email },
      password: { required },
    },
  },
  created(){
    if(this.ULimit){
      this.show_error("User limit reached cannot add more users")
    }
  }

};
</script>