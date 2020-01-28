import VueDevtools from 'nativescript-vue-devtools'
import Vue from 'nativescript-vue'
import App from './components/App'

import * as platform from 'platform'

import { handleOpenURL } from 'nativescript-urlhandler';

if (platform.isIOS) { 
  GMSServices.provideAPIKey("AIzaSyBpGZdpD4kaH1T5ZMZFyZL1wok4ySkniu8")
}


import store from './store'

var firebase = require("nativescript-plugin-firebase")
var SocialShare = require("nativescript-social-share")
var imageSourceModule = require("tns-core-modules/image-source")

firebase.init({
    showNotifications: true,
    showNotificationsWhenInForeground: true,

    onPushTokenReceivedCallback: (token) => {
        console.log('[Firebase] onPushTokenReceivedCallback:', { token });
        store.commit('updateToken', token)
    },

    onMessageReceivedCallback: (message) => {
        console.log('[Firebase] onMessageReceivedCallback:', { message });
    }
}).then(
    function() {
        console.log("firebase.init done")
    },
    function(error) {
        console.log("firebase.init error: " + error)
    }
)

firebase.getCurrentUser()
      .then(user => console.log("User uid: " + user.uid))
      .catch(error => console.log("Trouble in paradise: " + error))

Vue.use(VueDevtools, { host: '192.168.1.147' })

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')

Vue.registerElement('MapView', ()=> require('nativescript-google-maps-sdk').MapView)

new Vue({
    store,
    render: h => h('frame', [h(App)])
}).$start()