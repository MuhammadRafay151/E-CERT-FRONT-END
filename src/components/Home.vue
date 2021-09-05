<template>
  <div
    style="
      margin-top: 90px;
      overflow: hidden;
      background-image: url(/Home/background.png);
      background-attachment: fixed;
    "
  >
    <!-- #fef8dd;
   background-image: url(/email-pattern.png);
      background-attachment: fixed; -->
    <div class="row" style="align-items: center">
      <div class="col-lg-6 col-md-6 col-sm-6">
        <img src="/Home/Service.jpg" width="100%" />
      </div>
      <div class="col-lg-6 col-md-6 col-sm-6">
        <h1 class="service-title" style="text-align: left">
          <textra
            :data="words"
            :timer="2.1"
            filter="right-left"
            :infinite="true"
          />
        </h1>
        <p style="text-align: left">
          <textra
            :data="detail"
            :timer="2.1"
            filter="right-left"
            :infinite="true"
          />
        </p>
      </div>
    </div>
    <br />
    <br />

    <div class="container-fluid">
      <div class="row custom-target">
        <div class="col-lg-6 col-md-6 d-flex justify-content-center">
          <div class="col-lg-6">
            <img
              src="/Home/target.jpg"
              class="rounded-circle target-img"
              alt="Circle Image"
            />
          </div>
        </div>
        <div class="container">
          <h1>Our Target</h1>
          <p style="margin-bottom: 0">
            "Certifis helps advance the profession, certification has made its
            way into nearly every sector. The goal of Certifis is to address the
            challenges encountered by certificate issuing entities such as
            creation, validation and verification certificates."
          </p>
        </div>
      </div>
    </div>
    <br />
    <br />
    <div class="container-fluid">
      <h1>Features</h1>
      <br />
      <div class="row custom-features">
        <div class="col-lg-6 col-md-6 d-flex justify-content-center">
          <div class="col-lg-6">
            <img
              src="/Home/create.jpg"
              class="rounded-circle feature-img"
              alt="Circle Image"
            />
            <h3>Creation</h3>
            <p>
              Build certificates according to your preferred choices for every
              industry in today's world.
            </p>
          </div>
        </div>
        <div class="col-lg-6 col-md-6">
          <video ref="createvideoRef" width="100%"></video>
        </div>
      </div>
      <br />
      <div class="row custom-features">
        <div class="col-lg-6 col-md-6 d-flex justify-content-center order-md-2">
          <div class="col-lg-6">
            <img
              src="/Home/verify.jpg"
              class="rounded-circle feature-img"
              alt="Circle Image"
            />
            <h3>Verification</h3>
            <p>
              Verify your honorable certificate from anywhere and anytime in a
              temper free environment.
            </p>
          </div>
        </div>
        <div class="col-lg-6 col-md-6 order-md-1">
          <video ref="verifyvideoRef" width="100%"></video>
        </div>
      </div>
      <br />
      <div class="row custom-features">
        <div class="col-lg-6 col-md-6 d-flex justify-content-center">
          <div class="col-lg-6">
            <img
              src="/Home/organization.jpg"
              class="rounded-circle feature-img"
              alt="Circle Image"
            />
            <h3>Organization</h3>
            <p>
              Opportunity to act as a service provider or service grabber as
              your need.
            </p>
          </div>
        </div>
        <div class="col-lg-6 col-md-6">
          <video ref="organizationvideoRef" width="100%"></video>
        </div>
      </div>
    </div>
    <br />
    <br />
    <h1>Our Work</h1>
    <br />
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      background="#ababab"
      img-width="1024"
      img-height="200"
      style="text-shadow: 1px 1px 2px #333"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <b-carousel-slide
        caption="First slide"
        text="Nulla vitae elit libero, a pharetra augue mollis interdum."
        img-src="https://picsum.photos/1024/200/?image=52"
      ></b-carousel-slide>

      <b-carousel-slide img-src="https://picsum.photos/1024/200/?image=54">
        <h1>Hello world!</h1>
      </b-carousel-slide>

      <b-carousel-slide
        img-src="https://picsum.photos/1024/200/?image=58"
      ></b-carousel-slide>

      <b-carousel-slide>
        <template #img>
          <img
            class="d-block img-fluid w-100"
            width="1024"
            height="200"
            src="https://picsum.photos/1024/200/?image=55"
            alt="image slot"
          />
        </template>
      </b-carousel-slide>

      <b-carousel-slide caption="Blank Image" img-blank img-alt="Blank image">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          eros felis, tincidunt a tincidunt eget, convallis vel est. Ut
          pellentesque ut lacus vel interdum.
        </p>
      </b-carousel-slide>
    </b-carousel>
    <br />
    <br />
    <h1>Avail Services</h1>
    <br />
    <b-card-group deck>
      <b-card title="Physical Organization" class="custom-card">
        <b-card-text>
          The physical locations of managed systems might not correspond to the
          networks on which the systems reside. In this case, you might want to
          create a new domain in which the Sun Management Center groups are
          structured on physical lines. Cities, sites, buildings, floors, server
          rooms and even equipment racks can easily be represented. The systems
          at these locations can be copied and pasted from the domain in which
          discovery was performed using the Discovery Manager. To configure a
          Sun Management Center environment along physical lines requires you to
          know where the systems are physically located. This organization can
          become a valuable and easily accessed reference. A physical
          organization also defines a status roll-up path, enabling problems to
          be isolated on physical lines and assisting in the identification of
          common-mode failures. For example, a localized power outage might
          affect systems that reside on several networks but will only appear in
          one physical area.
        </b-card-text>
        <b-button pill class="custom-button" @click="applyPhysical"
          >Apply Now</b-button
        >
      </b-card>

      <b-card title="Client Organization" class="custom-card">
        <b-card-text>
          A Logical Organization™ is one that understanding the new rules of
          engagement in the digital world – and how to use business insight to
          make better decisions. Every aspect of business is decision-based, yet
          poor business decisions are costing organisations millions of dollars
          every year. Whilst many companies are still in the process of cleaning
          and organizing their data for BI tools, not enough are architecting
          their data for strategic decision making. Overcoming this state
          demands alignment, relevance, efficiency, accountability, and data
          quality. Changes are becoming more rapid and more complex that it is
          almost impossible to understand all the relationships and how they
          will affect your business. With over 30 years of consulting to major
          corporations on strategic improvement, working closely with the
          C-suite and IT in enabling better decision making there is more to
          business insight than just BI.with every day tasks performed
          throughout the organisation – where everyone understands how they are
        </b-card-text>
        <b-button pill class="custom-button" @click="applyService"
          >Apply Now</b-button
        >
      </b-card>
    </b-card-group>
  </div>
