<template>
  <!-- Footer -->
  <footer class="footer_background py-5">
    <div class="container">
      <div class="notice-terms d-flex justify-content-center mb-3">
        <router-link to="/legal-notice" class="mr-2 text-light">Legal Notice</router-link>
        <router-link to="/terms-of-use" class="text-light">Terms of use</router-link>
      </div>
      <div
        class="small text-center text-light"
      >Copyright © Ratings investor 2020 All Rights Reserved</div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {};
  }
};
</script>
<style lang="scss">
.footer_background {
  background: #343a40;
  color: white;
}
</style>