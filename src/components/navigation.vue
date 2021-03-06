<template>
<div class="navigation">
    <!-- <div class="aalinks-title">aalinks-vue</div> -->
  <nav class="topnav" v-bind:class="{ responsive: isOpen }">
      <router-link to="/" class="aalinks-title">aalinks-vue</router-link>
      <router-link to="/meetings" @click="isOpen = false">Meetings</router-link>
      <router-link to="/addmeeting">New Meetings</router-link>
      <router-link to="/test">Test</router-link>
      <router-link to="/donate">Donate</router-link>
      <router-link to="/responsiveform">Contact</router-link>

    <a href="javascript:void(0);" class="icon">
        <i class="fa fa-bars" @click="isOpen = !isOpen" ></i>
      </a>
  </nav>
</div>
</template>

<script>
//   function myFunction() {
//     var x = document.getElementById("myTopnav");
//     if (x.className === "topnav") {
//         x.className += " responsive";
//     } else {
//         x.className = "topnav";
//     }
// }

export default {
  name: 'navigation',
  data () {
    return {
      msg: 'Navigation',
      onpage: 0,
      isOpen: false
    }
  },
  created: function(){
    let self = this;
    this.$router.beforeEach((to, from, next) => {
       // console.log(`routing to ${JSON.stringify(to, null, 3)}`)
        self.isOpen = false
        next()
      })
    window.addEventListener('click', function(e){
      // close dropdown when clicked outside
      if (!self.$el.contains(e.target)){
        self.isOpen = false
      }})
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
*, *:before, *:after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.aalinks-title{
 /* position: absolute;
 top: 10px;
 left: 0; */
 /* flex: 4; */
 width: 100%;
  font-size: 1.4em;
  font-weight: 600;
  color: red;
  text-shadow: -3px 0px 6px rgba(0, 0, 0, 0.83);
}
nav a.router-link-exact-active {
   font-weight: 700;
   color: red;
}
.router-exact-link-active {color: red;}
/* .active { color: red;} */

nav {
  display: flex;
  width: 1200px;
  max-width: 100%;
  margin: 0 auto;
  color: black; padding: 0; font-size: 12px;
  background: rgba(204, 204, 204, 0.0);
}

nav a{
  flex:1;
  color: white;
  text-align: center;
  text-decoration: none;
  padding: 3px 9px;
  border: 1px solid #888;
  margin-right: 30px;
  border-radius: 5px;
  display: block;
  text-transform: uppercase;
}
nav a:hover{ background: blue; color: white;}
.topnav .icon {
  display: none;
  border: none;
}


/* @media screen and (max-width: 767px) {
  nav {
    flex-direction: column;
  }
  
} */
@media screen and (max-width: 600px) {
  .topnav a:not(:first-child) {display: none;}
  .topnav a.icon {
    float: right;
    display: block;
    flex: 0 0 20px;
    padding: 0 10px;
    margin: 0;
  }
  nav a.icon:hover{ background: #ffff0000;}
}

@media screen and (max-width: 600px) {
  .topnav.responsive {flex-direction: column;}
  .topnav.responsive .icon {
    position: absolute;
    right: 0;
    top: 0;
  }
  .topnav.responsive a {
    float: none;
    display: block;
    text-align: left;
  }
}
</style>

