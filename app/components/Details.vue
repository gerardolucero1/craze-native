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
    <Page actionBarHidden="false">
        <ActionBar class="header-bar" title="CRAZE">
            <StackLayout orientation="horizontal"
                ios:horizontalAlignment="center"
                android:horizontalAlignment="left">
                <Image src="res://nativescript_logo" class="action-image"></Image>
                <Label class="header-text" :text="changeTitle"></Label>
            </StackLayout>
        </ActionBar>

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
                                <Image src="https://cdn2.iconfinder.com/data/icons/pittogrammi/142/80-512.png" width="20" height="20" marginTop="1" marginLeft="10" stretch="aspectFill" @tap="like" />
                            </FlexboxLayout>

                            <FlexboxLayout col="1" row="0" justifyContent="space-around" marginRight="">
                                <Image class="btn-options" src="~/assets/images/icono1.png" @tap="waitForIt" />
                                <Image class="btn-options" src="~/assets/images/icono2.png" @tap="waitForIt" />
                                <Image class="btn-options" src="~/assets/images/icono3.png" @tap="goToNavigation" />
                                <Image class="btn-options" src="~/assets/images/icono4.png" @tap="shareClothes" />
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
                                    <TextView margin="0" editable="false" :text="boutique.direccion" />
                                </StackLayout>
                            </StackLayout>

                            <StackLayout marginTop="20" marginBottom="20" class="separator-line" />

                            <StackLayout v-if="!exists" marginTop="10" class="box">
                                <Label fontSize="13" text="DEJA UN COMENTARIO" />
                                <StackLayout>
                                    <TextView margin="0" height="100" autocorrect="true" editable="true" v-model="comment" />
                                </StackLayout>
                            </StackLayout>
                            <StackLayout v-else marginTop="10" class="box">
                                <StackLayout>
                                    <TextView margin="0" height="100" autocorrect="true" editable="false" :text="comment" />
                                </StackLayout>
                            </StackLayout>

                        </StackLayout>

                        <Button v-if="!exists" backgroundColor="black" color="white" width="100%" text="ENVIAR" @tap="sendComment" />
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

//Social Share
const SocialShare = require("nativescript-social-share")
const imageSourceModule = require("tns-core-modules/image-source")

//Toast
const toast = require('nativescript-toasts')

//Loader
const LoadingIndicator = require('@nstudio/nativescript-loading-indicator').LoadingIndicator;
const Mode = require('@nstudio/nativescript-loading-indicator').Mode;
const loader = new LoadingIndicator();

const options = {
    message: 'Cargando...',
    details: 'Esperando respuesta',
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

//Vuex
import { mapState } from 'vuex'

//Pages
import Home from './Home.vue'
import Closet from './Closet.vue'
import Mapa from './Map.vue'
import Details from './Details.vue'
import Settings from './Settings.vue'
import Navigation from './Navigation.vue'

export default {
    name: 'Details',

    props:[
        'id'
    ],

    data(){
        return{
            comment: '',
        	garment: null,
            boutique: null,
            control: 1,
            exists: false,
        }
    },

    computed:{

        ...mapState([
                'user'
            ]),

        changeTitle(){
            let title = 'Craze'

            if(this.garment){
                title = this.garment.nombre 
            }

            return title
        }
    },

    mounted() {
        this.getGarment()
        this.getComment()
    },

    methods: {
        goToHome(){
            this.$navigateTo(Home)
        },

        goToCloset(){
            this.$navigateTo(Closet)
        },

        goToMap(){
            this.$navigateTo(Mapa)
        },

        goToSettings(){
            this.$navigateTo(Settings)
        },

        goToNavigation(){
            this.$navigateTo(Navigation, {
                props:{
                    id: this.boutique.id,
                }
            })
        },

        shareClothes(){
            loader.show(options)
            // let image = imageSourceModule.fromFile("~/assets/images/icono1.png");
            imageSourceModule.fromUrl(this.garment.foto).then(image => {
                SocialShare.shareImage(image, 'CRAZE Fashion Soul', 'How would you like to share this?')

                loader.hide()
            })
            
        },

        waitForIt(){
            alert(
                {
                    title: "CRAZE",
                    message: "Proximamente",
                    okButtonText: "ACEPTAR"
                }).then(() => {
                    console.log("Alert dialog closed");
                })
        },

        changeControl(id){
            this.control = id
        },

        async getComment(){
            try{
                let comm = []
                // let comm = {
                //     boutique: this.boutique.id,
                //     comentario: this.comment,
                //     nombre: this.user.nombre,
                //     usuario: this.user.uid,
                //     fecha: hoy.toLocaleDateString("en-US"),
                //     rate: 5
                // }
                let response = await firebase.firestore.collection('comentarios')
                                                        .where('usuario', '==', this.user.uid)
                                                        .where('boutique', '==', this.boutique.id)
                                                        .get()
                                                        .then((querySnapshot) => {
                                                            querySnapshot.forEach(doc => {
                                                                // doc.data() is never undefined for query doc snapshots
                                                                if(doc.exists){
                                                                    this.comment = doc.data().comentario
                                                                    this.exists = true
                                                                }
                                                                
                                                            });
                                                        })
                                                        .catch(function(error) {
                                                            console.log("Error getting documents: ", error);
                                                        });

            }
            catch(e){

            }
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
        },

        async like(){
            try {

                let response = await firebase.firestore.collection('likes')
                                                        .doc(this.user.uid)
                                                        .collection('like')
                                                        .doc(this.garment.id)
                                                        .set(this.garment)

                this.$store.commit('updateIndex', this.garment.id)
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

        async sendComment(){
            if(this.comment == ''){
                return
            }

            try{
                let hoy = new Date()

                let comm = {
                    boutique: this.boutique.id,
                    comentario: this.comment,
                    nombre: this.user.nombre,
                    usuario: this.user.uid,
                    fecha: hoy.toLocaleDateString("en-US"),
                    rate: 5
                }
                let response = await firebase.firestore.collection('comentarios')
                                                        .doc()
                                                        .set(comm)
                this.exists = true
            }
            catch(e){
                console.log(e)
            }
            finally{

                var options = {
                    text: "Comentario Enviado",
                    duration : toast.DURATION.SHORT,
                    position : toast.POSITION.BOTTOM //optional
                }
                toast.show(options)
            }
        }

    },
}
</script>









