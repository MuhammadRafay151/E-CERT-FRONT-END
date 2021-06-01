<template>
  <div class="container-fluid p-5" style="margin-top: 120px">
    <b-card no-body class="shadow">
      <b-card-body>
        <b-row>
          <div class="col">
            <b-nav tabs>
              <b-nav-item :active="Display" v-on:click="showsingle"
                >Individual Certificates</b-nav-item
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
          <div class="col d-flex justify-content-end">
            <b-dropdown
              size="lg"
              variant="white"
              toggle-class="text-decoration-none"
              no-caret
              right
            >
              <template #button-content>
                <b-icon
                  class="align-self-center"
                  icon="funnel-fill"
                  aria-hidden="true"
                ></b-icon
                ><span class="sr-only">Search</span>
              </template>
              <template #default>
                <div
                  style="
                    width: calc(
                      100px + (150 - 100) * ((100vw - 300px) / (1600 - 300))
                    );
                  "
                >
                  <flr v-on="{ ApplyFilter: Sort }" ref="f1" />
                </div>
              </template>
            </b-dropdown>
            <b-dropdown
              size="lg"
              variant="white"
              toggle-class="text-decoration-none"
              no-caret
              right
              lazy
            >
              <template #button-content>
                <b-icon
                  class="align-self-center"
                  icon="search"
                  aria-hidden="true"
                ></b-icon
                ><span class="sr-only">Search</span>
              </template>
              <template #default>
                <div class="dp">
                  <SingleCertSearch v-if="Display" v-on:search="search" />
                  <BatchSearch v-else v-on:search="search" />
                </div>
              </template>
            </b-dropdown>
          </div>
        </b-row>
      </b-card-body>
    </b-card>
    <div class="row mt-1">
      <div class="col">
        <SinglePublication
          :id="id"
          v-if="Display"
          :SearchQuery="SearchQuery"
          :SortQuery="SortQuery"
        />
        <BatchPublication
          :id="id"
          v-else
          :SearchQuery="SearchQuery"
          :SortQuery="SortQuery"
        />
      </div>
    </div>
  </div>
</template>
<script>
import BatchPublication from "../components/BatchPublication";
import SinglePublication from "../components/SinglePublication";
import SingleCertSearch from "../components/Search/SingleCertificateSearch";
import BatchSearch from "../components/Search/BatchSearch";
import flr from "../components/filters/filter";

export default {
  name: "publish",
  props: ["id"],
  //id is passed for viweing anpther org certificates if id not passed it will by default show current org data
  components: {
    BatchPublication,
    SinglePublication,
    SingleCertSearch,
    BatchSearch,
    flr,
  },
  data: () => {
    return { Display: true, org: null, SearchQuery: null, SortQuery: null };
  },
  methods: {
    showsingle() {
      this.Display = true;
      this.SearchQuery = null;
    },
    showbatch() {
      this.Display = false;
      this.SearchQuery = null;
    },
    search(obj) {
      this.SearchQuery = obj;
    },
    Sort(obj) {
      this.SortQuery = obj;
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
.dp {
  width: calc(200px + (400 - 200) * ((100vw - 300px) / (1600 - 300)));
}
</style>