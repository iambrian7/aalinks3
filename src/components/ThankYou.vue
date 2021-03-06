<template>
  <div class="thankyou">
    <h1>Thanks You</h1>
  </div>
</template>

<script>
export default {
  name: 'thankyou',
 mounted: function () {
      // card = elements.create('card');
      // debugger
      console.log(`thankyou mounted`)
      setTimeout(()=>{
        this.$router.push('donate')
      },3000)
  },
}
</script>

<style>

</style>