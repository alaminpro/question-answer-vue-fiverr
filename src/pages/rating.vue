<template>
  <section class="page-section bg-light" id="about">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="card">
            <div class="card-title custom_title">
              <h2 class="text-center py-3" v-if="fundraising">
                Fundraising
              </h2>
              <h2 class="text-center py-3" v-if="company">
                Company
              </h2>
              <h2 class="text-center py-3" v-if="market">Market</h2>
              <h2 class="text-center py-3" v-if="service">Product / Service</h2>
              <h2 class="text-center py-3" v-if="management">
                Management Team
              </h2>
            </div>
            <div class="card-body">
              <FundraisingComponent
                v-if="fundraising"
                @fundraisingNext="fundraisingNext"
              />
              <CompanyComponent v-if="company" @companyNext="companyNext" />
              <MarketComponent v-if="market" @marketNext="marketNext" />
              <ServiceComponent v-if="service" @serviceNext="serviceNext" />
              <ManagementComponent
                v-if="management"
                @managementNext="managementNext"
              />
              <EndComponent v-if="end" :rating="rating" :allval="allVal" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import FundraisingComponent from "../components/FundraisingComponent";
import CompanyComponent from "../components/CompanyComponent";
import MarketComponent from "../components/MarketComponent";
import ServiceComponent from "../components/ServiceComponent";
import ManagementComponent from "../components/ManagementComponent";
import EndComponent from "../components/EndComponent";

