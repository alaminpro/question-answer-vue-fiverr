<template>
  <div>
    <fieldset
      class="form-group"
      v-for="(management, index) in managementActive"
      :key="index"
    >
      <legend
        class="col-form-labelpt-0 radio_legend"
        v-html="management.question"
      ></legend>
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
        >
          {{ ans.title }}
        </label>
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
          >
            {{ ans.title }}</option
          >
        </select>
      </div>
    </fieldset>
    <div>
      <fieldset
      class="form-group"
      v-for="(management, index) in managementInput"
      :key="index"
    >
      <legend
        class="col-form-labelpt-0 radio_legend"
        v-html="management.question"
      ></legend>
      <div
        class="form-check"
        v-for="(ans, ans_index) in management.answer"
        :key="ans_index"
      > 
        <div class="input-group">
          <label
          class="form-check-label radio-label"
          :for="'answer_' + ans_index + '_' + management.id"
        >
          {{ ans.title }}
        </label>
        <input type="number" class="form-control ml-3 mt-1" id="'answer_' + ans_index + '_' + management.id">
        </div>
      </div>
    </fieldset>
    </div> 
    <div class="next_section mt-5">
      <button
        type="button"
        :disabled="managementBool"
        class="btn btn-success"
        @click="Next"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script>
import { management } from "../api/management_api"; 
export default {
  name: "managementComponent", 
  data() {
    return {
      management: management,
      managementBool: true,
      managementSelected: [], 
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
        return  val.input === true;
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
      if (this.managementSelected.length > 0) {
        this.managementBool = false;
      }

      // window.console.log(managementMap)
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
      const managementMap = this.managementSelected
        .filter(el => el != null)
        .map(val => Number(val.split("_")[0]));

      let managementMax = this.management.map(val => Math.max(...val.answer.map(v => v.value)))
        .reduce((a, b) => a + b);
      let managementMin = this.management.map(val => Math.min(...val.answer.map(v => v.value)))
        .reduce((a, b) => a + b);

      this.$emit("managementNext", { managementMap, managementMax, managementMin });
    }
  }, 
};
</script>
