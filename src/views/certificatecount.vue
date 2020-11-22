<template>
<div class="container-fluid p-5" style="margin-top:120px">
    <div class="col-6 container-fluid">
        <AddCertCount/>
    </div>
<div class="container-fluid p-5" >

    <div>
        <b-card no-body class=" shadow container-fluid col-10">
            <b-card-body>
                <b-row>
                    <div class="col-4">

                    </div>

                    <div class="col text-center">
                        <h3>Count History</h3>
                    </div>
                    <div class="col text-left ">

                    </div>
                </b-row>
                
            </b-card-body>
        </b-card>
      

      <div class="col-10 container-fluid">
            <CertCount/>
        </div>
       

           
    </div>
</div>
</div>
</template>

<script>
import CertCount from "../components/CertificateCount";
import AddCertCount from "../components/AddCertCount";

export default {
    name: "CertificateCountView",
    props: { id: String},

    components: {
        CertCount,
        AddCertCount
    },

    methods: {
    },
    data() {
        return {
            Display: true,
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
