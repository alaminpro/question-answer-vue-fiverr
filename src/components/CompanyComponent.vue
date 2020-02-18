<template>
  <div>
    <fieldset class="form-group" v-for="(company, index) in companyActive" :key="index">
      <legend class="col-form-labelpt-0 radio_legend" v-html="company.question"></legend>
      <div
        class="form-check"
        v-for="(ans, ans_index) in checkAnswerRadio(company.answer)"
        :key="ans_index"
      >
        <input
          class="form-check-input"
          type="radio"
          :name="'answer_' + company.id"
          v-model="companySelected[company.id]"
          :id="'answer_' + ans_index + '_' + company.id"
          :value="ans.value + '_' + ans.title"
        />
        <label
          class="form-check-label radio-label"
          :for="'answer_' + ans_index + '_' + company.id"
        >{{ ans.title }}</label>
      </div>
      <div class="form-check" v-if="checkAnswerSelect(company.answer)">
        <select
          class="custom-select"
          v-model="companySelected[company.id]"
          :name="'answer_' + company.id"
        >
          <option
            v-for="(ans, ans_index) in checkAnswerSelect(company.answer)"
            :key="ans_index"
            :value="ans.value + '_' + ans.title"
          >{{ ans.title }}</option>
        </select>
      </div>
    </fieldset>
    <div>
      <fieldset class="form-group" v-for="(company, index) in companyInput" :key="index">
        <legend class="col-form-label pt-0 radio_legend" v-html="company.question"></legend>
        <div class="form-check" v-for="(ans, ans_index) in company.answer" :key="ans_index">
          <div class="input-group">
            <label
              class="form-check-label radio-label"
              :for="'answer_' + ans_index + '_' + company.id"
            >{{ ans.title }}</label>
            <input
              type="number"
              class="form-control ml-3 mt-1"
              id="'answer_' + ans_index + '_' + company.id"
            />
          </div>
        </div>
      </fieldset>
    </div>
    <fieldset class="form-group">
      <legend class="col-form-label pt-0 m-0 radio_legend">Country headquarters</legend>
      <div class="form-check">
        <Select2 v-model="country" :options="allCountry" />
      </div>
    </fieldset>
    <div class="next_section mt-5">
      <button type="button" :disabled="companyBool" class="btn btn-success" @click="Next">Next</button>
    </div>
  </div>
</template>

<script>
import { company } from "../api/company_api";
import Select2 from "v-select2-component";
import { country } from "../api/country";
export default {
  name: "companyComponent",
  components: {
    Select2
  },
  data() {
    return {
      company: company,
      companyBool: true,
      companySelected: [],
      allCountry: [],
      country: ""
    };
  },
  computed: {
    companyActive: function() {
      return this.company.filter(function(val) {
        return val.dependancies !== false && val.input !== true;
      });
    },
    companyInput: function() {
      return this.company.filter(function(val) {
        return val.input === true;
      });
    },
    companyWatch: function() {
      return this.companySelected;
    },
    checkAnswerRadio() {
      return arr => (arr.length <= 6 ? arr : "");
    },
    checkAnswerSelect() {
      return arr => (arr.length > 6 ? arr : "");
    }
  },
  watch: {
    companyWatch(newVal) {
      let filterVal = newVal
        .map(val => val.split("_").filter(e => (e === "yes" ? e : "")))
        .some(a => (a.length > 0 ? a : ""));
      this.senitizeData(filterVal);
       const fund = this.companySelected.filter(item => item !== undefined && item !== null)
      if (fund.length >= 9) {
        this.companyBool = false;
      }

      // window.console.log(companyMap)
    }
  },
  methods: {
    senitizeData(val) {
      val
        ? this.company.map(a =>
            a.dependancies === false ? (a.dependancies = true) : ""
          )
        : this.company.map(a =>
            a.dependancies === true ? (a.dependancies = false) : ""
          );
    },
    Next() {
      const companyMap = this.companySelected
        .filter(el => el != null)
        .map(val => Number(val.split("_")[0]));

      let companyMax = this.company
        .filter(d => d.dependancies !== false)
        .filter(d => d.answer.length > 0)
        .map(val => Math.max(...val.answer.map(v => v.value)))
        .reduce((a, b) => a + b);

      let companyMin = this.company
        .filter(d => d.dependancies !== false)
        .filter(d => d.answer.length > 0)
        .map(val => Math.min(...val.answer.map(v => v.value)))
        .reduce((a, b) => a + b);
      this.$emit("companyNext", { companyMap, companyMax, companyMin });
    }
  },
  created() {
    const countries = country.map(val => val.name);
    this.allCountry = countries;
  }
};
</script>
<style>
  .info_style{
    width: 35px;
    height: 35px;
    background: rgb(33, 146, 25);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100px;
        position: absolute;
    top: -106px;
    left: 476px;
  }
  .info_style i{
    color: #fff;
    
  }
  .radio_legend{
    position: relative;
  }
  .info_style i:hover{
   text-decoration: none;
  }
</style>