<template>
  <div>
    <b-card no-body class="overflow-hidden shadow" style="width: 750px;">
      <b-row no-gutters>
        <b-col cols-md="5" cols-sm="2" cols="">
          <b-card-img
            src="https://i.pinimg.com/originals/42/73/b7/4273b7c22af24b9d4bade05c28cdc2ac.jpg"
            alt="Image"
            class="rounded-0"
            img-width="2"
          ></b-card-img>
        </b-col>
        <b-col md="7" sm="5" cols="12">
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

              <button type="submit" class="btn btn-dark btn-block mt-5">
                <span v-if="show">
                  <b-spinner small type="grow"></b-spinner>Authenticating...
                </span>
                <span v-else>Login</span>
              </button>
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
  data: function() {
    return {
      email: "",
      password: "",
      show: false
    };
  },
  methods: {
    async onclick() {
      this.show = true;
      this.$store.dispatch("user_state/authenticate")
        .then(() => {
          this.show = false;
          this.$router.push("/dashboard")
        })
        .catch(err => {
          console.log(err)
        });
    }
  }
};
</script>