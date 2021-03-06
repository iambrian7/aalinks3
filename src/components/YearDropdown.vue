<template>
  <div class='year-dropdown'>
  <div class="select-style">
              <select>
                  <option value="00" selected>Select Month ....</option>
                  <option value="01">01</option>
                  <option value="02">02</option>
                  <option value="03">03</option>
                  <option value="04">04</option>
                  <option value="05">05</option>
                  <option value="06">06</option>
                  <option value="07">07</option>
                  <option value="08">08</option>
                  <option value="09">09</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
              </select>
     
</div>
  </div>
</template>

<script>
export default {
    data(){
        return {
          month: new Date().getMonth()+1
        }
    },
    methods: {
     
    },
     filters: {
       money: function(value){
         return '$'+value;
       },
        currency: function(value){
        if (!value) return 0;
        value = (value*1).toFixed(0)
        return (value * 1).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
      },
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
    computed: {
  
    }
}
</script>

<style scoped>
   .select-style {
    border: 1px solid #ccc;
    width: 120px;
    border-radius: 3px;
    overflow: hidden;
    /* background: #fafafa url("img/icon-select.png") no-repeat 90% 50%; */
}

.select-style select {
    padding: 5px 8px;
    width: 130%;
    border: none;
    box-shadow: none;
    background: transparent;
    background-image: none;
    -webkit-appearance: none;
}

.select-style select:focus {
    outline: none;
}

</style>
