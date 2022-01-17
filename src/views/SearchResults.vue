<template>
    <PageHeader title="Search Results"/>

    <div v-show="error" class="alert alert-danger" role="alert">Server Error: {{ error }}</div>

    <div class="row" >
      <div class="col-sm-12 mt-1 mb-2">
        <h6 class="text-error">Transfer options from {{ this.$store.getters.searchData.pickupName }} ({{  this.$store.getters.searchData.pickupIATA }}) to {{  this.$store.getters.searchData.dropOffAddress }}</h6>
      </div>
    </div>

    <div v-if="loading">
      <Spinner :title="'Searching...'"/>
    </div>

    <div class="row d-flex justify-content-center">
      <div :key="transfer.Reference" v-for="transfer in transfers" class="col-md-6 col-lg-4 mb-3">
        <TransferCard :transfer="transfer" @select-transfer="selectTransfer"/>
      </div> <!-- end tansfers loop -->
</div>

</template>

<script>
// @ is an alias to /src
import PageHeader from '@/components/PageHeader.vue'
import Spinner from '@/components/Spinner.vue'
import TransferCard from '@/components/TransferCard.vue'
import router from '../router'

export default {
  name: 'SearchResults',
  components: {
    PageHeader,
    Spinner,
    TransferCard
  },
  data () {
    return {
        loading:false,
        transfers: [],
        error:null
    }
  },
  async created() {
    //Pull data from deeplink (URL params)
     this.$store.commit('updateSearchData', this.$route.query);
    
     //Fetch transfer data
     this.transfers = await this.fetchTransfers();
  },
  methods: {
    selectTransfer(transfer) {
      //update selected vehicle data
      this.$store.commit('setSelectedTransfer', transfer);
      //move to details/payment screen
      router.push({ 
        name: "Details"
      });
    },
    async fetchTransfers() {
      let _url = this.$store.getters.availURL;

      let searchData = this.$store.getters.searchData;
      console.log("Search Data", this.$store.getters.searchData)

      let _data = {
                "@Target": this.$store.getters.target,
                "@PrimaryLangID": this.$store.getters.language,
                "POS": {
                  "Source": [{
                    "@ERSP_UserID": "MP",
                    "@ISOCurrency": this.$store.getters.currency,
                    "RequestorID": {
                      "@Type": "16",
                      "@ID": this.$store.getters.clientID,
                      "@ID_Context": "CARTRAWLER"
                    },
                    "@AirportCode": searchData.pickupIATA
                  }]
                },
                "@xmlns": "http://www.opentravel.org/OTA/2003/05",
                "@xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
                "@Version": "1.005",
                "Service": {
                  "Pickup": {
                    "Address": {
                      "LocationType": "Airport"
                    },
                    "AirportInfo": {
                      "Departure": {
                        "@CodeContext": "IATA",
                        "@LocationCode": searchData.pickupIATA
                      }
                    },
                    "@DateTime": `${searchData.pickupDate}T${searchData.pickupTime}`
                  },
                  "Dropoff": {
                    "Address": {
                      "AddressLine": searchData.dropOffAddress,
                      "@Latitude": searchData.dropOffLat,
                      "@Longitude": searchData.dropOffLng,
                      "LocationType": searchData.dropOffType
                    }
                  }
                },
                "Passengers": [{
                  "Category": "Adult",
                  "@Quantity": searchData.passengers
                }],
                "TPA_Extensions": {
                }
              };
              
              if(!searchData.oneWay){
                _data.TPA_Extensions['IncludeReturn'] = {'@PickupDateTime':`${searchData.returnDate}T${searchData.returnTime}`}
              }

              this.loading = true;
              const res = await fetch(_url, {
                method:'POST',
                headers:{
                },
                body:JSON.stringify(_data)
              })

              const data = await res.json();
              console.log("Data from server", data);
              this.loading = false;

              if(typeof data.Errors === 'object'){
                 this.error = unescape(data.Errors.Error['#text']);
                 return;
              }else if(typeof data['@ErrorMessage'] === 'string'){
                this.error = unescape(data['@ErrorMessage']);
                 return;
              }

              //Services will only be an array if there are mutiple service types available ie Shuttle, Rail etc. If not its an object.
              let services = Array.isArray(data.GroundServices)?data.GroundServices:[data.GroundServices];
              let cleanServices = [];
              //Loop through each returned transfer and clean the data
              services.forEach((service, index) => { 
                let serviceObj = {
                  service: Object.keys(service)[0],
                  reference: service.Reference,
                  serviceType: service.RateQualifier[0]['@Value'].replace("_", " ").replace('TRANSFER', 'TAXI'),
                  ticketType: service.RateQualifier[1]['@Value'].replace("_", " "),
                  price: Math.round(service.TotalCharge['@RateTotalAmount']),
                  image:service.Reference.TPA_Extensions.GroundAvail.Vehicle.PictureURL,
                  info:{}
                };

                //!todo delete serviceObj.reference.CompanyName and serviceObj.reference.TPA_Extensions, too much info and not required
                //!todo provider , info ie "Collection located at customer service desk, outside arrivals hall or your pick-up street address. Your voucher will outline the exact transfer details."
                //todo travel time 
                if(serviceObj.service === "Shuttle"){
                  console.log("Shuttle", service);
                  serviceObj.location = {
                    'Pickup':service.Shuttle.ServiceLocation[0],
                    'Dropoff':service.Shuttle.ServiceLocation[1]
                  };
                  serviceObj.info.disablity = service.Shuttle.Vehicle['@DisabilityInd'];
                  serviceObj.info.meet = false;
                  serviceObj.info.bags = service.Shuttle.Vehicle.VehicleSize['@MaxBaggageCapacity'];
                  serviceObj.info.pax = service.Shuttle.Vehicle.VehicleSize['@MaxPassengerCapacity'];
                  serviceObj.info.ServiceLevel = service.ServiceCharges.ChargePurpose["@Code"];
                  // serviceObj.info.VehicleSize = service.Shuttle.Vehicle.VehicleSize['#text'];
                  serviceObj.info.VehicleType = (service.Shuttle.Vehicle.Type == "Coach/Bus")?"Bus":service.Shuttle.Vehicle.Type['@Code'];
                }else if(serviceObj.service === "Service"){
                    console.log("Service", service);
                    serviceObj.location = service.Service.Location;
                    serviceObj.info.disablity = service.Service['@DisabilityVehicleInd'];
                    serviceObj.info.meet = service.Service['@MeetAndGreetInd'];
                    serviceObj.info.bags = service.Service['@MaximumBaggage'];
                    serviceObj.info.pax = service.Service['@MaximumPassengers'];
                    serviceObj.info.meet = service.Service['@MeetAndGreetInd'];
                    serviceObj.info.ServiceLevel = service.Service.ServiceLevel;
                    serviceObj.info.VehicleSize = service.Service.VehicleSize;
                    serviceObj.info.VehicleType = (service.Service.VehicleType  == "Coach/Bus")?"Bus":service.Service.VehicleType;      
                }

                cleanServices.push(serviceObj);
                cleanServices.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
              });
              return cleanServices;
            },//end fetchTransfers method
        }
}
</script>

<style scoped>
</style>


