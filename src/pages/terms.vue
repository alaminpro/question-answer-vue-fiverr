<template>
  <div>
    <section class="page-section bg-light" id="about">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-10 offset-lg-1 text-center">
            <h4
              class="terms__notice mb-5"
            >Terms of use</h4>
            <p class="terms__text">
            All files and information contained in this Website or Blog are copyright by Ratings investor and may not be duplicated, copied, modified or adapted, in any way without our written permission. Our Website or Blog may contain our service marks or trademarks as well as those of our affiliates or other companies, in the form of words, graphics, and logos. Your use of our Website, Blog or Services does not constitute any right or license for you to use our service marks or trademarks, without the prior written permission of [Your Name or Company]. Our Content, as found within our Website, Blog and Services, is protected under United States and foreign copyrights. The copying, redistribution, use or publication by you of any such Content, is strictly prohibited. Your use of our Website and Services does not grant you any ownership rights to our Content.  </p>
           
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Terms",
  data() {
    return {};
  },
  mounted() {
    document.title = "Terms of use";
  }
};
</script>
<style lang="scss">
.terms__text {
  color: #000 !important;
  text-align: left;
}
.terms__notice {
  color: #f4623a; 
}
</style>
