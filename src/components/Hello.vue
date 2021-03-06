<template>
  <div class="hello parallax">

  <div class="image-title1">....new freedom</div>
    <div class="image-title2">            and a new happiness....</div>
    <!-- <div class="image-meeting">{{ s }}</div> -->
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      locationFound: false
    }
  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .cover {
  object-fit: cover;
  width: 50px;
  height: 100px;
}
img {width: 100vw}


</style>
