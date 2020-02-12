<template>
  <div class="hello">
    <h1 :class="{'bg-red-500' : changeColor}" @click="ChangeCo">{{ msg }}</h1> 
    <input class="bg-gray- border border-gray-300 radius-sm w-1/3 text-gray"/>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
        changeColor: true
    }
  },
  methods: {
    ChangeCo(){
      this.changeColor = !this.changeColor
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
