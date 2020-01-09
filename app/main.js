import VueDevtools from 'nativescript-vue-devtools'
import Vue from 'nativescript-vue'
import App from './components/App'
import BottomNavigationBar from 'nativescript-material-bottomnavigationbar/vue'


import store from './store'

var firebase = require("nativescript-plugin-firebase");

firebase.init({

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
Vue.use(BottomNavigationBar)

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')

new Vue({
    store,
    render: h => h('frame', [h(App)])
}).$start()