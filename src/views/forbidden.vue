<template>
    <div style="margin-top:120px">
        <h3>Forbidden</h3>
        <button class="btn btn-dark" v-on:click="$router.push('/')">Go Home</button>
    </div>
</template>
<script>
export default {
    name:"forbidden"
}
</script>