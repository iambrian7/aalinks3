<template>
    <div class="ameeting">
      <h1>{{ msg }}</h1>
      <button @click="backToMeetings">Back</button>
      <div class="meeting-info">
      <span> {{meeting.time_formatted}}     {{ meeting.day | dayname}} </span>
          <span class="meeting-list-name">
            {{ meeting.name }}
          </span>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'app',
    // props: ["meeting"],
    data () {
      return {
        msg: 'Welcome to Your ameeting'
      }
    },
    methods: {
      backToMeetings: function(){
      // go back by one record, the same as history.back()
      this.$router.go(-1)
    },
    },
    computed: {
      meeting(){
        return this.$store.getters.getViewMeeting
      }
    }
  }
  </script>
  
  <style>
  .meeting-info{
    border: 1px solid black;
    background: #ccc;
    font-size: 3em;
  }
  </style>
  