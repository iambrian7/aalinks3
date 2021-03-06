<template>
    <div class="add-meeting">
      <div class="add-meeting-info">
        <h3>Please select the required fields:</h3>
      </div>
      <!-- group_name: "new group",
      day: '1',
      time:'7:00 PM',
      type: 'Open',
      gender: 'Men/Women',
      format: 'Big Book', -->
      <div class="add-meeting-container">
        <form class="aalinks-form">
          <div class="group-meeting-info">
                <div class="group-error" v-if="groupError">{{ groupError }}</div>
            <div class="groups">
                  <input type="text"  v-model="newmeeting.group.group_name" placeholder="Group Name..." required>
                  <select   v-model="newmeeting.group.day" name="day" placeholder="Day...">
                    <option value="0">Sunday</option><option selected value="1">Monday</option>
                    <option value="2">Tuesday</option><option value="3">Wednesday</option>
                    <option value="4">Thursday</option><option value="5">Friday</option> <option value="6">Saturday</option>
                  </select>
                  <input type="time" v-model="newmeeting.group.time"  placeholder="Time...">
            </div>
<div class="group-options"> 
  <div class="open-closed">
                <label class="control-label bold">Open/Closed:  </label>
                <label class="radio-inline"><input type="radio" value="Open" v-model="newmeeting.group.type">Open Meeting</label>
                <label class="radio-inline"><input type="radio" value="Closed" v-model="newmeeting.group.type">Closed Meeting</label>

  </div>
  <div class="gender">
                <label class="control-label bold">Gender:  </label>
                <label class="radio-inline"><input type="radio" value="Men/Women" v-model="newmeeting.group.gender">Men/Women</label>
                <label class="radio-inline"><input type="radio" value="Men" v-model="newmeeting.group.gender">Men Only</label>
                <label class="radio-inline"><input type="radio" value="Women" v-model="newmeeting.group.gender">Women Only</label>

  </div>
                
            <div class="topics-container">

              <label class="control-label bold">Topic:  </label>
              <select v-model="newmeeting.group.format">
              <!-- inline object literal -->
                <option v-for="(value,name) in meetingTopics" v-bind:value="{ name }" :key="name">{{ value }}</option>
              </select>
            </div>
  <!-- group-options -->
</div>
            <div class="code-checks">
                            <label class="control-label bold">Types:  </label> <br>
                <div v-for="(value, name) in types" :key="name">
                  <!-- <label>{{ value }}</label> -->
                  <input type="checkbox"  v-bind:value="name" v-model="newmeeting.group.types">
                  <!-- <input type="checkbox"  v-bind:value="{ name }" v-model="newmeeting.group.types"> -->
              <label> {{value}} </label>
                </div>
                <p>{{ newmeeting.group.types }}</p>
            </div>
            <div class="comments-container">
              <label class="control-label bold">Comments:  </label>
              <div>
            <textarea v-model="newmeeting.group.comments"></textarea>
            </div>
            </div>
            <!-- meeting-info -->
          </div>
          <!-- <div class="col-md-6 google-map-container" v-if="newmeeting.location.mapped_address"> -->
        </form>



      <div class="location-container">    
        <div class="location-info">
          <h2>Location</h2>
                <div class="group-error" v-if="locationError">{{ locationError }}</div>
          <p> <span>Name   :</span> <input type="text" v-model="newmeeting.location.location_name"></p>
          <p> <span>Address:</span> <input type="text" v-model="newmeeting.location.address"></p>
          <p> <span>City:  </span>  <input type="text" v-model="newmeeting.location.city"></p>
          <p> <span>State:  </span> <input type="text" v-model="newmeeting.location.state"></p>
          <p> <span>Zip:   </span>  <input type="text" v-model="newmeeting.location.zip"></p>
          <p><span>Latitude:</span>: {{newmeeting.location.lat}}  <span>Longitude:</span>: {{newmeeting.location.lng}}</p>
        <br>
        <div v-if="fileLocationFound" class="file-location">
        File Location found:
        <p>
          {{ fileLocationFound.name}}
        </p>
        </div>
          <button class="btn" @click.prevent="ckLocation">Check Location</button>   
          <div class="map-error" v-if="addressError.length">Location form is not valid {{ addressError }}</div>
          <div v-if="newmeeting.location.mapped_address" class="map-results">
            <p>       Form formatted this address: {{address}}</p>
            <p>  Google formatted this address: {{newmeeting.location.mapped_address}}</p>
            <div class="google-location">Latitude: {{newmeeting.location.lat}} Longitude: {{newmeeting.location.lng}}</div>
            <button type="button" @click="addMeeting">Add Meeting</button>
          </div>
         </div> <!-- location-info -->
        <div class="google-map-container">
            <google-map :locations="startLocations" @clicked="onClickMap"></google-map>
        </div>
      </div> <!-- location-container -->
        <!-- add-meeting-container -->
      </div>
    
        <hr>
        <hr>
  </div> <!-- end of template div -->
  
  </template>
  
  <script>
