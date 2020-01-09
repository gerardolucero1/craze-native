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
</style>

<template>
    <Page actionBarHidden="true">
        <GridLayout rows="*, 60">
            <ScrollView row="0">
                <Label text="Closet" />
            </ScrollView>

            <StackLayout row="1" orientation="horizontal">
                <GridLayout columns="*, *, *, *" rows="60" class="navigation">
                    <FlexboxLayout alignItems="center" justifyContent="center" row="0" col="0">
                        <Image class="btn-navigation" src="~/assets/images/home.png" @tap="goToHome" />
                    </FlexboxLayout>
                    <FlexboxLayout alignItems="center" justifyContent="center" row="0" col="1">
                        <Image class="btn-navigation" src="~/assets/images/gancho.png" />
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
    name: 'Closet',

    data(){
        return{
        	clothes: [], 
        }
    },

    mounted() {

    },

    methods: {
        goToHome(){
            this.$navigateTo(Home)
        },
    },
}
</script>









