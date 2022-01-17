<template>
    <div class="row">
        <div class="col-md-12">
            <h3>{{ title }}</h3>    
        </div>
    </div>
</template>

<script>
export default {
  name: 'PageHeader',
  props: {
    title: String,
  },
}
</script>

<style scoped>
</style>

