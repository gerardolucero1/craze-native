<style scoped>
    .header-bar{
        background-color: white;
    }

    .header-text{
        color: black;
        font-weight: bold;
        font-size: 18px;
    }

    .banner{
        height: 90%;
        background-size: cover;
        background-position: center;
    }

    .main-page{
        /*background-color: rgba(249, 220, 235, 1);*/
        background-color: white;
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
    <Page class="main-page" actionBarHidden="false">
        <ActionBar class="header-bar" title="CRAZE">
            <StackLayout orientation="horizontal"
                ios:horizontalAlignment="center"
                android:horizontalAlignment="left">
                <Image src="res://nativescript_logo" class="action-image"></Image>
                <Label class="header-text" :text="changeTitle"></Label>
            </StackLayout>
        </ActionBar>

        <GridLayout rows="*, 60">
            <StackLayout v-if="settings != null" row="0">
                <!-- <WrapLayout orientation="vertical"> -->
                    <StackLayout v-if="clothes.length != 0" class="banner">
                        <!-- <SwipeCard
                            marginTop="-30"
                            height="100%"
                            width="100%" 
                            :items="stackCards"
                            @swipeEvent="swipeEvent($event)"
                            cardHeight="60" 
                            cardWidth="80"
                            isRandomColor="1"
                            >
                        </SwipeCard>  -->
                        <Image class="imagen" margin="20" android:borderRadius="20" androidElevation="5" android:backgroundColor="white" :src="clothes[0].foto" stretch="aspectFill" @doubleTap="maybeLater" @tap="goToDetails(clothes[0].id)" @swipe="onSwipe($event)" />
                    </StackLayout>
                
                    <FlexboxLayout marginTop="-10" justifyContent="space-around">
                        <Image class="btn-control" @tap="disLike" src="~/assets/images/dislike.png" />
                        <Image class="btn-control" @tap="like" src="~/assets/images/like.png" />
                    </FlexboxLayout>
                <!-- </WrapLayout> -->
            </StackLayout>
            <FlexboxLayout v-else row="0" justifyContent="center" alignItems="center">
                <Label text="Ve a configuraciones y marca tus preferencias" />
            </FlexboxLayout>

            <StackLayout row="1" orientation="horizontal">
                <GridLayout columns="*, *, *, *" rows="60" class="navigation">
                    <FlexboxLayout alignItems="center" justifyContent="center" row="0" col="0">
                        <Image class="btn-navigation" src="~/assets/images/home.png" />
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
            </StackLayout>
        </GridLayout>
    </Page>
</template>

<script>
//Firebase
const firebase = require("nativescript-plugin-firebase")

//Vuex
import { mapState } from 'vuex'

//Toast
const toast = require('nativescript-toasts')

//Swipe Cards
import { StackLayout } from 'tns-core-modules/ui/layouts/stack-layout'
import { Image } from 'tns-core-modules/ui/image'
import { SwipeEvent } from 'nativescript-swipe-card'

//Pages
import Home from './Home.vue'
import Closet from './Closet.vue'
import Mapa from './Map.vue'
import Navigation from './Navigation.vue'
import Details from './Details.vue'
import Settings from './Settings.vue'


export default {
    name: 'Home',

    data(){
        return{
        	clothes: [], 
            last: null,
            settings: null,
            stackCards: [],
        }
    },

    computed:{
        ...mapState([
                'user'
            ]),

        changeTitle(){
            let title = 'Craze'

            if(this.clothes.length != 0){
                title = this.clothes[0].nombre
            }

            return title
        }
    },

    watch:{
        clothes(){
            if(this.clothes.length == 1){
                console.log('Se acabaron los posts')
                this.nextClothes()
            }
        }
    },

    created(){

    },

    mounted() {
        this.getSettings()
    },

    methods: {
        goToDetails(id){
            this.$navigateTo(Details, {
                props:{
                    id: id,
                },
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

        async getSettings(){
            try{
                let response = await firebase.firestore.collection('configuraciones')
                                                        .doc(this.user.uid)
                                                        .get()

                if(response.exists){
                    this.settings = response.data().categorias
                    this.getClothes()
                }
            }
            catch(e){
                console.log(e)
            }
        },

        async getClothes(){
            try {
                let response = await firebase.firestore.collection('prendas')
                                                .where('categoria', 'in', this.settings)
                                                .orderBy('id')
                                                .limit(4)
                                                .startAt(this.user.index)
                                                .onSnapshot(query => {
                                                    this.last = query.docs[query.docs.length - 1];
                                                    query.forEach(doc => {
                                                        this.clothes.push(doc.data())
                                                    })

                                                Array.prototype.unique=function(a){
                                                    return function(){return this.filter(a)}}(function(a,b,c){return c.indexOf(a,b+1)<0
                                                })

                                                this.clothes.unique()
                                                
                                                //Llamamos el metodo que creara los layouts de las cards
                                                //this.makeStack()
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
                let response = await firebase.firestore.collection('prendas')
                                                .where('categoria', 'in', this.settings)
                                                .orderBy('id')
                                                .limit(4)
                                                .startAfter(this.last)
                                                .onSnapshot(query => {
                                                    this.last = query.docs[query.docs.length - 1];
                                                    query.forEach(doc => {
                                                        this.clothes.push(doc.data())
                                                    })
                                                Array.prototype.unique=function(a){
                                                    return function(){return this.filter(a)}}(function(a,b,c){return c.indexOf(a,b+1)<0
                                                })

                                                this.clothes.unique()
                                                //Llamamos el metodo que creara los layouts de las cards
                                                //this.makeStack()
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

                this.updateIndexFirestore(this.clothes[1].id)
            } catch(e) {
                console.log(e);
            }
            finally{
                var options = {
                    text: "Me Gusta",
                    duration : toast.DURATION.SHORT,
                    position : toast.POSITION.BOTTOM //optional
                }
                toast.show(options)
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

                this.updateIndexFirestore(this.clothes[1].id)
            } catch(e) {
                console.log(e);
            }
            finally{
                var options = {
                    text: "No me Gusta",
                    duration : toast.DURATION.SHORT,
                    position : toast.POSITION.BOTTOM //optional
                }
                toast.show(options)
            }
        },

        maybeLater(){
            this.$store.commit('updateIndex', this.clothes[1].id)
            this.clothes.splice(0, 1)

            var options = {
                text: "Quiza luego",
                duration : toast.DURATION.SHORT,
                position : toast.POSITION.BOTTOM //optional
            }
            toast.show(options)
        },

        async updateIndexFirestore(args){
            try{
                let response = await firebase.firestore.collection('usuarios')
                                                        .doc(this.user.uid)
                                                        .update({index: args})
            }
            catch(e){
                console.log(e)
            }
        },

        onSwipe(args){
            console.log(args.direction)
            if (args.direction === 1) {
                this.like()
            } else {
                this.disLike()
            }
        },

        swipeEvent(args){
            //Obtenemos el indice de la tarjeta
            let index = args.cardIndex
            //Buscamos el elemento correspondiente a ese indice en el array de ropa
            let element = this.clothes[index]
            //Eliminamos esa prenda de el array original para reducirlo
            this.clothes.splice(index, 1)

            if (args.direction === 1) {
                
                console.log(element.id);
            } else {
                //left
                console.log(element.id);
            }
        },

        makeStack(){
            this.clothes.forEach((element) => {
                let stack = new StackLayout()
                let image = new Image()

                //Creamos la imagen
                image.src = element.foto
                image.height = 500
                image.width = 500
                image.borderRadius = 15
                image.stretch = "aspectFill"


                //Creamos el stack
                stack.verticalAlignment = 'center'
                stack.addChild(image)

                //Metemos el stack al array de tarjetas
                this.stackCards.push(stack)
            })
            
            this.$forceUpdate()
        }
 
    },
}
</script>









