<template>
  <div>
    <fieldset
      class="form-group"
      v-for="(service, index) in serviceActive"
      :key="index"
    >
      <legend
        class="col-form-labelpt-0 radio_legend"
        v-html="service.question"
      ></legend>
      <div
        class="form-check"
        v-for="(ans, ans_index) in checkAnswerRadio(service.answer)"
        :key="ans_index"
      >
        <input
          class="form-check-input"
          type="radio"
          :name="'answer_' + service.id"
          v-model="serviceSelected[service.id]"
          :id="'answer_' + ans_index + '_' + service.id"
          :value="ans.value + '_' + ans.title"
        />
        <label
          class="form-check-label radio-label"
          :for="'answer_' + ans_index + '_' + service.id"
        >
          {{ ans.title }}
        </label>
      </div>
      <div class="form-check" v-if="checkAnswerSelect(service.answer)">
        <select
          class="custom-select"
          v-model="serviceSelected[service.id]"
          :name="'answer_' + service.id"
        >
          <option
            v-for="(ans, ans_index) in checkAnswerSelect(service.answer)"
            :key="ans_index"
            :value="ans.value + '_' + ans.title"
          >
            {{ ans.title }}</option
          >
        </select>
      </div>
    </fieldset>
    <div>
      <fieldset
      class="form-group"
      v-for="(service, index) in serviceInput"
      :key="index"
    >
      <legend
        class="col-form-labelpt-0 radio_legend"
        v-html="service.question"
      ></legend>
      <div
        class="form-check"
        v-for="(ans, ans_index) in service.answer"
        :key="ans_index"
      > 
        <div class="input-group">
          <label
          class="form-check-label radio-label"
          :for="'answer_' + ans_index + '_' + service.id"
        >
          {{ ans.title }}
        </label>
        <input type="number" class="form-control ml-3 mt-1" id="'answer_' + ans_index + '_' + service.id">
        </div>
      </div>
    </fieldset>
    </div> 
    <div class="next_section mt-5">
      <button
        type="button"
        :disabled="serviceBool"
        class="btn btn-success"
        @click="Next"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script>
import { service } from "../api/service_api"; 
export default {
  name: "serviceComponent", 
  data() {
    return {
      service: service,
      serviceBool: true,
      serviceSelected: [],  
    };
  },
  computed: {
    serviceActive: function() {
      return this.service.filter(function(val) {
        return val.dependancies !== false && val.input !== true;
      });
    },
    serviceInput: function() {
      return this.service.filter(function(val) {
        return  val.input === true;
      });
    },
    serviceWatch: function() {
      return this.serviceSelected;
    },
    checkAnswerRadio() {
      return arr => (arr.length <= 6 ? arr : "");
    },
    checkAnswerSelect() {
      return arr => (arr.length > 6 ? arr : "");
    }
  },
  watch: {
    serviceWatch(newVal) {
      let filterVal = newVal
        .map(val => val.split("_").filter(e => (e === "yes" ? e : "")))
        .some(a => (a.length > 0 ? a : ""));
      this.senitizeData(filterVal);
      if (this.serviceSelected.length > 0) {
        this.serviceBool = false;
      }

      // window.console.log(serviceMap)
    }
  },
  methods: {
    senitizeData(val) {
      val
        ? this.service.map(a =>
            a.dependancies === false ? (a.dependancies = true) : ""
          )
        : this.service.map(a =>
            a.dependancies === true ? (a.dependancies = false) : ""
          );
    },
    Next() {
      const serviceMap = this.serviceSelected
        .filter(el => el != null)
        .map(val => Number(val.split("_")[0]));

      let serviceMax = this.service.filter(d => d.dependancies !== false)
        .map(val => Math.max(...val.answer.map(v => v.value)))
        .reduce((a, b) => a + b);
      let serviceMin = this.service.filter(d => d.dependancies !== false)
        .map(val => Math.min(...val.answer.map(v => v.value)))
        .reduce((a, b) => a + b);

      this.$emit("serviceNext", { serviceMap, serviceMax, serviceMin });
    }
  }, 
};
</script>
