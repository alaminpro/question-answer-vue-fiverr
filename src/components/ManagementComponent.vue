<template>
  <div>
    <form @submit.prevent="Next()">
      <ValidationObserver ref="form">
        <fieldset class="form-group" v-for="(management, index) in managementActive" :key="index">
          <ValidationProvider
            name="'answer"
            :vid="'answer_' + management.id"
            rules="required"
            v-slot="{ errors }"
          >
            <legend class="col-form-labelpt-0 radio_legend">
              <span v-html="management.question" class="d-flex"></span>
              <span class="text-danger prems_custom_error">
                {{
                errors[0]? ' *' : ''
                }}
              </span>
            </legend>
            <div
              class="form-check"
              v-for="(ans, ans_index) in checkAnswerRadio(management.answer)"
              :key="ans_index"
            >
              <input
                class="form-check-input"
                type="radio"
                :name="'answer_' + management.id"
                v-model="managementSelected[management.id]"
                :id="'answer_' + ans_index + '_' + management.id"
                :value="ans.value + '_' + ans.title"
              />
              <label
                class="form-check-label radio-label"
                :for="'answer_' + ans_index + '_' + management.id"
              >{{ ans.title | capitalize }}</label>
            </div>
            <div class="form-check" v-if="checkAnswerSelect(management.answer)">
              <select
                class="custom-select"
                v-model="managementSelected[management.id]"
                :name="'answer_' + management.id"
              >
                <option
                  v-for="(ans, ans_index) in checkAnswerSelect(management.answer)"
                  :key="ans_index"
                  :value="ans.value + '_' + ans.title"
                >{{ ans.title | capitalize }}</option>
              </select>
            </div>
          </ValidationProvider>
        </fieldset>
        <div>
          <fieldset class="form-group" v-for="(management, index) in managementInput" :key="index">
            <legend class="col-form-labelpt-0 radio_legend" v-html="management.question"></legend>
            <div class="form-check" v-for="(ans, ans_index) in management.answer" :key="ans_index">
              <div class="input-group">
                <label
                  class="form-check-label radio-label"
                  :for="'answer_' + ans_index + '_' + management.id"
                >{{ ans.title | capitalize}}</label>
                <input
                  type="number"
                  class="form-control ml-3 mt-1"
                  id="'answer_' + ans_index + '_' + management.id"
                />
              </div>
            </div>
          </fieldset>
        </div>
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
import { management } from "../api/management_api";
import { ValidationProvider, ValidationObserver } from "vee-validate";
export default {
  name: "managementComponent",
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      management: management,
      managementBool: true,
      managementSelected: [],
      error: false
    };
  },
  computed: {
    managementActive: function() {
      return this.management.filter(function(val) {
        return val.dependancies !== false && val.input !== true;
      });
    },
    managementInput: function() {
      return this.management.filter(function(val) {
        return val.input === true;
      });
    },
    managementWatch: function() {
      return this.managementSelected;
    },
    checkAnswerRadio() {
      return arr => (arr.length <= 6 ? arr : "");
    },
    checkAnswerSelect() {
      return arr => (arr.length > 6 ? arr : "");
    }
  },
  watch: {
    managementWatch(newVal) {
      let filterVal = newVal
        .map(val => val.split("_").filter(e => (e === "yes" ? e : "")))
        .some(a => (a.length > 0 ? a : ""));
      this.senitizeData(filterVal);
    }
  },
  methods: {
    senitizeData(val) {
      val
        ? this.management.map(a =>
            a.dependancies === false ? (a.dependancies = true) : ""
          )
        : this.management.map(a =>
            a.dependancies === true ? (a.dependancies = false) : ""
          );
    },
    Next() {
      this.error = true;
      this.$refs.form.validate().then(result => {
        if (result) {
          this.error = false;
          window.scrollTo(0, 0);
          const managementMap = this.managementSelected
            .filter(el => el != null)
            .map(val => Number(val.split("_")[0]));

          let managementMax = this.management
            .map(val => Math.max(...val.answer.map(v => v.value)))
            .reduce((a, b) => a + b);
          let managementMin = this.management
            .map(val => Math.min(...val.answer.map(v => v.value)))
            .reduce((a, b) => a + b);

          this.$emit("managementNext", {
            managementMap,
            managementMax,
            managementMin
          });
          return;
        }
      });
    }
  }
};
</script>
