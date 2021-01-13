<template>
  <div class="container-fluid p-5" style="margin-top: 120px">
    <b-card no-body class="shadow">
      <b-card-body>
        <b-row>
          <div class="col-4">
            <b-nav tabs>
              <b-nav-item :active="Display" v-on:click="showsingle"
                >Single Certificates</b-nav-item
              >
              <b-nav-item :active="!Display" v-on:click="showbatch"
                >Batch Certificates</b-nav-item
              >
            </b-nav>
          </div>

          <div class="col text-center">
            <h3 v-if="org">{{ org.name }}'s PUBLICATIONS</h3>
            <h3 v-else class="text-wb">PUBLICATIONS</h3>
          </div>
          <div class="col text-left"></div>
        </b-row>
      </b-card-body>
    </b-card>
    <div class="row mt-1">
      <div class="col">
        <SinglePublication :id="id" v-if="Display" />
        <BatchPublication :id="id" v-else />
      </div>
    </div>
  </div>
</template>
<script>
import BatchPublication from "../components/BatchPublication";
import SinglePublication from "../components/SinglePublication";
export default {
  name: "publish",
  props: ["id"],
  //id is passed for viweing anpther org certificates if id not passed it will by default show current org data
  components: { BatchPublication, SinglePublication },
  data: () => {
    return { Display: true, org: null };
  },
  methods: {
    showsingle() {
      this.Display = true;
    },
    showbatch() {
      this.Display = false;
    },
  },
  created() {
    // console.log(this.$route.query.IsBatch)
    // console.log(typeof(this.$route.query.IsBatch))
    this.$store.commit("cert_state/ClearSingleCertificates");
    this.$store.commit("cert_state/ClearBatches");
    this.$store.commit("cert_state/ClearBatchCerts");
    if (this.$route.query.IsBatch) {
      this.showbatch();
    } else {
      this.showsingle();
    }
    if (this.id) {
      this.$store
        .dispatch("org_state/GetOrg", this.id)
        .then(() => {
          this.org = this.$store.state.org_state.org;
        })
        .catch(() => {
          this.$router.push({ name: "404" });
        });
    }
  },
};
</script>
<style scoped>
a {
  color: #10c3ff;
}
small {
  color: black;
}
small:hover {
  color: blue;
  text-decoration-color: blue;
}
</style>