import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Meetings from '@/components/meetings'
import addSimpleMeeting from '@/components/addSimpleMeeting'
import addMeeting from '@/components/addmeeting'
import MeetingsList from '@/components/meetinglist'
//import ResponsiveForm from '@/components/acmeform'
import TestResponsiveForm from '@/components/TestResponsiveForm'
import Donate from '@/components/Donate2'
import AMeeting from '@/components/ameeting'
import ThankYou from '@/components/ThankYou'
// import SingleMeeting from '@/components/SingleMeeting'
import Meeting from '@/components/Meeting'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/donate',
      name: 'donate',
      component: Donate
    },
    {
      path: '/thankyou',
      name: 'thankyou',
      component: ThankYou
    },
    // {
    //   path: "/:product",
    //   name: "Product",
    //   props: true,
    //   component: Product
    // },
    {
      path: '/responsiveform',
      name: 'contactform',
      component: TestResponsiveForm
    },
    {
      path: '/addmeeting',
      name: 'add-meeting',
      component: addSimpleMeeting
      //  component: addMeeting
    },
    {
      path: '/meetings',
      name: 'Meetings',
      component: Meetings
    },
    {
      path: '/ameeting',
      name: 'ameeting',
      component: AMeeting,
      props: true
    },
    {
      path: '/meetinglist',
      name: 'MeetingList',
      component: MeetingsList
    },
    {
      path: '/meeting/:id',
      name: 'meeting',
      component: Meeting
    },
    // {
    //   // path: '/single',
    //   path: '/:meetingpath',
    //   name: 'single',
    //   props: true,
    //   // props: (route) => ({
    //   //     meeting: meeting,
    //   //     ...route.params
    //   // }),
    //   component: SingleMeeting
    // },
  ]
})

