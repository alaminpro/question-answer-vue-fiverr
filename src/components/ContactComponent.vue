<template>
  <div>
    <form id="form" method="post" v-on:submit="SubmitForm">
      <div
        class="form-group"
        v-bind:class="{ 'has-warning': attemptSubmit && missingName }"
      >
        <label class="form-control-label" for="name"
          >Name <span class="text-danger">*</span></label
        >
        <input
          id="name"
          name="name"
          class="form-control form-control-warning"
          type="text"
          v-model="data.name"
        />
        <div class="form-control-feedback" v-if="attemptSubmit && missingName">
          This Name field is required!
        </div>
      </div>
      
      <!-- /form-group -->
      <div
        class="form-group"
        v-bind:class="{ 'has-warning': attemptSubmit && missingRole }"
      >
        <label class="form-control-label" for="role"
          >Role <span class="text-danger">*</span></label
        >
        <input
          id="role"
          name="role"
          class="form-control form-control-warning"
          type="text"
          v-model="data.role"
        />
        <div class="form-control-feedback" v-if="attemptSubmit && missingRole">
          This Role field is required!
        </div>
      </div>

      <!-- /form-group -->
      <div
        class="form-group"
        v-bind:class="{ 'has-warning': attemptSubmit && missingPhone }"
      >
        <label class="form-control-label" for="phone"
          >Phone Number <span class="text-danger">*</span></label
        >
        <VuePhoneNumberInput v-model="data.phone" />
        <div class="form-control-feedback" v-if="attemptSubmit && missingPhone">
          This Phone Number field is required!
        </div>
      </div>
      <!-- /form-group -->
      <div
        class="form-group"
        v-bind:class="{ 'has-warning': attemptSubmit && missingEmail }"
      >
        <label class="form-control-label" for="email"
          >Email <span class="text-danger">*</span></label
        >
        <input
          id="email"
          name="email"
          class="form-control form-control-warning"
          type="text"
          v-model="data.email"
        />
        <div class="form-control-feedback" v-if="attemptSubmit && missingEmail">
          You must enter a valid email!
        </div>
      </div> 
     
      <!-- /form-group -->
      <div
        class="form-group"
        v-bind:class="{ 'has-warning': attemptSubmit && missingCompany }"
      >
        <label class="form-control-label" for="company"
          >Company Name <span class="text-danger">*</span></label
        >
        <input
          id="company"
          name="company"
          class="form-control form-control-warning"
          type="text"
          v-model="data.company"
        />
        <div
          class="form-control-feedback"
          v-if="attemptSubmit && missingCompany"
        >
          This Company Name field is required!
        </div>
      </div>
       <!-- /form-group -->
      <div
        class="form-group"
      >
        <label class="form-control-label" for="url"
          >Company Website </label
        >
        <input
          id="url"
          name="url"
          class="form-control"
          type="url"
          v-model="data.company_url"
        /> 
      </div> 
      <!-- /form-group -->
      <div class="form-group">
        <label class="form-control-label" for="message">Message</label>
          <textarea v-model="data.message"  class="form-control" name="message" id="message" cols="30" rows="5" placeholder="Write a Message"></textarea>
      </div>
      <!-- /form-group -->
      <div class="d-flex">
        <button type="submit" class="btn btn-primary" v-if="!success && !error">
          Send Message
          <img
            v-if="loader"
            src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
          />
        </button>
        <button
          type="button"
          @click="loadPage"
          class="btn btn-success"
          v-if="success || error"
        >
          Go Back
        </button>
        <div class="alert alert-success m-0 ml-5" v-if="success">
          Email Send Successfull!
        </div>
        <div class="alert alert-danger m-0 ml-5" v-if="error">
          Something went wrong!
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import VuePhoneNumberInput from "vue-phone-number-input";
import Axios from "axios";
import config from "../../config";
import "vue-phone-number-input/dist/vue-phone-number-input.css";
export default {
  name: "ContactComponent",
  components: {
    VuePhoneNumberInput
  },
  props: ["total", "storeQuestions"],
  data() {
    return {
      active: false,
      success: false,
      error: false,
      loader: false,
      data: {
        name: "",
        role: "",
        phone: "",
        email: "",
        company_url: "",
        company: "", 
        message: ''
      },
      attemptSubmit: false
    };
  },
  computed: {
    missingName: function() {
      return this.data.name === "";
    },
    missingRole: function() {
      return this.data.role === "";
    },
    missingCompany: function() {
      return this.data.company === "";
    },
    missingPhone: function() {
      return this.data.phone === "";
    },
    missingEmail: function() {
      var reg = /(.+)@(.+){2,}\.(.+){2,}/;
      return this.data.email === "" || reg.test(this.data.email) === false;
    }, 
  },
  methods: {
    isNumeric: function(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    },
    startAgain: function() {
      this.$emit("startAgain");
    },
   
    SubmitForm: function(event) {
      event.preventDefault();
      this.attemptSubmit = true;
      if (
        !this.missingName &&
        !this.missingRole &&
        !this.missingPhone &&
        !this.missingEmail &&
        !this.missingCompany  
      ) {
        this.loader = true;
        Axios.post(config.MAIN_URL + "/send-message", this.data).then(res => {
          this.loader = false;
          if (res.data.code == "EAUTH") this.error = true;
          else this.success = true;
        });
      }
    },
    loadPage() {
      return window.location.reload();
    }
  }
};
</script>

<style lang="css">
.has-warning {
  color: red;
}
</style>
