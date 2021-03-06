/**
 * Created by Brians Desktop on 12/25/2016.
 */
var express = require('express');
var router  = express.Router();
//var Order = require('../models/order');
var stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

//  *************   start up code  *******************
// // Routes
router.post('/', function (req, res) { // route = 'http://localhost:8086/charge'
  console.log('apicharge route................')
  console.log(req.body); //This prints the JSON document received (if it is a JSON document)
  // res.json(req.body);
  (async () => {
    const charge = await stripe.charges.create({
      amount: req.body.amount * 100, //1000, // Amount in cents
      currency: "usd",
      source: req.body.stripeToken,
      description: "Donation",
    });
    res.status(200).json({
      message: 'Welcome to the project-name api',
      charged: charge
      });
    })();
      
      
      // var charge = stripe.charges.create({
        //   amount: req.body.amount * 100, //1000, // Amount in cents
        //   currency: "usd",
        //   source: req.body.stripeToken,
        //   description: "Donation",
        //   metadata: {'email': req.body.email}
        // }, function(err, charge) {
          //   if (err && err.type === 'StripeCardError') {
            //     // The card has been declined
            //     console.log('charge error.................')
            //   } else {
              //     console.log('charge created: ' + JSON.stringify(charge, null, 2))
              
              //     var order = new Order({
                //           email: req.body.email,
                //           cart: {"donation": req.body.amount},//cart,
                //           address: "unknown",//req.body.address,
                //           name: req.body.name,
                //           paymentId: charge.id
                //       });
                //       order.save(function(err, result) {
                  //         console.log("error=" + err)
                  //         console.log("result=" + result)
                  //         //  req.flash('success', 'Successfully bought product!');
                  //         //  req.session.cart = null;
                  //         //  res.redirect('/');
                  //       });
                  
                  
                  //     res.status(200).json({
                    //       message: 'Welcome to the project-name api',
                    //       charged: charge
                    //     });
                    //   }
                    // });
                    
                    
                  })
                  
                  function listTransactions(){
                    stripe.balance.listTransactions({ limit: 10 }, function(err, transactions) {
                      if (err){
                        console.log(`stripe.balance.listTransactions: ${err}`)
                      }
                      // asynchronously called
                      console.log("\n\n\n  automatic listing of last 3 transaction on stripe balance   *************************************************")
                      transactions.data.forEach(function(element, i) {
                        var date = new Date(element.created * 1000)
                        console.log("\n\n  ****** transaction " + i + "  amount= " + element.amount / 100 + "  Date= " + date +"***********************\n")
                        // console.log(JSON.stringify(element, null, 3))
                      });
                      
                    });
                  }
                  module.exports = router;
                  