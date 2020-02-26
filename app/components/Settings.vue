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

    .container{
        width: 90%;
        margin-left: 5%;
    }

    .separator-line{
        border-width: 1 0 0 0;
        border-color: rgba(218, 218, 218, 1);
        width: 950%;
    }

    .btn-save{
        width: 90%;
        color: white;
        font-weight: bold;
        font-family: "Roboto";
        background-color: black;
    }

    .btn-close{
        width: 90%;
        color: white;
        font-weight: bold;
        font-family: "Roboto";
        background-color: red;
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
            <ScrollView row="0">
                <WrapLayout>
                    <StackLayout class="banner">
                        <StackLayout marginBottom="-10" orientation="horizontal">
                            <FlexboxLayout justifyContent="flex-start" alignItems="center" >
                                <Switch @checkedChange="addCategory('Sueteres')" v-model="categorias.Sueteres" />
                            </FlexboxLayout>
                            <FlexboxLayout justifyContent="center" alignItems="center" >
                                <Label marginLeft="20" marginTop="11" text="Sueteres" />
                            </FlexboxLayout>
                        </StackLayout>

                        <StackLayout marginBottom="-10" orientation="horizontal">
                            <FlexboxLayout justifyContent="flex-start" alignItems="center" >
                                <Switch @checkedChange="addCategory('Blusas')" v-model="categorias.Blusas" />
                            </FlexboxLayout>
                            <FlexboxLayout justifyContent="center" alignItems="center" >
                                <Label marginLeft="20" marginTop="11" text="Blusas" />
                            </FlexboxLayout>
                        </StackLayout>

                        <StackLayout marginBottom="-10" orientation="horizontal">
                            <FlexboxLayout justifyContent="flex-start" alignItems="center" >
                                <Switch @checkedChange="addCategory('Camisetas')" v-model="categorias.Camisetas" />
                            </FlexboxLayout>
                            <FlexboxLayout justifyContent="center" alignItems="center" >
                                <Label marginLeft="20" marginTop="11" text="Camisetas" />
                            </FlexboxLayout>
                        </StackLayout>

                        <StackLayout marginBottom="-10" orientation="horizontal">
                            <FlexboxLayout justifyContent="flex-start" alignItems="center" >
                                <Switch @checkedChange="addCategory('Chamarras')" v-model="categorias.Chamarras" />
                            </FlexboxLayout>
                            <FlexboxLayout justifyContent="center" alignItems="center" >
                                <Label marginLeft="20" marginTop="11" text="Chamarras" />
                            </FlexboxLayout>
                        </StackLayout>

                        <StackLayout marginBottom="-10" orientation="horizontal">
                            <FlexboxLayout justifyContent="flex-start" alignItems="center" >
                                <Switch @checkedChange="addCategory('Vestidos')" v-model="categorias.Vestidos" />
                            </FlexboxLayout>
                            <FlexboxLayout justifyContent="center" alignItems="center" >
                                <Label marginLeft="20" marginTop="11" text="Vestidos" />
                            </FlexboxLayout>
                        </StackLayout>

                        <StackLayout marginBottom="-10" orientation="horizontal">
                            <FlexboxLayout justifyContent="flex-start" alignItems="center" >
                                <Switch @checkedChange="addCategory('Pantalones')" v-model="categorias.Pantalones" />
                            </FlexboxLayout>
                            <FlexboxLayout justifyContent="center" alignItems="center" >
                                <Label marginLeft="20" marginTop="11" text="Pantalones" />
                            </FlexboxLayout>
                        </StackLayout>

                        <StackLayout marginBottom="-10" orientation="horizontal">
                            <FlexboxLayout justifyContent="flex-start" alignItems="center" >
                                <Switch @checkedChange="addCategory('Shorts')" v-model="categorias.Shorts" />
                            </FlexboxLayout>
                            <FlexboxLayout justifyContent="center" alignItems="center" >
                                <Label marginLeft="20" marginTop="11" text="Shorts" />
                            </FlexboxLayout>
                        </StackLayout>

                        <StackLayout marginBottom="-10" orientation="horizontal">
                            <FlexboxLayout justifyContent="flex-start" alignItems="center" >
                                <Switch @checkedChange="addCategory('Sacos')" v-model="categorias.Sacos" />
                            </FlexboxLayout>
                            <FlexboxLayout justifyContent="center" alignItems="center" >
                                <Label marginLeft="20" marginTop="11" text="Sacos" />
                            </FlexboxLayout>
                        </StackLayout>

                        <StackLayout marginBottom="-10" orientation="horizontal">
                            <FlexboxLayout justifyContent="flex-start" alignItems="center" >
                                <Switch @checkedChange="addCategory('Zapatos')" v-model="categorias.Zapatos" />
                            </FlexboxLayout>
                            <FlexboxLayout justifyContent="center" alignItems="center" >
                                <Label marginLeft="20" marginTop="11" text="Zapatos" />
                            </FlexboxLayout>
                        </StackLayout>

                        <StackLayout marginBottom="-10" orientation="horizontal">
                            <FlexboxLayout justifyContent="flex-start" alignItems="center" >
                                <Switch @checkedChange="addCategory('Botas')" v-model="categorias.Botas" />
                            </FlexboxLayout>
                            <FlexboxLayout justifyContent="center" alignItems="center" >
                                <Label marginLeft="20" marginTop="11" text="Botas" />
                            </FlexboxLayout>
                        </StackLayout>
                    </StackLayout>

                    <StackLayout class="container">
                        <StackLayout marginTop="20" marginBottom="10" class="separator-line"></StackLayout>
                        
                        <Label marginLeft="35" marginBottom="-13" :text="'Rango de busqueda: ' + range + 'KM'" />
                        <Slider v-model="range" />

                        <StackLayout>
                            <Button class="btn-save" text="GUARDAR CONFIGURACION" @tap="saveSettings" />
                            <!-- <Button class="btn-close" text="VER TOKEN" @tap="viewToken" /> -->
                            <Button class="btn-close" text="CERRAR SESION" @tap="closeSesion" />
                        </StackLayout>
                    </StackLayout>
                </WrapLayout>
                    
            </ScrollView>

            <StackLayout row="1" orientation="horizontal">
                <Footer />
                <!-- <GridLayout columns="*, *, *, *" rows="60" class="navigation">
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
                        <Image class="btn-navigation" src="~/assets/images/config.png" />
                    </FlexboxLayout>
                </GridLayout> -->
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

//Pages
import Inicio from './App.vue'

export default {
    name: 'Settings',

    data(){
        return{
            categorias: {
                Sueteres: false,
                Blusas: false,
                Camisetas: false,
                Chamarras: false,
                Vestidos: false,
                Pantalones: false,
                Shorts: false,
                Sacos: false,
                Zapatos: false,
                Botas: false,
            },
            seleccion: [],
            range: 0,
        }
    },

    computed:{
        ...mapState([
            'user',
            'token'
        ]),

        changeTitle(){
            let title = 'Configuracion'

            return title
        }
    },

    mounted() {
        //this.getCategories()
        this.getSettings()
    },

    methods: {
        addCategory(name){
            console.log(name)
            if(this.seleccion.includes(name)){
                let index = this.seleccion.indexOf(name)
                this.seleccion.splice(index, 1)
            }else{
               //this.seleccion.push(name)
            }
        },

        checkSettings(){
            for (let i in this.categorias) {
                if(this.categorias.hasOwnProperty(i)){
                    this.seleccion.forEach(element => {
                        if(element == i){
                            this.categorias[i] = true
                        }
                    })
                }
            }
        },

        viewToken(){
            prompt({
                title: "TOKEN",
                message: "Este es tu user token, no lo compartas con nadie",
                okButtonText: "OK",
                cancelButtonText: "CANCEL",
                defaultText: this.token,
            }).then(result => {
                console.log(`Dialog result: ${result.result}, text: ${result.text}`)
            });
        },

        async getCategories(){
            try{
                let response = await firebase.firestore.collection('categorias')
                                                        .get()
                                                        .then(query => {
                                                            query.forEach(doc => {
                                                                this.categories.push(doc.data())
                                                            })
                                                        })
            }
            catch(e){
                console.log(e)
            }
        },

        async getSettings(){
            try{
                let response = await firebase.firestore.collection('configuraciones')
                                                        .doc(this.user.uid)
                                                        .get()

                if(response.exists){
                    this.seleccion = response.data().categorias
                    this.range = response.data().rangoBusqueda

                    this.checkSettings()
                }
            }
            catch(e){
                console.log(e)
            }
        },

        async saveSettings(){
            try{
                for (let i in this.categorias) {
                    if(this.categorias.hasOwnProperty(i)){
                        if(this.categorias[i] == true){
                            this.seleccion.push(i)
                        }
                    }
                }

                Array.prototype.unique=function(a){
                    return function(){return this.filter(a)}}(function(a,b,c){return c.indexOf(a,b+1)<0
                })

                let settings = {
                    nombre: this.user.nombre,
                    categorias: this.seleccion.unique(),
                    rangoBusqueda: this.range
                }

                let response = await firebase.firestore.collection('configuraciones')
                                                        .doc(this.user.uid)
                                                        .set(settings)

            }
            catch(e){
                console.log(e)
            }
            finally{
                console.log('Configuraciones aplicadas')
                var options = {
                    text: "Todo OK",
                    duration : toast.DURATION.SHORT,
                    position : toast.POSITION.BOTTOM //optional
                }
                toast.show(options)
            }
        },

        async closeSesion(){
            try{
                await firebase.logout()
                this.$navigateTo(Inicio)
            }
            catch(e){
                console.log(e)
            }
        }

    },
}
</script>









