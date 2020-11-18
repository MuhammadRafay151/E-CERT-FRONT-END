<template>
  <div>
    <b-card no-body class="shadow" style="width: 320px">
      <center>
        <b-col>
          <b-card-body title="BATCH INFORMATION" class="h-100">
            <form >
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
                placeholder="Batch Name"
                v-model.trim="$v.batch_name.$model"
                v-on:input="updatecert"
              />
              <div class="text-danger text-left" v-if="$v.batch_name.$error">
                Field is required
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
               <button v-if="edit" type="button" @click="Modify_Batch" class="btn btn-dark btn-block">
                Save Changes
              </button>
              <button v-else type="button" @click="Create_Batch" class="btn btn-dark btn-block">
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
export default {
  name: "batchinfo",
  props: { template_id: String, edit: Boolean },
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
        certificate_img: "base64",
      };
    },
    Create_Batch() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$emit("start");
        this.$store
          .dispatch("cert_state/Create_Batch", this.form())
          .then((r) => {
            console.log("Save succefully");
            this.reset_cert();
            this.updatecert();
            this.$v.$reset();
            this.$emit("stop");
            console.log(r);
          })
          .catch((err) => {
            this.$emit("stop");
            console.log(err);
          });
      }
    },
    modify_Batch() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$emit("start");
        this.$store
          .dispatch("cert_state/Update_Batch", {
            form: this.form(),
            id: this.$route.params.id,
          })
          .then((r) => {
            this.reset_cert();
            this.updatecert();
            this.$v.$reset();
            this.$emit("stop");
            this.$router.push('/certificates')
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
      form.append("instructor_name", this.cert.instructor_name);
      form.append("expiry_date", this.cert.expiry_date);
      form.append("description", this.cert.description);
      form.append("batch_name",this.batch_name)
      if (this.logo_file) {
        form.append("logo", this.logo_file);
      }
      if (this.signature_file) {
        form.append("signature", this.signature_file);
      }
      form.append("template_id", this.template_id);
      return form;
    }
  },
  data() {
    return {
      src: "",
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
};
</script>
