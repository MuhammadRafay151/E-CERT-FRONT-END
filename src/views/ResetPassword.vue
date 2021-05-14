<template>
  <div class="container vh-100">
    <div class="row justify-content-center h-100">
      <div class="align-self-center col-4">
        <div class="card shadow">
          <div class="card-body">
            <ResetPassword :reset="true" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ResetPassword from "../components/Password";
export default {
  name: "ResetPasswordView",
  components: {
    ResetPassword,
  },
};
</script>