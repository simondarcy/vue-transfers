<template>
    <div class="text-center">
    <PageHeader title="Manage Booking"/>
    </div>

    <div v-if="loading">
      <Spinner/>
    </div>

    <!-- If no booking show form -->
    <div v-else class="container">

      <div v-if="error" class="alert alert-danger" role="alert">{{ error }}</div>
      <div v-if="booking">
        <!-- If booking show the details -->
        <MyBooking :booking="booking"/>
      </div>
      <div v-else>
        <!-- Otherwise show form where user can input their booking details -->
        <ManageForm/>
      </div>

    </div> <!-- end container -->
</template>

<script>
// @ is an alias to /src
import PageHeader from '@/components/PageHeader.vue'
import ManageForm from '@/components/ManageForm.vue'
import MyBooking from '@/components/MyBooking.vue'
import router from '../router'
import Spinner from '@/components/Spinner.vue'

export default {
  name: 'Details',
  components: {
    PageHeader,
    ManageForm,
    Spinner,
    MyBooking
  },
  data () {
    return {
        loading:false,
        email:"",
        reference:"",
        error:null,
        booking:null
    }
  }, 
 watch: { $route(to, from) { // react to route changes...
  if(to !== from){ location.reload(); } } 
  },
  async created() {
    //check if route params are available, 
    if(typeof this.$route.query.email === "string" && typeof this.$route.query.reference === "string"){
        //!todo validation
        this.email = this.$route.query.email;
        this.reference = this.$route.query.reference;
        let _url = this.$store.getters.retrieveURL;
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
          "Reference": {
            "@Type": "16",
            "@ID_Context": "CARTRAWLER",
            "@ID": this.reference
          },
          "TPA_Extensions": {
            "Email": this.email
          }
        }

      //fetch the data

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
          this.handleError(data);
          return;
      }else{
        //Success, update booking
        this.booking = data;
      }
    }//end if query params 
  },
  methods:{
    handleError(error){
      console.log(error);
      this.error = "There was an error retrieving your booking";
      this.email = null;
      this.reference = null;
    }
  }
}
</script>

<style scoped>
@media (min-width: 780px) {
    .container{
        max-width: 500px;
    }
}
</style>
