<template>
    <div class="container">
        <div class="row" style="margin-top:120px">
        <div class="col">
            <h1>Hello "{{user.Name}}"</h1>
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