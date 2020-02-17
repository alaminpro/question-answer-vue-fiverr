<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-title">
            <h2 class="text-center py-3" v-if="fundraising || company">Fundraising & Company</h2>
            <h2 class="text-center py-3" v-if="market">Market</h2>
            <h2 class="text-center py-3" v-if="service">Product / Service</h2>
          </div>
          <div class="card-body">
            <FundraisingComponent v-if="fundraising" @fundraisingNext="fundraisingNext" />
            <CompanyComponent v-if="company" @companyNext="companyNext" />
            <MarketComponent v-if="market" @marketNext="marketNext" />
            <ServiceComponent v-if="service" @serviceNext="serviceNext" />
            <ManagementComponent v-if="management" @managementNext="managementNext" />
            <EndComponent v-if="end" :rating="rating" :allval="allVal" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FundraisingComponent from "./components/FundraisingComponent";
import CompanyComponent from "./components/CompanyComponent";
import MarketComponent from "./components/MarketComponent";
import ServiceComponent from "./components/ServiceComponent";
import ManagementComponent from "./components/ManagementComponent";
import EndComponent from "./components/EndComponent";

export default {
  name: "App",
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
      fundraising: true,
      company: false,
      market: false,
      service: false,
      management: false,
      end: false,
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
      const fundCompanyRating = parseInt((fundCompanyMax - fundCompanyMin) / 6);

      this.allVal.fundCompanyRating = fundCompanyRating / 10;
      this.rating.fundCompanyRating = this.Rating(fundCompanyRating);
    },
    // Market rating
    marketrating() {
      const marketRating = parseInt(
        (this.data.market.max_point - this.data.market.min_point) / 6
      );
      this.allVal.marketRating = marketRating / 10;
      this.rating.marketRating = this.Rating(marketRating);
    },
    // service rating
    servicerating() {
      const serviceRating = parseInt(
        (this.data.service.max_point - this.data.service.min_point) / 6
      );
      this.allVal.serviceRating = serviceRating / 10;
      this.rating.serviceRating = this.Rating(serviceRating);
    },
    // management rating
    managementrating() {
      const managementRating = parseInt(
        (this.data.management.max_point - this.data.management.min_point) / 6
      );
      this.allVal.managementRating = managementRating / 10;
      this.rating.managementRating = this.Rating(managementRating);
    },
    overallrating() {
      // total max points
      const fundCompanyMax =
        this.data.fundraising.max_point + this.data.company.max_point;
      const marketMax = this.data.market.max_point;
      const serviceMax = this.data.service.max_point;
      const managementMax = this.data.management.max_point;
      const totalMax = Math.max(
        ...[fundCompanyMax, marketMax, serviceMax, managementMax]
      );
      // total min points
      const fundCompanyMin =
        this.data.fundraising.min_point + this.data.company.min_point;
      const marketMin = this.data.market.min_point;
      const serviceMin = this.data.service.min_point;
      const managementMin = this.data.management.min_point;
      const totalMin = Math.min(
        ...[fundCompanyMin, marketMin, serviceMin, managementMin]
      );

      const overallRating = parseInt((totalMax - totalMin) / 6);

      this.allVal.overallRating = overallRating / 10;
      this.rating.overallRating = this.Rating(overallRating);
    },
    Rating(val) {
      if (val >= 200 && val <= 333) return "C";
      else if (val >= 334 && val <= 466) return "C+";
      else if (val >= 467 && val <= 599) return "B";
      else if (val >= 600 && val <= 732) return "B+";
      else if (val >= 733 && val <= 865) return "A";
      else if (val >= 866) return "A+";
      else if (val < 200) return "F";
    }
  }
};
</script>
