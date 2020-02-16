<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-title">
            <h2 class="text-center py-3"  v-if="fundraising || company">Fundraising & Company</h2>
            <h2 class="text-center py-3"  v-if="market">Market</h2>
            <h2 class="text-center py-3"  v-if="service">Product / Service</h2>
          </div>
          <div class="card-body">
            <FundraisingComponent v-if="fundraising" @fundraisingNext="fundraisingNext"/>
            <CompanyComponent v-if="company"   @companyNext="companyNext"/>
            <MarketComponent v-if="market" @marketNext="marketNext" />
            <ServiceComponent v-if="service" @serviceNext="serviceNext"/> 
            <ManagementComponent v-if="management" @managementNext="managementNext"/>
            <EndComponent v-if="end"/>
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
    EndComponent,
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
          max_point: '',
          min_point: ''
        }, 
        company:{
          companySelected: [],
          max_point: '',
          min_point: ''
        },
        market: {
          marketSelected: [],
          max_point: '',
          min_point: ''
        },
        service: {
          serviceSelected: [],
          max_point: '',
          min_point: ''
        }, 
        management: {
          managementSelected: [],
          max_point: '',
          min_point: ''
        },  
      }
    };
  },
  methods: {
   fundraisingNext(fundVal){
      this.data.fundraising.fundSelected = fundVal.fundraisingMap;
      this.data.fundraising.max_point = fundVal.fundMax;
      this.data.fundraising.min_point = fundVal.fundMin; 
      this.fundraising = false
      this.company =true
      this.market =false
      this.service = false
      this.management =  false
      this.end =  false
   },
   companyNext(companyVal){
      this.data.company.companySelected = companyVal.companyMap;
      this.data.company.max_point = companyVal.companyMax;
      this.data.company.min_point = companyVal.companyMin;
      this.fundraising = false
      this.company =false
      this.market =true
      this.service = false
      this.management =  false
      this.end =  false
   },
   marketNext(marketVal){
      this.data.market.marketSelected = marketVal.marketMap;
      this.data.market.max_point = marketVal.marketMax;
      this.data.market.min_point = marketVal.marketMin;
      this.fundraising = false
      this.company =false
      this.market =false
      this.service = true
      this.management =  false
      this.end =  false 
   },
   serviceNext(serviceVal){
      this.data.service.serviceSelected = serviceVal.serviceMap;
      this.data.service.max_point = serviceVal.serviceMax;
      this.data.service.min_point = serviceVal.serviceMin;
      this.fundraising = false
      this.company =false
      this.market =false
      this.service = false
      this.management =  true
      this.end =  false
   },
   managementNext(managementVal){
      this.data.management.managementSelected = managementVal.managementMap;
      this.data.management.max_point = managementVal.managementMax;
      this.data.management.min_point = managementVal.managementMin;
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
