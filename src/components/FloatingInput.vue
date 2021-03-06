<template>
  <div class="floating-input">
    <div class="input-group">
      <input v-model="msg" type="text" required autocomplete="off" name="floatinginput" 
      :size="width"  :class="{error: err}">
      <span class="highlight"></span>
      <span class="bar"></span>
      <label>{{ pholder }}</label>
    </div>
  </div>
</template>

<script>
  export default {
    name: "floating-input",
   props: ["value","pholder","width","err"],
  computed: {
    msg: {
      get: function() {
        return this.value;
      },
      set: function(val) {
        this.$emit("input", val);
      }
    }
  }
  }
</script>

<style scoped>
  .input-group {
      position: relative;
      margin: 20px 0 20px;
      /* margin: 40px 0 20px; */
      flex: 1 1 auto;
      padding: 0 10px;
    }
  .input-group label{
    padding-left: 10px;
  }
    input {
      /* font-size: 1.8rem; */
      padding: 5px;
      display: block;
      /* width: 300px; */
      /* border: none;
      border-bottom: 1px solid #757575; */
    }

    input:focus {
      outline: none;
    }

    .floating-input label {
      color: #999;
      font-size: 18px;
      font-weight: normal;
      position: absolute;
      pointer-events: none;
      left: 5px;
      top: 10px;
      transition: 0.2s ease all;
      -moz-transition: 0.2s ease all;
      -webkit-transition: 0.2s ease all;
    }
    .floating-input label::after {
      content: " *";
      color: red;
    }
    input:focus ~ label,
    input:valid ~ label {
      top: -20px;
      font-size: 14px;
      color: #000;
    }

    .bar {
      position: relative;
      display:block;
      /* width:315px; */
    }

    .bar:before,
    .bar:after {
      content: '';
      height: 2px;
      width: 0;
      bottom: 1px;
      position: absolute;
      background: #f44242;
      transition: 0.2s ease all;
      -moz-transition: 0.2s ease all;
      -webkit-transition: 0.2s ease all;
    }

    .bar:before {
      left: 50%;
    }

    .bar:after {
      right: 50%;
    }

    input:focus ~ .bar:before,
    input:focus ~ .bar:after {
      width: 50%;
    }

    .highlight {
      position: absolute;
      height: 60%;
      width: 100px;
      top: 25%;
      left: 0;
      pointer-events: none;
      opacity: 0.5;
    }

    input:focus ~ .highlight {
      -webkit-animation: inputHighlighter 0.3s ease;
      -moz-animation: inputHighlighter 0.3s ease;
      animation: inputHighlighter 0.3s ease;
    }
    .error{ border: 2px solid red;}

    /* animations */
    @-webkit-keyframes inputHighlighter {
      from { background: #4285f4; }
      to   { width: 0; background: transparent; }
    }
    @-moz-keyframes inputHighlighter {
      from { background: #4285f4; }
      to   { width: 0; background: transparent; }
    }
    @keyframes inputHighlighter {
      from { background: #4285f4; }
      to   { width: 0; background: transparent; }
    }
</style>