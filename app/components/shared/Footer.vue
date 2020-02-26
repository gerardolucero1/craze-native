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
    <GridLayout columns="*, *, *, *" rows="60" class="navigation">
        <FlexboxLayout alignItems="center" justifyContent="center" row="0" col="0">
            <Image class="btn-navigation" src="~/assets/images/home.png" @tap="goToHome" />
        </FlexboxLayout>
        <FlexboxLayout alignItems="center" justifyContent="center" row="0" col="1">
            <Image class="btn-navigation" src="~/assets/images/gancho.png" width="50" @tap="goToCloset" />
        </FlexboxLayout>
        <FlexboxLayout alignItems="center" justifyContent="center" row="0" col="2">
            <Image class="btn-navigation" src="~/assets/images/tiendas.png" @tap="goToMap" />
        </FlexboxLayout>
        <FlexboxLayout alignItems="center" justifyContent="center" row="0" col="3">
            <Image class="btn-navigation" src="~/assets/images/config.png" @tap="goToSettings" />
        </FlexboxLayout>
    </GridLayout>
</template>

<script>
//Pages
import Home from './../Home.vue'
import Closet from './../Closet.vue'
import Mapa from './../Map.vue'
import Settings from './../Settings.vue'

export default {
    name: 'Footer',

    data(){
        return{

        }
    },

    methods: {
        goToHome(){
            this.$navigateTo(Home, {
                animated: true,
                transition: {
                    name: 'fade',
                },
            })
        },

        goToCloset(){
            this.$navigateTo(Closet, {
                animated: true,
                transition: {
                    name: 'fade',
                },
            })
        },

        goToMap(){
            this.$navigateTo(Mapa, {
                animated: true,
                transition: {
                    name: 'fade',
                },
            })
        },

        goToSettings(){
            this.$navigateTo(Settings, {
                animated: true,
                transition: {
                    name: 'fade',
                },
            })
        },
    }
}
</script>