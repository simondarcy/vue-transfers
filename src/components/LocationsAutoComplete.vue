<template>
  <div class="input-group">
      <span class="input-group-text"><i class="fas fa-map-marker-alt"></i></span>
      <input
          type="text"
          class="form-control "
          :placeholder="title"
          @input="onInput"
          v-model="searchTerm"
          required>
        <ul v-if="locations.length && showDropdown" class="autocomplete-items">
          <li
          v-for="location in locations"
          :key="location['@Code']"
          @click="selectLocation(location)">
          {{ location['@Name'] }}
          </li>
        </ul>
  </div>    
</template>

<script>
export default {
  name: 'LocationsAutoComplete',
  props: {
    title: String,
    constraint: Object,
    dropOffAddress:{'type':String, 'default':""}
  },
  data(){
      return {
          searchTerm:this.dropOffAddress,
          showDropdown:false,
          locations:[]
      }
  },
  emits:['triggerChange'],
  methods:{
    onInput(input){
      if(input.target.value.length>3){//On start checking when string is > 3 chars
          this.fetchData(input.target.value);
      }
    },
    async getLocation(id){
        let _url = 'https://otageo.cartrawler.com/cartrawlerota/json?type=CT_UtilRQ';
        let _data = {
            "@Target": "Production",
            "@PrimaryLangID": "en",
            "POS": {
                "Source": [{
                    "@ERSP_UserID": "MP",
                    "@ISOCurrency": "EUR",
                    "RequestorID": {
                        "@Type": "16",
                        "@ID": "68622",
                        "@ID_Context": "CARTRAWLER"
                    }
                }]
            },
            "@xmlns": "http://www.cartrawler.com/",
            "@Version": "1.000",
            "Action": {
                "@Utility": "DecodeGoogleId",
                "Value": id
            }
        }//end data

        const res = await fetch(_url, {
        method:'POST',
        headers:{
        },
        body:JSON.stringify(_data)
      })

      const data = await res.json();
      return data;
 
    },
   //Fetch data from CT locations API
   async fetchData(term){
       this.showDropdown = true;
       let _url = 'https://otageo.cartrawler.com/cartrawlerota/json?type=CT_VehLocSearchRQ';
       let _data = {
           "@Target": "Production",
           "@PrimaryLangID": "en",
           "POS": {
               "Source": [{
                    "@ERSP_UserID": "MP",
                    "@ISOCurrency": "EUR",
                    "RequestorID": {
                    "@Type": "16",
                    "@ID": "68622",
                    "@ID_Context": "CARTRAWLER"
                    }
                }]
                },
                "@xmlns": "http://www.cartrawler.com/",
                "@Version": "1.000",
                "VehLocSearchCriterion": {
                    "@ExactMatch": "true",
                    "@ImportanceType": "Mandatory",
                    "PartialText": {
                        "@Sort": "1",
                        "@Size": 15,
                        "@POITypes": "1,3,8",
                        "#text": term,
                    }
                }
        }
        //Add geo contraint to make results more accurate
        if(this.constraint.lat != undefined){
            _data.VehLocSearchCriterion.PartialText['@Latitude'] = this.constraint.lat;
            _data.VehLocSearchCriterion.PartialText['@Longitude'] = this.constraint.lng;
        }
        const res = await fetch(_url, {
            method:'POST',
            headers:{},
            body:JSON.stringify(_data)
        });

        const data = await res.json();
        this.locations = data.VehMatchedLocs.LocationDetail;
    },
    async selectLocation(location){
        this.searchTerm = location['@Name'];
        //If there is no geo coordinated, retrieve them from a seperate CT endpoint
        if(typeof location['@ExternalLocId'] != "undefined"){
            let newLocation =  await this.getLocation(location['@ExternalLocId']);
            //Update location with new info
            console.log("New location ", newLocation)
            location['@Lat'] = newLocation.Result.Lat
            location['@Lng'] = newLocation.Result.Lng
            location['@Name'] = newLocation.Result.LocationName
            location['@Address'] = newLocation.Result.Address
        }
        //Hide dropdown and pass info back up
        this.showDropdown =  false;
        this.$emit('triggerChange', location);

    }
  },
}
</script>

<style scoped>
</style>