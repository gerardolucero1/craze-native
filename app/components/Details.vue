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

    .nombre{
        font-size: 14px;
        font-weight: bold;
        margin-left: 20px;
    }

    .precio{
        font-size: 24px;
        font-weight: bold;
        margin-left: 20px;
    }

    .talla{
        width: 80px;
        height: 80px;
        background-color: white;
        border-width: 1 1 1 1;
        border-color: rgba(218, 218, 218, 1);
        border-radius: 0;
    }

    .tamano{
        font-size: 12px;
        color: rgba(218, 218, 218, 1);
    }

    .separator-line{
        border-width: 1 0 0 0;
        border-color: rgba(218, 218, 218, 1);
        width: 90%;
    }
</style>

<template>
    <Page actionBarHidden="true">
        <GridLayout rows="*, 60">
            <ScrollView row="0" v-if="garment != null">
                <WrapLayout>
                    <StackLayout class="banner">
                        <Image class="imagen" :src="garment.foto" stretch="aspectFill" />
                    </StackLayout>

                    <StackLayout>
                        <Label class="nombre" :text="garment.nombre" />

                        <GridLayout columns="*, *" rows="60">
                            <FlexboxLayout col="0" row="0" justifyContent="flex-start" alignItems="center">
                                <Label class="precio" :text="garment.precio" />
                            </FlexboxLayout>

                            <FlexboxLayout col="1" row="0" justifyContent="space-around">
                                <Image class="btn-options" src="~/assets/images/icono1.png" />
                                <Image class="btn-options" src="~/assets/images/icono2.png" />
                                <Image class="btn-options" src="~/assets/images/icono3.png" />
                                <Image class="btn-options" src="~/assets/images/icono4.png" />
                            </FlexboxLayout>
                        </GridLayout>

                        <StackLayout orientation="horizontal" marginLeft="10">
                            <FlexboxLayout alignItems="center" justifyContent="center" class="talla" v-for="(item, index) in garment.tallas" :key="index">
                                <Label class="tamano" :text="item" />
                            </FlexboxLayout>
                        </StackLayout>

                        <StackLayout marginTop="20" marginBottom="20" class="separator-line" />

                        
                    </StackLayout>
                </WrapLayout>
                    
            </ScrollView>

            <StackLayout row="1" orientation="horizontal">
                <GridLayout columns="*, *, *, *" rows="60" class="navigation">
                    <FlexboxLayout alignItems="center" justifyContent="center" row="0" col="0">
                        <Image class="btn-navigation" src="~/assets/images/home.png" @tap="goToHome" />
                    </FlexboxLayout>
                    <FlexboxLayout alignItems="center" justifyContent="center" row="0" col="1">
                        <Image class="btn-navigation" src="~/assets/images/gancho.png" @tap="goToCloset" />
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

        async getGarment(){
            try {
                let response = await firebase.firestore.collection('prendas')
                                                        .doc(this.id)
                                                        .get()

                if(response.exists){
                    this.garment = response.data()
                }
            } catch(e) {
                console.log(e);
            }   
        }
    },
}
</script>









