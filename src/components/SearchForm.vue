<template>

  <div class="row">
    <form @submit="onSubmit" autocomplete="off">
      <input autocomplete="false" name="hidden" type="text" style="display:none;">

      <div class="row">
        <div class="col-md-4 mb-3">   
          <div class="btn-group w-100" role="group" aria-label="One Way Return toggle">
            <input type="radio" class="btn-check" name="onewayToggle" value="oneway" id="btnradiooneway" autocomplete="off" :checked="oneWay" @change="updateToggle">
            <label class="btn btn-outline-primary" for="btnradiooneway">One Way</label>
            <input type="radio" class="btn-check" name="onewayToggle" value="return" id="btnradioreturn" autocomplete="off" :checked="!oneWay" @change="updateToggle">
            <label class="btn btn-outline-primary" for="btnradioreturn">Return</label>
          </div>
        </div>

      </div>
    
      <!-- PICKUP/DROPOFF LOCATIONS -->
      <div class="row">
        <div class="col-md-6 mb-3">   
          <AirportAutoComplete @triggerChange="updatePickupLocation" :value="(pickupIATA=='')?'':`${pickupName} (${pickupIATA})`" />
        </div>
        <div class="col-md-6 mb-3">   
          <LocationsAutoComplete :title="'Drop off Location'" :constraint="constraint" :dropOffAddress="dropOffAddress" @triggerChange="updateDropoffLocation" />
        </div>
      </div>
      <!-- END PICKUP/DROPOFF LOCATIONS -->

      <!-- DATES/TIMES -->
      <div class="row">
        <div class="col-md-4">
          <DateSelect @triggerChange="updatePickupDate" :required="true" :placeholder="'Pickup Date'" :value="pickupDate"/>
        </div>
        <div class="col-md-2">
          <TimeSelect @triggerChange="updatePickupTime" :selectedTime="pickupTime" />
        </div>

        <div class="col-md-6" v-show="oneWay">
          <!-- <span @click="updateToggle" class="add-return text-decoration-underline text-center d-none d-md-block">Add Return?</span> -->
          <button @click="updateToggle" type="button" class="w-100 d-none d-md-block btn btn-outline-primary">Add Return?</button>
        </div>

        <div class="col-md-4" v-show="!oneWay">
          <DateSelect @triggerChange="updateReturnDate" :pickupDate="pickupDate" :placeholder="'Return Date'" :value="returnDate" :required="(!oneWay)" />
        </div>
        <div class="col-md-2" v-show="!oneWay">
          <TimeSelect @triggerChange="updateReturnTime" :selectedTime="returnTime" />
        </div>
      </div>
      <!-- END DATES/TIMES -->

      <!-- PASSENGERS -->
      <div class="row">
        <div class="col-md-12">
        <PassengerSelect @triggerChange="updatePassengers" :pax="passengers"/>
        </div>
       </div>
       <!-- END PASSENGERS -->

      <div class="row">

        <div class="col-md-3">
          <button class="mt-3 btn btn-primary btn-lg btn-block w-100" type="submit">Search</button>
        </div>
      </div>

  </form>

</div>

</template>

<script>
import AirportAutoComplete from '@/components/AirportAutoComplete.vue'
import LocationsAutoComplete from '@/components/LocationsAutoComplete.vue'
import TimeSelect from '@/components/TimeSelect.vue'
import DateSelect from '@/components/DateSelect.vue'
import PassengerSelect from '@/components/PassengerSelect.vue'
import router from '../router'
const locationTypes = {
  "1": "Airport",
  "3":"Vicinity",
  "8":"Vicinity"
}
export default {
  name: 'SearchForm',
  components:{
    AirportAutoComplete,
    LocationsAutoComplete,
    TimeSelect,
    DateSelect,
    PassengerSelect
  },
  methods:{
    updateToggle(result){
      this.oneWay = (result.target.value == "oneway")?true:false;
    },
    updatePickupLocation(airport){
      this.pickupName = airport.name;
      this.pickupIATA = airport.iata_code;
      this.constraint = airport._geoloc;
    },
    updateDropoffLocation(location){
      this.dropOffLat = location['@Lat'];
      this.dropOffLng = location['@Lng'];
      this.dropOffAddress = location['@Name'];
      this.dropOffType = locationTypes[location['@Type']];
    },
    updatePickupDate(date){
      this.pickupDate = date;
    },
    updatePickupTime(time){
      this.pickupTime = time;
    },
    updateReturnDate(date){
      this.returnDate = date;
      console.log(this)
    },
    updateReturnTime(time){
      this.returnTime = time;
    },
    updatePassengers(pax){
      this.passengers = pax;
    },
    onSubmit(e){
      e.preventDefault();
      //!todo some VALIDATION!

      let queryParams = { 
          pickupIATA:this.pickupIATA, 
          pickupName:this.pickupName, 
          dropOffLat:this.dropOffLat,
          dropOffLng:this.dropOffLng,
          dropOffAddress:this.dropOffAddress,
          dropOffType:this.dropOffType,
          pickupDate:this.pickupDate,
          pickupTime:this.pickupTime, 
          passengers:this.passengers
        };
        
        //If return journey, pass additional return info
        if(!this.oneWay){
          queryParams.returnDate = this.returnDate
          queryParams.returnTime = this.returnTime 
        }

        router.push({ 
          name: "SearchResults",
          query: queryParams
        });
    }
  },
  props: {
  },
  data() {
    //If data is in the store this to prepopulate the form
    let _data = this.$store.getters.searchData;
        //!todo, tidy below into single line
        return {
          pickupIATA:(_data == null)?"":_data.pickupIATA,
          pickupName:(_data == null)?"":_data.pickupName,
          dropOffLat:(_data == null)?"":_data.dropOffLat,
          dropOffLng:(_data == null)?"":_data.dropOffLng,
          dropOffAddress:(_data == null)?"":_data.dropOffAddress,
          dropOffType:(_data == null)?"":_data.dropOffType,
          pickupDate:(_data == null)?"":_data.pickupDate,
          returnDate:(_data == null)?"":_data.returnDate,
          pickupTime:(_data == null)?"10:00:00":_data.pickupTime, 
          returnTime:(_data == null || _data.returnTime == null)?"10:00:00":_data.returnTime,
          oneWay:(_data == null)?true:_data.oneWay,
          passengers:(_data == null)?1:_data.passengers,
          constraint:{}
        }
    },
}
</script>


<style scoped>
span.add-return{
  cursor:pointer;
  line-height:38px;
  color:#42b983;
}

</style>
<style>
.input-group-text{
  min-width: 40px;
}
</style>
