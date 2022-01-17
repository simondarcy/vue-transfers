<template>
    <div class="row d-none d-md-block">
      <div class="col-12 mb-3">
        <a style="cursor: pointer; text-decoration: underline" v-on:click="goBack()">Back to Search Results</a>
      </div>
    </div>
    
    <div class="row mb-3" v-if="this.$store.getters.selectedTransfer">
      <div class="col-md-4 trip-details">
        <PageHeader title="Trip Details"/>
        <TripDetails :transfer="this.$store.getters.selectedTransfer" />
        <hr class="d-md-none"/>
      </div>
      <div class="col-12 col-md-8">
      <PageHeader title="Passenger Details"/>
      <DetailsForm/>
      </div>
    </div>
    
    <div v-else class="alert alert-warning" role="alert">No transfer selected</div>

</template>

<script>
// @ is an alias to /src
import PageHeader from '@/components/PageHeader.vue'
import DetailsForm from '@/components/DetailsForm.vue'
import TripDetails from '@/components/TripDetails.vue'
import router from '../router'

export default {
  name: 'Details',
  components: {
    PageHeader,
    DetailsForm,
    TripDetails
  },
  methods:{
    goBack(){
      router.go(-1);
    }
  }
}
</script>

<style scoped>
</style>
