import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Meetings from '@/components/meetings'
import addSimpleMeeting from '@/components/addSimpleMeeting'
import MeetingsList from '@/components/meetinglist'
import Test from '@/components/test'
import Donate from '@/components/Donate2'
import AMeeting from '@/components/ameeting'
import ThankYou from '@/components/ThankYou'
import Meeting from '@/components/Meeting'
import TestResponsiveForm from '@/components/TestResponsiveForm'
 

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
      path: '/responsiveform',
      name: 'contactform',
      component: TestResponsiveForm
    },
    {
      path: '/meetinglist',
      name: 'MeetingList',
      component: MeetingsList
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    },
    {
      path: '/meeting/:id',
      name: 'meeting',
      component: Meeting
    },
  ]
})
