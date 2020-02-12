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
                <FlexboxLayout row="0" col="0" class="selector" alignItems="center" justifyContent="center">
                    <Label class="btn-form" text="INICIAR SESION" @tap="goToLogin" />
                </FlexboxLayout>

                <FlexboxLayout row="0" col="1" class="selector" flexDirection="column" alignItems="center" justifyContent="center">
                    <Label class="btn-form" text="REGISTRO" />
                    <Image class="separador" src="~/assets/images/separador.png" stretch="none" />
                </FlexboxLayout>
            </GridLayout> 

            <StackLayout class="form-login" marginTop="40">
                <TextField v-model="user.email" class="input-form" hint="Correo electronico" keyboardType="email" />
                <TextField ref="pw" v-model="user.password" class="input-form" hint="Contraseña" secure="true" />

                <GridLayout columns="*, *" rows="40">
                    <Label col="0" row="0" marginLeft="20" class="forget-password" text="Ver/Ocultar" @tap="showHidePassword" />
                </GridLayout>
                
                <Button marginTop="50" class="btn-login" text="REGISTRARSE" @tap="createUser" />

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
import Inicio from '../App.vue'
import Home from '../Home.vue'
import Login from './Login.vue'

export default {
    name: 'Register',

    data(){
        return{
            user: {
                email: '',
                password: '',
                uid: '',
            },

            clothes: [],
        }
    },

    mounted() {
        
    },

    methods: {
        goToLogin(){
            this.$navigateTo(Login)
        },

        async getClothes(){
            try {
                let response = await firebase.firestore.collection('prendas')
                                                .orderBy('id')
                                                .limit(1)
                                                .onSnapshot(query => {
                                                    query.forEach(doc => {
                                                        this.clothes.push(doc.data())
                                                    })
                                                })
                if(response){
                    console.log(this.clothes)
                }
            } catch(e) {
                console.log(e);
            }               
        },

        async createUser(){
            try {
                let response = await firebase.createUser({
                    email: this.user.email,
                    password: this.user.password
                })

                if(response){
                    if(response.additionalUserInfo.isNewUser){
                        let user = {
                            uid: response.uid,
                            index: this.clothes[0].id,
                            nombre: 'User-' + response.uid
                        }

                        firebase.firestore.collection('usuarios').doc(user.uid).set(user)
                    }

                    this.user.uid = response.uid

                    this.$store.commit('updateUser', this.user)
                    this.$navigateTo(Inicio)

                }
            } catch(e) {
                console.log(e);
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
                            index: this.clothes[0].id,
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
                            index: this.clothes[0].id,
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