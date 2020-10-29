<template>
  <div>
    <div class="card" style="width: 25rem;">
      <img :src="path" class="card-img-top" alt="..." />
      <div class="card-body">
        <p class="card-text text-justify">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </p>
      </div>
      <div class="row mb-3 mr-2 ml-2">
        <div class="col">
           <b-button squared block  variant="dark">View</b-button>
        </div>
        <div class="col">
       <b-button squared block  variant="dark">Start</b-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["path"],
  name: "template"
};
</script>