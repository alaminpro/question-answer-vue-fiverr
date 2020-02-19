<template>
  <div>
    <form @submit.prevent="Next()">
      <ValidationObserver ref="form">
        <fieldset class="form-group" v-for="(fund, index) in FundraisingsActive" :key="index">
          <ValidationProvider
            name="'answer"
            :vid="'answer_' + fund.id"
            rules="required"
            v-slot="{ errors }"
          >
            <legend class="col-form-labelpt-0 radio_legend">
              {{ fund.question | capitalize }}
              <span class="text-danger prems_custom_error">
                {{
                errors[0]? ' *' : ''
                }}
              </span>
            </legend>
            <div
              class="form-check"
              v-for="(ans, ans_index) in checkAnswerRadio(fund.answer)"
              :key="ans_index"
            >
              <input
                class="form-check-input"
                type="radio"
                :name="'answer_' + fund.id"
                v-model="fundraisingSelected[fund.id]"
                :id="'answer_' + ans_index + '_' + fund.id"
                :value="ans.value + '_' + ans.title"
              />
              <label
                class="form-check-label radio-label"
                :for="'answer_' + ans_index + '_' + fund.id"
              >{{ ans.title | capitalize }}</label>
            </div>
            <div class="form-check" v-if="checkAnswerSelect(fund.answer)">
              <select
                class="custom-select"
                v-model="fundraisingSelected[fund.id]"
                :name="'answer_' + fund.id"
              >
                <option
                  v-for="(ans, ans_index) in checkAnswerSelect(fund.answer)"
                  :key="ans_index"
                  :value="ans.value + '_' + ans.title"
                >{{ ans.title | capitalize }}</option>
              </select>
            </div>
          </ValidationProvider>
        </fieldset>

        <div class="next_section">
          <button type="submit" class="btn btn-custom-bg">Next</button>
        </div>
      </ValidationObserver>
    </form>
  </div>
</template> 
<script>
import { fundraising } from "../api/fundraising_api";
import { ValidationProvider, ValidationObserver } from "vee-validate";
export default {

  name: "FundraisingComponent",
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      Fundraisings: fundraising,
      fundraisingSelected: []
    };
  },
  computed: {
    FundraisingsActive: function() {
      return this.Fundraisings.filter(function(val) {
        return val.dependancies !== false;
      });
    },
    FundraisingsWatch: function() {
      return this.fundraisingSelected;
    },
    checkAnswerRadio() {
      return arr => (arr.length <= 6 ? arr : "");
    },
    checkAnswerSelect() {
      return arr => (arr.length > 6 ? arr : "");
    }
  },
  watch: {
    FundraisingsWatch(newVal) {
      let filterVal = newVal
        .map(val => val.split("_").filter(e => (e === "yes" ? e : "")))
        .some(a => (a.length > 0 ? a : ""));
      this.senitizeData(filterVal);
    }
  },
  methods: {
    senitizeData(val) {
      val
        ? this.Fundraisings.map(a =>
            a.dependancies === false ? (a.dependancies = true) : ""
          )
        : this.Fundraisings.map(a =>
            a.dependancies === true ? (a.dependancies = false) : ""
          );
    },
    Next() {
      this.$refs.form.validate().then(result => {
        if (result) {
          const fundraisingMap = this.fundraisingSelected
            .filter(el => el != null)
            .map(val => Number(val.split("_")[0]));
          let fundMax = this.Fundraisings.filter(d => d.dependancies !== false)
            .map(val => Math.max(...val.answer.map(v => v.value)))
            .reduce((a, b) => a + b);
          let fundMin = this.Fundraisings.filter(d => d.dependancies !== false)
            .map(val => Math.min(...val.answer.map(v => v.value)))
            .reduce((a, b) => a + b);

          this.$emit("fundraisingNext", { fundraisingMap, fundMax, fundMin });
          return;
        }
      });
    }
  },
  created() {}
};
</script>
