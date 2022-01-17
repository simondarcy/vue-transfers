<template>
  <div class="input-group mb-3">
    <span class="input-group-text"><i class="far fa-calendar"></i></span>
      <input 
      type="date" 
      class="form-control" 
      :placeholder="placeholder" 
      :min="min" 
      v-model="dateString" 
      max="2222-12-12" 
      v-on:change="update"
      :required="required">
  </div>
</template>

<script>
export default {
  name: 'DateSelect',
  props: {
    'placeholder':{
      Type: String,
      default: "Select Date"
    },
    'pickupDate':{
      Type: String,
      default: null
    },
    'required':{
      Type: Boolean,
      default: true
    },
    'value':{
      Type: String,
      default: ""
    }
    },
  created() {},
  data(){
    return{
      dateString:this.value,
    }
  },
  computed: {
    min() {
      // Calculate the min possible date !todo, if no pickup, make sure min is todays date
      return (this.pickupDate !== null)?this.pickupDate:new Date().toISOString().split('T')[0]
    }
  },
  methods:{
    update(date){
      //On change pass new date to form 
      this.$emit('triggerChange', this.dateString)
    }
  }
}
</script>

<style scoped>
input[type="date"]::-webkit-calendar-picker-indicator {
    background: transparent;
    bottom: 0;
    color: transparent;
    cursor: pointer;
    height: auto;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    width: auto;
}
input[type='date']{
  color:#FFF;
}
input[type='date']:before {
  position:absolute;
  content: attr(placeholder);
  color:#6D757D;
}
input[type="date"]:focus,
input[type="date"]:valid{
  text-align: left;
  color:#000;
}
input[type="date"]:focus::before,
input[type="date"]:valid::before { display: none }
</style>