</template>
<script>
export default {
  name: "HomePage",
  data() {
    return {
      slide: 0,
      sliding: null,
      words: ["Education", "Health", "Events", "Sports"],
      detail: [
        "Education is the process of facilitating learning, or the acquisition of knowledge, skills, values, beliefs, and habits. Educational methods include teaching, training, storytelling, discussion and directed research.",
        "Health is a state of complete physical, mental, and social well-being and not merely the absence of disease or infirmity.",
        "Events in Karachi deals in managing events, provide complete decor, artist management, catering and all type of technical support along with marketing of your events.",
        "Sport includes all forms of competitive physical activity or games which, through casual or organized participation, at least in part aim to use, maintain or improve physical ability and skills while providing enjoyment to participants, and in some cases, entertainment for spectators",
      ],
    };
  },
  methods: {
    onSlideStart() {
      this.sliding = true;
    },
    onSlideEnd() {
      this.sliding = false;
    },
    applyPhysical() {
      let link = document.createElement("a");
      link.href = "https://certifis-portal.herokuapp.com/Contact";
      link.target = "_blank";
      link.click();
    },
    applyService() {
      let link = document.createElement("a");
      link.href = "https://certifis-portal.herokuapp.com/OrgContact";
      link.target = "_blank";
      link.click();
    },
  },
  mounted: function () {
    //   create certificate video
    this.$refs.createvideoRef.src = "/Home/createvideo.mp4";
    this.$refs.createvideoRef.autoplay = true;
    this.$refs.createvideoRef.loop = true;
    this.$refs.createvideoRef.muted = true;
    //   verify certificate video
    this.$refs.verifyvideoRef.src = "/Home/verifyvideo.mp4";
    this.$refs.verifyvideoRef.autoplay = true;
    this.$refs.verifyvideoRef.loop = true;
    this.$refs.verifyvideoRef.muted = true;
    //   organization certificate video
    this.$refs.organizationvideoRef.src = "/Home/organizationvideo.mp4";
    this.$refs.organizationvideoRef.autoplay = true;
    this.$refs.organizationvideoRef.loop = true;
    this.$refs.organizationvideoRef.muted = true;
  },
};
</script>
<style scoped>
@media only screen and (max-width: 767px) {
  .target-img {
    width: 70%;
  }
  .feature-img {
    width: 40%;
  }
  .service-title {
    font-size: 4rem;
  }
}
@media only screen and (min-width: 768px) {
  .target-img {
    width: 80%;
  }
  .feature-img {
    width: 50%;
  }
  .service-title {
    font-size: 5rem;
  }
}
@media only screen and (min-width: 992px) {
  .target-img {
    width: 90%;
  }
  .feature-img {
    width: 60%;
  }
  .service-title {
    font-size: 5rem;
  }
}
.custom-card {
  background-color: #1a3c34;
  color: #ffffff;
  border-color: transparent;
  border-radius: 0px;
}

.custom-button {
  border-color: #ffffff;
  background-color: transparent;
}
.custom-button:hover {
  background-color: #ffffff;
  color: #1a3c34;
  border: transparent;
}
.custom-target {
  justify-content: center;
  background-color: #1a3c34;
  color: #ffffff;
  padding-top: 1.25rem;
  padding-bottom: 1.25rem;
}
.custom-features {
  align-items: center;
  background-color: #f2f0ebab;
  padding-top: 1.25rem;
  padding-bottom: 1.25rem;
}
</style>