<template>
<div class="tools-test">
    <div class="aaflex-tools-days" @click="setDay">
        <button v-for="d in dayNames">{{ d }}</button>

        <!-- <button @click="day=0" :class="{ active: day == 0 }">Sun</button>
        <button @click="day=1" :class="{ active: day == 1 }">Mon</button>
        <button @click="day=2" :class="{ active: day == 2 }">Tue</button>
        <button @click="day=3" :class="{ active: day == 3 }">Wed</button>
        <button @click="day=4" :class="{ active: day == 4 }">Thr</button>
        <button @click="day=5" :class="{ active: day == 5 }">Fri</button>
        <button @click="day=6" :class="{ active: day == 6 }">Sat</button>
        <button @click="day=7" :class="{ active: day == 7 }">All</button> -->
    </div>
</div>
    </template>
    
<script>
export default {
    name: 'tools-test',
    // props: ["picked", "mileMax","dayPick","selected"],
    props: ["meetings"],
    data() {
        return {
            options: false,
            day: "",
            dayPick: "",
            dayNames: ["Sun","Mon","Tue","Wed","Thr","Fri","Sat","All"],

        }
    },
    methods: {
        setDay(e){
            debugger
            console.log("day clicked: " + e.target.innerHTML);
            this.dayPick = e.target.innerHTML;
            this.newMeetings();
        },
    newMeetings: function(){
        var self = this;
        var newMeetings = this.meetings.filter(function(m){
          return m.day == self.dayNames.indexOf(self.dayPick)    // 
        })
        console.log("newMeetings length = " + newMeetings.length)
        }
    },// end methods
    created(){
        console.log("created tooltest")
    }
}
</script>
    
    <!-- Add "scoped" attribute to limit CSS to this component only -->
    <style>
    </style>