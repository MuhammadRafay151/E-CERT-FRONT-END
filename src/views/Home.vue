<template>
  <div class="home" style="margin-top: 120px">
    <div class="container">
      <b-carousel
        id="carousel-1"
        v-model="slide"
        :interval="4000"
        controls
        indicators
        background="#ababab"
        img-width="1024"
        img-height="480"
        style="text-shadow: 1px 1px 2px #333"
        @sliding-start="onSlideStart"
        @sliding-end="onSlideEnd"
      >
        <!-- Text slides with image -->
        <b-carousel-slide
          caption="First slide"
          text="Nulla vitae elit libero, a pharetra augue mollis interdum."
          img-src="https://picsum.photos/1024/480/?image=52"
        ></b-carousel-slide>

        <!-- Slides with custom text -->
        <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=54">
          <h1>Hello world!</h1>
        </b-carousel-slide>

        <!-- Slides with image only -->
        <b-carousel-slide
          img-src="https://picsum.photos/1024/480/?image=58"
        ></b-carousel-slide>

        <!-- Slides with img slot -->
        <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
        <b-carousel-slide>
          <template #img>
            <img
              class="d-block img-fluid w-100"
              width="1024"
              height="480"
              src="https://picsum.photos/1024/480/?image=55"
              alt="image slot"
            />
          </template>
        </b-carousel-slide>

        <!-- Slide with blank fluid image to maintain slide aspect ratio -->
        <b-carousel-slide caption="Blank Image" img-blank img-alt="Blank image">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            eros felis, tincidunt a tincidunt eget, convallis vel est. Ut
            pellentesque ut lacus vel interdum.
          </p>
        </b-carousel-slide>
      </b-carousel>
      <button class="btn test">Hello World</button>
    </div>
    <div class="container">
      <video ref="videoRef" height="200"></video>
      <div class="mb-5">
        <b-card
          overlay
          img-src="https://picsum.photos/900/250/?image=3"
          img-alt="Card Image"
          text-variant="white"
          title="Image Overlay"
          sub-title="Subtitle"
        >
          <b-card-text>
            Some quick example text to build on the card and make up the bulk of
            the card's content.
          </b-card-text>
        </b-card>
      </div>
      <div class="row mb-5">
        <div class="col">
          <b-list-group>
            <b-list-group-item
              href="#"
              active
              class="flex-column align-items-start"
            >
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">List group item heading</h5>
                <small>3 days ago</small>
              </div>

              <p class="mb-1">
                Donec id elit non mi porta gravida at eget metus. Maecenas sed
                diam eget risus varius blandit.
              </p>

              <small>Donec id elit non mi porta.</small>
            </b-list-group-item>

            <b-list-group-item href="#" class="flex-column align-items-start">
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">List group item heading</h5>
                <small class="text-muted">3 days ago</small>
              </div>

              <p class="mb-1">
                Donec id elit non mi porta gravida at eget metus. Maecenas sed
                diam eget risus varius blandit.
              </p>

              <small class="text-muted">Donec id elit non mi porta.</small>
            </b-list-group-item>

            <b-list-group-item
              href="#"
              disabled
              class="flex-column align-items-start"
            >
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">Disabled List group item</h5>
                <small class="text-muted">3 days ago</small>
              </div>

              <p class="mb-1">
                Donec id elit non mi porta gravida at eget metus. Maecenas sed
                diam eget risus varius blandit.
              </p>

              <small class="text-muted">Donec id elit non mi porta.</small>
            </b-list-group-item>
          </b-list-group>
        </div>
        <div class="col">
          <b-list-group>
            <b-list-group-item
              href="#"
              active
              class="flex-column align-items-start"
            >
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">List group item heading</h5>
                <small>3 days ago</small>
              </div>

              <p class="mb-1">
                Donec id elit non mi porta gravida at eget metus. Maecenas sed
                diam eget risus varius blandit.
              </p>

              <small>Donec id elit non mi porta.</small>
            </b-list-group-item>

            <b-list-group-item href="#" class="flex-column align-items-start">
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">List group item heading</h5>
                <small class="text-muted">3 days ago</small>
              </div>

              <p class="mb-1">
                Donec id elit non mi porta gravida at eget metus. Maecenas sed
                diam eget risus varius blandit.
              </p>

              <small class="text-muted">Donec id elit non mi porta.</small>
            </b-list-group-item>

            <b-list-group-item
              href="#"
              disabled
              class="flex-column align-items-start"
            >
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">Disabled List group item</h5>
                <small class="text-muted">3 days ago</small>
              </div>

              <p class="mb-1">
                Donec id elit non mi porta gravida at eget metus. Maecenas sed
                diam eget risus varius blandit.
              </p>

              <small class="text-muted">Donec id elit non mi porta.</small>
            </b-list-group-item>
          </b-list-group>
        </div>
        <div class="col">
          <b-list-group>
            <b-list-group-item
              href="#"
              active
              class="flex-column align-items-start"
            >
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">List group item heading</h5>
                <small>3 days ago</small>
              </div>

              <p class="mb-1">
                Donec id elit non mi porta gravida at eget metus. Maecenas sed
                diam eget risus varius blandit.
              </p>

              <small>Donec id elit non mi porta.</small>
            </b-list-group-item>

            <b-list-group-item href="#" class="flex-column align-items-start">
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">List group item heading</h5>
                <small class="text-muted">3 days ago</small>
              </div>

              <p class="mb-1">
                Donec id elit non mi porta gravida at eget metus. Maecenas sed
                diam eget risus varius blandit.
              </p>

              <small class="text-muted">Donec id elit non mi porta.</small>
            </b-list-group-item>

            <b-list-group-item
              href="#"
              disabled
              class="flex-column align-items-start"
            >
              <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">Disabled List group item</h5>
                <small class="text-muted">3 days ago</small>
              </div>

              <p class="mb-1">
                Donec id elit non mi porta gravida at eget metus. Maecenas sed
                diam eget risus varius blandit.
              </p>

              <small class="text-muted">Donec id elit non mi porta.</small>
            </b-list-group-item>
          </b-list-group>
        </div>
      </div>
      <div class="row">
        <b-card-group>
          <b-card
            title="Title"
            img-src="https://placekitten.com/g/300/450"
            img-alt="Image"
            img-top
          >
            <b-card-text>
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.
            </b-card-text>
            <template #footer>
              <small class="text-muted">Last updated 3 mins ago</small>
            </template>
          </b-card>

          <b-card
            title="Title"
            img-src="https://placekitten.com/g/300/450"
            img-alt="Image"
            img-top
          >
            <b-card-text>
              This card has supporting text below as a natural lead-in to
              additional content.
            </b-card-text>
            <template #footer>
              <small class="text-muted">Last updated 3 mins ago</small>
            </template>
          </b-card>

          <b-card
            title="Title"
            img-src="https://placekitten.com/g/300/450"
            img-alt="Image"
            img-top
          >
            <b-card-text>
              This is a wider card with supporting text below as a natural
              lead-in to additional content. This card has even longer content
              than the first to show that equal height action.
            </b-card-text>
            <template #footer>
              <small class="text-muted">Last updated 3 mins ago</small>
            </template>
          </b-card>
        </b-card-group>
      </div>
    </div>
    <fter />
  </div>
</template>

<script>
// @ is an alias to /src
import fter from "@/components/Footer";
import { mapState } from "vuex";
export default {
  name: "Home",
  data() {
    return {
      slide: 0,
      sliding: null,
    };
  },
  computed: { ...mapState("user_state", ["user"]) },
  methods: {
    onSlideStart() {
      this.sliding = true;
    },
    onSlideEnd() {
      this.sliding = false;
    },
  },
  components: {
    fter,
  },
  mounted: function () {
    this.$refs.videoRef.src =
      "http://iandevlin.github.io/mdn/video-player/video/tears-of-steel-battle-clip-medium.mp4";
    this.$refs.videoRef.autoplay = true;
    this.$refs.videoRef.loop = true;
    this.$refs.videoRef.muted = true;
  },
};
</script>

<style  >
.back {
  background-image: url("/home.jpg");
  background-size: cover;
  background-attachment: fixed;
  background-position: center center;
  background-repeat: no-repeat;
}
</style>