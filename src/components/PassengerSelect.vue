<template>
    <div> 
        <span class="label me-2">Passengers:</span>       
        <span class="controller" @click="decrement">-</span>
        <span class="pax">{{ passengers }}</span>
        <span class="controller" @click="increment">+</span>
    </div>
</template>
<script>
export default {
  name: 'PassengerSelect',
  props:{
    'pax':{
      Type: Number,
      default: 1
    },
  },
  data(){
    return{
      passengers:this.pax,
    }
  },
  methods:{
    increment() {
      if(this.passengers==9)return;
      this.passengers++;
      this.$emit('triggerChange', this.passengers)   
    },
    decrement() {
      if(this.passengers==1)return;
      this.passengers--;
      this.$emit('triggerChange', this.passengers)
    },
  }
}
</script>
<style scoped>
span.controller, span.pax{
    touch-action: manipulation;
    user-select:none;
    -moz-user-select:none;
    -webkit-user-select:none;
    -webkit-touch-callout:none;
    -ms-user-select:none;
    display: inline-block;
    text-align: center;
    height: 30px;
    width: 30px;
    font-size: 20px;
    line-height: 30px;
    outline: none;
}
span.controller{
  background: #42b983;
  color:#FFF;
  border-radius: 50%;
  cursor: pointer;
}
span.controller:hover{
  background:#34495E;
}
span.controller:active{
    opacity: 0.8;
}
</style>


