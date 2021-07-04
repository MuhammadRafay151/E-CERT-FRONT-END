<template>
  <div>
    <b-card no-body class="shadow" style="width: 320px">
      <center>
        <b-col>
          <b-card-body title="BATCH INFORMATION" class="h-100">
            <form>
              <div class="form-group text-left">
                <label><sup class="text-danger">*</sup>Title</label>
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
                <label><sup class="text-danger">*</sup>Batch Name</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Batch Name"
                  v-model.trim="$v.batch_name.$model"
                  v-on:input="updatecert"
                />
                <sub class="text-danger text-left" v-if="$v.batch_name.$error">
                  Field is required
                </sub>
              </div>
              <div class="form-group text-left">
                <label>Instructor Name</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Instructor Name"
                  v-model="cert.instructor_name"
                  v-on:input="updatecert"
                />
              </div>
              <div class="form-group text-left">
                <label>Expiry Date</label>
                <input
                  type="date"
                  class="form-control"
                  placeholder="Title"
                  v-model="cert.expiry_date"
                  v-on:change="updatecert"
                />
                <sub class="text-secondary"
                  >Note: for life time expiry left empty</sub
                >
              </div>

              <div class="form-group text-left">
                <label><sup class="text-danger">*</sup>Description</label>
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
                <sub class="text-danger text-left" v-if="$v.cert.logo.$error">
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
                  image should be less than or equal to 500kb
                </sub>
                <sub class="text-danger text-left" v-if="InvalidSignatureType">
                  Allowed image formats '.jpeg', '.jpg', '.png'
                </sub>
              </div>

              <button
                v-if="edit"
                type="button"
                @click="Modify_Batch"
                class="btn btn-wb btn-block"
              >
                Save Changes
              </button>
              <button
                v-else
                type="button"
                @click="Create_Batch"
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
import { required } from "vuelidate/lib/validators";
import GlobalNotification from "../js/GlobalNotification";
export default {
  name: "batchinfo",
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
      this.batch_name = null;
      this.logo_file = null;
      this.signature_file = null;
      this.$refs.logo.value = "";
      this.$refs.signature.value = "";
    },
    Create_Batch() {
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
          .dispatch("cert_state/Create_Batch", this.form())
          .then(() => {
            console.log("Save succefully");
            this.reset_cert();
            this.updatecert();
            this.$v.$reset();
            this.$emit("stop");
            this.$router.push("/certificates?IsBatch=true");
            this.$nextTick(() => {
              this.GlobalNotify("Batch has been created");
            });
          })
          .catch((err) => {
            this.$emit("stop");
            console.log(err);
          });
      }
    },
    Modify_Batch() {
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
          .dispatch("cert_state/UpdateBatch", {
            form: this.form(),
            id: this.$route.params.id,
          })
          .then((r) => {
            this.reset_cert();
            this.updatecert();
            this.$v.$reset();
            this.$emit("stop");
            this.$router.push("/certificates");
            console.log(r);
          })
          .catch((err) => {
            this.$emit("stop");
            console.log(err);
          });
      }
    },
    form() {
      var form = new FormData();
      form.append("title", this.cert.title);
      form.append("description", this.cert.description);
      form.append("batch_name", this.batch_name);
      if (this.cert.instructor_name) {
        form.append("instructor_name", this.cert.instructor_name);
      }
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
      return form;
    },
  },
  data() {
    return {
      InvalidLogoType: false,
      InvalidSignatureType: false,
      LogoSizeExceed: false,
      SignatureSizeExceed: false,
      logo_file: null,
      signature_file: null,
      batch_name: null,
      cert: {
        title: "",
        name: '"Name"',
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
    batch_name: { required },
    cert: {
      title: { required },
      description: { required },
      logo: { required },
      signature: { required },
    },
  },
  created() {
    if (this.edit) {
      var x = this.$store.state.cert_state.cert;
      this.cert.title = x.title;
      this.cert.instructor_name = x.instructor_name;
      this.cert.expiry_date = x.expiry_date
        ? new Date(x.expiry_date).toISOString().slice(0, 10)
        : "";
      this.cert.description = x.description;
      this.cert.logo = x.logo;
      this.cert.signature = x.signature;
      this.batch_name = x.batch_name;
    }
  },
};
</script>
