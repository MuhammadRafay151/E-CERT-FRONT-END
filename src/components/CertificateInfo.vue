<template>
  <div>
    <b-card no-body class=" shadow " style="width: 320px;">
    
      <center>
        <b-col>
          <b-card-body title="CERTIFICATE INFORMATION" class="h-100">
            <form @submit.prevent="Create_Cert">
              <input
                type="text"
                class="form-control form-group"
                placeholder="Title"
                v-model.trim="$v.cert.title.$model"
                v-on:input="updatecert"
              />
              <div class="text-danger text-left" v-if="$v.cert.title.$error">
                Field is required
              </div>
              <input
                type="text"
                class="form-control form-group"
                placeholder="Candidate Name"
                v-model.trim="$v.cert.name.$model"
                v-on:input="updatecert"
              />
              <div class="text-danger text-left" v-if="$v.cert.name.$error">
                Field is required
              </div>
              <input
                type="email"
                class="form-control form-group"
                placeholder="Candidate Email"
                v-model.trim="$v.cert.email.$model"
                v-on:change="updatecert"
              />
              <div
                class="text-danger text-left"
                v-if="$v.cert.email.$error && !$v.cert.email.required"
              >
                Field is required
              </div>
              <div class="text-danger text-left" v-if="!$v.cert.email.email">
                Not a valid email
              </div>
              <input
                type="text"
                class="form-control form-group"
                placeholder="Instructor Name"
                v-model="cert.instructor_name"
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
                v-model.trim="$v.cert.description.$model"
                v-on:input="updatecert"
              ></b-form-textarea>
              <div
                class="text-danger text-left"
                v-if="$v.cert.description.$error"
              >
                Discription is required
              </div>
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
              <div class="text-danger text-left" v-if="$v.cert.logo.$error">
                logo is required
              </div>
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
              <div
                class="text-danger text-left"
                v-if="$v.cert.signature.$error"
              >
                signature is required
              </div>
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
import { required, email } from "vuelidate/lib/validators";
export default {
  name: "certificateinfo",
 
  methods: {
    HandleFileUpload(flag) {
      if (flag) {
        var logo = this.$refs.logo.files[0];
        this.logo_file = logo;
        this.cert.logo = URL.createObjectURL(logo);
      } else {
        var signature = this.$refs.signature.files[0];
        this.signature_file = signature;
        this.cert.signature = URL.createObjectURL(signature);
      }
      this.updatecert();
    },
    updatecert() {
      this.$store.commit("cert_state/updatecert", this.cert);
    },
    reset_cert() {
      this.cert = {
        title: "",
        name: null,
        email: null,
        instructor_name: null,
        expiry_date: null,
        description: null,
        logo: null,
        signature: null,
        templateid: null,
        certificate_img: "base64"
      };
    },
    Create_Cert() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$emit("start");

        var form = new FormData();
        for (const [key, value] of Object.entries(this.cert)) {
          form.append(key, value);
        }
        form.append("logo", this.logo_file);
        form.append("signature", this.signature_file);
        // for (var key of form.entries()) {
        //   console.log(key[0] + ", " + key[1]);
        // }
        this.$store
          .dispatch("cert_state/Create_Certificate", form)
          .then(r => {
            console.log("Save succefully");
            this.reset_cert()
            this.updatecert()
            this.$v.$reset()
            this.$emit("stop");
            console.log(r);
          })
          .catch(err => {
            this.$emit("stop");
            console.log(err);
          });
      }
    },
    
    getBase64(file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function() {
        console.log(reader.result);
      };
      reader.onerror = function(error) {
        console.log("Error: ", error);
      };
    }
  },
  data() {
    return {
      src: "",
      logo_file: null,
      signature_file: null,
      cert: {
        title: "",
        name: null,
        email: null,
        instructor_name: null,
        expiry_date: null,
        description: null,
        logo: null,
        signature: null,
        templateid: null,
        certificate_img: "base64"
      }
    };
  },
  validations: {
    cert: {
      title: { required },
      name: { required },
      email: { required, email },
      description: { required },
      logo: { required },
      signature: { required }
    }
  }
};
</script>
