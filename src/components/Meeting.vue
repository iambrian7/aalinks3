<template>
  <div class="single">
    <div class="meeting-container">
    <div v-if="!meets">
      <p>Loading..............</p>
    </div>
    <div v-else>
        <button @click="backToMeetings">Back</button>
      <div class="meeting-info">
      <span> {{meets.time_formatted}}     {{ meets.day | dayname}} </span>
          <span class="meeting-list-name">
            {{ meets.name }}
          </span>
          <button class="dups-check" @click="dups = !dups">
            Dups
          </button>
      </div>
    </div>
    <div class="dup-check" v-if="dups">
      <h3>Dups</h3>
      <div class="location" v-for="(dup, i) in duplocations" :key="i">
      
        <h5> {{dup.loc.coordinates}}  {{ dup.location}}</h5>
      </div>
    </div>
    <div class="google-map-container" v-else>
       <!-- <google-map :locations="$store.state.locations"></google-map> -->
       <google-map :locations="newlocations"></google-map>
    </div>
      <!-- end meeting-container -->
    </div>
  </div>
</template>

<script>
   import GoogleMap from '@/components/googlemaps'

export default {
  name: 'meeting',
  // props: ['meetingpath'],
  data () {
    return {
      msg: `Welcome to `,
      meeting: {},
      newlocations: {},
      dups: false
    }
  },
   components: {
          "google-map": GoogleMap
    },
  computed: {
    duplocations(){
      var x = this.$store.getters.getAllLocations;
      var sortkey = 'lng'
      x = x.sort((a,b) => {
      var a1 = a.loc.coordinates[0];
      var b1 = b.loc.coordinates[0];
      return a1-b1
    })
      console.log(`dup locations = ${x.length}`)
      return x;
    },
    meets(){
        var x = this.$store.getters.getViewMeeting;
      if (!x){
        console.log(`meetingspath: ${this.meetingspath}`)
        console.log(`$route meetingspath: ${this.$route.params.meetingpath}`)
        x = this.$store.getters.getMeetingById( this.$route.params.id*1)
          // console.log(`meets from store ${JSON.stringify(x,null,3)}`)
        if (!x){
          x = {name:"waiting for meeting"}
        }
       }
      // console.log(`meets computed at ${JSON.stringify(x,null,3)}`)

     this.newlocations = this.$store.getters.getLocationMeetings(x.location_id);


          // loc[0] = {
          //   location: x.location_name,
          //     address: x.street,
          //     city: x.city,
          //     state: x.state,
          //     postal_code: x.zip,
          //     loc : {
          //       "type": "Point",
          //         "coordinates": [
          //           x.loc.coordinates[1]*1,
          //            x.loc.coordinates[0]*1
          //         ]
          //     },
          //     meetings: []
          // } // add this location data 
      console.log(`meets location for google at ${JSON.stringify(this.newlocations,null,3)}`)

           


      return x
    }
  },
  methods: {
     backToMeetings: function(){
      // go back by one record, the same as history.back()
      this.$router.go(-1)
    },
    },
created: function(){
  // debugger;
    // this.meets =  this.$store.getters.getViewMeeting;
    // if (!this.meets){
    //   this.meets = {
    //     name:"looking for meeting"
    //   }
    // }
    console.log("meeting created")
                console.log(`meeting:store: locations=${JSON.stringify(this.$store.state.locations,null,3)}`)

    var id = this.$route.params.id;
    console.log(`meetingspath: ${id}`)

    // console.log(`singlemeeting: created: prop meeting = ${this.meets.name}`)
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
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
 .google-map-container {
    height: 60vh;
    /* width: 100%; */
    flex: 1 1 auto;
  }
  .meeting-info{
    width: 400px;
  }
.meeting-container{
  display: flex;
  flex-wrap: wrap;
  /* width: 100%; */
    flex: 1 1 auto;
}

</style>
