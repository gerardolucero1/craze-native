<style scoped>
    .navigation{
        width: 100%;
        height: 100%;
        left: 0;
        bottom: 0;
        background-color: white;
        border-width: 1 0 0 0;
        border-color: rgba(218, 218, 218, 1);
        border-radius: 0;
    }

    .btn-navigation{
        width: 90px;
    }

    .btn-options{
        width: 70px;
    }

    /*.imagen{
        border-width: 0 0 2 0;
        border-color: rgba(218, 218, 218, 1);
    }*/

    .container{
        width: 90%;
        margin-left: 5%;
    }

    .nombre{
        font-size: 14px;
        font-weight: bold;
        margin-left: 0;
    }

    .precio{
        font-size: 24px;
        font-weight: bold;
        margin-left: 0;
    }

    .talla{
        width: 80px;
        height: 80px;
        background-color: white;
        border-width: 1 1 1 1;
        border-color: rgba(218, 218, 218, 1);
        border-radius: 0;
        margin-right: 20px;
    }

    .tamano{
        font-size: 12px;
        color: rgba(218, 218, 218, 1);
    }

    .separator-line{
        border-width: 1 0 0 0;
        border-color: rgba(218, 218, 218, 1);
        width: 950%;
    }

    .box{
        border-width: 0 0 1 0;
        border-color: rgba(218, 218, 218, 1);
        margin-bottom: 30px;
    }
</style>

<template>
    <Page actionBarHidden="true">
        <GridLayout rows="*, 60">
            <ScrollView row="0" v-if="garment != null">
                <WrapLayout>
                    <StackLayout class="banner">
                        <Image class="imagen" margin="20" android:borderRadius="20" androidElevation="5" android:backgroundColor="white" :src="garment.foto" stretch="aspectFill" />
                    </StackLayout>

                    <StackLayout class="container">
                        <Label class="nombre" :text="garment.nombre" />

                        <GridLayout columns="*, *" rows="60">
                            <FlexboxLayout col="0" row="0" justifyContent="flex-start" alignItems="center">
                                <Label class="precio" :text="'$' + garment.precio" />
                            </FlexboxLayout>

                            <FlexboxLayout col="1" row="0" justifyContent="space-around" marginRight="-10">
                                <Image class="btn-options" src="~/assets/images/icono1.png" />
                                <Image class="btn-options" src="~/assets/images/icono2.png" />
                                <Image class="btn-options" src="~/assets/images/icono3.png" />
                                <Image class="btn-options" src="~/assets/images/icono4.png" />
                            </FlexboxLayout>
                        </GridLayout>

                        <StackLayout orientation="horizontal">
                            <FlexboxLayout alignItems="center" justifyContent="center" class="talla" v-for="(item, index) in garment.tallas" :key="index">
                                <Label class="tamano" :text="item" />
                            </FlexboxLayout>
                        </StackLayout>

                        <StackLayout marginTop="20" marginBottom="20" class="separator-line" />

                        <StackLayout orientation="vertical" marginBottom="20">
                            <StackLayout class="box">
                                <Label fontSize="13" text="DESCRIPCION" @tap="changeControl(1)" />
                                <StackLayout v-if="control == 1">
                                    <TextView border="0" margin="0" :text="garment.descripcion" editable="false" />
                                </StackLayout>
                            </StackLayout>
                            

                            <StackLayout class="box">
                                <Label fontSize="13" text="DISPONIBILIDAD" @tap="changeControl(2)" />
                                <StackLayout v-if="control == 2">
                                    <TextView margin="0" editable="false" text="Disponible hasta agotar existencia" />
                                </StackLayout>
                            </StackLayout>

                            <StackLayout class="box">
                                <Label fontSize="13" text="DIRECCION DE RECOLECCION" @tap="changeControl(3)" />
                                <StackLayout v-if="control == 3">
                                    <TextView margin="0" editable="false" text="boutique.direccion" />
                                </StackLayout>
                            </StackLayout>
                        </StackLayout>
                    </StackLayout>
                </WrapLayout>
                    
            </ScrollView>

            <StackLayout row="1" orientation="horizontal">
                <GridLayout columns="*, *, *, *" rows="60" class="navigation">
                    <FlexboxLayout alignItems="center" justifyContent="center" row="0" col="0">
                        <Image class="btn-navigation" src="~/assets/images/home.png" @tap="goToHome" />
                    </FlexboxLayout>
                    <FlexboxLayout alignItems="center" justifyContent="center" row="0" col="1">
                        <Image class="btn-navigation" src="~/assets/images/gancho.png" width="50" @tap="goToCloset" />
                    </FlexboxLayout>
                    <FlexboxLayout alignItems="center" justifyContent="center" row="0" col="2">
                        <Image class="btn-navigation" src="~/assets/images/tiendas.png" />
                    </FlexboxLayout>
                    <FlexboxLayout alignItems="center" justifyContent="center" row="0" col="3">
                        <Image class="btn-navigation" src="~/assets/images/config.png" />
                    </FlexboxLayout>
                </GridLayout>
            </StackLayout>
        </GridLayout>
    </Page>
</template>

<script>
//Firebase
const firebase = require("nativescript-plugin-firebase")

//Vuex
import { store } from 'vuex'

//Pages
import Home from './Home.vue'
import Closet from './Closet.vue'

export default {
    name: 'Details',

    props:[
        'id'
    ],

    data(){
        return{
        	garment: null,
            boutique: null,
            control: 1,
        }
    },

    mounted() {
        this.getGarment()
    },

    methods: {
        goToHome(){
            this.$navigateTo(Home)
        },

        goToCloset(){
            this.$navigateTo(Closet)
        },

        changeControl(id){
            this.control = id
        },

        async getGarment(){
            try {
                let response = await firebase.firestore.collection('prendas')
                                                        .doc(this.id)
                                                        .get()

                if(response.exists){
                    this.garment = response.data()
                }
            }
            catch(e) {
                console.log(e);
            }
            finally{
                this.getStore()
            } 
        },

        async getStore(){
            try {
                let response = await firebase.firestore.collection('boutiques')
                                                        .doc(this.garment.boutique)
                                                        .get()

                if(response.exists){
                    this.boutique = response.data()
                }   
            } catch(e) {
                // statements
                console.log(e);
            }
        }
    },
}
</script>









