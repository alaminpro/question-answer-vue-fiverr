<template>
  <div>
    <!-- Masthead -->
    <header class="masthead">
      <div class="container h-100">
        <div
          class="row h-100 align-items-center justify-content-center text-center"
        >
          <div class="col-lg-10 align-self-end">
            <h1 class="text-uppercase text-white font-weight-bold">
              WELCOME TO INVESTORS RATINGS LET US HELP YOU FIND YOUR INVESTOR
            </h1>
            <hr class="divider my-4" />
          </div>
          <div class="col-lg-8 align-self-baseline">
            <p class="text-white-75 font-weight-light mb-5">
              Meet our network of investors that will allow you to meet your
              ambition as well as support throught their experience in
              investment.
            </p>
            <a class="btn btn-primary btn-xl js-scroll-trigger" href="#about"
              >Find Out More</a
            >
          </div>
        </div>
      </div>
    </header>

    <!-- About Section -->
    <section class="page-section bg-light" id="about">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-12 text-center">
            <h2 class="title_brand_color mt-0">Who are we?</h2>
            <hr class="divider light my-4" />
            <p class="text-dark-50 mb-4" style="    line-height: 28px;">
              Welcome to our website. We represent a circle of private and
              institutional investors that have invested over 100 Million in
              different projects worldwide just last year.
              <br />
              <br />
              Our goal is to select all potential projects and match them with
              our investors. We will make a first assessment and if It meets one
              of investors criteria’s we will put in relation.
              <br />
              <br />
              Here below you will find our investor rating tool. This tool will
              rate your project based on a number of criteria’s that we have
              determined to be key decision’s points when an investor analyses a
              project.<br />
              This rating helps you understand the worthiness of your project in
              the eyes of an investor. <br />
              It is a way to have better understanding of where are the pain
              points and strong points of your project.
              <br />
              Not all investors have the same profile of investment, so this why
              we have broad range of questions.
              <br />
              Whatever the rating of your project is, high or low, it needs to
              be assessed by a person of our team as we have different profile
              of investors that might match your criteria’s.

              <br />
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="page-section bg-primary">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8 text-center">
            <h2 class="text-white mt-0">«Start Rating my project»</h2>
            <hr class="divider light my-4" />
            <router-link
              to="/rate-your-project"
              class="btn btn-light btn-xl js-scroll-trigger"
              active-class="is__active"
              >Get Started!
            </router-link>
          </div>
        </div>
      </div>
    </section>
 
    <!-- Contact Section -->
    <section class="page-section custom__home_contact" id="contact">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-8 text-center">
            <h2 class="mt-0 text-light">Let's Get In Touch!</h2>
            <hr class="divider   my-4" />
            <p class="text-light mb-5">
              Ready to start your next project with us? Give us a call or send
              us an email and we will get back to you as soon as possible!
            </p>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-4 ml-auto text-center mb-5 mb-lg-0">
            <i class="fa fa-phone fa-3x mb-3 text-light"></i>
            <div class="text-light">+1 (202) 555-0149</div>
          </div>
          <div class="col-lg-4 mr-auto text-center">
            <i class="fa fa-envelope fa-3x mb-3 text-light"></i>
            <!-- Make sure to change the email address in anchor text AND the link below! -->
            <a class="d-block text-light" href="mailto:contact@yourwebsite.com"
              >contact@yourwebsite.com</a
            >
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {};
  }
};
</script>
<style lang="scss">
.title_brand_color {
  color: #f4623a;
}
.custom__home_contact{
     background: #343a40;
     border-bottom: 1px solid #4e4e4e;
}
</style>
