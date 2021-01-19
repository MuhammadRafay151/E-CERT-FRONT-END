<template>
  <div id="view" :class="[{ collapsed: collapsed }]" style="margin-top: 120px">
    <div>
      <!-- <b-iconstack
        font-scale="4"
        class="position-fixed mr-auto"
        style="left: -22px; top: 50%"
        v-on:mouseover="Display = true"
      >
        <b-icon
          stacked
          icon="chevron-compact-right"
          variant="wb"
          scale="0.75"
          class="bg-primary"
        ></b-icon>
        <b-icon stacked icon="circle" variant="wb" shift-h="-3"></b-icon>
      </b-iconstack> -->

      <!-- <b-sidebar
      v-model="Display"
      id="sidebar-1"
      body-class="bg-wb"
      header-class="bg-wb"
      text-variant="white"
      :title="'UIT ' + 'Config'"
      backdrop-variant="dark"
      backdrop
      shadow
    >
      <div class="p-3">
        <div
          v-b-hover="handleHover1"
          style="cursor: pointer"
          @click="OpenCertCount"
          class="p-2 mt-3 text-white border-bottom border-white"
          :class="isHovered1 ? 'bg-secondary' : ''"
        >
          <b-icon
            icon="file-earmark-plus-fill"
            class="float-left"
            font-scale="1.5"
            variant="white"
          ></b-icon>
          <h5>Certificate Count</h5>
        </div>
        <div
          v-b-hover="handleHover2"
          @click="OpenUser"
          class="p-2 mt-3 text-white border-bottom border-white"
          :class="isHovered2 ? 'bg-secondary' : ''"
        >
          <b-icon
            icon="person-lines-fill"
            class="float-left"
            font-scale="1.5"
            variant="white"
          ></b-icon>

          <h5 class="d-inline-block">User Management</h5>
        </div>
        <div
          v-b-hover="handleHover3"
          class="p-2 mt-3 text-white border-bottom border-white"
          :class="isHovered3 ? 'bg-secondary' : ''"
        >
          <b-icon
            icon="info-square-fill"
            class="float-left"
            font-scale="1.5"
            variant="white"
          ></b-icon>
          <h5 class="d-inline-block">Basic Info</h5>
        </div>
      </div>
    </b-sidebar> -->
      <div class="p-3 shadow m-5">
        <h3 class="text-wb">{{ org.name }}'s Config</h3>
      </div>
      <component v-bind:is="currentpage" :id="id" :Edit="true" />
    </div>
    <sidebar-menu
      style="left: 0px; top: 8.5%"
      class="sidebar"
      :menu="menu"
      :collapsed="collapsed"
      @item-click="onItemClick"
      @toggle-collapse="onToggleCollapse"
    />
  </div>
</template>
<script>
import certcount from "../components/CertificateCount";
import UserManagement from "../components/UserManagement";
import EditOrgProfile from "../components/RegisterOrganization";
import { mapState } from "vuex";
export default {
  name: "OrganizationConfig",
  props: ["id"],
  components: {
    certcount,
    UserManagement,
    EditOrgProfile,
  },
  computed: {
    ...mapState("org_state", ["org"]),
    ...mapState("user_state", ["user", "Authorization"]),
  },
  data: () => {
    return {
      currentpage: "certcount",
      Display: false,
      isHovered1: false,
      isHovered2: false,
      isHovered3: false,
      menu: [
        {
          header: true,
          title: "Getting Started",
        },
        {
          title: "Cert Count",
          icon: "fas fa-certificate",
          class: "vsm--link vsm--link_exact-active",
          attributes: { comp: "certcount" },
        },
        {
          title: "User Management",
          icon: "far fa-user-circle",
          attributes: { comp: "UserManagement" },
        },
        {
          title: "Edit Profile",
          icon: "far fa-edit",
          attributes: { comp: "EditOrgProfile" },
        },
      ],
      collapsed: true,
    };
  },
  methods: {
    handleHover1(hovered) {
      this.isHovered1 = hovered;
    },
    handleHover2(hovered) {
      this.isHovered2 = hovered;
    },
    handleHover3(hovered) {
      this.isHovered3 = hovered;
    },
    ResetMenu() {
      for (let i = 0; i < this.menu.length; i++) {
        this.menu[i].class = "";
      }
    },
    OpenCertCount() {
      this.currentpage = "certcount";
      this.Display = false;
    },
    OpenUser() {
      this.currentpage = "UserManagement";
      this.Display = false;
    },
    OpenBasicInfo() {
      this.currentpage = certcount;
    },
    onItemClick(event, item) {
      this.ResetMenu();
      item.class = "vsm--link vsm--link_exact-active";
      this.currentpage = item.attributes.comp;
    },
    onToggleCollapse(c) {
      this.collapsed = c;
    },
  },
  created() {
    this.$store
      .dispatch("org_state/GetOrg", this.id)
      .then(() => {})
      .catch(() => {
        this.$router.push({ name: "404" });
      });
  },
};
</script>
<style scoped>
#view {
  padding-left: 350px;
  transition: 0.3s ease;
}
#view.collapsed {
  padding-left: 50px;
}
.sidebar-overlay {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #000;
  opacity: 0.5;
  z-index: 900;
}
.test {
  color: aqua;
  background-color: rgb(247, 23, 23);
}
pre {
  font-family: Consolas, monospace;
  color: #000;
  background: #fff;
  border-radius: 2px;
  padding: 15px;
  line-height: 1.5;
  overflow: auto;
}
</style>