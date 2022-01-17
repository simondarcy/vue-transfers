<template>
    <div class="card p-3"> 
      <h3>{{ transfer.info.VehicleSize }} {{ transfer.info.VehicleType }}</h3>
      <h6>{{ transfer.ticketType }} {{ transfer.serviceType }}</h6>
      <img class="card-img-top" width="100%" style="max-width:200px; margin:auto;" :src="transfer.image"/>
        <div class="card-body pt-0 px-0">
            <hr class="mt-2 mx-3">
            <div class="d-flex flex-row justify-content-between px-3">
                <div class="d-flex flex-column  text-center">
                  <span class="text-muted fw-bold">Pickup</span>
                  <small class="text-muted">{{ transfer.location.Pickup.Address.AddressLine }}</small>
                </div>
                <div class="d-flex flex-column text-center">
                    <span class="text-muted fw-bold">Dropoff</span>
                  <small class="text-muted">{{ transfer.location.Dropoff.Address.AddressLine }}</small>
                </div>
            </div>

            <div class="d-flex flex-row justify-content-between px-3 py-2 mid">

                <div class="d-flex flex-column">
                    <div class="d-flex flex-row">
                        <h6 class="additional-info">
                          <i class="fas fa-user"></i>
                          {{ transfer.info.pax }}
                        </h6>
                    </div>
                </div>
                <div class="d-flex flex-column" v-if="transfer.info.meet">
                    <div class="d-flex flex-row text-center">
                        <h6 class="additional-info">
                          <i class="fas fa-handshake"></i><br/>
                        </h6>
                    </div>
                </div>
                <div class="d-flex flex-column">
                    <div class="d-flex flex-row">
                      <h6 class="additional-info">
                        <i class="fas fa-suitcase"></i>
                        {{ transfer.info.bags }}
                        </h6>
                    </div>
                </div>

            </div> 

            <div class="text-center mid w-100">
              <h3 class="price-amount d-block w-100 text-center mb-0">&euro;{{transfer.price}}</h3>
              <span class="price-text d-block w-100 text-center py-2">{{ (this.$store.getters.searchData.oneWay)?"One Way":"Return" }}</span>
            </div>

            <div class="text-center mid w-100">
              <button class="btn btn-primary btn-lg btn-block w-100" type="button" @click="$emit('select-transfer', transfer)">Book now</button>
            </div>
              
        </div><!-- end .card-body -->
    </div><!-- end .card -->
</template>

<script>
export default {
  name: 'TransferCard',
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
</style>