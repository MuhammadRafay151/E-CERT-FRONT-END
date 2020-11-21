<template>
  <div>
    <loader ref="l1"></loader>
    <b-table
      bordered
      hover
      sticky-header="600px"
      :fields="fields"
      :items="candidates"
      style="height: 550px"
   
    >
  
      <template #head(index)="data">
        <excel class="d-inline" />
        <b-button
          class="d-inline ml-2"
          v-on:click="add"
          size="sm"
          variant="outline-dark"
        >
          <b-icon font-scale="1" icon="plus-square-fill"></b-icon>
        </b-button>
        <span class="d-inline">{{ data.label }}</span>
      </template>
      <template #cell(index)="data">
        {{ data.index + 1 }}
      </template>
      <template #cell(name)="data">
        <input
          type="text"
          v-model="candidates[data.index].name"
          class="form-control"
        />
        <sub
          class="text-danger text-left"
          v-if="$v.candidates.$each[data.index].name.$error"
        >
          Field is required
        </sub>
      </template>
      <template #cell(email)="data">
        <input
          type="email"
          class="form-control"
          v-model="candidates[data.index].email"
        />
        <sub
          class="text-danger text-left"
          v-if="$v.candidates.$each[data.index].email.$error"
        >
          Field is required
        </sub>
      </template>
      <template #cell(actions)="data">
        <b-icon
          icon="x-circle-fill"
          v-on:click="del(data.index)"
          style="cursor: pointer"
        ></b-icon>
      </template>
    </b-table>
    <button v-on:click="submit">submit</button>
  </div>
</template>
<script>
import excel from "./Excel";
import loader from "./Loader"
import { required, minLength } from "vuelidate/lib/validators";
import loader2 from '../js/loader'
export default {
  components: { excel,loader },
  name: "AddBatchCert",
  data: () => {
    return {
      fields: [
        {
          key: "index",
          class: "text-center",
        },
        {
          key: "name",
          class: "text-center",
        },
        {
          key: "email",

          class: "text-center",
        },
        {
          key: "Actions",
          class: "text-center",
        },
      ],
      candidates: [{ name: "null", email: "null" }],
    };
  },
  mixins:[loader2],
  methods: {
    add() {
      this.candidates.push({ name: "", email: "" });
     
    },
    remove() {
      this.candidates.pop();
    },
    del(index) {
      this.candidates.splice(index, 1);
    },
    submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
         this.$refs.l1.show_loader("Processing...")
        this.$store.dispatch("cert_state/CreateBatchCert",{data:this.candidates,batch_id:this.$route.params.id}).then(res=>{
          this.candidates=[]
          console.log(res)
          this.$refs.l1.Hide_loader("Processing...")
          
        }).catch(err=>{
          console.log(err)
        })
      }
    },
  },
  validations: {
    candidates: {
      required,
      minLength: minLength(1),
      $each: {
        name: {
          required,
        },
        email: { required },
      },
    },
  },
 
};
</script>