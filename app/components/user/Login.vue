<style scoped>
    .btn-form{
        font-size: 13px;
        font-weight: bold;
        margin: 10px;
    }

    .btn-login{
        width: 95%;
        padding: 10px;
        background-color: black;
        color: white;
    }

    .forget-password{
        font-size: 12px;
    }

    .input-form{
        width: 90%;
    }
</style>

<template>
    <Page actionBarHidden="true">
        <StackLayout horizontalAlignment="center" verticalAlignment="center">
            <GridLayout columns="*, *" rows="auto, auto">
                <FlexboxLayout row="0" col="0" class="selector" flexDirection="column" alignItems="center" justifyContent="center">
                    <Label class="btn-form" text="INICIAR SESION" />
                    <Image class="separador" src="~/assets/images/separador.png" stretch="none" />
                </FlexboxLayout>

                <FlexboxLayout row="0" col="1" class="selector" alignItems="center" justifyContent="center">
                    <Label class="btn-form" text="REGISTRO" @tap="goToRegister" />
                </FlexboxLayout>
            </GridLayout> 

            <StackLayout class="form-login" marginTop="40">
                <TextField v-model="user.email" class="input-form" :text="user.email" hint="Correo electronico" />
                <TextField v-model="user.password" class="input-form" :text="user.password" hint="Contraseña" />

                <FlexboxLayout justifyContent="flex-end">
                    <Label marginRight="20" class="forget-password" text="¿Olvistate tu contraseña?" />
                </FlexboxLayout>
                
                <Button marginTop="50" class="btn-login" text="ENTRAR" @tap="loginEmail" />

                <StackLayout marginTop="20" horizontalAlignment="center" verticalAlignment="center">
                    <Image src="~/assets/images/separador.png" stretch="none" />

                    <StackLayout orientation="horizontal" horizontalAlignment="center">
                        <Image margin="10" src="~/assets/images/google.png" @tap="loginGoogle" stretch="none" />
                        <Image margin="10" src="~/assets/images/facebook.png" @tap="loginFacebook" stretch="none" />
                    </StackLayout>
                </StackLayout>
                
            </StackLayout>
        </StackLayout>
        
    </Page>
</template>

<script>
//Firebase
const firebase = require("nativescript-plugin-firebase")

//Vuex
import { store } from 'vuex'

//Pages
import Register from './Register.vue'
import Home from '../Home.vue'


export default {
    name: 'Login',

    data(){
        return{
            user: {
                email: '',
                password: '',
                uid: '',
            }
        }
    },

    mounted() {
        
    },

    methods: {
        goToRegister(){
            this.$navigateTo(Register)
        },

        async loginEmail(){
            try {
                // statements
                let response = await firebase.login({
                    type: firebase.LoginType.PASSWORD,
                    passwordOptions: {
                        email: this.user.email,
                        password: this.user.password
                    }
                })

                if(response){
                    this.user.uid = response.uid

                    this.$store.commit('updateUser', this.user)
                    this.$navigateTo(Home)
                }
            } catch(e) {
                // statements
                console.log(e);
            }
        },

        async loginGoogle(){
            try{
                let response = await firebase.login({
                    type: firebase.LoginType.GOOGLE,
                })

                if(response){
                    console.log(JSON.stringify(response))
                    this.user.uid = response.uid

                    this.$store.commit('updateUser', this.user)
                    this.$navigateTo(Home)
                }
            }
            catch(e){
                console.log(e)
            }
        },

        async loginFacebook(){
            try{
                let response = await firebase.login({
                    type: firebase.LoginType.FACEBOOK,
                    facebookOptions: {
                      // full list: https://developers.facebook.com/docs/facebook-login/permissions/
                      scope: ["public_profile", "email"] // optional: defaults to ['public_profile', 'email']
                    }
                })

                if(response){
                    console.log(JSON.stringify(response))
                    this.user.uid = response.uid

                    this.$store.commit('updateUser', this.user)
                    this.$navigateTo(Home)
                }
            }
            catch(e){
                console.log(e)
            }
        },
    },
}
</script>