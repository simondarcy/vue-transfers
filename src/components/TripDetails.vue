<template>
     <div class="row">
      <div class="col-md-12">
          <p>{{ transfer.info.VehicleSize }} {{ transfer.info.VehicleType }} from {{ transfer.location.Pickup.Address.AddressLine }} to {{ transfer.location.Dropoff.Address.AddressLine }} ({{ (this.$store.getters.searchData.oneWay)?"One Way":"Return" }})</p>
      </div>
    </div>
    <div> 
      <img  style="display:block; width:100%; max-width:200px; margin:auto;" :src="transfer.image"/>
      <h5>Total: &euro;{{transfer.price}}</h5>  
    </div>
    
</template>

<script>
export default {
  name: 'TripDetails',
  props: {
    transfer: Object,
  },
}
</script>

<style scoped>
.card {
  border-radius: 10px;
}
.card-body{
  padding-bottom: 0;
}
h3{
  color: rgb(0, 0, 0);
  font-size: 1.6rem;
  font-weight: 600;
}
h6{
  color: rgb(109, 109, 109);
  font-size: .85rem;
}
.additional-info{
  font-size: 1.5rem;
  text-align: center;
  color: #000;
}
.additional-info small{
  font-size: 1rem;
}
span.price-text{
  color: rgb(109, 109, 109);
  text-align: center;
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
}



@media (min-width: 780px) {
  h5{
    text-align: center;
    font-size: 1.5rem;
  }
}


</style>