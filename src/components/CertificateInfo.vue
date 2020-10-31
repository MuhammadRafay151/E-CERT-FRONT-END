<template>
  <div>
    <img :src="src" alt="" />
    <b-card no-body class=" shadow " style="width: 320px;">
      <center>
        <b-col>
          <b-card-body title="CERTIFICATE INFORMATION" class="h-100">
            <form class="mt-5" @submit="CreateCertificate" @submit.prevent>
              <input
                type="text"
                class="form-control form-group"
                placeholder="Title"
                v-model="cert.title"
                v-on:input="updatecert"
              />

              <input
                type="text"
                class="form-control form-group"
                placeholder="Candidate Name"
                v-model="cert.name"
                v-on:input="updatecert"
              />

              <input
                type="email"
                class="form-control form-group"
                placeholder="Candidate Email"
                v-model="cert.email"
                v-on:change="updatecert"
              />

              <input
                type="text"
                class="form-control form-group"
                placeholder="Instructor Name"
                v-model="cert.instructor"
                v-on:input="updatecert"
              />

              <input
                type="date"
                class="form-control form-group"
                placeholder="Title"
                v-model="cert.expiry_date"
                v-on:change="updatecert"
              />

              <b-form-textarea
                class="form-control form-group"
                placeholder="Description"
                v-model="cert.description"
                v-on:input="updatecert"
              ></b-form-textarea>

              <label for="UploadLogo" class="btn btn-dark btn-block"
                >UPLOAD LOGO</label
              >
              <input
                type="file"
                id="UploadLogo"
                accept="image/*"
                ref="logo"
                v-on:change="HandleFileUpload(true)"
                hidden
              />

              <label for="UploadSignature" class="btn btn-dark btn-block"
                >UPLOAD SIGNATURE</label
              >
              <input
                type="file"
                id="UploadSignature"
                accept="image/*"
                ref="signature"
                v-on:change="HandleFileUpload(false)"
                hidden
              />

              <button type="submit" class="btn btn-dark btn-block">
                CREATE
              </button>
            </form>
          </b-card-body>
        </b-col>
      </center>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "certificateinfo",
  methods: {
    CreateCertificate() {
      console.warn("title ", this.tilte);
      console.warn("name", this.name);
      console.warn("email", this.email);
      console.warn("instructor", this.instructor);
      console.warn("date", this.expiry_date);
      console.warn("description", this.description);
      console.warn(this.logo);
      console.warn(this.signature);
    },
    HandleFileUpload(flag) {
      if (flag) {
        var logo = this.$refs.logo.files[0];
        this.cert.logo = URL.createObjectURL(logo);
      } else {
        var signature = this.$refs.signature.files[0];
        this.cert.signature = URL.createObjectURL(signature);
      }
     this.updatecert()
    },
    updatecert() {
      this.$store.commit("cert_state/updatecert", this.cert);
    }
  },
  data() {
    return {
      src: "",
      cert: {
        title: null,
        name: null,
        email: null,
        instructor: null,
        expiry_date: null,
        description: null,
        logo: null,
        signature: null,
        templateid: null
      }
    };
  }
};
</script>