<template>
    <div class="row">
        <div class="col-md-12">
            <p>Almost there, we just need some information</p>
        </div>
    </div>

    <form @submit="onSubmit">
      <div class="row">
        <div class="col-md-6 mb-3">  
          <input type="text" class="form-control" id="passenger-f-name" v-model="passengerFName" required placeholder="First name">
        </div>
        <div class="col-md-6 mb-3">  
          <input type="text" class="form-control" id="passenger-l-name" v-model="passengerLName" required placeholder="Last name">
        </div>
      </div>

      <div class="row">
        <div class="col-md-6 mb-3">  
          <input type="email" class="form-control" id="passenger-email" v-model="passengerEmail" required placeholder="Email address">
        </div>
        <div class="col-md-6 mb-3">  
          <input type="text" class="form-control" id="passenger-mobile-number" v-model="passengerPhone"  required placeholder="Phone Number">
        </div>
      </div>
      
      <div class="row">
        <div class="col-sm-12 mb-3">  
          <textarea class="form-control" id="special-requests" v-model="specialRequests" placeholder="Any Special Requests?"/>
          <small id="special-requests-help" class="form-text text-muted">Extra assistance? Potential delays? Unusual luggage?</small>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-12">  
          <input type="text" class="form-control" id="flight-number" v-model="flightNo" placeholder="Flight Number"/>
          <small id="flight-number-help" class="form-text text-muted">Your driver will monitor the status of your flight. Not applicable for rail bookings.</small>
        </div>
      </div>
    
      <hr/>

      <div class="row">
          <div class="col-md-12">
              <h3>Payment information</h3>    
              <p>The hard part... As this is only a demo, no payment will be made</p>
          </div>
      </div>

      <div class="row gy-3">
        <div class="col-md-12">
          <input type="text" class="form-control" name="credit-name" placeholder="Name on card" id="cc-name" v-model="ccName" required="">
          <div class="invalid-feedback">
            Name on card is required
          </div>
        </div>
        <div class="col-md-12">
          <input type="text" class="form-control" name="credit-number" id="cc-number" pattern="\d*" maxlength="16" v-model="ccNumber" placeholder="Credit card number" required="">
          <div class="invalid-feedback">
            Credit card number is required
          </div>
        </div>

        <div class="col-md-6">
          <input type="text" class="form-control" name="credit-expires" pattern="\d*" maxlength="4" id="cc-expiration" v-model="ccExpiry" placeholder="MMYY" required>
          <div class="invalid-feedback">
            Expiration date required
          </div>
        </div>

        <div class="col-md-6">
          <input type="text" class="form-control" pattern="\d*" maxlength="3" name="credit-cvc" id="cc-cvc" v-model="ccCVV" placeholder="CVV" required>
          <div class="invalid-feedback">
            Security code required
          </div>
        </div>
      </div>


      <div v-show="error" class="alert alert-danger mt-2 mb-3" role="alert">Server Error: {{ error }}</div>

      <div class="row">
        <div class="col-sm-12">
          <button class="mt-3 btn btn-primary btn-lg btn-block w-100" type="submit" :disabled="loading">Pay &euro;{{this.$store.getters.selectedTransfer.price}} Securly</button>
        </div>
      </div>

    </form> 
</template>

