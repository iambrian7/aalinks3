<template>
  <div class='donate2'>
      
    <div class='header'>
      <h1 class="aalinks-title">Each gift is another link in the chain growing stronger</h1>
    </div>
    <div class='flex-columns'>
      <div class='help'>
        <img class="help-img" src="../static/help.jpg" alt="help">
          <!-- <img src="https://cdn.scotch.io/2842/b7yhhuUPSGO1fEkMHD6P_sticks.jpeg" alt="A bundle of sticks"> -->
      </div>
      <div class="amount-container section" v-if="activetab === 1" >
        <div class="section-content">
            <div class="donate-row">
              <button v-for="amt in amts" :key="amt" @click="requestCharge.amount = amt, isActive = amt" v-bind:class="{ active: isActive == amt }">${{ amt }}</button>        
              <input type="text" placeholder="donation amount..." v-model="requestCharge.amount" size="5">
            </div>
            <div class="donate-row">
              <div class="donate-view">
                I wish to donate {{requestCharge.amount | currency}}
              </div>
            </div>
        </div>
        <div class="section-control">
          <button @click="activetab=2">Next</button>
          <button @click="cancel">Cancel</button>
        </div>
      </div>
      <div class="info-container  section" v-show="activetab === 2" >
      <!-- <div class="info-container  section" v-if="activetab === 2" > -->
        <div class="section-content">
          <ReceiptInfo />
          <div ref="card" id="StripeElement" class="StripeElement" v-if="keydone">
          </div>
          <h1 v-else>Loading....</h1>
        </div>
        <div class="section-control">
            <button @click="activetab=1">Back</button>
            <button @click="validateCard">Next</button>
            <button @click="cancel">Cancel</button>
        </div>
      </div>
      <div class="submit-container section" v-if="activetab === 3" >Submit
          <div class="section-control">
              <button @click="activetab=2">Back</button>
              <button @click="submit">Submit</button>
              <button @click="cancel">Cancel</button>
          </div>
       </div>
      <div class="success section" v-if="activetab === 4" >Submit
        <h1>Thank You for your donation!</h1>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios';
import FloatingInput from "@/components/FloatingInput";
import YearDropdown from "@/components/YearDropdown";
import ReceiptInfo from "@/components/ReceiptInfo";
import Vue from 'vue'
// import StripeElement from '@/components/StripeElement'
let style = {
  base: {
    border: '1px solid #D8D8D8',
    borderRadius: '4px',
    color: "#000",
    width: '400px',
    margin: '20px',
    padding: '20px',
    fontSize: '2em'
  },

  invalid: {
    // All of the error styles go inside of here.
  }

};
let stripe;

function mountElements(key){
  console.log(`mountElements: key = ${key}`)
  // this.$store.state.stripeKey)
  stripe = Stripe(key);
// // let stripe = Stripe(`pk_test_UWB3Uz5xAWTWkF0BznCORJgb`),
return stripe.elements();
// return windows.stripe.elements();
//     card = undefined;
} 
async function getStipeToken(card){
    let result = await stripe.createToken(card)
    return result;
}

