<template>
  <div class="test1">
   <aside id="info-block">
    <section class="file-marker">
            <div>
                <div class="box-title">
                    optional fields for receipts
                </div>
             </div>
    </section>
    </aside>
    <div class="content">
      <button @click="testDupLocation">Get DupLocation</button>
      <p>Location: {{ dupLocation }} </p>
      <div class="locations-list">
      <ul>
        <li v-for="loc in myDupLocations" :key="loc.id">Location: {{loc.name }} {{ loc.address }}</li>
      </ul>
      </div>
      <!-- <meeting-list :meetings="filteredMeetings"></meeting-list> -->
    </div>
  </div>
</template>

<script>
 import MeetingList from '@/components/meetinglist'

export default {
  name:'Test',
   components: {
    "meeting-list": MeetingList
  },
  data: () => ({
    meetings: [],
    dupLocations: [],
    opt_info: {
      name: '',
      email: '',
      address:{
        street: '',
        city: '',
        state: '',
        zip: '',
      },
    },
  }),
  methods:{
    testDupLocation(){
      console.log('testDupLocation')
    const dupLocation = this.$store.getters.getDupLocation;
      var x = this.dupLocation;
      console.log('after...testDupLocation')
    }
  },
  computed: {
    dupLocation: function(){
      const dup = this.$store.getters.getDupLocation;
      console.log(`computed:dupLocation: ${dup}`)
      if (dup){
        console.log(`computed:found dupLocation: ${dup}`)
        return dup;
      } else {
        dup = {name: 'not found from getDupLocation'}
        console.log(`computed:not found dupLocation: ${dup}`)
        return dup;
      }
    },
    myDupLocations: function(){
      const allDupLocations = this.$store.getters.getDupLocations;
      return allDupLocations;

    },
    filteredMeetings: function(){
    var self = this;
      var newMeetings = this.$store.getters.getFilteredMeetings
      // console.log(`meetings:filteredMeetings: newMeetings found: ${newMeetings.length}`)
      newMeetings.sort(function (a, b) {
        // ******************** first sort days
        var nameA = a.day;
        var nameB = b.day;
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        // *********************now sort times 
        nameA = a.time
        nameB = b.time
         if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        // names must be equal
        return 0;
      });
    // format each meeting in MeetingGuide format
        var loc = {};
        newMeetings.forEach(function(m){
                if (!loc[m.location_id]){
                    loc[m.location_id] = {
                      location: m.location,
                      address: m.address,
                      city: m.city,
                      state: m.state,
                      postal_code: m.postal_code,
                      loc : m.loc,
                      meetings: []
                    } // add this location data 
                 }
                var meeting = {
                  name: m.name,
                  slug: m.slug,
                  day : m.day,
                  time : m.time,
                  time_formatted: m.time_formatted,
                  types: m.types,
                  id: m.id
                }
                loc[m.location_id].meetings.push(meeting) 
        })// end of newMeetings forEach
  
        this.newlocations = loc; // should pass the locations to the googlemap component
        const locationsArray = [];
        Object.keys(loc).forEach(x =>{
          locationsArray.push(loc[x])
        });
        // console.log(`locationsArray=${locationsArray.length}`)
        // console.log(`locationsArray=${JSON.stringify(locationsArray, null, 3)}`)
        // set the locations in the store
        this.$store.dispatch("locations", locationsArray)
        // this.$store.dispatch("locations", loc)
        
     return newMeetings;
    },
  },
   created(){
    //  this.$store.commit('testcnt',444);

     console.log(`test:created: getDupLocations...`)
    this.$store.dispatch("getDupLocations");
     console.log(`test:created: recieved getDupLocations...`)
     console.log(`test:created: get getDupLocations...`)
    this.dupLocations = this.$store.getters.getDupLocations
     console.log(`test:created: got dupLocations ${this.dupLocations.length}`)
     if( this.dupLocations.length > 0){
       console.log(`test:: sample id ${JSON.stringify(this.dupLocations[0], null, 3) }`)
       this.$store.dispatch("getDupLocationId", this.dupLocations[0].id);
     }
  },
 mounted: function () {
  //  console.log(`test mounted: meeting_location= ${JSON.stringify(this.meeting_location, null, 3)}`)
 }
} // end of export default
</script>

<style scoped>
.locations-list{
  background: hotpink;
  font-size: 1.4em;
  padding: 10px;
}
.locations-list li{
   padding: 5px; border: 1px solid grey; margin: 5px;
 background: #fff; 
 background: linear-gradient(to bottom, #b2e1ff 0%,#66b6fc 100%);
 text-align: left;  list-style: none;
 border-radius: 5px;
}
label{
  font-weight: 800;
}
label input{ font-weight: 400;}
  #info-block section {
      border: 2px solid black;
      margin-top: 20px;
      max-width: 500px;
      padding-bottom: 40px;
  }

  .file-marker > div {
      padding: 0 3px;
      height: 100px;
      margin-top: -0.8em;
      
  }
  .box-title {
      background: white none repeat scroll 0 0;
      display: inline-block;
      padding: 0 2px;
      margin-left: 8em;
  }
  #audit-trail{
    /* margin: 20px; */
    padding: 5px 20px;
  }
  /* input styles */
  input, select, textarea, button{font-family:inherit; font-size:inherit;}
  div:focus {outline: none;}
  input:hover,
  div > p:focus, 
  div > p:hover {outline: 1px solid red; }
  .container{ border: 1px solid black; padding: 10px 20px;}
</style>