<script>
import router from '../router'
export default {
  name: 'DetailsForm',
  props: {
    title: String,
  },
  data(){
    return {
      loading:false,
      passengerFName:null,
      passengerLName:null,
      passengerEmail:null,
      passengerPhone:null,
      specialRequests:null,
      flightNo:null,
      ccName:null,
      ccNumber:null,
      ccExpiry:null,
      ccCVV:null,
      error:null
    }
  },
  methods:{
    async bookTransfer(){
      let _url = "https://ct-demos.com/gt-book.php?env=test";
      //let _url = "http://localhost:8888/cartrawler/gt-book.php?env=test";
      let _data = {
          "@Target": this.$store.getters.target,
          "@PrimaryLangID": this.$store.getters.language,
          "POS": {
            "Source": [{
              "@ERSP_UserID": "MP",
              "@ISOCurrency": this.$store.getters.currency,
              "RequestorID": {
                "@Type": "16",
                "@ID":this.$store.getters.clientID,
                "@ID_Context": "CARTRAWLER"
              },
              "@AirportCode": this.$store.getters.searchData.pickupIATA
            }]
          },
          "@xmlns": "http://www.opentravel.org/OTA/2003/05",
          "@xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
          "@Version": "1.005",
          "GroundReservation": {
            "Location": {
              "Pickup": {
                "Address": {
                  "AddressLine": this.$store.getters.selectedTransfer.location.Pickup.Address.AddressLine,
                  "@Latitude": this.$store.getters.selectedTransfer.location.Pickup.Address['@Latitude'],
                  "@Longitude": this.$store.getters.selectedTransfer.location.Pickup.Address['@Longitude'],
                  "LocationType": this.$store.getters.selectedTransfer.location.Pickup.Address.LocationType['#text']
                },
                "AirportInfo": {
                  "Departure": {
                    "@CodeContext": "IATA",
                    "@LocationCode": this.$store.getters.searchData.pickupIATA
                  }
                },
                "Airline": {
                  "@CodeContext": "IATA",
                  "@Code": "FR",
                  "@FlightNumber": "22"
                },
                "@DateTime": this.$store.getters.selectedTransfer.location.Pickup['@DateTime']
              },
              "Dropoff": {
                "Address": {
                  "AddressLine": this.$store.getters.selectedTransfer.location.Dropoff.Address.AddressLine,
                  "@Latitude": this.$store.getters.selectedTransfer.location.Dropoff.Address['@Latitude'],
                  "@Longitude": this.$store.getters.selectedTransfer.location.Dropoff.Address['@Longitude'],
                  "LocationType": this.$store.getters.selectedTransfer.location.Dropoff.Address.LocationType
                },
                "@DateTime": this.$store.getters.selectedTransfer.location.Dropoff['@DateTime']
              }
            },
            "Passenger": {
              "Primary": {
                "PersonName": {
                  "GivenName": this.passengerFName,
                  "Surname": this.passengerLName
                },
                "Telephone": {
                  "@PhoneTechType": "5",
                  "@PhoneNumber": this.passengerPhone
                },
                "Address": {
                  "CountryName": {
                    "@Code": this.$store.getters.residency
                  }
                },
                "Email": this.passengerEmail
              },
              "Additional": [{
                "AdditionalPersonType": {
                  "@Quantity": 1,
                  "@Code": "Teenager"
                }
              }]
            },
            "Service": {
              "@DisabilityVehicleInd": false
            },
            "Reference": this.$store.getters.selectedTransfer.reference
          },
          "Payments": {
            "Payment": {
              "PaymentCard": {
                "@CardCode": "VI",
                "@ExpireDate": this.ccExpiry,
                "CardHolderName":this.ccName,
                "CardNumber": {
                  "PlainText": this.ccNumber
                },
                "SeriesCode": {
                  "PlainText": this.ccCVV
                }
              }
            }
          },
          "TPA_Extensions": {}
        };

        var formData = new FormData();
        formData.append('msg', JSON.stringify(_data));

        const res = await fetch(_url, {
          method:'POST',
          headers:{},
          body:formData
        });

      const data = await res.json();
      console.log("Data from server", data);

      this.loading = false;

      if(typeof data.Errors === 'object'){
          this.error = unescape(data.Errors.Error['#text']);
          return;
      }

      //If successfully booked, rediret to the manage booking page
      if(typeof data.hasOwnProperty('Success') && data.hasOwnProperty('Reservation')){
        router.push({ 
          name: "Manage",
          query: { 
            email:data.Reservation.Passenger.Primary.Email, 
            reference:data.Reservation.Confirmation['@ID'],
            status:1
            }
        });

      }

      return data;
    },
   async onSubmit(e){
      e.preventDefault();
      this.loading = true;
      let booking = await this.bookTransfer();
    }
  }
}
</script>

<style scoped>
</style>