export default {
  components: {
    FloatingInput,
    YearDropdown,
    ReceiptInfo,
    // StripeElement
  },
  data(){
      return {
          orderComplete: false,
          // activetab: 1,
          // fields
          requestCharge: {
              name: "",
              email: "",
              amount: 5,
              engravingText: this.engravingText,
              address: {
                street: "",
                city: "",
                state: "",
                zip: "",
              },
              stripeToken: ""
          },
          card: undefined,
          elements: null,
          mystripe: null,
          // card: {
          //     name: '',
          //     number: '',
          //     cvc: '',
          //     exp_month: '',
          //     exp_year: ''
          // },
          // validation
          cardNumberError: null,
          cardCvcError: null,
          cardMonthError: null,
          cardYearError: null,
          cardCheckSending: false,
          cardCheckError: false,
          cardCheckErrorMessage: '',
          cardError: '',

          amts: [5,10,25,50],
          isActive: 5
      }
  },
  // initStripe(){
  //               window.stripe = Stripe('stripe_test_key_here');
  //               var elements = stripe.elements();
  //               var style = {
  //                   base: {
  //                       // Add your base input styles here. For example:
  //                       fontSize: '16px',
  //                       lineHeight: '24px'
  //                   }
  //               };

  //               // Create an instance of the card Element
  //               window.card = elements.create('card', {style: style});

  //               // Add an instance of the card Element into the `card-element` <div>
  //               window.card.mount('#card-element');

  //           },
    mounted: function () {
      // card = elements.create('card');
      // debugger
      // self.$store.state.meetings.home
      console.log(`store:stripeKey= ${this.$store.state.stripe.stripeKey}`)
      var key = this.$store.state.stripe.stripeKey
      // let elements = mountElements(`pk_test_UWB3Uz5xAWTWkF0BznCORJgb`)
      if (key){
        console.log("mounted elements")
          let elements = mountElements(key)
          if (typeof this.card == "undefined"){
            this.card = elements.create('card', style);
          }
          this.card.mount(this.$refs.card);
      }
  },
  methods: {
    renderCard(key){
      console.log(`renderCard: `)
         this.elements = mountElements(key)
          if (typeof this.card == "undefined"){
            this.card = this.elements.create('card', style);
          }
          if (this.$refs.card){
            this.card.mount(this.$refs.card);
          }
    },
     purchase: function () {
      stripe.createToken(card).then(function(result) {
        if (result.error) {
          self.hasCardErrors = true;
          self.$forceUpdate(); // Forcing the DOM to update so the Stripe Element can update.
          return;
        }
        // Access the token with result.token
        alert(`stripe token  created ${result.token}`)
      });
     },
    submit(){
      this.activetab = 4;
      setTimeout(x => this.activetab = 1, 2000);
    },
    cancel(){
      this.activetab = 1;
      this.resetCharge();
      this.clearCardErrors();
    },
    validateCard(){
          // this.createToken();
      var valid = this.validate();
        if ( valid ){
          alert(`validation true: ${JSON.stringify(this.card, null, 3)}`);
          this.createToken();
        } else {
          alert(`validation error: ${JSON.stringify(this.card, null, 3)}`);

        }
    },
      validate(){
        console.log(`donate validate...........`)
          this.clearCardErrors();
          let valid = true;
          if(!this.card.number){ valid = false; this.cardNumberError = "Card Number is Required"; }
          if(!this.card.cvc){ valid = false; this.cardCvcError = "CVC is Required"; }
          if(!this.card.exp_month){ valid = false; this.cardMonthError = "Month is Required"; }
          if(!this.card.exp_year){ valid = false; this.cardYearError = "Year is Required"; }
        return valid;
      },
      resetCharge(){
        this.requestCharge.name = this.requestCharge.email = this.requestCharge.address.street = this.requestCharge.address.city = this.requestCharge.address.state =
        this.requestCharge.address.zip = '';
        this.requestCharge.stripeToken = null;
         // Clear each Element.
        // this.elements._elements.forEach(function(element) {
        //   element.clear();
        // });
        this.$forceUpdate();
      },
      clearCardErrors(){
          this.cardNumberError = null;
          this.cardCvcError = null;
          this.cardMonthError = null;
          this.cardYearError = null;
      },
      async createToken() {
        var self = this;
          this.cardCheckError = false;
        //  var element = window.Stripe(this.stripeKey);
        const result = getStipeToken(this.card)
      //   stripe.createToken(card).then(function(result) {
          if (result.error) {
            self.hasCardErrors = true;
            self.$forceUpdate(); // Forcing the DOM to update so the Stripe Element can update.
            self.cardError = result.error.message;
            console.log('error in getting Stripe token: ' + JSON.stringify(result.error, null, 4))
          } else { // Token was created!
            this.requestCharge.stripeToken = result.id;
            console.log('received Stripe token: ' + JSON.stringify(result, null, 4))
            this.cardError = null;
            this.chargeit(this.requestCharge);
          }


          // Access the token with result.token
          // alert(`stripe token  created ${result.token}`)
     //   });


          // window.Stripe.setPublishableKey(this.$store.state.stripeKey);
          // // window.Stripe.setPublishableKey(this.stripeKey);
          // this.cardCheckSending = true;
          // Stripe.createToken(this.card,self.stripeResponseHandler);
      },
      async chargeit(request){
          // Send to our server
          var url = 'http://localhost:8086/charge'
          console.log(`posting request=${JSON.stringify(request, null, 3)}`)
          // comment out for testing
          // comment out for testing
          // comment out for testing
          // comment out for testing
          // var res = await axios.post(url,this.requestCharge, {
            //     headers: {
              //         'Content-Type': 'application/json',
          //             'Access-Control-Allow-Origin': '*', 
          //         }
          // })
          // comment out for testing
          // comment out for testing
          // comment out for testing
          // comment out for testing
          var res1 = {
            data: {
              charged: {
                amount: 30
              }
            }
          }
          // comment out for testing
          // comment out for testing
          // comment out for testing
          if (res1.error){
            console.error(error);
        } else {
          var charged = res1.data.charged;
          console.log(`Order Complete: ${JSON.stringify(charged, null,3)}`)
          this.orderComplete = true;
          // this.$router.push({ path: `order-complete/${charged.id}` })
          //todo  reset form
          this.activetab = 4;
          setTimeout(x => this.activetab = 1, 2000);
          this.resetCharge();
          this.$router.push('thankyou')
        }
      },
      stripeResponseHandler(status, response) {
          // token to create a charge on our server 
          if (response.error) { // Problem!
                          this.cardError = response.error.message;
                          console.log('error in getting Stripe token: ' + JSON.stringify(response.error, null, 4))
          } else { // Token was created!
              this.requestCharge.stripeToken = response.id;
              console.log('received Stripe token: ' + JSON.stringify(response, null, 4))
              this.cardError = null;
              this.chargeit(this.requestCharge);
          }

          // var request = {
          //     name: this.name ? this.name : "anonymous",
          //     email: this.email,
          //     amount: this.amount,
          //     engravingText: this.engravingText,
          //     address: this.address,
          //     card: this.card,
          //     stripeToken: this.stripeToken
          // };

          //     // Send to our server
          // var url = 'http://localhost:8086/charge'
          //     console.log(`posting request=${JSON.stringify(request, null, 3)}`)
          //     axios.post(url,request, {
          //         headers: {
          //             'Content-Type': 'application/json',
          //                 'Access-Control-Allow-Origin': '*', 
          //             }
          //     })
          //         .then((res) => {
          //             var error = res.data.error;
          //             var charged = res.data.charged;
          //             if (error){
          //                 console.error(error);
          //             } else {
          //                 console.log(`Order Complete: ${JSON.stringify(charged, null,3)}`)
          //                 this.orderComplete = true;
          //                 // this.$router.push({ path: `order-complete/${charged.id}` })
          //             }
          //         });
          }
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
    keydone: function(){
      var key = this.$store.state.stripe.stripeKey;
      if (key){
        console.log('keydone is true')
        var self = this;
        Vue.nextTick()
          .then(function () {
              // this function is called when vue has re-rendered the component.
          self.renderCard(key);
        })
        // Vue.nextTick(function () {
        //   // DOM updated
        // })
        return true;
      } else {
        console.log('keydone is false')
        return false;
      }
    },
    activetab: {
      get: function() {
        return this.$store.state.activetab;
      },
      set: function(newValue) {
        this.$store.state.activetab = newValue;
      }
    }
  }
}
</script>

