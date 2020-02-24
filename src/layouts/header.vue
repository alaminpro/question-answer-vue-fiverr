<template>
  <nav
    class="navbar navbar-expand-lg navbar-light fixed-top py-3"
    :class="[getRespondClass, getTypeClass]"
    id="mainNav"
    v-on:scroll.passive="handleScroll"
  >
    <div class="container">
      <router-link to="/" class="navbar-brand" active-class="is__active"
        >INVESTORS RATING
</router-link
      >
      <button
        class="navbar-toggler navbar-toggler-right"
        type="button"
        data-toggle="collapse"
        data-target="#navbarResponsive"
        aria-controls="navbarResponsive"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarResponsive">
        <ul
          class="navbar-nav ml-auto my-2 my-lg-0"
          :class="!home ? 'nav_otherpage__style' : ''"
        >
          <li class="nav-item">
            <router-link to="/" class="nav-link" active-class="is__active" exact
              >Home</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              to="/about-us"
              class="nav-link"
              active-class="is__active"
              >About us</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              to="/rate-your-project"
              class="nav-link"
              active-class="is__active"
              >Rate your project
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              to="/investors-criteria"
              class="nav-link"
              active-class="is__active"
              >Investors criteria’s</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              to="/contact-us"
              class="nav-link"
              active-class="is__active"
              >Contact us</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      isActive: false,
      home: true
    };
  },
  computed: {
    getRespondClass() {
      return this.isActive ? "navbar-scrolled" : "";
    },
    getTypeClass() {
      return !this.home ? "custom__style" : "";
    }
  },
  watch: {
    $route(to) {
      if (to.name == "home") {
        this.home = true;
      } else {
        this.home = false;
      } 
    }
  },
  methods: {
    handleScroll() {
      if (window.scrollY > 100) {
        this.isActive = true;
      } else {
        this.isActive = false;
      }
    }
  },
  created() {
    if (this.$route.name == "home") {
      this.home = true;
    } else {
      this.home = false;
    }
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>
<style lang="scss">
.custom__style {
  background: #f4623a !important;
}
.nav-item .nav-link.router-link-exact-active.is__active {
  color: #fff !important;
}

.custom__style .nav_otherpage__style .nav-item .nav-link.router-link-exact-active.is__active {
  color: #fff !important;
}
.navbar-scrolled .nav-item .nav-link.router-link-exact-active.is__active {
  color: #f4623a !important;
}
.navbar-scrolled.custom__style .navbar-brand {
  color: rgba(255, 255, 255, 0.78) !important;
}
.navbar-scrolled.custom__style .nav_otherpage__style .nav-item .nav-link {
  color: rgba(255, 255, 255, 0.78) !important;
}
 
</style>