var STORAGE_KEY = 'aalinks-vuejs-2.0'
var meetingStorage = {
  fetch: function () {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    // var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    // todos.forEach(function (todo, index) {
    //   todo.id = index
    // })
    // todoStorage.uid = todos.length
    // return todos
  },
  save: function (meetings) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(meetings))
  }
}
  var topic_codes = {
  "11": "11th Step Meditation",
  "12x12": "12 Steps & 12 Traditions",
  "ABSI": "As Bill Sees It",
  "B": "Big Book",
  "DR": "Daily Reflections",
  "D": "Discussion",
  "GR": "Grapevine",
  "MED": "Meditation",
  "SP": "Speaker",
  "ST": "Step Meeting",
  "TR": "Tradition Study",
}
  var meeting_notes = {
  "BA": "Babysitting Available",
  "BRK": "Breakfast",
  "CAN": "Candlelight",
  "CF": "Child-Friendly",
  "DB": "Digital Basket",
  "RUS": "Russian",
  "A": "Secular",
  "ASL": "Sign Language",
  "SM": "Smoking Permitted",
  "S": "Spanish",
  "TR": "Tradition Study",
  "T": "Transgender",
  "X": "Wheelchair Access",
  "XB": "Wheelchair-Accessible Bathroom",
  "Y": "Young People"
}
  var codes = {
  "11": "11th Step Meditation",
  "12x12": "12 Steps & 12 Traditions",
  "ABSI": "As Bill Sees It",
  "BA": "Babysitting Available",
  "B": "Big Book",
  "H": "Birthday",
  "BRK": "Breakfast",
  "CAN": "Candlelight",
  "CF": "Child-Friendly",
  "C": "Closed",
  "AL-AN": "Concurrent with Al-Anon",
  "AL": "Concurrent with Alateen",
  "XT": "Cross Talk Permitted",
  "DR": "Daily Reflections",
  "DB": "Digital Basket",
  "D": "Discussion",
  "GR": "Grapevine",
  "MED": "Meditation",
  "RUS": "Russian",
  "A": "Secular",
  "ASL": "Sign Language",
  "SM": "Smoking Permitted",
  "S": "Spanish",
  "SP": "Speaker",
  "ST": "Step Meeting",
  "TR": "Tradition Study",
  "T": "Transgender",
  "X": "Wheelchair Access",
  "XB": "Wheelchair-Accessible Bathroom",
  "W": "Women",
  "Y": "Young People"
}


  // function parseGeoCoderResult(result){
  function parseGeoCoderResult(result,location){
    // let location = {};
      console.log(`outsideFunction:${JSON.stringify(result, null, 4)}`)
      location.lat = Math.round(result.geometry.location.lat()*1000) / 1000; 
      location.lng = Math.round(result.geometry.location.lng()*1000) / 1000; 
      // location.lat = result.geometry.location.lat();
      // location.lng = result.geometry.location.lng();
       if (result.formatted_address){
          location.mapped_address = result.formatted_address
          console.log("parseGeoCoderResult: formatted address found: " + result.formatted_address)
          console.log("parseGeoCoderResult: formatted address found: " + location.mapped_address)
      }
      var a = result.address_components;
      var keys = {street_number:'address',route: 'street_name', locality:'city',administrative_area_level_1:'state',postal_code:'zip'}
      var parts = {}
  //  debugger;
      a.forEach((x) => {
         // console.log("x=" + JSON.stringify(x, null, 3))
          var key = x.types[0]
          if (key == 'route'){
              location.address += " " + x.short_name
          }else{
              parts[key] = x.short_name
              var xxk = keys[key]
              console.log(`key found: ${key} --- found: ${xxk}`)
              if (xxk){
                  location[xxk] = x.short_name
              }
          }
      
          })
          console.log("parseGeoCoderResult:  ended::::::::::formatted address found: " + JSON.stringify(location, null, 4))
      // return location;
  }
   import GoogleMap from '@/components/googlemaps'
  export default {
    name: 'add-meeting',
    components: {
          "google-map": GoogleMap
    },
    data () {
      return {
        fileLocationFound: null,
        msg: 'Add a meeting',
        state: 1,
        meetingTopics: topic_codes,
        codes: codes,
        types: meeting_notes,
      formatted_address: "",
      mapped_lat: "",
      mapped_lng: "",
        address: '',
        addressError: '',
        result: null,
        lat: '',
        lng: '',
        localMeetings: meetingStorage.fetch(),
        groupError: '',
        locationError: '',
        newmeeting: {
            location: {
              location_name: "",
              mapped_address: "",
              address: "",
              city: "",
              state: "",
              zip: "",
              lat: "",
              lng: "",
              location_comments: "",
              },
          group: {
              group_name: "",
              day: '5',
              time:'19:00',
              type: 'Open',
              gender: 'Men/Women',
              format: 'Big Book',
              comments: '',
              types:[]
              },
          contact: {
              name: "",
              email: "",
              phone: "",
              address: "",
              city: "",
              state: "",
              zip: ""
          }
        },
        defaultLocation: [
          {
              "location": "West Suburban Alano",
              "address": "5235 Woodhill Rd",
              "city": " Minnetonka",
              "state": "MN",
              "postal_code": "55345",
              "loc": {
                "type": "Point",
                "coordinates": [
                    -93.462,
                    44.908
                ]
              },
              "meetings": [
                {
                    "name": "Life is Good",
                    "slug": "LifeisGood-3",
                    "day": "5",
                    "time": "12:00",
                    "time_formatted": "Noon",
                    "types": [
                      "X",
                      "MW",
                      "O"
                    ],
                    "id": 18144
                }
              ]
          }],
        startLocations: null,
        state: 1,
        selectedMeetings: [],
        errors: []
      }
    },
    methods: {
      validateLocation: function(){
        console.log("validateLocation:")
      this.locationError = "";
        if (this.newmeeting.location.location_name.length < 3){
          this.locationError = "Location Name is required"
          return false;
        } 
    // check if location exists in current meeting set
    debugger
    var existingMeeting = this.$store.getters.getLocation(this.newmeeting.location);
    console.log(`found exitsting meeting ${existingMeeting}`)
    return false;
      },
      addMeeting: function(){
    console.log(`addMeeting: meeting ********************`)
        this.groupError = '';
        alert("addMeeting............")
        if (!this.validateLocation()){
          return;
        }
        if (this.newmeeting.group.group_name.length < 3){
          this.groupError = "Group Name is required"
        } else {
        meetingStorage.save(this.newmeeting);
        this.$store.dispatch("addMeeting", this.newmeeting)
        }
      },
      ckLocation: function(){
        debugger
        this.addressError = '';
        console.log("addSimpleMeeting: ckLocation")
        if (this.newmeeting.location.zip.length == 0 ||
            this.newmeeting.location.city.length == 0 || 
            // this.newmeeting.location.lat.length == 0 || 
            // this.newmeeting.location.lng.length == 0 || 
            this.newmeeting.location.state.length == 0 
              // this.newmeeting.location.state.length == 0 || 
          ){
            this.addressError = "address invalid"
          } else {
              // first check for found location
              var x = this.getFileLocation(this.newmeeting.location)
              if (x.length > 0) {
                this.checkMap()
              } else {
                console.log(`chLocation: no found locations`)
              }
              if (this.newmeeting.location.address.length == 0){
                  this.addressError = "we still need an address"
              }
          }
      },
      getFileLocation(loc){
        // dispatch
          // debugger
        var locations = this.$store.state.meetings.meetings.filter(x => {
          var deltaLat = Math.abs(loc.lat - x.loc.coordinates[1]);
          var deltaLng = Math.abs(loc.lng - x.loc.coordinates[0]);
          return ((deltaLat + deltaLng) < 0.005)
        })
        return locations;
      },
      onClickMap (value) {
        console.log("from addmeeting.vue: map clicked at: " + value.lat() + " : " + value.lng()) // someValue
      var latlng = {lat: parseFloat( value.lat()), lng: parseFloat( value.lng())};
      this.googleGeocoder({'location': latlng})
      },
        snap(text){
          console.log("snap in parent.......")
        },
        checkMap: function(){
          //  debugger;
            this.addressError = '';
            var a = this.newmeeting.location;
            this.address = a.street + ", " + a.city + ", " + a.state + ", "+ a.zip;
          this.getLocation();
        },
        back: function(){
          if (this.state > 1){
              this.state = this.state-1;
              return;
          }
        },
        googleGeocoder: function(location){
          {
              var self = this
              console.dir("googleGeocoder: location = " + JSON.stringify(location, null, 4))
              var geocoder = new google.maps.Geocoder();
              if (geocoder) {
                  geocoder.geocode(location, (results, status) => {
                  // geocoder.geocode(location, function (results, status) {
                    console.log(`geocode location: ${JSON.stringify(location,null,3)}`)
                      debugger
                      if (status == google.maps.GeocoderStatus.OK) {
                          self.showResult(results[0])
                      } else {
                          console.log("GeocodeStatus is not ok ......." + status)
                          self.showResult(null)
                      }
                      });
                  }
          }
        },
        getLocation: function(){ // get address from form input 
            console.log("address = " + this.address)
            var loc = this.newmeeting.location;
            this.googleGeocoder({address: `${loc.address} ,${loc.city} , ${loc.state} ${loc.zip}`})
        },
        showResult: function(result){
           // debugger
            if (!result){
              this.addressError = 'Google not able to determine address'  
              return;
            } 
           // debugger
          //  this.newmeeting.location = parseGeoCoderResult(result)
          parseGeoCoderResult(result, this.newmeeting.location)
          console.dir("googleGeocoder: this.newmeeting.location.mapped_address = " + JSON.stringify(this.newmeeting.location.mapped_address, null, 4))
           console.log("newmeeting.location =" + JSON.stringify(this.newmeeting.location, null, 3))
          ///////////  add a location to result   /////////////////////
           //   debugger;
              var alocation = this.newmeeting.location
           var loc = [];
          loc[0] = {
              location: alocation.location_name,
              address: alocation.street,
              city: alocation.city,
              state: alocation.state,
              postal_code: alocation.zip,
              loc : {
                  "type": "Point",
                  "coordinates": [
                     alocation.lng,
                     alocation.lat
                  ]
              },
              meetings: []
          } // add this location data 
           this.startLocations = loc//this.newmeeting.location
        },
          getLatitudeLongitude: (callback, address)  => {
              var self = this;
           //   debugger
          // If adress is not supplied, use default value 'Ferrol, Galicia, Spain'
          var address = address || '12913 Pioneer Rd., Minnetonka, MN';
          console.log("check map address........ = " + address)
          // Initialize the Geocoder
          var geocoder = new google.maps.Geocoder();
          if (geocoder) {
              geocoder.geocode({
                  'address': address
              }, function (results, status) {
                  if (status == google.maps.GeocoderStatus.OK) {
                   //   debugger;
                  
                   console.log("results[0] = " + JSON.stringify(results[0], null, 3))
                  
                     // self.result = results[0];
                      callback(results[0]);
                  } else {
                      // debugger;
                      console.log("GeocodeStatus is not ok ......." + status)
                      callback(null);
                     // self.result = null;
                     // self.addressError = true;
                  }
               });
              }
          }// end of getLatitudeLongitude
    },// end of methods
    computed: {
      selectTimes: function(){
      //alert("created")
      var times = []
      var hours, minutes, ampm;
        for(var i = (1 * 60); i <= (24 * 60); i += 15){
            hours = Math.floor(i / 60);
            minutes = i % 60;
            if (minutes < 10){
                minutes = '0' + minutes; // adding leading zero
            }
            ampm = hours % 24 < 12 ? 'AM' : 'PM';
            hours = hours % 12;
            if (hours === 0){
                hours = 12;
            }
            times.push(hours + ':' + minutes + ' ' + ampm);
          }
          return times;
      }
    },
    created: function(){
        console.log("addSimpleMeeting created")

        var sampleMeeting = this.$store.state.meetings.meetings;
        if (sampleMeeting.length == 0){
          sampleMeeting = this.defaultLocation
        }
        console.log(`meeting:store: sampleMeeting=${JSON.stringify(sampleMeeting,null,3)}`)
        var m = sampleMeeting[0];

         var loc = {
            location: m.location,
            address: m.address,
            city: m.city,
            state: m.state,
            postal_code: m.postal_code,
            loc : m.loc,
            meetings: []
         };
        var meeting = {
          name: m.name,
          slug: m.slug,
          day : m.day,
          time : m.time,
          time_formatted: m.time_formatted,
          types: m.types,
          id: m.id
        }
        loc.meetings.push(meeting);
        this.startLocations = [loc];
    },
  }
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style >
  .file-location{
    background: rgb(192, 156, 156);
    border: 1px solid black;
    border-radius: 5px;
  }
  textarea{
    width: 80%;
    padding: 10px;
    margin: 0 30px;
  }
  .group-error{
    border: 1px solid red;
    background: #f33;
    border-radius: 5px;
  }
  .code-checks{
    display: flex;
    flex-wrap: wrap;
  }
  .location-container{
    display: flex;
  }
  .location-info{
    border: 1px solid black;
    padding: 5px 10px;
    background: #ccc;
  }
  .groups{
    display: flex;
    justify-content: space-evenly;
    padding: 10px;
    margin: 5px;
    flex-wrap: wrap;
  }
  .groups input,
  .groups select{
    margin-right: 10px;
    padding: 2px 5px;
    font-size: 2em;
    border-radius: 5px;
    max-width: 90%;
  }
  .group-options{
    display: flex;
    justify-content: space-evenly;
    padding: 10px;
  }
  .bold{
    font-weight: 700;
  }
    .add-meeting{ 
      background: #ccc;
      padding: 3px 16px;
    }
    .add-meeting-container{
      display: flex;
      flex-direction: column;
      border: 1px solid black;
    }
    .aalinks-form {
      flex: 1;
      /* display: flex; */
      /* grid-template-columns: 1fr;
      grid-gap: 10px;
      margin-bottom: 30px; */
    }
    /* .aalinks-form-day-time{
      display: flex;
    } */
    .btn {
      margin-top: 10px;
      /* height: 20px; */
    }
    .location-summary { margin: 20px auto; font-size: 1.2em; background: #ccc;}
    .location-summary .panel {margin: 10px;}
    .form-background { background: rgb(182, 102, 102);}
    #add-intro {border: 1px solid black; background: #ccc; padding: 10px; margin: 10px; height: 300px; display: flex; }
    #add-intro row, #add-intro col-md-8 {height: 100%}
    .left-intro li {border: 1px solid #aaa; background: #ccc;}
    .intro-active {border: 2px solid green !important;}
    .enter-address {margin: 10px; padding: 10px; border: 1px solid grey; border-radius: 5px; background: #ccc;}
    .enter-address input {min-width: 400px;}
  .step-intro {background: #fff; padding: 10px 20px 10px 10px; height: 100%;}
  .left-intro {flex: 1; min-width: 400px;}
  .right-intro {flex: 3; overflow-y:  scroll;}
  .info {margin: 10px; padding: 10px; background: #999; font-size: 1.2vw;}
  .map-error {height: 50px; background: red; font-size: 1.2em; border: 1px solid black; border-radius: 5px; padding: 10px;}
  .text-danger{ background: pink; border: 1px solid black;}
  .google-map-container {
    height: 30vh;
  }
  /* @media only screen and (min-width: 600px) {
    .aalinks-form {
      display: grid;
      grid-template-columns: 1fr 100px 100px;
      grid-gap: 10px;
    }
} */
.radio-inline input{
  font-size: 2rem;
}
  </style>
  