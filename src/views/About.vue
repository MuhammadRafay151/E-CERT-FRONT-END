<template>
  <div class="container-fluid" style="margin-top: 120px; margin-bottom: 120px">
    <div class="shadow p-5">
      <div class="row shadow">
        <div class="col">
          <img src="/logo/Certifis%20Logo%20Final-01.png" alt="" width="500" />
          <hr />
          <p>
            The idea was initiated by
            <a href="https://www.linkedin.com/in/mqpasta/" target="_blank"
              >Dr. Qasim Pasta</a
            >
            . First, we started R&D which includes findings of blockchain and different blockchain frameworks, services & platforms. we decided to choose hyperledger fabric as a blockchain platform. Initial R&D of hyperledger fabric was done by
            <a
              href="https://www.linkedin.com/in/muhammad-rafay-51563417a/"
              target="_blank"
              >Muhammad Rafay</a
            >. After completion of R&D, the actual development of the project was started which includes a total team of 5 people.
          </p>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col shadow p-3">
          <h3>Our Team</h3>
        </div>
      </div>
      <div class="shadow p-1">
        <div class="row mb-5 mt-3 justify-content-center">
          <div
            class="
              col col-lg-4
              d-flex
              justify-content-center
              mb-5 mb-lg-0 mb-md-0
            "
          >
            <PCard :data="team[0]" />
          </div>
          <div class="col col-lg-4 d-flex justify-content-center">
            <PCard :data="team[1]" />
          </div>
        </div>
        <div class="row mb-5 mt-3">
          <div class="col d-flex justify-content-center mb-5 mb-lg-0">
            <PCard :data="team[2]" />
          </div>
          <div class="col d-flex justify-content-center mb-5 mb-lg-0">
            <PCard :data="team[3]" />
          </div>
          <div class="col d-flex justify-content-center">
            <PCard :data="team[4]" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import PCard from "../components/ProfileCard.vue";
export default {
  name: "about",
  components: {
    PCard,
  },
  data: () => {
    return {
      team: [
        {
          name: "Muhammad Rafay",
          img: "https://avatars.githubusercontent.com/u/46870378?v=4",
          contributions: [
            "System Designing and Architecture",
            "BlockChain Solution Development & Intergation",
            "BlockChain Automation solution",
            "Back-End Devlopment",
            "Front-End Devlopment",
            "Deployments over cloud and dedicated linux vms",
          ],
        },
        {
          name: "Muhammad Aamir",
          img: "https://avatars.githubusercontent.com/u/51251914?v=4",
          contributions: [
            "BlockChain Deployment & Configurations",
            "BlockChain Automation solution",
            "Back-End Development",
            "Front-End Development",
          ],
        },
        {
          name: "Hassan Ahmad",
          img: "https://avatars.githubusercontent.com/u/56544250?v=4",
          contributions: ["Cloud solutions", "Automated Testing", "Docs"],
        },
        {
          name: "Muhammad Ismail",
          img: "https://avatars.githubusercontent.com/u/46966245?v=4",
          contributions: [
            "UI/UX",
            "Docs",
            "Front-End Development(specific areas)",
          ],
        },
        {
          name: "Muhammad Sabih",
          img: "https://avatars.githubusercontent.com/u/61966856?v=4",
          contributions: ["Docs", "Testcase Development", "BlackBox Testing"],
        },
      ],
    };
  },
};
</script>
