<template>
  <div>
    <form @submit.prevent="Next()">
      <ValidationObserver ref="form">
        <fieldset class="form-group" v-for="(service, index) in serviceActive" :key="index">
          <ValidationProvider
            name="'answer"
            :vid="'answer_' + service.id"
            rules="required"
            v-slot="{ errors }"
          >
            <legend class="col-form-labelpt-0 radio_legend">
              <span v-html="service.question" class="d-flex"></span>
              <span class="text-danger prems_custom_error">
                {{
                errors[0]? ' *' : ''
                }}
              </span>
            </legend>
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
              >{{ ans.title | capitalize }}</label>
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
                >{{ ans.title | capitalize }}</option>
              </select>
            </div>
          </ValidationProvider>
        </fieldset>
        <div></div>
        <div class="next_section mt-5">
          <button type="submit" class="btn btn-custom-bg">Next</button>
          <span
            v-if="error"
            class="pl-3 text-danger"
          >You have not selected some input. please select!</span>
        </div>
      </ValidationObserver>
    </form>
  </div>
</template>

<script>
import { service } from "../api/service_api";
import { ValidationProvider, ValidationObserver } from "vee-validate";
export default {
  name: "serviceComponent",
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      service: service,
      serviceBool: true,
      serviceSelected: [],
      error: false
    };
  },
  computed: {
    serviceActive: function() {
      return this.service.filter(function(val) {
        return (
          val.dependancies !== false &&
          val.input !== true &&
          val.dependbeing !== false
        );
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
      let filterbeing = newVal
        .map(val => val.split("_").filter(e => (e === "being built" ? e : "")))
        .some(a => (a.length > 0 ? a : ""));
      this.senitizeData(filterVal);
      this.senitizeDataBeing(filterbeing);
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
    senitizeDataBeing(val) {
      val
        ? this.service.map(a =>
            a.dependbeing === false ? (a.dependbeing = true) : ""
          )
        : this.service.map(a =>
            a.dependbeing === true ? (a.dependbeing = false) : ""
          );
    },
    Next() {
      this.error = true;
      this.$refs.form.validate().then(result => {
        if (result) {
          this.error = false;
          window.scrollTo(0, 0);
          const serviceMap = this.serviceSelected
            .filter(el => el != null)
            .map(val => Number(val.split("_")[0]));

          let serviceMax = this.service
            .filter(d => d.dependancies !== false || d.dependbeing !== false)
            .map(val => Math.max(...val.answer.map(v => v.value)))
            .reduce((a, b) => a + b);
          let serviceMin = this.service
            .filter(d => d.dependancies !== false || d.dependbeing !== false)
            .map(val => Math.min(...val.answer.map(v => v.value)))
            .reduce((a, b) => a + b);

          this.$emit("serviceNext", { serviceMap, serviceMax, serviceMin });
          return;
        }
      });
    }
  }
};
</script>
