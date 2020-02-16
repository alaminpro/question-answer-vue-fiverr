<template>
  <div>
    <div class="title text-center">
      <h2>Overall Total</h2>
    </div>
    <div class="circle__one text-center mt-3">
      <Progress
        strokeColor="#2f72f9"
        :strokeWidth="10"
        :radius="70"
        value="16.88"
      ></Progress>
    </div>
    <div class="report__generate_time text-center my-5">
      Report Generated: <span class="font-weight-bold" v-html="DateTime"></span>
    </div>
    <div class="row">
      <div class="col-lg-10 offset-lg-1">
        <div class="row">
          <div class="col-lg-3">
            <div class="circle__two  d-flex justify-content-center">
              <Progress
                strokeColor="#0277bd"
                :strokeWidth="8"
                value="16.88"
                :radius="50"
              >
                <template v-slot:footer>
                  <b style="color: #0277bd">Fundraising & Company</b>
                </template></Progress
              >
            </div>
          </div>
          <div class="col-lg-3">
            <div class="circle__three d-flex justify-content-center">
              <Progress
                strokeColor="#00695c"
                :strokeWidth="8"
                value="16.88"
                :radius="50"
              >
                <template v-slot:footer>
                  <b style="color: #00695c">Market</b>
                </template></Progress
              >
            </div>
          </div>
          <div class="col-lg-3">
            <div class="circle__four  d-flex justify-content-center">
              <Progress
                strokeColor="#ad1457"
                :strokeWidth="8"
                value="16.88"
                :radius="50"
              >
                <template v-slot:footer>
                  <b style="color: #ad1457">Product & Service</b>
                </template></Progress
              >
            </div>
          </div>
          <div class="col-lg-3">
            <div class="circle__five  d-flex justify-content-center">
              <Progress
                strokeColor="#283593"
                :strokeWidth="8"
                value="16.88"
                :radius="50"
              >
                <template v-slot:footer>
                  <b style="color: #283593">Management Team</b>
                </template>
              </Progress>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="contact__us text-center mt-5">
      <button class="btn btn-success" v-b-modal="'my-modal'">Contact Us</button>
      <b-modal hide-footer size="lg" id="my-modal">
        <ContactUs />
      </b-modal>
    </div>
  </div>
</template>

<script>
import Progress from "easy-circular-progress";
import ContactUs from "./ContactComponent";
export default {
  name: "EndComponent",
  components: {
    Progress,
    ContactUs
  },
  data() {
    return {};
  },
  computed: {
    DateTime() {
      return new Date().toLocaleString("en-us", {
        day: "numeric",
        month: "long",
        hour: "numeric",
        minute: "numeric"
      });
    }
  }
};
</script>
<style lang="css" scoped>
.vue-circular-progress {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
