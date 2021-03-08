<template>
  <div id="app">
    <aalinks-nav></aalinks-nav>
    <router-view></router-view>
    <GmapMap v-show="showInitMap" map-type-id="roadmap" :zoom="15" :center="{lat: -6.893, lng: 107.609}" style="width: 600px; height: 400px">
</GmapMap>
  </div>
</template>

<script>
import Navigate from '@/components/navigation'

export default {
  name: 'app',
  components: {
    "aalinks-nav": Navigate
  },
   data () {
    return {
      apimessage: 'Welcome to Your Vue.js no server yet .............',
      showInitMap: false,
      lat: 44.9169,
      lng: -93.4450,
      meetings: [],
      meeting_list: {},
      meeting_list_index: [],
      locationFound: false
    }
  },
  methods: {
    async getStripe(){
            await this.$store.dispatch("getStripeKey");

    }
  },
  computed: {
    
  },
  mounted() {
    this.$store.dispatch("getAllMeetings");
    this.$store.dispatch("setOptions",{
      picked: "", // default to all meetings
      mileMax: 2,
      day: new Date().getDay(),
      home: {lat:44.9270729,lng:-93.4479148},
    })
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  
}
* {
  box-sizing: border-box;
}
body, document { height: 100vh;}

img.bg {
  /* Set rules to fill background */
  min-height: 100%;
  min-width: 1024px;
	
  /* Set up proportionate scaling */
  width: 100%;
  height: auto;
	
  /* Set up positioning */
  position: fixed;
  top: 0;
  left: 0;
}

@media screen and (max-width: 1024px) { /* Specific to this particular image */
  img.bg {
    left: 50%;
    margin-left: -512px;   /* 50% */
  }
}
.page-wrap{
  position: relative;
    /* width: 95vw;
    margin: 5px auto;
    padding: 20px; */
    background: #ffffff00;
    -moz-box-shadow: 0 0 20px black;
    -webkit-box-shadow: 0 0 20px black;
    box-shadow: 0 0 20px black;
}
.parallaxxx {
    /* The image used */
    background-image: url("static/NorthCarolinaSunrise.jpg");

    /* Set a specific height */
    min-height: 100vh; 

    /* Create the parallax scrolling effect */
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}
/* .image-title1 {
    font-size: 35px;
    position: absolute;
    top: 500px;
    left: 150px;
    width: 100%;
    max-width: 600px;
    border: 1px solid white;
}
.image-title2 {
    font-size:35px;
    position: absolute;
    top: 620px;
    left: 252px;
    width: 100%;
    max-width: 600px;
    border: 1px solid white;
} */

.image-title1,.image-title2{
    font: 400 130px/0.8 'Great Vibes', Helvetica, sans-serif;
    font-size: 75px;
    color: #fff;
    text-shadow: 4px 4px 3px rgba(0,0,0,0.1);
}
</style>
