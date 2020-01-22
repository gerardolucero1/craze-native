<style scoped>
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

    .label-clothe{
        text-align: center;
        z-index: 100;
    }

    Button, Label{
        font-family: 'Roboto'
    }

    Dialog{
       font-family: 'Roboto' 
    }

</style>

<template>
    <Page actionBarHidden="false">
        <ActionBar class="header-bar" title="CRAZE">
            <StackLayout orientation="horizontal"
                ios:horizontalAlignment="center"
                android:horizontalAlignment="left">
                <Image src="res://nativescript_logo" class="action-image"></Image>
                <Label class="header-text" text="Closet"></Label>
            </StackLayout>
        </ActionBar>

        <GridLayout rows="*, 60">
            <ScrollView row="0" @scroll="onScroll($event)">
                <WrapLayout @layoutChanged="onLayoutChanged($event)" orientation="horizontal" v-if="clothes.length != 0">
                    <GridLayout v-for="(item, index) in clothes" :key="index" width="50%" height="350">
                        <!-- <StackLayout marginBottom="10">
                            <Image row="0" rowSpan="2" col="0"
                            stretch="aspectFill" height="300"
                            :src="item.foto" id="userIcon" />

                            <StackLayout
                                padding="10" row="1" col="0"
                                backgroundColor="rgba(64, 153, 255, 0.6)">
                                <Label class="fa" color="#FFFFFF" id="userName" :text="item.nombre"></Label>
                                <Label class="footnote" id="userEmail" text=""></Label>
                            </StackLayout>
                        </StackLayout> -->
                        
                        <StackLayout>
                           

                            <Image margin="10" marginBottom="40" android:borderRadius="5" androidElevation="5" android:backgroundColor="white" :src="item.foto" stretch="aspectFill" @tap="goToDetails(item.id)" @longPress="deleteGarment(item.id)" />
                            
                             <Label 
                                :text="item.nombre"
                                horizontalAlignment="center"
                                verticalAlignment="center"
                                backgroundColor="rgba(255,255,255, 0.5)"
                                width="90%"
                                padding="10"
                                fontSize="13"
                                color="black"
                                marginTop="-40"
                            />
                        </StackLayout>
                    </GridLayout>

                    <ActivityIndicator marginLeft="190" :busy="busy" />
                </WrapLayout>
                <WrapLayout v-else>
                    <StackLayout width="100%" marginTop="100">
                        <StackLayout horizontalAlignment="center" width="50%">
                            <Image horizontalAlignment="center" src="https://pngimage.net/wp-content/uploads/2018/06/sad.png-4.png" stretch="aspectFill" />
                        </StackLayout>
                        
                        <Label fontSize="18" horizontalAlignment="center" marginTop="10" text="Aun no tienes prendas en tu closet" />
                    </StackLayout>
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

//Fancy Alert
import { TNSFancyAlert, TNSFancyAlertButton } from "nativescript-fancyalert";

//Vuex
import { mapState, store } from 'vuex'

//Loader
const LoadingIndicator = require('@nstudio/nativescript-loading-indicator').LoadingIndicator;
const Mode = require('@nstudio/nativescript-loading-indicator').Mode;
const loader = new LoadingIndicator();

const options = {
    message: 'Cargando...',
    details: 'Recuperando prendas',
    progress: 0.65,
    margin: 10,
    dimBackground: true,
    color: '#4B9ED6', // color of indicator and labels
    // background box around indicator
    // hideBezel will override this if true
    backgroundColor: 'white',
    userInteractionEnabled: false, // default true. Set false so that the touches will fall through it.
    hideBezel: true, // default false, can hide the surrounding bezel
    mode: Mode.AnnularDeterminate, // see options below
    // android: {
    //     view: android.view.View, // Target view to show on top of (Defaults to entire window)
    //     cancelable: true,
    //     cancelListener: function(dialog) {
    //         console.log('Loading cancelled');
    //     }
    // },
    // ios: {
    //     view: UIView // Target view to show on top of (Defaults to entire window)
    // }
};

//Pages
import Home from './Home.vue'
import Closet from './Closet.vue'
import Mapa from './Map.vue'
import Navigation from './Navigation.vue'
import Details from './Details.vue'
import Settings from './Settings.vue'

export default {
    name: 'Closet',

    data(){
        return{
        	clothes: [],
            last: null,

            lastItemY: 0,
            bussy: false,
            i: 1
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

        goToMap(){
            this.$navigateTo(Mapa)
        },

        goToSettings(){
            this.$navigateTo(Settings)
        },

        goToDetails(id){
            this.$navigateTo(Details, {
                props:{
                    id: id,
                }
            })
        },

        async getClothes(){
            this.busy = true

            try {
                let response = await firebase.firestore.collection('likes')
                                                        .doc(this.user.uid)
                                                        .collection('like')
                                                        .orderBy('id')
                                                        .limit(4)
                                                        .get()
                                                        .then(query => {
                                                            this.last = query.docs[query.docs.length - 1];

                                                            query.forEach(doc => {
                                                                this.clothes.push(doc.data())
                                                            })
                                                            
                                                        })
            } catch(e) {
                // statements
                console.log(e);
            }
            finally{
                loader.hide()
                this.busy = false
            }
        },

        async nextClothes(){
            this.busy = true
            try {
                let response = await firebase.firestore.collection('likes')
                                                        .doc(this.user.uid)
                                                        .collection('like')
                                                        
                                                        .orderBy('id')
                                                        .limit(4)
                                                        .startAfter(this.last)
                                                        .get()
                                                        .then(query => {
                                                            this.last = query.docs[query.docs.length - 1];

                                                            query.forEach(doc => {
                                                                this.clothes.push(doc.data())
                                                            })
                                                        })
            } catch(e) {
                console.log(e);
                loader.hide()
            }
            finally{
                loader.hide()
                this.busy = false
            }
        },

        deleteGarment(id){
            confirm({
                title: "Eliminar",
                message: "¿Estas seguro?",
                okButtonText: "OK",
                cancelButtonText: "CANCELAR"
            }).then(async result => {

                if(result){
                    try{
                        loader.show(options)
                        let response = await firebase.firestore.collection('likes')
                                                    .doc(this.user.uid)
                                                    .collection('like')
                                                    .doc(id)
                                                    .delete()
                                                    .then(()=> {
                                                        this.clothes = []
                                                        this.getClothes()
                                                    })
                                                    .catch(error => {
                                                        console.log(error)
                                                    })
                    }
                    catch(e){

                    }
                }
            });
        },

        onScroll(args){
            const scrollView = args.object
            let verticalOffset = scrollView.getActualSize().height + scrollView.verticalOffset

            if (verticalOffset >= this.lastItemY) {
                if (!this.busy && this.i <= 100) {
                    //loader.show(options)

                    this.nextClothes()
                }
            }

        },

        onLayoutChanged(args){
            const containerLyt = args.object
            let length = containerLyt.getChildrenCount()
            let lastItem = containerLyt.getChildAt(length - 1)

            this.lastItemY = lastItem.getLocationRelativeTo(containerLyt).y
        }
    },
}
</script>









