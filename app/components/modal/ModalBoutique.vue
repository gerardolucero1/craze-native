<style lang="css" scoped>
	.modal{
		width: 1000px;
		height: 1700px;
	}

	.title{
		font-size: 16px;
		font-weight: bold;
	}

	.tap-text{
		font-size: 10px;
		font-weight: bold;
	}

	.separator-line{
        border-width: 1 0 0 0;
        border-color: rgba(218, 218, 218, 1);
        width: 95%;
    }

    .separator{
		border-width: 0 0 1 0;
		border-color: black;
		margin-top: 5px;
		width: 90%;
    }

</style>

<template>
	<StackLayout class="modal">
			<GridLayout v-if="boutique != null" columns="80, *" rows="100, 10, 55, 30, *">
				<FlexboxLayout marginLeft="10" justifyContent="center" alignItems="center" row="0" col="0">
					<Image :src="boutique.logo" stretch="aspectFill" />
				</FlexboxLayout>
				<FlexboxLayout marginLeft="20" justifyContent="center" alignItems="flex-start" flexDirection="column" row="0" col="1">
					<Label class="title" :text="boutique.nombre" />
					<Label fontSize="11" :text="boutique.direccion" />
				</FlexboxLayout>

				<StackLayout row="1" col="0" colSpan="2">
					<StackLayout class="separator-line"></StackLayout>
				</StackLayout>

				<StackLayout row="2" col="0" colSpan="2">
					<GridLayout columns="*, *" rows="50">
						<FlexboxLayout marginLeft="20" justifyContent="flex-start" alignItems="center" row="0" col="0">
							<Label fontSize="25" text="4.7 " />
							<Label marginTop="7" fontSize="11" text="de 5" />	
						</FlexboxLayout>
						<FlexboxLayout marginRight="10" justifyContent="center" alignItems="center" flexDirection="column" row="0" col="1">
							<Label text="Rate start" />
							<Label fontSize="10" text="257 calificaciones" />
						</FlexboxLayout>
					</GridLayout>
				</StackLayout>

				<StackLayout row="3" col="0" colSpan="2">
					<GridLayout columns="*, *" rows="30">
						<FlexboxLayout col="0" row="0" @tap="index = 1" justifyContent="flex-start" alignItems="center" flexDirection="column">
							<Label class="tap-text" text="COMENTARIOS" />
							<StackLayout v-if="index == 1" class="separator" />
						</FlexboxLayout>
						
						<FlexboxLayout col="1" row="0" @tap="index = 2" justifyContent="flex-start" alignItems="center" flexDirection="column">
							<Label class="tap-text" text="PRENDAS EN TIENDA" />
							<StackLayout v-if="index == 2" class="separator" />
						</FlexboxLayout>
					</GridLayout>
				</StackLayout>

				<!-- Reviews section -->
				<StackLayout marginTop="10" v-if="index == 1" row="4", col="0" colSpan="2">
					<ListView height="430" for="item in comments">
						<v-template>
						    <GridLayout columns="50, *" rows="*">
						    	<Image borderRadius="100" col="0" row="0" src="https://pbs.twimg.com/profile_images/899405072702078976/aLGgzMaX.jpg" />

						    	<StackLayout col="1" row="0">
						    		<Label letterSpacing=".1" marginLeft="10" :text="item.nombre" />
						    		<StackLayout marginTop="-15" orientation="horizontal">
						    			<GridLayout columns="100, *, *" rows="40">
						    				<StackLayout orientation="horizontal" col="0" row="0">
						    					<Label marginLeft="-7" text="★" />
						    					<Label marginLeft="-9" v-for="(element, index) in item.rate - 1" text="★" />
						    				</StackLayout>
						    				<Label col="1" row="0" fontSize="8" marginTop="8" :text="item.rate + ' DE 5'" />
						    				<Label col="2" row="0" fontSize="9" marginLeft="25" :text="item.fecha | formatDate" />
						    			</GridLayout>
						    			<!-- <Label text="★" />
						    			<Label marginLeft="-7" text="★" />
						    			<Label fontSize="8" marginTop="5" text="4 DE 5" />
						    			<Label fontSize="9" marginLeft="25" text="10/05/1995" /> -->
						    		</StackLayout>
						    		<Label fontSize="10"marginLeft="10" marginTop="-15" :text="item.comentario" />
						    	</StackLayout>
						    </GridLayout>
						 </v-template>
					</ListView>
				</StackLayout>

				<!-- Clothes section -->
				<StackLayout marginTop="10" v-if="index == 2" row="4", col="0" colSpan="2">
					<ScrollView height="430">
						<WrapLayout orientation="horizontal">
							<GridLayout v-for="(item, index) in clothes" :key="index" width="50%" height="350">
		                        <StackLayout>
		                            <Image margin="10" marginBottom="40" android:borderRadius="5" androidElevation="5" android:backgroundColor="white" :src="item.foto" stretch="aspectFill" @tap="goToDetails(item.id)" />
		                            
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
						</WrapLayout>
					</ScrollView>
				</StackLayout>
			</GridLayout>
	</StackLayout>
</template>

<script>
	//Firebase
const firebase = require("nativescript-plugin-firebase")

//Vuex
import { mapState } from 'vuex'

//Pages
import Details from '../Details.vue'

//Moment
let moment = require('moment')

export default {
	name: 'ModalBoutique',

	props: [
		'id'
	],

	data () {
	    return {
	    	boutique: null,
	    	index: 1,
	    	comments:[],
	    	clothes: [],
	    }
	},

	mounted(){
		this.getBoutique()
		this.getClothes()
		this.getComments()
	},

	filters:{
		formatDate(date){
			let fecha = moment(date).format('L')
			return fecha

		}
	},

	methods:{
		goToDetails(id){
			this.closeModal()
            this.$navigateTo(Details, {
                props:{
                    id: id,
                }
            })
        },

        closeModal(){
        	this.$modal.close()
        },

		async getBoutique(){
			try{
				let response = await firebase.firestore.collection('boutiques')
														.doc(this.id)
														.get()

				if(response.exists){
					this.boutique = response.data()
				}
			}
			catch(e){
				console.log(e)
			}
		},

		async getComments(){
			try{
				let response = await firebase.firestore.collection('comentarios')
														.where('boutique', '==', this.id)
														.get()
														.then(query => {
															query.forEach(doc => {
																this.comments.push(doc.data())
															})
														})
			}
			catch(e){
				console.log(e)
			}
		},

		async getClothes(){
			try{
				let response = await firebase.firestore.collection('prendas')
												.where('boutique', '==', this.id)
												.get()
												.then(query => {
													query.forEach(doc => {
														this.clothes.push(doc.data())
													})
												})
			}
			catch(e){
				console.log(e)
			}
		},
	}
}
</script>
























