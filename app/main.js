// Core
import VueDevtools from 'nativescript-vue-devtools'
import * as application from "tns-core-modules/application";
import { AndroidApplication, AndroidActivityBackPressedEventData } from "tns-core-modules/application"
import { isAndroid } from "tns-core-modules/platform";
import * as platform from 'tns-core-modules/platform'
import { handleOpenURL, AppURL } from 'nativescript-urlhandler'

// Pages
import Vue from 'nativescript-vue'
import App from './components/App'
import Home from './components/Home'
import Footer from './components/shared/Footer'

// Vuex
import store from './store'

var firebase = require("nativescript-plugin-firebase")
// var SocialShare = require("nativescript-social-share")
// var imageSourceModule = require("tns-core-modules/image-source")

// Inicializar Firebase
firebase.init({
    showNotifications: true,
    showNotificationsWhenInForeground: true,

    // Notifiaciones push
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

// Obtener el usuario actual logeado
firebase.getCurrentUser()
      .then(async user => {
        let response = await firebase.firestore
                                    .collection('usuarios')
                                    .doc(user.uid)
                                    .get()
        store.commit('updateUser', response.data())
      })
      .catch(error => console.log("Problemas en el paraiso: " + error))


// Vue dev-tools
Vue.use(VueDevtools, { host: '192.168.1.147' })

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')

//Registrar los componentes externos
Vue.component('Footer', Footer)
Vue.registerElement('MapView', ()=> require('nativescript-google-maps-sdk').MapView)

new Vue({
    mounted(){
        //BackButton
        if(isAndroid){
            let that = this

            application.android.on(AndroidApplication.activityBackPressedEvent, (AndroidActivityBackPressedEventData) => {
                console.log('Back Button pressed')
                // AndroidActivityBackPressedEventData.cancel = true
                // that.$navigateTo(Home, {
                //     animated: true,
                //     transition: {
                //         name: 'fade',
                //     },
                // })
            })
        }

        //DepLinks
        handleOpenURL((appURL) => {
            
            let URLPath = appURL.path
            let arrayURL = URLPath.split('/')

            this.$navigateTo(Details, {
                props:{
                    id: arrayURL[2],
                },
                animated: true,
                transition: {
                    name: 'fade',
                },
            })
        });
    },
    store,
    render: h => h('frame', [h(App)])
}).$start()