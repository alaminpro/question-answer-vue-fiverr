<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-title">
            <h2 class="text-center py-3"  v-if="fundraising || company">Fundraising & Company</h2>
            <h2 class="text-center py-3"  v-if="market">Market</h2>
          </div>
          <div class="card-body">
            <FundraisingComponent v-if="fundraising" @fundraisingNext="fundraisingNext"/>
            <CompanyComponent v-if="company"   @companyNext="companyNext"/>
            <MarketComponent v-if="market" />
            <ServiceComponent v-if="service" /> 
            <ManagementComponent v-if="management" />
            <EndComponent v-if="end"  />
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
import ServiceComponent from "./components/CompanyComponent";
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
    EndComponent,
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
        company_fundraising: {
          fundSelected: [],
          companySelected: [],
          max_point: null,
          min_point: null
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
        },  
      }
    };
  },
  methods: {
   fundraisingNext(fundVal){
      this.data.company_fundraising.fundSelected = fundVal;
      this.fundraising = false
      this.company =true
      this.market =false
      this.service = false
      this.management =  false
      this.end =  false
   },
   companyNext(companyVal){
      this.data.company_fundraising.companySelected = companyVal;
      this.fundraising = false
      this.company =false
      this.market =true
      this.service = false
      this.management =  false
      this.end =  false
   },
   marketNext(marketVal){
      this.data.market.marketSelected = marketVal;
      this.fundraising = false
      this.company =false
      this.market =false
      this.service = true
      this.management =  false
      this.end =  false
   },
   serviceNext(serviceVal){
      this.data.service.serviceSelected = serviceVal;
      this.fundraising = false
      this.company =false
      this.market =false
      this.service = false
      this.management =  true
      this.end =  false
   },
   managementNext(managementVal){
      this.data.management.managementSelected = managementVal;
      this.fundraising = false
      this.company =false
      this.market =false
      this.service = false
      this.management =  false
      this.end =  true
   },
  }
};
</script>
