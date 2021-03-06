<template>
  <div class="meetinglist">
  <!-- <div class="container"> -->
    <ul>
      <li
        v-for="(a, index) in meetings" 
        class='meeting-list-item' 
        v-bind:data-key='a.name'
        @click="viewMeeting(a)"
        ><div class="meeting-list-info">
         <span> {{a.time_formatted}}     {{ a.day | dayname}} </span>
         <!-- <span> {{a.time_formatted}}</span>   <span>{{ a.day | dayname}} </span> -->
         <span class="meeting-list-name">
           {{ a.name }}
          </span>
        </div>
            <div v-if="detailsOpen == a.name" class="meeting-list-details">
              Name: {{a.name}}
            </div>
          </li>
    </ul>
  <!-- </div> end container -->
  </div>
</template>

<script>

export default {
  name: 'MeetingList',
  props: ["meetings"],
  data () {
    return {
      msg: 'Welcome to Meeting List',
      query: "",
      meetingObj: {},
      meetingIndex: [],
      detailsOpen: ''
    }
  }, 
  methods: {

    viewMeeting: function(meeting){
    //  debugger
      console.log("view meeting " + JSON.stringify(meeting, null, 3))
      this.$store.dispatch("setViewMeeting", meeting)
      this.$router.push({path:`/meeting/${meeting.slug}`})
    },
    fixIndex: function(){
     // debugger;
      self = this;
      var indx = []
      this.meetings.forEach(function(m){
        if ((self.query == m.day) && (indx.length < 5)){
          indx.push(m._id)
        }
         
      })
      this.meetingIndex = indx;

    }
  },
  computed: {
    filteredIndex: function(){
      self = this;
      var indx = []
      this.meetings.forEach(function(m){
        if ((self.query == m.day) && (indx.length < 5)){
          indx.push(m._id)
        }
         
      })
     //debugger
      this.meetingIndex = indx;
      return this.meetingIndex;
    }
    // filteredObj: function(){
    //   var index = this.meetingIndex[0]
    //   return this.meetingObj[index]
    // }
  },
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    },
    dayname: function(value){
      var daysIndex = ['Sun','Mon', 'Tue','Wed','Thu', 'Fri', 'Sat'];
      return daysIndex[+value]
    }
  },
  created: function(){
   // debugger;
   console.log("meetinglist created")
    this.meetings.forEach(function(m){
      this.meetingObj[m._id] = m;  
      },this)
  },
    updated: function(){
      console.log("meetinglist updated")
   // debugger;
    this.meetings.forEach(function(m){
      this.meetingObj[m._id] = m;  
      },this)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .meeting-list-details{
    margin: 5px;
    padding: 5px;
    background: #ccc;
    font-size: 2em;
  }
  .meeting-list-info {
    font-style: italic;
    display: flex;
    justify-content: space-between;
  }
  .meeting-list-name {
    font-style: bold;
    padding: 0 5px 0 10px;
    font-size: 1.2em;
  }
  .class {
   
    background-color: #cccccc;
    width: 100wh;
    height: 100vh;
}
.meeting-header {background: #ccc;}
p {background: #ccc;}
.meetinglist ul {padding: 0;}
.meeting-list-item { padding: 5px; border: 1px solid grey; margin: 5px;
 background: #fff; 
 background: linear-gradient(to bottom, #b2e1ff 0%,#66b6fc 100%);
 text-align: left;  list-style: none;
 border-radius: 5px;

 }
 @media screen and (max-width: 600px) {
  .meeting-list-info {
   font-size: 0.8em;
   color: black;
   font-weight: 900;
  }
  .meeting-list-name {
    font-weight: 700;
    padding: 0 5px 0 10px;
    font-size: 1.0em;
  }
  
 }
</style>
