<template>
    <PageHeader title="Search for airport transfers"/>
    <SearchForm/>
    <router-link class="manage-link text-muted d-md-none" to="/manage">Manage Booking</router-link>
</template>

<script>
// @ is an alias to /src
import PageHeader from '@/components/PageHeader.vue'
import SearchForm from '@/components/SearchForm.vue'

export default {
  name: 'Home',
  components: {
    PageHeader,
    SearchForm
  },
  mounted () {
  document.body.classList.add('home')
  }
}
</script>

<style scoped>
.manage-link{
  width: 100%;
  position: absolute;
  left: 0;
  bottom: .7rem;
  text-align: center;
}
</style>


