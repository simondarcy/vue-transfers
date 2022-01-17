<template>
  <Header/>
  <router-view/>
</template>

<script>
import Header from '@/components/Header.vue'
export default {
  name: 'App',
  components:{
    Header
  }
}
</script>

<style>
/*TODO, move to external CSS file?*/
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
/* Buttons */
.btn-primary, .btn-check:checked+.btn-outline-primary, .btn-outline-primary:hover {
  background: #42b983!important;
  border-color: #42b983!important;
  color:#FFFFFF;
}
.btn-primary:hover{
  background: #34495E!important;
  border-color: #34495E!important;
}
.btn-outline-primary{
  color: #42b983;
  border-color: #42b983;
}
/* Styling for autcomplete dropdowns */
.autocomplete {
  position: relative;
  display: inline-block;
}
.autocomplete-items {
  list-style: none;
  padding: 0;
  position: absolute;
  border-bottom: none;
  border-top: none;
  z-index: 99;
  top: 100%;
  left: 0;
  right: 0;
}
.autocomplete-items li {
  padding: 10px;
  cursor: pointer;
  background-color: #fff;
  border-bottom: 1px solid #d4d4d4;
  border-left: 1px solid #d4d4d4;
  border-right: 1px solid #d4d4d4;
}
.autocomplete-items li:hover {
  background-color: #e9e9e9;
}
</style>
