export default {
    methods: {
        delete_confirm(id) {
            //confirmation for delete we send id and if we press yes than it will reurn id to its parent in emit event
            if (id) {
                this.$refs.d1.modalShow = true;
                this.$refs.d1.del_id = id;
            } else {
                this.$refs.d1.modalShow = false;
                this.$refs.d1.del_id = null;
            }
        }
    }
}