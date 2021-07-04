<template>
  <div>
    <b-card no-body class="shadow" style="width: 320px">
      <center>
        <b-col class="scroll">
          <b-card-body title="CERTIFICATE INFORMATION" class="h-100">
            <form>
              <div class="form-group text-left">
                <label><sup class="text-danger">*</sup> Title</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Title"
                  v-model.trim="$v.cert.title.$model"
                  v-on:input="updatecert"
                />
                <sub class="text-danger text-left" v-if="$v.cert.title.$error">
                  Field is required
                </sub>
              </div>
              <div class="form-group text-left">
                <label><sup class="text-danger">*</sup> Candidate Name</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Candidate Name"
                  v-model.trim="$v.cert.name.$model"
                  v-on:input="updatecert"
                />
                <sub class="text-danger" v-if="$v.cert.name.$error">
                  Field is required
                </sub>
              </div>
              <div class="form-group text-left">
                <label><sup class="text-danger">*</sup> Candidate Email</label>
                <input
                  type="email"
                  class="form-control"
                  placeholder="Candidate Email"
                  v-model.trim="$v.cert.email.$model"
                  v-on:change="updatecert"
                />
                <sub
                  class="text-danger"
                  v-if="$v.cert.email.$error && !$v.cert.email.required"
                >
                  Field is required
                </sub>
                <sub class="text-danger" v-if="!$v.cert.email.email">
                  Not a valid email
                </sub>
              </div>
              <div class="form-group text-left">
                <label>Instructor Name</label>
                <input
                  type="text"
                  class="form-control form-group"
                  placeholder="Instructor Name"
                  v-model="cert.instructor_name"
                  v-on:input="updatecert"
                />
              </div>
              <div class="form-group text-left">
                <label for="">Expiry Date</label>
                <input
                  type="date"
                  class="form-control form-group"
                  placeholder="Title"
                  v-model="cert.expiry_date"
                  v-on:change="updatecert"
                />
              </div>
              <div class="form-group text-left">
                <label><sup class="text-danger">*</sup> Description</label>
                <b-form-textarea
                  class="form-control"
                  placeholder="Description"
                  v-model.trim="$v.cert.description.$model"
                  v-on:input="updatecert"
                ></b-form-textarea>
                <sub
                  class="text-danger text-left"
                  v-if="$v.cert.description.$error"
                >
                  Discription is required
                </sub>
              </div>

              <div class="form-group text-left">
                <div class="btn-group btn-block">
                  <label for="UploadLogo" class="btn btn-wb btn-block"
                    ><sup class="text-danger">*</sup> UPLOAD LOGO</label
                  >
                  <label class="btn btn-wb" v-on:click="removeLogo">x</label>
                </div>
                <input
                  type="file"
                  id="UploadLogo"
                  accept="image/*"
                  ref="logo"
                  v-on:change="HandleFileUpload(true)"
                  hidden
                />
                <sub class="text-danger" v-if="$v.cert.logo.$error">
                  logo is required
                </sub>
                <sub class="text-danger text-left" v-if="LogoSizeExceed">
                  image should be less than or equal to 500 kb
                </sub>
                <sub class="text-danger text-left" v-if="InvalidLogoType">
                  Allowed image formats '.jpeg', '.jpg', '.png'
                </sub>
              </div>
              <div class="form-group text-left">
                <div class="btn-group btn-block">
                  <label for="UploadSignature" class="btn btn-wb btn-block"
                    ><sup class="text-danger">*</sup> UPLOAD SIGNATURE</label
                  >
                  <label class="btn btn-wb" v-on:click="removeSignature"
                    >x</label
                  >
                </div>
                <input
                  type="file"
                  id="UploadSignature"
                  accept="image/*"
                  ref="signature"
                  v-on:change="HandleFileUpload(false)"
                  hidden
                />
                <sub
                  class="text-danger text-left"
                  v-if="$v.cert.signature.$error"
                >
                  signature is required
                </sub>
                <sub class="text-danger text-left" v-if="SignatureSizeExceed">
                  image should be less than or equal to 500 kb
                </sub>
                <sub class="text-danger text-left" v-if="InvalidSignatureType">
                  Allowed image formats '.jpeg', '.jpg', '.png'
                </sub>
              </div>

              <button
                type="button"
                v-on:click="modify_Cert"
                v-if="edit"
                class="btn btn-wb btn-block"
              >
                Update
              </button>
              <button
                type="button"
                v-on:click="Create_Cert"
                v-else
                class="btn btn-wb btn-block"
              >
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
import GlobalNotification from "../js/GlobalNotification";
export default {
  name: "certificateinfo",
  props: { template_id: String, edit: Boolean },
  mixins: [GlobalNotification],
  methods: {
    HandleFileUpload(flag) {
      let AllowedTypes = ["image/jpeg", "image/png"];
      if (flag && this.$refs.logo.files.length > 0) {
        this.LogoSizeExceed = false;
        this.InvalidLogoType = false;
        if (!AllowedTypes.includes(this.$refs.logo.files[0].type)) {
          this.InvalidLogoType = true;
          this.cert.logo = null;
          this.updatecert();
          return;
        }
        if (this.$refs.logo.files[0].size > 500000) {
          this.LogoSizeExceed = true;
          this.cert.logo = null;
          this.updatecert();
          return;
        }
        var logo = this.$refs.logo.files[0];
        this.logo_file = logo;
        this.cert.logo = URL.createObjectURL(logo);
      } else if (this.$refs.signature.files.length > 0) {
        this.SignatureSizeExceed = false;
        this.InvalidSignatureType = false;
        if (!AllowedTypes.includes(this.$refs.signature.files[0].type)) {
          this.InvalidSignatureType = true;
          this.cert.signature = null;
          this.updatecert();
          return;
        }
        if (this.$refs.signature.files[0].size > 500000) {
          this.SignatureSizeExceed = true;
          this.cert.signature = null;
          this.updatecert();
          return;
        }

        var signature = this.$refs.signature.files[0];
        this.signature_file = signature;
        this.cert.signature = URL.createObjectURL(signature);
      }
      this.updatecert();
    },
    removeLogo() {
      this.$refs.logo.value = "";
      URL.revokeObjectURL(this.cert.logo);
      this.cert.logo = null;
      this.logo_file = null;
      this.updatecert();
    },
    removeSignature() {
      this.$refs.signature.value = "";
      URL.revokeObjectURL(this.cert.signature);
      this.cert.signature = null;
      this.signature_file = null;
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
        certificate_img: "base64",
      };
      this.logo_file = null;
      this.signature_file = null;
      this.$refs.logo.value = "";
      this.$refs.signature.value = "";
    },
    Create_Cert() {
      if (
        this.LogoSizeExceed ||
        this.SignatureSizeExceed ||
        this.InvalidLogoType ||
        this.InvalidSignatureType
      )
        return;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$emit("start");
        this.$store
          .dispatch("cert_state/Create_Certificate", this.form())
          .then(() => {
            this.reset_cert();
            this.updatecert();
            this.$v.$reset();
            this.$emit("stop");
            this.$router.push("/certificates");
            this.$nextTick(() => {
              this.GlobalNotify("certificate has been created", false);
            });
          })
          .catch((err) => {
            this.$emit("stop");
            console.log(err);
          });
      }
    },
    form() {
      var form = new FormData();
      // for (const [key, value] of Object.entries(this.cert)) {
      //   form.append(key, value);
      // }
      form.append("title", this.cert.title);
      form.append("name", this.cert.name);
      form.append("email", this.cert.email);
      form.append("instructor_name", this.cert.instructor_name);
      form.append("description", this.cert.description);
      if (this.cert.expiry_date) {
        form.append("expiry_date", this.cert.expiry_date);
      }
      if (this.logo_file) {
        form.append("logo", this.logo_file);
      }
      if (this.signature_file) {
        form.append("signature", this.signature_file);
      }
      form.append("template_id", this.template_id);
      // for (var key of form.entries()) {
      //   console.log(key[0] + ", " + key[1]);
      // }
      return form;
    },
    modify_Cert() {
      if (
        this.LogoSizeExceed ||
        this.SignatureSizeExceed ||
        this.InvalidLogoType ||
        this.InvalidSignatureType
      )
        return;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$emit("start");
        this.$store
          .dispatch("cert_state/Update_Certificate", {
            form: this.form(),
            id: this.$route.params.id,
          })
          .then(() => {
            //this.reset_cert();
            this.updatecert();
            // this.$v.$reset();
            this.$emit("stop");
            this.GlobalNotify("certificate has been updated");
          })
          .catch(() => {
            this.$emit("stop");
          });
      }
    },
    getBase64(file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        console.log(reader.result);
      };
      reader.onerror = function (error) {
        console.log("Error: ", error);
      };
    },
  },
  data() {
    return {
      src: "",
      InvalidLogoType: false,
      InvalidSignatureType: false,
      LogoSizeExceed: false,
      SignatureSizeExceed: false,
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
        certificate_img: "base64",
      },
    };
  },
  validations: {
    cert: {
      title: { required },
      name: { required },
      email: { required, email },
      description: { required },
      logo: { required },
      signature: { required },
    },
  },
  created() {
    if (this.edit) {
      var x = this.$store.state.cert_state.cert;
      this.cert.id = x._id;
      this.cert.title = x.title;
      this.cert.name = x.name;
      this.cert.email = x.email;
      this.cert.instructor_name = x.instructor_name;
      this.cert.expiry_date = x.expiry_date
        ? new Date(x.expiry_date).toISOString().slice(0, 10)
        : "";
      this.cert.description = x.description;
      this.cert.logo = x.logo;
      this.cert.signature = x.signature;
    }
  },
};
</script>
<style  scoped>
@media only screen and (min-width: 1300px) {
  .scroll {
    height: 700px;
    overflow-x: hidden;
    overflow-y: scroll;
  }
}
@media only screen and (min-height: 969px) {
  .scroll {
    height: 750px;
    overflow-x: hidden;
    overflow-y: scroll;
  }
}
</style>
