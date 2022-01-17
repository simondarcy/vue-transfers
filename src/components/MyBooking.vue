<template>
    <div class="row">
      <div class="col-md-12">
        <h4 class="d-flex justify-content-between align-items-center mb-3">
            <span class="text-primary">{{ booking.DetailedReservation.Confirmation['@ID']}}</span>
            <span class="badge rounded-pill" :class="(status=='CANCELLED'?'bg-danger':(status=='CONFIRMED'?'bg-success':'bg-warning'))">{{booking.TPA_Extensions.Reservation["@Status"]}}</span>
        </h4>
        <ul class="list-group mb-3">
          <li v-if="status=='CONFIRMED'" class="list-group-item text-center">
              <div>
              <div class="d-block text-center"><img :src="booking.TPA_Extensions.GT.Tickets.Ticket.VehicleService.PictureURL"/></div>
              <small class="text-bold">{{ booking.TPA_Extensions.GT.Tickets.Ticket.VehicleService["@VehicleKind"] }} / {{ booking.TPA_Extensions.GT.Tickets.Ticket.VehicleService["@ServiceLevel"] }} {{ booking.TPA_Extensions.GT.Tickets.Ticket.VehicleService["@ProductKind"] }}</small>
              </div>
          </li>

          <div v-else-if="status=='CANCELLED'"  class="alert alert-danger " role="alert">This booking has been cancelled</div>
          <div v-else class="alert alert-warning" role="alert">As we are still confirming this booking with {{ booking.TPA_Extensions.Vendor["@CompanyName"] }}, some data may not be available.</div>
          
          <li v-if="status=='CONFIRMED'" class="list-group-item d-flex justify-content-between lh-sm">
            <div>
              <h6 class="my-0">Pickup</h6>
              <small class="text-muted">{{ booking.TPA_Extensions.GT.Tickets.Ticket.Trips.Trip.Pickup["@Name"] }} on {{ booking.TPA_Extensions.GT.Tickets.Ticket.Trips.Trip.Pickup["@DateDisplay"] }} at {{ booking.TPA_Extensions.GT.Tickets.Ticket.Trips.Trip.Pickup["@Time"] }}</small>
            </div>
          </li>
          <li v-if="status=='CONFIRMED'" class="list-group-item d-flex justify-content-between lh-sm">
            <div>
              <h6 class="my-0">Dropoff</h6>
              <small class="text-muted">{{ booking.TPA_Extensions.GT.Tickets.Ticket.Trips.Trip.Dropoff["@Name"] }} on {{ booking.TPA_Extensions.GT.Tickets.Ticket.Trips.Trip.Dropoff["@DateDisplay"] }} at {{ booking.TPA_Extensions.GT.Tickets.Ticket.Trips.Trip.Dropoff["@Time"] }}</small>
            </div>
          </li>
          <li class="list-group-item d-flex justify-content-between lh-sm">
            <div>
              <h6 class="my-0">Your Contact Details</h6>
              <div class="d-block">Name: <small class="text-muted">{{ booking.DetailedReservation.Passenger.Primary.PersonName.GivenName }} {{ booking.DetailedReservation.Passenger.Primary.PersonName.Surname }}</small></div>
              <div class="d-block">Email: <small class="text-muted">{{ booking.DetailedReservation.Passenger.Primary.Email.toLowerCase() }}</small></div>
              <div class="d-block">Phone: <small class="text-muted">{{ booking.DetailedReservation.Passenger.Primary.Telephone['@PhoneNumber'] }}</small></div>
            </div>
          </li>
          <li class="list-group-item d-flex justify-content-between lh-sm">
            <div>
              <h6 class="my-0">Supplier Details</h6>
              <div class="d-block">Supplier: <small class="text-muted">{{ booking.TPA_Extensions.Vendor["@CompanyName"] }}</small></div>
              <div class="d-block">Phone: <a href="tel:{{ booking.TPA_Extensions.Reservation.CallCenterNumber }}"><small class="text-muted">{{ booking.TPA_Extensions.Reservation.CallCenterNumber }}</small></a></div>
            </div>
          </li>
          <li v-if="booking.DetailedReservation.GroundTotalCharge" class="list-group-item d-flex justify-content-between">
            <span>Total ({{ booking.DetailedReservation.GroundTotalCharge["@CurrencyCode"] }})</span>
            <strong>{{ booking.DetailedReservation.GroundTotalCharge["@RateTotalAmount"] }}</strong>
          </li>
          <li v-if="status!='CANCELLED'" class="list-group-item d-flex justify-content-between gap-3">
            <a :href="booking.TPA_Extensions.Reservation.VoucherURL" target="_blank" class="w-50 btn btn-primary" type="submit">View Voucher</a>    
            <button class="w-50 btn btn-danger" type="submit" @click="cancel">Cancel</button>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
export default {
  name: 'MyBooking',
  props: {
    booking: Object
  },
  data(){
      return {
          status:this.booking.TPA_Extensions.Reservation["@Status"]
      }
  },
  methods:{
      async cancel(){ 
          if( ! confirm("Do you really want to cancel this booking?") ){
            e.preventDefault(); // ! => don't want to do this
        } else {
            //Fetch
            let _url = this.$store.getters.cancelURL;
            let _data = {
            "@xmlns": "http://www.opentravel.org/OTA/2003/05",
            "@xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
            "@Version": "2.000",
            "@Target": this.$store.getters.target,
            "@PrimaryLangID": this.$store.getters.language,
            "POS": {
                "Source": {
                "@ISOCountry": "IE",
                "@ISOCurrency": this.$store.getters.currency,
                "RequestorID": {
                    "@Type": "16",
                    "@ID_Context": "CARTRAWLER",
                    "@ID": this.$store.getters.clientID
                }
                }
            },
            "Reservation": {
                "@CancelType": "Cancel",
                "UniqueID": {
                "@Type": "16",
                "@ID_Context": "CARTRAWLER",
                "@ID": this.booking.DetailedReservation.Confirmation['@ID']
                },
                "Verification": {
                "Email": this.booking.DetailedReservation.Passenger.Primary.Email
                }
            }
            }//end data
            this.loading = true;
            const res = await fetch(_url, {
            method:'POST',
            headers:{
            },
            body:JSON.stringify(_data)
            }).catch(function(error) {
                this.handleError(data['@ErrorMessage']);
            });

            const data = await res.json();
            console.log("Data from server", data);
            this.loading = false;
            //If data is returned but there is an error ie invalid booking 
            if(typeof data['@ErrorMessage'] === 'string' || typeof data.Errors === 'object'){
                console.log('Error: ', data)
                return;
            }else{
                alert("booking cancelled, have a nice day.")
            }
            this.booking.TPA_Extensions.Reservation["@Status"] = "Cancelled";
        }    
      }
  }
}
</script>

<style scoped>
</style>




      
        

    