<template>
    <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-3 border-bottom">
      <i v-show="currentRouteName!='Home'" class="back-button d-md-none fas fa-chevron-left" v-on:click="goBack();"></i>
      <router-link :to="{ name: 'Home'}" class="d-flex align-items-center col-md-3 mb-md-0 text-dark text-decoration-none">
        <img style="height:32px;" src="https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg"/>
      </router-link>
      <div class="col-md-2 text-end d-none d-md-block">
        <router-link class="btn btn-primary" :to="{ name: 'Manage'}">Manage Booking</router-link>
      </div>
  </header>
</template>

<script>
import router from '../router'
export default {
  name: 'Header',
  components:{},
  computed: {
    currentRouteName() {
        return this.$route.name;
    },
},
methods:{
      goBack(){
        if (this.currentRouteName == 'Manage'){
          this.$router.push({ name: 'Home' })
        }else{
          router.go(-1);
        }
      }
    }
}
</script>

<style scoped>
#nav a {
  font-weight: bold;
  color: #2c3e50;
  cursor: pointer;
}
#nav a.router-link-exact-active {
  color: #42b983!important;
}
header{
  position: relative;
}
.back-button{
  font-size: 1.4rem;
  position: absolute;
  left: 0;
}
</style>