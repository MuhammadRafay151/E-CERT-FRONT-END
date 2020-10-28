<template>
  <div>
    <div class="container1">
      <img
        src="../assets/f2b08cc2a4da932e542734ae797563d1.png"
        width="800"
        alt=""
      />
      <h3 class="t">Certified hyperledger farbric</h3>
      <p class="desc text-left">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged.
      </p>
      <p class="p2 text-left">
        Date: 19-05-2020
      </p>
      <p class="p3 text-left">
        verfication code: asd85810asdew23423
      </p>
      <!-- <div class="row  "  >
     <div class="col d-flex  justify-content-center">
       
     </div>
   </div> -->
      <!-- <div class="row">
     <div class="col d-flex justify-content-center">
       <div style="max-width: 70%;">
       <p style=" font-size: 11px;" >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>

       </div>
     </div>
   </div>
   <div class="row  mb-5">
     <div class="col d-flex justify-content-center">
       <img class=" mt-2" src="https://raw.githubusercontent.com/MuhammadRafay151/LMS/master/LeaveApplication/LeaveApplication/Images/uit1fav.png?token=ALFS62WEJAZZ2SIVEL3EI7C7TE6FQ" width="20%"  alt="">
     </div>
   </div> -->
    </div>
  </div>
</template>

<script>
import image from "../assets/f2b08cc2a4da932e542734ae797563d1.png";
export default {
  name: "certificate",
  data() {
    return {
      image
    };
  }
};
</script>

<style>
.t {
  position: absolute;
  top: 160px;
  color: black;
  left: 0;
  right: 0;

  height: 500px; /* Assign a value */
  margin: auto;
}
.container1 {
  position: relative;
  text-align: center;
  color: white;
}
.scroll {
  width: 790px;
  overflow-x: scroll;
  overflow-y: hidden;
}
.desc {
  position: absolute;
  top: 210px;
  color: black;
  left: 0;
  right: 0;

  width: 600px;
  margin: auto;
}
.p2 {
   position: absolute;
  top: 490px;
  color: black;
  left: 60px;
  right: 0;
}
.p3 {
  position: absolute;
  top: 520px;
  color: black;
  left: 60px;
  right: 0;
}
</style>