<template>
  <div class="test-responsive-form">
      <responsive-form :contact="formAddress"></responsive-form>
  </div>
</template>

<script>
   
//import ResponsiveForm from "./ResponsiveForm.vue"
import ResponsiveForm from "./acmeform.vue"
export default {
  name: 'test-responsive-form',
  components: {
    // <my-component> will only be available in parent's template
    'responsive-form': ResponsiveForm
  },
  data () {
    return {
        testMessage: "",
      formAddress: {
         name:      "",
         company:   "",
         email:     "",
         comments:  "",
         location: ""
      }
    }
  },
  methods: {
    
  },// end of methods
  created: function(){
    console.log("TestResponsiveForm.vue created................")
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
   .form-address-display {border: 1px solid black; font-size: 1.5vw; background: #ccc; margin: 10px auto; padding: 10px;}
   .test-message {
     background: white;
     border: 1px solid gray;
     margin: 10px;
     padding: 10px;
   }
</style>
