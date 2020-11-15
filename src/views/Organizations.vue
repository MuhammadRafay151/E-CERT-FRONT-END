<template>
<div class="container-fluid p-5" style="margin-top:120px">

    <BatchView v-if="BatchDetail" />
    <div v-else>
        <b-card no-body class=" shadow">
            <b-card-body>
                <b-row>
                    <div class="col-4">

                    </div>

                    <div class="col text-center">
                        <h3>Organizations</h3>
                    </div>
                    <div class="col text-left ">

                    </div>
                </b-row>
            </b-card-body>
        </b-card>

        <div class="row mt-1">
            <div class="col">
                <OrganizationsDetails v-if="Display" />
            </div>
        </div>
    </div>

</div>
</template>

<script>
import OrganizationsDetails from "../components/Organizations";

export default {
    name: "OrganizationsView",

    components: {
        OrganizationsDetails
    },

    methods: {

    },
    data() {
        return {
            Display: true,
            BatchDetail: false
        };
    }
};
</script>

<style scoped>
a {
    color: #46b7de;
}

small {
    color: black;
}

small:hover {
    color: blue;
    text-decoration-color: blue;
}
</style>
