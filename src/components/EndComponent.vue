<template>
  <div>
    <div class="title text-center">
      <h2>Overall Total</h2>
    </div>
    <div class="circle__one text-center mt-3">
      <div class="rating_all">{{ rating.overallRating }}</div>
      <Progress
        strokeColor="#2f72f9"
        :strokeWidth="10"
        :radius="70"
        :value="allval.overallRating"
      ></Progress>
    </div>
    <div class="report__generate_time text-center my-3">
      Report Generated:
      <span class="font-weight-bold" v-html="Datetime"></span>
    </div>
    <div class="row">
      <div class="col-lg-10 offset-lg-1">
        <div class="row">
          <div class="col-lg-3">
            <div class="circle__two d-flex justify-content-center">
              <div class="rating">{{ rating.fundCompanyRating }}</div>
              <Progress
                strokeColor="#0277bd"
                :strokeWidth="8"
                :value="allval.fundCompanyRating"
                :radius="50"
              >
                <template v-slot:footer>
                  <b style="color: #0277bd">Fundraising & Company</b>
                </template>
              </Progress>
            </div>
          </div>
          <div class="col-lg-3">
            <div class="circle__three d-flex justify-content-center">
              <div class="rating">{{ rating.marketRating }}</div>
              <Progress
                strokeColor="#00695c"
                :strokeWidth="8"
                :value="allval.marketRating"
                :radius="50"
              >
                <template v-slot:footer>
                  <b style="color: #00695c">Market</b>
                </template>
              </Progress>
            </div>
          </div>
          <div class="col-lg-3">
            <div class="circle__four d-flex justify-content-center">
              <div class="rating">{{ rating.serviceRating }}</div>
              <Progress
                strokeColor="#ad1457"
                :strokeWidth="8"
                :value="allval.serviceRating"
                :radius="50"
              >
                <template v-slot:footer>
                  <b style="color: #ad1457">Product & Service</b>
                </template>
              </Progress>
            </div>
          </div>
          <div class="col-lg-3">
            <div class="circle__five d-flex justify-content-center">
              <div class="rating">{{ rating.managementRating }}</div>
              <Progress
                strokeColor="#283593"
                :strokeWidth="8"
                :value="allval.managementRating"
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
    <div class="contact__us text-center mt-4">
      <button class="btn btn-custom-bg" v-b-modal="'my-modal'">
        Find me my investor
      </button> 
      <router-link to="/rate-your-project" class="btn btn-secondary mt-2">Go Back</router-link>
      <b-modal hide-footer size="lg" id="my-modal">
        <ContactUs :rating="rating" />
      </b-modal>
    </div>
    <hr>
    <div class="some_detail pt-3">
        <p> - Ratings range from A+,A, B+,B,C+,C 
</p>
        <p>- Whatever your rating is, we have investor interested in different types of projects having various sub rating scores
 </p>
        <p>- The rating is based on a series of questions and needs to be assessed by a member of our team to fully understand the scope.</p>
        <p class="pb-4"> - Depending on the sector, company profile, a higher or lower rating can be seen differently. 
</p>
        <p class="pb-4"> - We aim to find also investors that can eventually bring some experience to help grow your business, so by accessing this way we can make sure we have the best suited investors for you.
 
</p>
  <div class="w-100 text-center">
      <router-link to="/rate-your-project" class="text-center mt-" style="color: #f4623a">Feel free to contact us! </router-link>
    
  </div>
    </div>
  </div>
</template>

<script>
import Progress from "easy-circular-progress";
import ContactUs from "./ContactComponent";
export default {
  name: "EndComponent",
  props: ["rating", "allval"],
  components: {
    Progress,
    ContactUs
  },
  computed: {
    Datetime() {
      return new Date().toLocaleString("en-us", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric"
      });
    }
  }
};
</script>
<style>
.vue-circular-progress {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.vue-circular-progress .percent {
  display: none !important;
}
.circle__one,
.circle__two,
.circle__three,
.circle__four,
.circle__five {
  position: relative;
}
.rating_all {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  font-size: 40px;
  font-weight: bold;
  color: #2f72f9;
}
.rating {
  position: absolute;
  left: 50%;
  top: 42%;
  transform: translate(-50%, -50%);
  font-size: 30px;
  font-weight: bold;
}
.circle__two .rating {
  color: #0277bd;
}
.circle__three .rating {
  color: #00695c;
}
.circle__four .rating {
  color: #ad1457;
}
.circle__five .rating {
  color: #283593;
}
</style>
