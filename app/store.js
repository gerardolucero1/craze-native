import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
	  	user: null,
      token: null,
      settings: null,
	},
  	mutations: {
  		updateUser(state, payload){
  			state.user = payload
  		},

      updateIndex(state, payload){
        state.user.index = payload
      },

      updateToken(state, payload){
        state.token = payload
      },

      updateSettings(state, payload){
        state.settings = payload
      }
	},
  	actions: {

  	}
});