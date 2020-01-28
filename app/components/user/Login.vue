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
                <TextField v-model="user.email" class="input-form" :text="user.email" hint="Correo electronico" keyboardType="email" />
                <TextField ref="pw" v-model="user.password" class="input-form" :text="user.password" secure="true" hint="Contraseña" />

                <GridLayout columns="*, *" rows="40">
                    <Label col="0" row="0" marginLeft="20" class="forget-password" text="Ver/Ocultar" @tap="showHidePassword" />
                    <Label col="1" row="0" horizontalAlignment="right" marginRight="20" class="forget-password" text="¿Olvistate tu contraseña?" />
                </GridLayout>
                
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

//Toast
const toast = require('nativescript-toasts')

//Pages
import Register from './Register.vue'
import Inicio from '../App.vue'
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
                    this.$navigateTo(Inicio)
                }
            } catch(e) {
                // statements
                if(e == 'Logging in the user failed. com.google.firebase.auth.FirebaseAuthInvalidUserException: There is no user record corresponding to this identifier. The user may have been deleted.'){

                    console.log('USUARIO NO EXISTE')

                    var options = {
                        text: "USUARIO NO EXISTE",
                        duration : toast.DURATION.SHORT,
                        position : toast.POSITION.BOTTOM //optional
                    }
                    toast.show(options)
                }else if(e == 'Logging in the user failed. com.google.firebase.FirebaseTooManyRequestsException: We have blocked all requests from this device due to unusual activity. Try again later. [ Too many unsuccessful login attempts. Please try again later. ]'){
                    console.log('INTENTA MAS TARDE')

                    var options = {
                        text: "INTENTA MAS TARDE",
                        duration : toast.DURATION.SHORT,
                        position : toast.POSITION.BOTTOM //optional
                    }
                    toast.show(options)
                }else{
                    console.log('CONTRASEÑA INCORRECTA')

                    var options = {
                        text: "CONTRASEÑA INCORRECTA",
                        duration : toast.DURATION.SHORT,
                        position : toast.POSITION.BOTTOM //optional
                    }
                    toast.show(options)
                }
            }
        },

        async loginGoogle(){
            try{
                let response = await firebase.login({
                    type: firebase.LoginType.GOOGLE,
                })

                if(response){
                    console.log(JSON.stringify(response.additionalUserInfo.isNewUser))

                    if(response.additionalUserInfo.isNewUser){
                        let user = {
                            uid: response.uid,
                            index: '4NiIMY23iJB4teAc86q1',
                            nombre: response.displayName
                        }

                        firebase.firestore.collection('usuarios').doc(user.uid).set(user)
                    }
                    
                    this.user.uid = response.uid

                    this.$store.commit('updateUser', this.user)
                    this.$navigateTo(Inicio)
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
                })

                if(response){
                    console.log(JSON.stringify(response.additionalUserInfo.isNewUser))

                    if(response.additionalUserInfo.isNewUser){
                        let user = {
                            uid: response.uid,
                            index: '4NiIMY23iJB4teAc86q1',
                            nombre: response.displayName
                        }

                        firebase.firestore.collection('usuarios').doc(user.uid).set(user)
                    }
                    
                    this.user.uid = response.uid

                    this.$store.commit('updateUser', this.user)
                    this.$navigateTo(Inicio)
                }
            }
            catch(e){
                console.log(e)
            }
        },

        showHidePassword(){
            console.log(this.$refs.pw.nativeView.secure)
            this.$refs.pw.nativeView.secure= !this.$refs.pw.nativeView.secure
        }
    },
}
</script>