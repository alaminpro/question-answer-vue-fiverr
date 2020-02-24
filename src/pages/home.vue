<template>
  <div>
    <!-- Masthead -->
    <header class="masthead">
      <div class="container h-100">
        <div class="row h-100 align-items-center justify-content-center text-center">
          <div class="col-lg-10 align-self-end">
            <h1
              class="text-uppercase text-white font-weight-bold"
              style="font-size: 42px;"
            >WELCOME TO INVESTORS RATING</h1>
            <h2 class="text-uppercase text-white pt-3">LET US HELP YOU FIND YOUR INVESTOR</h2>
            <hr class="divider my-4" />
          </div>
          <div class="col-lg-8 align-self-baseline">
            <p
              class="text-white-75 font-weight-light mb-5"
            >Meet our network of investors and find your perfect match</p>
            <button type="button" @click="aboutSection" class="btn btn-primary btn-xl js-scroll-trigger"  >Find Out More</button>
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
              <br />Our goal is to select all potential projects and match them with
              our investors. We will make a first assessment and if It meets one
              of investors criteria’s we will put in relation.
              <br />
              <br />Here below you will find our investor rating tool. This tool will
              rate your project based on a number of criteria’s that we have
              determined to be key decision’s points when an investor analyses a
              project.
              <br />This rating helps you understand the worthiness of your project in
              the eyes of an investor.
              <br />It is a way to have better understanding of where are the pain
              points and strong points of your project.
              <br />Not all investors have the same profile of investment, so this why
              we have broad range of questions.
              <br />Whatever the rating of your project is, high or low, it needs to
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
            <h2 class="text-white mt-0">RATE YOUR PROJECT </h2>
            <hr class="divider light my-4" />
            <router-link
              to="/rate-your-project"
              class="btn btn-light btn-xl js-scroll-trigger mb-5"
              active-class="is__active"
            >Get Started!</router-link>
            <div class="row">
              <div class="col-lg-4">
                <div class="project__rate_main mb-3">
                  <div class="image">
                    <img
                      src="../assets/img/pen.png"
                      alt="Fill in the form 5 min "
                      class="img-fluid"
                    />
                  </div>
                  <p class="title">Fill in the form 5 min</p>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="project__rate_main mb-3">
                  <div class="image">
                    <img
                      src="../assets/img/graph-analysis.png"
                      alt="Our team will review your project 
"
                      class="img-fluid"
                    />
                  </div>
                  <p class="title">Our team will review your project</p>
                </div>
              </div>
              <div class="col-lg-4">
                <div class="project__rate_main mb-3">
                  <div class="image">
                    <img src="../assets/img/meeting.png" alt="Meet our investors" class="img-fluid" />
                  </div>
                  <p class="title">Meet our investors</p>
                </div>
              </div>
            </div>
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
            <hr class="divider my-4" />
            <p class="text-light mb-5">
               You have a question? Send us an email and  we will get back to you as soon as possible!
            </p>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-4 ml-auto text-center mb-5 mb-lg-0">
            <i class="fa fa-phone fa-3x mb-3 text-light"></i>
            <div class="text-light">contact@investors-rating.com</div>
          </div>
          <div class="col-lg-4 mr-auto text-center">
            <i class="fa fa-envelope fa-3x mb-3 text-light"></i>
            <!-- Make sure to change the email address in anchor text AND the link below! -->
            <a
              class="d-block text-light"
              href="mailto:contact@yourwebsite.com"
            >contact@investors-rating.com</a>
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
  },
  methods: {
  aboutSection(){
     window.scrollTo(0, 650); 
  }
  },
  mounted() {
    document.title = "Home Page";
  }
};
</script>
<style lang="scss">
.title_brand_color {
  color: #f4623a;
}
.custom__home_contact {
  background: #343a40;
  border-bottom: 1px solid #4e4e4e;
}
.project__rate_main { 
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 150px; 

  .image {
    img {
      width: 70px;
    }
  }
  .title {
    font-size: 16px;
    margin: 0;
    padding: 0;
    color: #000;
    margin-top: 15px
  }
}
</style>
