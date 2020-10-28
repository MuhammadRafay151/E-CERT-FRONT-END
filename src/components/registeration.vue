<template>
  <div>
  <div class="shadow" v-if="$route.query.id&&$route.query.orgname">
    <h3 class="p-3">{{$route.query.orgname}}</h3>
  </div>
    <b-card no-body class="overflow-hidden shadow" style="width: 750px;">
      <b-row no-gutters>
        <b-col cols-md="5" cols-sm="2" cols="">
          <b-card-img
            src="https://i.pinimg.com/originals/42/73/b7/4273b7c22af24b9d4bade05c28cdc2ac.jpg"
            alt="Image"
            class="rounded-0"
            img-width="2"
          ></b-card-img>
        </b-col>
        <b-col md="7" sm="5" cols="12">
          <b-card-body   class="h-100" >
            <h3>{{pagetitle}}</h3>
            <form class="mt-5">
               <div class="form-group text-left">
                  <label for="exampleInputEmail1">Name</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Name"
                  />
                
                </div>
               
                <div class="form-group text-left">
                  <label for="exampleInputEmail1">Email address</label>
                  <input
                    type="email"
                    class="form-control"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                  />
                
                </div>
                <div class="form-group text-left">
                  <label >Password</label>
                  <input
                    type="password"
                    class="form-control"
                   
                    placeholder="Password"
                  />
                </div>
               
                <button type="submit"  v-on:click="onclick" class="btn btn-dark btn-block mt-5">Submit</button>
              </form>
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>
<script>
import {sayhello} from '../js/test';
export default {
  props: ['id','orgname'],

  name: "registeration",
  data:function(){
return{
  pagetitle:"Register Issuer"
}
  },
   methods:{
    onclick:function()
    {
      alert(sayhello())
    }
  }
};
</script>