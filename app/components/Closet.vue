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
                <WrapLayout orientation="horizontal" v-if="clothes.length != 0">
                    <GridLayout padding="0" v-for="(item, index) in clothes" width="50%" height="350">
                        <StackLayout>
                            <Image margin="10" android:borderRadius="5" androidElevation="5" android:backgroundColor="white" :src="item.foto" stretch="aspectFill" @tap="goToDetails(item.id)" />
                        </StackLayout>
                    </GridLayout>
                </WrapLayout>
            </ScrollView>

            <StackLayout row="1" orientation="horizontal">
                <GridLayout columns="*, *, *, *" rows="60" class="navigation">
                    <FlexboxLayout alignItems="center" justifyContent="center" row="0" col="0">
                        <Image class="btn-navigation" src="~/assets/images/home.png" @tap="goToHome" />
                    </FlexboxLayout>
                    <FlexboxLayout alignItems="center" justifyContent="center" row="0" col="1">
                        <Image class="btn-navigation" src="~/assets/images/gancho.png" width="50" />
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
import { mapState } from 'vuex'

//Pages
import Home from './Home.vue'
import Closet from './Closet.vue'
import Details from './Details.vue'

export default {
    name: 'Closet',

    data(){
        return{
        	clothes: [], 
        }
    },

    computed: {
        ...mapState([
                'user'
            ])
    },

    mounted() {
        this.getClothes()
    },

    methods: {
        goToHome(){
            this.$navigateTo(Home)
        },

        goToDetails(id){
            this.$navigateTo(Details, {
                props:{
                    id: id,
                }
            })
        },

        async getClothes(){
            try {
                let response = await firebase.firestore.collection('likes')
                                                        .doc(this.user.uid)
                                                        .collection('like')
                                                        .get()
                                                        .then(query => {
                                                            query.forEach(doc => {
                                                                this.clothes.push(doc.data())
                                                            })
                                                        })
            } catch(e) {
                // statements
                console.log(e);
            }
        }
    },
}
</script>









