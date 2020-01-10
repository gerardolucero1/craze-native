<style>
	.header-bar{
        background-color: white;
    }

    .header-text{
        color: black;
        font-weight: bold;
        font-size: 18px;
    }

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
	<Page actionBarHidden="false">
		<ActionBar class="header-bar" title="CRAZE">
            <StackLayout orientation="horizontal"
                ios:horizontalAlignment="center"
                android:horizontalAlignment="left">
                <!-- <Image width="40" src="~/assets/images/logo.png" class="action-image"></Image> -->
                <Label class="header-text" text="Mapa"></Label>
            </StackLayout>
        </ActionBar>

        <GridLayout rows="*, 60">
            <ScrollView row="0">
                <WrapLayout>
					<StackLayout>
						<!-- <Image class="imagen" margin="20" android:borderRadius="20" androidElevation="5" android:backgroundColor="white" src="https://pbs.twimg.com/media/D4BagvuXoAAE69R.jpg" stretch="aspectFill" /> -->
						
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

export default{
	name: 'Map',

	data(){
		return{

		}
	},

	mounted(){

	},

	computed:{

	},

	methods:{
		goToHome(){
            this.$navigateTo(Home)
        },

        goToCloset(){
            this.$navigateTo(Closet)
        },
	}
}
</script>