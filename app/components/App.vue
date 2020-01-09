<style scoped>
    .page{
        align-items: center;
        flex-direction: column;
        background-image: url('~/assets/images/fondo.png');
        background-position: center;
        background-size: cover;
    }

    .bloque{
        margin: 20px;
    }

    .btn-inicio{
        width: 80%;
        padding: 5px 20px;
        font-weight: bold;
        font-family: "Roboto";
    }
</style>

<template>
    <Page actionBarHidden="true">
		<FlexboxLayout class="page">
            <StackLayout>
                <Button class="btn-inicio" text="INICIAR SESION" @tap="goToLogin" />
            </StackLayout>

            <StackLayout orientation="horizontal">
                <StackLayout class="bloque">
                    <Image src="~/assets/images/google.png" stretch="none" />
                </StackLayout>
                <StackLayout class="bloque">
                    <Image src="~/assets/images/facebook.png" stretch="none" />
                </StackLayout>
            </StackLayout>
        </FlexboxLayout>
	</Page>
</template>

<script>
//Firebase
const firebase = require("nativescript-plugin-firebase")

//Vuex
import { store } from 'vuex'

//Pages
import Home from './Home.vue'
import Login from './user/Login.vue'

export default {
    name: 'Home',

    data(){
        return{
            prendas: [],
        }
    },

    mounted() {
        
    },

    methods: {
        goToLogin(){
            firebase.getCurrentUser()
                  .then(async user => {
                    if(user){
                        let response = await firebase.firestore
                                                .collection('usuarios')
                                                .doc(user.uid)
                                                .get()
                        
                        if(response.exists){
                            this.$store.commit('updateUser', response.data())
                            this.$navigateTo(Home) 
                        }
                    }else{
                        this.$navigateTo(Login)
                    }
                  })
                  .catch(error => {
                        this.$navigateTo(Login)
                  })

            
        },
        
        async logginGoogle(){
            try{
                let response = await firebase.login({
                    type: firebase.LoginType.GOOGLE,
                })

                if(response){
                    console.log(JSON.stringify(response))
                }
            }
            catch(e){
                console.log(e)
            }
        },
 
    },
}
</script>