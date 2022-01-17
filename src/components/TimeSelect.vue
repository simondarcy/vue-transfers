<template>
  <div class="input-group mb-3">
    <span class="input-group-text"><i class="far fa-clock"></i></span>
    <select class="form-select d-block " 
    name="time" 
    v-on:change="updateTime"
    required="">
      <option v-for="option in options" :value="option.value" :key="option.value" :selected="(selectedTime==option.value)" >
        {{ option.text }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'TimeSelect',
  methods: {
    updateTime(time) {
      this.$emit('triggerChange', time.target.value);
    }
  },
  props:{
    selectedTime:{'type':String, 'default':'10:00:00'}
  },
  data() {
    return {
      options: [
        {text: "00:00", value: "00:00:00"},
        {text: "00:30", value: "00:30:00"},
        {text: "01:00", value: "01:00:00"},
        {text: "01:30", value: "01:30:00"},
        {text: "02:00", value: "02:00:00"},
        {text: "02:30", value: "02:30:00"},
        {text: "03:00", value: "03:00:00"},
        {text: "03:30", value: "03:30:00"},
        {text: "04:00", value: "04:00:00"},
        {text: "04:30", value: "04:30:00"},
        {text: "05:00", value: "05:00:00"},
        {text: "05:30", value: "05:30:00"},
        {text: "06:00", value: "06:00:00"},
        {text: "06:30", value: "06:30:00"},
        {text: "07:00", value: "07:00:00"},
        {text: "07:30", value: "07:30:00"},
        {text: "08:00", value: "08:00:00"},
        {text: "08:30", value: "08:30:00"},
        {text: "09:00", value: "09:00:00"},
        {text: "09:30", value: "09:30:00"},
        {text: "10:00", value: "10:00:00"},
        {text: "10:30", value: "10:30:00"},
        {text: "11:00", value: "11:00:00"},
        {text: "11:30", value: "11:30:00"},
        {text: "12:00", value: "12:00:00"},
        {text: "12:30", value: "12:30:00"},
        {text: "13:00", value: "13:00:00"},
        {text: "13:30", value: "13:30:00"},
        {text: "14:00", value: "14:00:00"},
        {text: "14:30", value: "14:30:00"},
        {text: "15:00", value: "15:00:00"},
        {text: "15:30", value: "15:30:00"},
        {text: "16:00", value: "16:00:00"},
        {text: "16:30", value: "16:30:00"},
        {text: "17:00", value: "17:00:00"},
        {text: "17:30", value: "17:30:00"},
        {text: "18:00", value: "18:00:00"},
        {text: "18:30", value: "18:30:00"},
        {text: "19:00", value: "19:00:00"},
        {text: "19:30", value: "19:30:00"},
        {text: "20:00", value: "20:00:00"},
        {text: "20:30", value: "20:30:00"},
        {text: "21:00", value: "21:00:00"},
        {text: "21:30", value: "21:30:00"},
        {text: "22:00", value: "22:00:00"},
        {text: "22:30", value: "22:30:00"},
        {text: "23:00", value: "23:00:00"},
        {text: "23:30", value: "23:30:00"} 
      ]
    };
  },
}
</script>

<style scoped>
</style>

