<template>
    <div class="container-fluid">
        <div class="row justify-content-center" style="margin-top:120px">
        <div class="col">
          <div class="shadow">
              <h1 class="text-wb">Hello {{user.name}}</h1>
                <!-- <h3 class="text-center">Profile</h3>
          <table class="mt-2 table table-hover">
              <tbody>
                  <tr>
                      <th scope="col">Name: </th>
                      <td>{{user.name}}</td>
                  </tr>
                  <tr>
                      <th scope="col">Email: </th>
                      <td> {{user.email}}</td>
                  </tr>
                  <tr>
                      <th scope="col">Organiaztion: </th>
                      <td>{{user.organization.name}}</td>
                  </tr>
              </tbody>
          </table> -->
          </div>
        </div>
    </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    name:"dashboard",
    computed:{
        ...mapState('user_state',['user'])
    }
}
</script>