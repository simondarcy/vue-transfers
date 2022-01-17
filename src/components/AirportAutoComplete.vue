<template>
  <div class="input-group">
      <span class="input-group-text"><i class="fas fa-plane"></i></span>
      <input
        type="text"
        class="form-control autocomplete"
        placeholder="Pickup airport"
        @input="showDropdown=true"
        v-model="searchTerm"
        required>

      <ul v-if="searchAirports.length && showDropdown" class="autocomplete-items">
        <li
        v-for="airport in searchAirports"
        :key="airport.objectID"
        @click="selectAirport(airport)">
          <span v-if="airport.name != airport.city">{{airport.city}}, </span> {{ airport.name }} ({{airport.iata_code}})
        </li>
      </ul>
  </div>
</template>

<script>
import {ref, computed} from 'vue'
import airports from '../data/airports.json'

export default {
  name: 'AirportAutoComplete',
  props: {
    'value':{
      Type: String,
      default: ""
    },
    
  },
  emits:['triggerChange'],
  methods:{},
  setup(_, { emit }) {
    let searchTerm = ref(_.value);
    let showDropdown = ref(false)
    
    const searchAirports = computed(() => {
      if (searchTerm.value === '') {
        return []
      }

      let matches = 0

      return airports.filter(airport => {
        if (
          airport.name.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
          airport.city.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
          airport.iata_code.toLowerCase().includes(searchTerm.value.toLowerCase())
          && matches < 10
        ) {
          matches++
          return airport
        }
      });//end filter
    });//end computed

    const selectAirport = (airport) => {
      emit('triggerChange', airport);
      showDropdown.value = false;
      searchTerm.value = `${(airport.name != airport.city)?airport.city+', ':''}${airport.name} (${airport.iata_code})`;
    }

    return {
      showDropdown,
      airports,
      searchTerm,
      searchAirports,
      selectAirport
    }
  }//end setup
}
</script>
<style scoped>
</style>