export default {
  name: "Rating",
  components: {
    FundraisingComponent,
    CompanyComponent,
    MarketComponent,
    ServiceComponent,
    ManagementComponent,
    EndComponent
  },
  data() {
    return {
      fundraising: false,
      company: false,
      market: false,
      service: false,
      management: false,
      end: true,
      data: {
        fundraising: {
          fundSelected: [],
          max_point: null,
          min_point: null
        },
        company: {
          companySelected: [],
          max_point: "",
          min_point: ""
        },
        market: {
          marketSelected: [],
          max_point: null,
          min_point: null
        },
        service: {
          serviceSelected: [],
          max_point: null,
          min_point: null
        },
        management: {
          managementSelected: [],
          max_point: null,
          min_point: null
        }
      },
      rating: {
        overallRating: null,
        fundCompanyRating: null,
        marketRating: null,
        serviceRating: null,
        managementRating: null
      },
      allVal: {
        overallRating: null,
        fundCompanyRating: null,
        marketRating: null,
        serviceRating: null,
        managementRating: null
      },
      overall: {
        fundcompany: null,
        market: null,
        service: null,
        management: null
      }
    };
  },
  methods: {
    fundraisingNext(fundVal) {
      this.data.fundraising.fundSelected = fundVal.fundraisingMap;
      this.data.fundraising.max_point = fundVal.fundMax;
      this.data.fundraising.min_point = fundVal.fundMin;
      this.fundraising = false;
      this.company = true;
      this.market = false;
      this.service = false;
      this.management = false;
      this.end = false;
    },
    companyNext(companyVal) {
      this.data.company.companySelected = companyVal.companyMap;
      this.data.company.max_point = companyVal.companyMax;
      this.data.company.min_point = companyVal.companyMin;
      this.fundraising = false;
      this.company = false;
      this.market = true;
      this.service = false;
      this.management = false;
      this.end = false;
    },
    marketNext(marketVal) {
      this.data.market.marketSelected = marketVal.marketMap;
      this.data.market.max_point = marketVal.marketMax;
      this.data.market.min_point = marketVal.marketMin;
      this.fundraising = false;
      this.company = false;
      this.market = false;
      this.service = true;
      this.management = false;
      this.end = false;
    },
    serviceNext(serviceVal) {
      this.data.service.serviceSelected = serviceVal.serviceMap;
      this.data.service.max_point = serviceVal.serviceMax;
      this.data.service.min_point = serviceVal.serviceMin;
      this.fundraising = false;
      this.company = false;
      this.market = false;
      this.service = false;
      this.management = true;
      this.end = false;
    },
    managementNext(managementVal) {
      this.data.management.managementSelected = managementVal.managementMap;
      this.data.management.max_point = managementVal.managementMax;
      this.data.management.min_point = managementVal.managementMin;
      this.fundraising = false;
      this.company = false;
      this.market = false;
      this.service = false;
      this.management = false;
      this.end = true;
      this.fundrasingCompanyRating();
      this.marketrating();
      this.servicerating();
      this.managementrating();
      this.overallrating();
    },
    // fundraising and company rating
    fundrasingCompanyRating() {
      const fundCompanyMax =
        this.data.fundraising.max_point + this.data.company.max_point;
      const fundCompanyMin =
        this.data.fundraising.min_point + this.data.company.min_point;
      this.overall.fundcompany = parseInt(
        (fundCompanyMax - fundCompanyMin) / 6
      );

      var totalfund = this.data.fundraising.fundSelected
        .filter(i => i != undefined)
        .reduce((a, b) => a + b, 0);

      var totalCompany = this.data.company.companySelected
        .filter(i => i != undefined)
        .reduce((a, b) => a + b, 0);

      var totalSum = totalfund + totalCompany;
      this.rating.fundCompanyRating = this.Rating(totalSum);

      if (this.rating.fundCompanyRating == "A+") {
        this.allVal.fundCompanyRating = 100;
      } else if (this.rating.fundCompanyRating == "A") {
        this.allVal.fundCompanyRating = 83;
      } else if (this.rating.fundCompanyRating == "B+") {
        this.allVal.fundCompanyRating = 66.4;
      } else if (this.rating.fundCompanyRating == "B") {
        this.allVal.fundCompanyRating = 49.8;
      } else if (this.rating.fundCompanyRating == "C+") {
        this.allVal.fundCompanyRating = 33.2;
      } else if (this.rating.fundCompanyRating == "C") {
        this.allVal.fundCompanyRating = 16.6;
      } else if (this.rating.fundCompanyRating == "F") {
        this.allVal.fundCompanyRating = 0;
      }
    },
    // Market rating
    marketrating() {
      this.overall.market = parseInt(
        (this.data.market.max_point - this.data.market.min_point) / 6
      );
      var totalSum = this.data.market.marketSelected
        .filter(i => i != undefined)
        .reduce((a, b) => a + b, 0);

      this.rating.marketRating = this.Rating(totalSum);

      if (this.rating.marketRating == "A+") {
        this.allVal.marketRating = 100;
      } else if (this.rating.marketRating == "A") {
        this.allVal.marketRating = 83;
      } else if (this.rating.marketRating == "B+") {
        this.allVal.marketRating = 66.4;
      } else if (this.rating.marketRating == "B") {
        this.allVal.marketRating = 49.8;
      } else if (this.rating.marketRating == "C+") {
        this.allVal.marketRating = 33.2;
      } else if (this.rating.marketRating == "C") {
        this.allVal.marketRating = 16.6;
      } else if (this.rating.marketRating == "F") {
        this.allVal.marketRating = 0;
      }
    },
    // service rating
    servicerating() {
      this.overall.service = parseInt(
        (this.data.service.max_point - this.data.service.min_point) / 6
      );
      var totalSum = this.data.service.serviceSelected
        .filter(i => i != undefined)
        .reduce((a, b) => a + b, 0);

      this.rating.serviceRating = this.Rating(totalSum);
      if (this.rating.serviceRating == "A+") {
        this.allVal.serviceRating = 100;
      } else if (this.rating.serviceRating == "A") {
        this.allVal.serviceRating = 83;
      } else if (this.rating.serviceRating == "B+") {
        this.allVal.serviceRating = 66.4;
      } else if (this.rating.serviceRating == "B") {
        this.allVal.serviceRating = 49.8;
      } else if (this.rating.serviceRating == "C+") {
        this.allVal.serviceRating = 33.2;
      } else if (this.rating.serviceRating == "C") {
        this.allVal.serviceRating = 16.6;
      } else if (this.rating.serviceRating == "F") {
        this.allVal.serviceRating = 0;
      }
    },
    // management rating
    managementrating() {
      this.overall.management = parseInt(
        (this.data.management.max_point - this.data.management.min_point) / 6
      );
      var totalSum = this.data.management.managementSelected
        .filter(i => i != undefined)
        .reduce((a, b) => a + b, 0);

      this.rating.managementRating = this.Rating(totalSum);

      if (this.rating.managementRating == "A+") {
        this.allVal.managementRating = 100;
      } else if (this.rating.managementRating == "A") {
        this.allVal.managementRating = 83;
      } else if (this.rating.managementRating == "B+") {
        this.allVal.managementRating = 66.4;
      } else if (this.rating.managementRating == "B") {
        this.allVal.managementRating = 49.8;
      } else if (this.rating.managementRating == "C+") {
        this.allVal.managementRating = 33.2;
      } else if (this.rating.managementRating == "C") {
        this.allVal.managementRating = 16.6;
      } else if (this.rating.managementRating == "F") {
        this.allVal.managementRating = 0;
      }
    },
    overallrating() {
      // // total max points
      // const fundCompanyMax =
      //   this.data.fundraising.max_point + this.data.company.max_point;
      // const marketMax = this.data.market.max_point;
      // const serviceMax = this.data.service.max_point;
      // const managementMax = this.data.management.max_point;
      // const totalMax = Math.max(
      //   ...[fundCompanyMax, marketMax, serviceMax, managementMax]
      // );
      // // total min points
      // const fundCompanyMin =
      //   this.data.fundraising.min_point + this.data.company.min_point;
      // const marketMin = this.data.market.min_point;
      // const serviceMin = this.data.service.min_point;
      // const managementMin = this.data.management.min_point;
      // const totalMin = Math.min(
      //   ...[fundCompanyMin, marketMin, serviceMin, managementMin]
      // );
      // const overallRating = parseInt((totalMax - totalMin) / 6);

      var totalfund = this.data.fundraising.fundSelected
        .filter(i => i != undefined)
        .reduce((a, b) => a + b, 0);
      var totalCompany = this.data.company.companySelected
        .filter(i => i != undefined)
        .reduce((a, b) => a + b, 0);
      var company = totalfund + totalCompany;
      var market = this.data.market.marketSelected
        .filter(i => i != undefined)
        .reduce((a, b) => a + b, 0);
      var service = this.data.service.serviceSelected
        .filter(i => i != undefined)
        .reduce((a, b) => a + b, 0);
      var management = this.data.management.managementSelected
        .filter(i => i != undefined)
        .reduce((a, b) => a + b, 0);

      var total = [company, market, service, management];
      var overallRating = total.reduce((a, b) => a + b, 0);
      this.rating.overallRating = this.OverallRating(overallRating);

      if (this.rating.overallRating == "A+") {
        this.allVal.overallRating = 100;
      } else if (this.rating.overallRating == "A") {
        this.allVal.overallRating = 83;
      } else if (this.rating.overallRating == "B+") {
        this.allVal.overallRating = 66.4;
      } else if (this.rating.overallRating == "B") {
        this.allVal.overallRating = 49.8;
      } else if (this.rating.overallRating == "C+") {
        this.allVal.overallRating = 33.2;
      } else if (this.rating.overallRating == "C") {
        this.allVal.overallRating = 16.6;
      } else if (this.rating.overallRating == "F") {
        this.allVal.overallRating = 0;
      }
    },
    Rating(val) {
      if (val <= 346) return "C";
      else if (val >= 347 && val <= 576) return "C+";
      else if (val >= 577 && val <= 806) return "B";
      else if (val >= 807 && val <= 1036) return "B+";
      else if (val >= 1037 && val <= 1266) return "A";
      else if (val >= 1267) return "A+";
      else if (val < 115) return "F";
    },
    OverallRating(val) {
      if (val <= 1909) return "C";
      else if (val >= 1910 && val <= 3108) return "C+";
      else if (val >= 3109 && val <= 4307) return "B";
      else if (val >= 4308 && val <= 5506) return "B+";
      else if (val >= 5507 && val <= 6705) return "A";
      else if (val >= 6706) return "A+";
    }
  }
};
</script>
<style lang="scss">
  .custom_title h2{
    color: #f4623a;
  }
</style>