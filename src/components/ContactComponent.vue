<template>
  <div>
    <form id="form" method="post" v-on:submit="SubmitForm" enctype="multipart/form-data">
      <div class="form-group" v-bind:class="{ 'has-warning': attemptSubmit && missingName }">
        <label class="form-control-label" for="name">
          Name
          <span class="text-danger">*</span>
        </label>
        <input
          id="name"
          name="name"
          class="form-control form-control-warning"
          type="text"
          v-model="data.name"
        />
        <div
          class="form-control-feedback"
          v-if="attemptSubmit && missingName"
        >This name field is required!</div>
      </div>

      <!-- /form-group -->
      <div class="form-group" v-bind:class="{ 'has-warning': attemptSubmit && missingRole }">
        <label class="form-control-label" for="role">
          Role
          <span class="text-danger">*</span>
        </label>
        <input
          id="role"
          name="role"
          class="form-control form-control-warning"
          type="text"
          v-model="data.role"
        />
        <div
          class="form-control-feedback"
          v-if="attemptSubmit && missingRole"
        >This role field is required!</div>
      </div>

      <!-- /form-group -->
      <div class="form-group" v-bind:class="{ 'has-warning': attemptSubmit && missingPhone }">
        <label class="form-control-label" for="phone">
          Phone number
          <span class="text-danger">*</span>
        </label>
        <VuePhoneNumberInput v-model="data.phone" />
        <div
          class="form-control-feedback"
          v-if="attemptSubmit && missingPhone"
        >This phone number field is required!</div>
      </div>
      <!-- /form-group -->
      <div class="form-group" v-bind:class="{ 'has-warning': attemptSubmit && missingEmail }">
        <label class="form-control-label" for="email">
          Email
          <span class="text-danger">*</span>
        </label>
        <input
          id="email"
          name="email"
          class="form-control form-control-warning"
          type="text"
          v-model="data.email"
        />
        <div
          class="form-control-feedback"
          v-if="attemptSubmit && missingEmail"
        >You must enter a valid email!</div>
      </div>

      <!-- /form-group -->
      <div class="form-group" v-bind:class="{ 'has-warning': attemptSubmit && missingCompany }">
        <label class="form-control-label" for="company">
          Company name
          <span class="text-danger">*</span>
        </label>
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
        >This company came field is required!</div>
      </div>
      <!-- /form-group -->
      <div class="form-group">
        <label class="form-control-label" for="url">Company website</label>
        <input id="url" name="url" class="form-control" type="url" v-model="data.company_url" />
      </div>
      <!-- /form-group -->
      <div class="form-group">
        <label class="form-control-label" for="message">Message</label>
        <textarea
          v-model="data.message"
          class="form-control"
          name="message"
          id="message"
          cols="30"
          rows="5"
          placeholder="Write a Message"
        ></textarea>
      </div>
      <!-- /form-group -->
      <div class="d-flex justify-content-between align-items-center">
        <div class="d-flex">
          <button type="submit" class="btn btn-primary" v-if="!success && !error">
            Send message
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
          >Go Back</button>
          <div class="alert alert-success m-0 ml-5" v-if="success">Email send successfull!</div>
          <div class="alert alert-danger m-0 ml-5" v-if="error">Something went wrong!</div>
        </div>
        <div class="d-flex">
          <div class="image-upload">
            <label for="file-input">
              <img src="../assets/img/upload.png" />
            </label>
            <input
              id="file-input"
              ref="file"
              type="file"
              @change="onFileChange"
              accept="image/jpeg, application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            />
          </div>
          <div class="text__upload">
            <h3 class="m-0">Upload business model</h3>
            <p class="m-0">5MB Max- PDF, Doc, Docx, JPG</p>
          </div>
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
  props: ["total", "storeQuestions", "rating"],
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
        message: "",
        rating: this.rating,
       
      },
      attemptSubmit: false,
       file: null, 
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
    }
  },
  methods: {
    isNumeric: function(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    },
    startAgain: function() {
      this.$emit("startAgain");
    },

     SubmitForm: async function(event) {
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

        // window.console.log(data) 
       await Axios.post(config.MAIN_URL + "/upload", this.file, {})  
        Axios.post(config.MAIN_URL + "/send-message", this.data ).then(res => {
          this.loader = false;
          if (res.data.code == "EAUTH") this.error = true;
          else this.success = true;
        }); 

      
      }
    },
    loadPage() {
      return window.location.reload();
    },
    onFileChange() {
      var data = new FormData();
      var file = this.$refs.file.files[0];
      if (file.size > 5000000) {
        alert("File too big (> 5MB)");
        return;
      } 
      data.append("file", file);
      this.file = data; 
    }
  }
};
</script>

<style lang="css">
.has-warning {
  color: red;
}
.image-upload > input {
  display: none;
}

.image-upload img {
  width: 50px;
  cursor: pointer;
  margin-right: 5px;
}
.text__upload h3 {
  font-size: 20px;
}
.text__upload p {
  font-size: 14px;
}
</style>
