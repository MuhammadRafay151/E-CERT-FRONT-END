<template>
  <div class="d-flex justify-content-center">
    <b-card no-body class="overflow-hidden" style="max-width: 540px">
      <b-row no-gutters>
        <b-col md="6" class="d-none d-sm-none d-md-block">
          <b-card-img
            src="https://i.pinimg.com/originals/42/73/b7/4273b7c22af24b9d4bade05c28cdc2ac.jpg"
            alt="Image"
            class="rounded-0"
          ></b-card-img>
        </b-col>
        <b-col md="6">
          <b-card-body title="Login " class="h-100">
            <form @submit.prevent="onclick" class="mt-5">
              <div class="form-group text-left">
                <label for="exampleInputEmail1">Email address</label>
                <input
                  type="email"
                  class="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                  v-model="email"
                  required
                  autocomplete="on"
                />
              </div>
              <div class="form-group text-left">
                <label>Password</label>
                <input
                  type="password"
                  class="form-control"
                  placeholder="Password"
                  v-model="password"
                  required
                />
              </div>

              <button type="submit" class="btn btn-wb btn-block mt-5">
                <span v-if="show">
                  <b-spinner small type="grow"></b-spinner>Authenticating...
                </span>
                <span v-else>Login</span>
              </button>
              <p class="mt-1 text-danger" v-if="message">{{ message }}</p>
            </form>
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>
<script>
export default {
  name: "login",
  data: function () {
    return {
      email: "",
      password: "",
      show: false,
      message: "",
    };
  },
  methods: {
    async onclick() {
      this.show = true;
      this.$store
        .dispatch("user_state/authenticate", {
          email: this.email,
          password: this.password,
        })
        .then(() => {
          this.show = false;
          this.$router.push("/dashboard");
        })
        .catch((err) => {
          this.show = false;
          if (!err.response) {
            this.message = "no network";
          } else if (err.response.status == 401 || err.response.status == 403) {
            console.log(err.response.data);
            this.message = err.response.data.message;
          }
        });
    },
  },
  created() {
    if (this.$route.query.session_expire === "true") {
      this.message = "Session Expired";
    }
  },
};
</script>