<style scoped>
.donate2  {
  max-width: 80vw;
  margin: 20px auto;
}
/* label{
  margin: 20px;
  padding: 5px;
  font-weight: bold;
} */
.success{
  background: green;
  color: white;
}
.active{
  background: red;
}
.flex-columns{
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
.section{
  flex: 1 1 400px;
  border: 1px solid black;
  /* font-size: 1.8em; */
  background: rgba(236, 229, 229, 0.925);
  /* height: 76vh; */
  max-width: 500px;
  padding: 20px;
}
.section-content{
  display: flex;
  flex-direction: column;
  /* height: 400px; */
  /* border: 1px solid black; */
  padding: 20px;
}
.section-control{
  display: flex;
  justify-content: space-evenly;
}
.section-control button{
  font-size: 1.6rem;
  background: green;
  border: 1px solid black;
  border-radius: 5px;
}
.section-view{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  border: 1px solid black;
  width: 50vw;
  padding: 30px;
  margin-left: 30px;
  background: white;
}.section-view p {
  padding: 0;
  margin: 0;
}
.donate-row{
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  justify-content: space-around;
  border: 1px solid black;
  border-radius: 5px;
  background: #ccc;
  padding: 20px 0 0 0;
}
.donate-view{
  font-size: 3rem;
  width: 100%;
  /* height: 200px; */
  margin: 30px auto;
  padding: 20px;
  color: white;
  border: 1px solid black;
  background: green;
  border-radius: 10px;
  text-align: center;
}
.donate-row button{
  width: 150px;
}
.info-container{
  /* font-size: 1.8rem; */
}
h2 { text-decoration: underline; }
.textarea:not([rows]) { max-height: 110px; min-height: 110px; }
.container { margin-bottom: 30px; }
.column > img { margin-top: 60px; }
.button-field { display: flex; justify-content: center; }
#left-line { margin-top:27px; }
.help-img{
  border-radius: 10px;
  box-shadow: 5px;
  max-width: 400px;
}
/* select,
optgroup,
.input {
    padding: 5px;
    display: block;
    margin: 0 0 10px 0;
} */
/* optgroup{
  margin: 0;
  padding: 0;
}
optgroup option{
  background: red;
  margin: 0;
  padding: 0;
} */
select {
   -webkit-appearance: none;
   -moz-appearance: none;
   appearance: none;
}
.select-month select option{
  background: red;
  padding: 0;
  margin: 0;
  min-height: .4em;
}
.field{
  margin: 10px;
}
.order-complete{
    background: red;
    color: white;
    font-size: 2em;
    text-align: center;
    padding: 20px;
}
@media screen and (max-width: 1024px) { /* Specific to this particular image */
  .help {
  display: none;
  }
}
.aalinks-title{
 /* position: absolute; */
 /* top: 10px; */
 /* left: 0; */
  font-size: 40px;
  color: red;
  text-shadow: -3px 0px 6px rgba(0, 0, 0, 0.83);
}
.cover{
  background: #000;
  z-index: -2;
  height: 500vh;
}
.error {
  border: 2px solid red;
}
.error-text{color: red;}
.req{ color: red;}

/* stripe card  */
 .stripe-element{
      width: 90vw;

    }
    .StripeElement {
      box-sizing: border-box;

      /* height: 140px;
      width: 400px; */
      margin-top: 20px;
      font-size: 2em;

      padding: 10px 12px;

      border: 1px solid black;
      border-radius: 4px;
      background-color: white;

      box-shadow: 0 1px 3px 0 #e6ebf1;
      -webkit-transition: box-shadow 150ms ease;
      transition: box-shadow 150ms ease;
    }

    .StripeElement--focus {
      box-shadow: 0 1px 3px 0 #cfd7df;
    }

    .StripeElement--invalid {
      border-color: #fa755a;
    }

    .StripeElement--webkit-autofill {
      background-color: #fefde5 !important;
    }
    @media screen and (max-width: 468px) { /* Specific to this particular image */
     .donate2  {
        max-width: 100vw;
        margin: 5px 5px;
      }
      .section{
        background: rgba(236, 108, 108, 0.925);
        /* height: 76vh; */
        max-width: 100%;
        padding: 3px;
      }
    }
</style>
