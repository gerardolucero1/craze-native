<style scoped>
    .banner{
        height: 90%;
        background-size: cover;
        background-position: center;
    }

    .main-page{
        background-color: rgba(249, 220, 235, 1);
    }

    .btn-control{
        width: 180px;
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
    <Page class="main-page" actionBarHidden="true">
        <GridLayout rows="*, 60">
            <StackLayout row="0">
                <!-- <WrapLayout orientation="vertical"> -->
                    <StackLayout v-if="clothes.length != 0" class="banner">
                        <Image class="imagen" :src="clothes[0].foto" stretch="aspectFill" @tap="goToDetails(clothes[0].id)" />
                    </StackLayout>
                
                    <FlexboxLayout justifyContent="space-around">
                        <Image class="btn-control" @tap="disLike" src="~/assets/images/dislike.png" />
                        <Image class="btn-control" @tap="like" src="~/assets/images/like.png" />
                    </FlexboxLayout>
                <!-- </WrapLayout> -->
            </StackLayout>

            <StackLayout row="1" orientation="horizontal">
                <GridLayout columns="*, *, *, *" rows="60" class="navigation">
                    <FlexboxLayout alignItems="center" justifyContent="center" row="0" col="0">
                        <Image class="btn-navigation" src="~/assets/images/home.png" />
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
import { mapState } from 'vuex'

//Pages
import Home from './Home.vue'
import Closet from './Closet.vue'
import Details from './Details.vue'


export default {
    name: 'Home',

    data(){
        return{
        	clothes: [], 
            last: null,
        }
    },

    computed:{
        ...mapState([
                'user'
            ])
    },

    watch:{
        clothes(){
            if(this.clothes.length == 1){
                this.nextClothes()
            }
        }
    },

    mounted() {
        this.getClothes()
    },

    methods: {
        goToDetails(id){
            this.$navigateTo(Details, {
                props:{
                    id: id,
                }
            })
        },

        goToCloset(){
            this.$navigateTo(Closet)
        },

        async getClothes(){
            try {
                let response = await firebase.firestore.collection('prendas')
                                                .orderBy('id')
                                                .limit(4)
                                                .startAt(this.user.index)
                                                .onSnapshot(query => {
                                                    this.last = query.docs[query.docs.length - 1];
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

        async nextClothes(){
            try {
                let response = await firestore.firebase.collection('prendas')
                                                .orderBy('id')
                                                .limit(4)
                                                .startAfter(this.last)
                                                .onSnapshot(query => {
                                                    this.last = query.docs[query.docs.length - 1];
                                                    query.forEach(doc => {
                                                        this.clothes.push(doc.data())
                                                    })
                                                })
            } catch(e) {
                console.log(e);
            }
        },

        async like(){
            try {
                let response = await firebase.firestore.collection('likes')
                                        .doc(this.user.uid)
                                        .collection('like')
                                        .doc(this.clothes[0].id)
                                        .set(this.clothes[0])

                this.$store.commit('updateIndex', this.clothes[1].id)
                this.clothes.splice(0, 1)
            } catch(e) {
                console.log(e);
            }
        },

        async disLike(){
            try {
                let response = await firebase.firestore.collection('likes')
                                        .doc(this.user.uid)
                                        .collection('disLike')
                                        .doc(this.clothes[0].id)
                                        .set(this.clothes[0])

                this.$store.commit('updateIndex', this.clothes[1].id)
                this.clothes.splice(0, 1)
            } catch(e) {
                console.log(e);
            }
        }
    },
}
</script>