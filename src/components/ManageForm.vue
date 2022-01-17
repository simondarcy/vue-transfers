
<template>
    <div class="row">
      <p>Please fill in your Email Address and Booking Number</p>
      <form @submit="onSubmit" autocomplete="off">
        
        <div class="input-group mb-3">
          <span class="input-group-text"><i class="fas fa-envelope"></i></span>
          <input
          type="email"
          class="form-control"
          placeholder="Email Address"
          v-model="email"
          required>
        </div>

        <div class="input-group">
          <span class="input-group-text"><i class="fas fa-plane"></i></span>
          <input
          type="text"
          class="form-control"
          placeholder="Booking Number (IE123456789)"
          v-model="reference"
          required>
        </div>

        
        <div class="col-md-12">
          <button class="mt-3 btn btn-primary btn-lg btn-block w-100" type="submit">Find Booking</button>
        </div>

      </form>
    </div> <!-- end row -->
</template>


<script>
import router from '../router'
export default {
  name: 'ManageForm',
  props: {},
  created() {},
  data(){
    return{
      email:null,
      reference:null
    }
  },
  computed: {},
  methods:{
    onSubmit(e){
      e.preventDefault();
      //basically reload this page with the inputted query params
      router.push({ 
          name: "Manage",
          query: { 
            email:this.email, 
            reference:this.reference
            }
      });
    },
  }
}
</script>