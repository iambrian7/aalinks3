<template>
<div class="stripe-element">

  <div ref="card" id="StripeElement" class="StripeElement">

  </div>
  <v-btn color="error" v-on:click="purchase">Purchase</v-btn>

</div>
</template>

<script>
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

let stripe = Stripe(`pk_test_UWB3Uz5xAWTWkF0BznCORJgb`),
    elements = stripe.elements(),
    card = undefined;

export default {
  name: "stripeElement",
  methods: {
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
    }
  },
  mounted: function () {
    // card = elements.create('card');
    // debugger
    console.log(`StripeElement.vue: mount: ${JSON.stringify(card,null,3)}`)
    if (typeof card == "undefined"){
      card = elements.create('card', style);
    }
    card.mount(this.$refs.card);
  }
};
</script>
<style>
    /**
    * The CSS shown here will not be introduced in the Quickstart guide, but shows
    * how you can use CSS to style your Element's container.
    */
    .stripe-element{
      width: 90vw;

    }
    .StripeElement {
      box-sizing: border-box;

      height: 140px;
      width: 400px;
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
</style>