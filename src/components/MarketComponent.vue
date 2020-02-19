<template>
  <div>
    <form @submit.prevent="Next()">
      <ValidationObserver ref="form">
        <fieldset class="form-group" v-for="(market, index) in marketsActive" :key="index">
          <ValidationProvider
            name="'answer"
            :vid="'answer_' + market.id"
            rules="required"
            v-slot="{ errors }"
          >
            <legend class="col-form-labelpt-0 radio_legend">
              {{ market.question }}
              <span class="text-danger prems_custom_error">
                {{
                errors[0]? ' *' : ''
                }}
              </span>
            </legend>
            <div
              class="form-check"
              v-for="(ans, ans_index) in checkAnswerRadio(market.answer)"
              :key="ans_index"
            >
              <input
                class="form-check-input"
                type="radio"
                :name="'answer_' + market.id"
                v-model="marketSelected[market.id]"
                :id="'answer_' + ans_index + '_' + market.id"
                :value="ans.value + '_' + ans.title"
              />
              <label
                class="form-check-label radio-label"
                :for="'answer_' + ans_index + '_' + market.id"
              >{{ ans.title }}</label>
            </div>
            <div class="form-check" v-if="checkAnswerSelect(market.answer)">
              <select
                class="custom-select"
                v-model="marketSelected[market.id]"
                :name="'answer_' + market.id"
              >
                <option
                  v-for="(ans, ans_index) in checkAnswerSelect(market.answer)"
                  :key="ans_index"
                  :value="ans.value + '_' + ans.title"
                >{{ ans.title }}</option>
              </select>
            </div>
            <div class="form-check" v-if="checkAnswerSelectMulti(market.answer)">
              <Select2MultipleControl v-model="selectMultiple" :options="selectMultiOption" />
            </div>
          </ValidationProvider>
        </fieldset>
        <div class="next_section mt-5">
          <button type="submit" class="btn btn-success">Next</button>
        </div>
      </ValidationObserver>
    </form>
  </div>
</template>

<script>
import { market } from "../api/market_api";
import Select2MultipleControl from "v-select2-multiple-component";
import { ValidationProvider, ValidationObserver } from "vee-validate";
export default {
  name: "marketComponent",
  components: {
    Select2MultipleControl,
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      markets: market,
      marketBool: true,
      marketSelected: [],
      selectMultiple: [],
      selectMultiOption: []
    };
  },
  computed: {
    marketsActive: function() {
      return this.markets.filter(function(val) {
        return val.dependancies !== false;
      });
    },
    marketsWatch: function() {
      return this.marketSelected;
    },
    checkAnswerRadio() {
      return arr => (arr.length <= 6 ? arr : "");
    },
    checkAnswerSelect() {
      return arr => (arr.length > 6 && arr.length <= 15 ? arr : "");
    },
    checkAnswerSelectMulti() {
      return arr => (arr.length >= 16 ? arr : "");
    }
  },
  watch: {
    marketsWatch(newVal) {
      let filterVal = newVal
        .map(val => val.split("_").filter(e => (e === "yes" ? e : "")))
        .some(a => (a.length > 0 ? a : ""));
      this.senitizeData(filterVal);
   
    }
  },
  methods: {
    senitizeData(val) {
      val
        ? this.markets.map(a =>
            a.dependancies === false ? (a.dependancies = true) : ""
          )
        : this.markets.map(a =>
            a.dependancies === true ? (a.dependancies = false) : ""
          );
    },
    Next() {
      this.$refs.form.validate().then(result => {
        if (result) {
          const marketMapEdit = this.marketSelected
            .filter(el => el != null)
            .map(val => Number(val.split("_")[0]));
          const multipleSelect = this.selectMultiple
            .filter(el => el != null)
            .map(val => Number(val.split("__")[0]));
          let marketMap = marketMapEdit.concat(multipleSelect);

          let marketMax = this.markets
            .map(val => Math.max(...val.answer.map(v => v.value)))
            .reduce((a, b) => a + b);
          let marketMin = this.markets
            .map(val => Math.min(...val.answer.map(v => v.value)))
            .reduce((a, b) => a + b);

          this.$emit("marketNext", { marketMap, marketMax, marketMin });
          return;
        }
      });
    }
  },
  created() {
    const marketAnswer = this.markets
      .filter(val => (val.answer.length > 16 ? val : ""))
      .map(v => v.answer);
    marketAnswer
      .map(ans =>
        ans.map((a, i) => ({ id: a.value + "__" + i, text: a.title }))
      )
      .map(option => (this.selectMultiOption = option));
  }
};
</script>
