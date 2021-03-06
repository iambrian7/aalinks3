<template>
  <div class="responsive-form">
<h2>Responsive Form</h2>
<p>Resize the browser window to see the effect. When the screen is less than 600px wide, make the two columns stack on top of each other instead of next to each other.</p>
<button @click="state = !state">Toggle</button>
<div class="container">
  <form action="#" v-if="state">
    <div class="row">
        <div class="column is-12 field" :class="{error: errors.has('email')}">
            <label class="label" for="email">Email</label>
            <p :class="{ 'control': true }">
                <input v-validate="'required|email'" :class="{'input': true, 'is-danger': errors.has('email') }" name="email" type="text" placeholder="Email">
                <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
            </p>
        </div>
    </div>
    <div class="row">
      <div class="col-25">
        <label for="fname">First Location</label>
      </div>
      <div class="col-75">
        <input type="text" id="fname" name="location" placeholder="Your location.." v-model="testAddress.location">
      </div>
    </div>
    <div class="row">
      <div class="col-25">
        <label for="lname">Last Name</label>
      </div>
      <div class="col-75">
        <input type="text" id="lname" name="lastname" placeholder="Your last name..">
      </div>
    </div>
    <div class="row">
      <div class="col-25">
        <label for="country">Country</label>
      </div>
      <div class="col-75">
        <select id="country" name="country">
          <option value="australia">Australia</option>
          <option value="canada">Canada</option>
          <option value="usa">USA</option>
        </select>
      </div>
    </div>
    <div class="row">
      <div class="col-25">
        <label for="subject">Subject</label>
      </div>
      <div class="col-75">
        <textarea id="subject" name="subject" placeholder="Write something.." style="height:200px"></textarea>
      </div>
    </div>
    <div class="row">
      <input type="submit" value="Submit">
    </div>
  </form>

  <form action="#" v-if="!state">
      <div class="row">
        <div class="col-25">
          <label for="fname">Meeting Name...................</label>
        </div>
        <div class="col-75">
          <input type="text" id="fname" name="location" placeholder="Your location.." v-model="testAddress.meeting_name">
        </div>
      </div>
      <div class="row">
        <div class="col-25">
          <label for="lname">Last Name</label>
        </div>
        <div class="col-75">
          <input type="text" id="lname" name="lastname" placeholder="Your last name..">
        </div>
      </div>
      <div class="row">
        <div class="col-25">
          <label for="country">Country</label>
        </div>
        <div class="col-75">
          <select id="country" name="country">
            <option value="australia">Australia</option>
            <option value="canada">Canada</option>
            <option value="usa">USA</option>
          </select>
        </div>
      </div>
      <div class="row">
        <div class="col-25">
          <label for="subject">Subject</label>
        </div>
        <div class="col-75">
          <textarea id="subject" name="subject" placeholder="Write something.." style="height:200px"></textarea>
        </div>
      </div>
      <div class="row">
        <input type="submit" value="Submit">
      </div>
    </form>
    <h1>Test form for vee-validation</h1>
    <form>
        <div class="form-group row no-gutters">
            <div v-bind:class="{'col-6': true, 'has-danger': errors.has('firstName')}">
                <input id="firstName" name="firstName" type="text" class="form-control" placeholder="First Name" v-model="firstName" v-validate="'required|min:2'">
                <span class="form-control-feedback" v-if="errors.has('firstName')">{{errors.first('firstName')}}</span>
            </div>
            <div v-bind:class="{'col-6': true, 'has-danger': errors.has('lastName')}">
                <input id="lastName" name="lastName" type="text" class="form-control" placeholder="Last Name" v-model="lastName" v-validate="'required|min:2'">
                <span class="form-control-feedback" v-if="errors.has('lastName')">{{errors.first('lastName')}}</span>
            </div>
        </div>
        <div v-bind:class="{'form-group': true, 'has-danger': errors.has('email')}">
            <input id="email" name="email" type="email" class="form-control" placeholder="Your email address" v-model="email" v-validate="'required|email'">
            <span class="form-control-feedback" v-if="errors.has('email')">{{errors.first('email')}}</span>
        </div>
        <div v-bind:class="{'form-group': true, 'has-danger': errors.has('password')}">
            <input id="password" name="password" type="password" class="form-control" placeholder="Choose a password" v-model="password" v-validate="'required|min:8|max:32'">
            <span class="form-control-feedback" v-if="errors.has('password')">{{errors.first('password')}}</span>
        </div>
        <div class="form-group">
            <button class="btn btn-primary" type="button" v-on:click="signUp">Sign Up</button>
        </div>
    </form>
</div>
  </div>
</template>

<script>
export default {
  name: 'reponsive-form',
  props: ["testAddress"],
  data () {
    return {
      state: true,
      msg: 'Welcome to Your Vue.js App',
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    }
  },
  methods: {
    	signUp: function(e) {
        	console.log("signed up..................................")
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
* {
    box-sizing: border-box;
}
span.error {
  color: rgb(255, 0, 0);
}
input[type=text], select, textarea{
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    resize: vertical;
}

label {
    padding: 12px 12px 12px 0;
    display: inline-block;
}

input[type=submit] {
    background-color: #4CAF50;
    color: white;
    padding: 12px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    float: right;
}

input[type=submit]:hover {
    background-color: #45a049;
}

.container {
    border-radius: 5px;
    background-color: #f2f2f2;
    padding: 20px;
}

.col-25 {
    float: left;
    width: 25%;
    margin-top: 6px;
}

.col-75 {
    float: left;
    width: 75%;
    margin-top: 6px;
}

/* Clear floats after the columns */
.row:after {
    content: "";
    display: table;
    clear: both;
}

/* Responsive layout - when the screen is less than 600px wide, make the two columns stack on top of each other instead of next to each other */
@media (max-width: 600px) {
    .col-25, .col-75, input[type=submit] {
        width: 100%;
        margin-top: 0;
    }
}

</style>
