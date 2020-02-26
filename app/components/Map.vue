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
                   <!--  <StackLayout>
                        <Button @tap="getDirections">Get Directions</Button>
                        <Button @tap="clearRoute">Clear Route</Button>
                        <Button @tap="startJourney">Start Journey</Button>
                        <button @tap="endJourney">End Journey</button>

                        <TextView :text="journeyDetails" editable="false"/>
                    </StackLayout> -->
					<StackLayout>
						<MapView
                          width="100%"
                          height="590"
                          :zoom="zoom"
                          :latitude="origin.latitude"
                          :longitude="origin.longitude"
                          v-if="allowExecution"
                          @mapReady="mapReady"
                          @markerSelect="getStore($event)"
                        />
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
                        <Image class="btn-navigation" src="~/assets/images/tiendas.png" />
                    </FlexboxLayout>
                    <FlexboxLayout alignItems="center" justifyContent="center" row="0" col="3">
                        <Image class="btn-navigation" src="~/assets/images/config.png" @tap="goToSettings" />
                    </FlexboxLayout>
                </GridLayout> -->
            </StackLayout>
        </GridLayout>
	</Page>
</template>

<script>
//Access permissions
import * as permissions from 'nativescript-permissions'
import * as platform from 'platform'

//Geolocation
import * as geolocation from 'nativescript-geolocation'
import { Accuracy } from 'tns-core-modules/ui/enums'

//MAP 
import { MapView, Marker, Position } from "nativescript-google-maps-sdk";

//Mixins
import MapsHelper from "./MapsHelper.js"

//Firebase
const firebase = require("nativescript-plugin-firebase")

//Vuex
import { store } from 'vuex'

//Pages
import Details from './Details.vue'

//Modals
import ModalBoutique from './modal/ModalBoutique.vue'

export default{
	name: 'Map',

	data(){
		return{
            origin: { 
                latitude: 0, 
                longitude: 0 
            },
            destination: { 
                latitude: 28.7281124, 
                longitude: -106.1194358
            },
            journeyDetails: 'Journey: Not started yet!',
            allowExecution: false,
            journeyStarted: false,
            mapView: null,
            zoom: 17,
            APIKEY: 'AIzaSyBpGZdpD4kaH1T5ZMZFyZL1wok4ySkniu8',
            locations: [],
            boutiques: [],
            marker: null,
		}
	},

    mixins: [ 
        MapsHelper.MapsUIHelper, 
        MapsHelper.DirectionsAPIHelper, 
        MapsHelper.DistanceMatrixAPIHelper, 
        MapsHelper.LocationHelper 
    ],

    created(){
        /* dont run the android permissions routine for iOS */
        if (platform.isIOS) {
            this.allowExecution = true
            return
        }

        /* list of permissions needed */
        let permissionsNeeded = [
            android.Manifest.permission.ACCESS_FINE_LOCATION,
            android.Manifest.permission.ACCESS_COARSE_LOCATION
        ]

        /* showing up permissions dialog */
        permissions
            .requestPermissions(permissionsNeeded, "Give it to me!")
            .then(() => this.allowExecution = true)
            .catch(() => this.allowExecution = false)

        //this.getLocation()
    },

	mounted(){
        // this.getStores()
	},

	computed:{

	},

	methods:{
        // getLocation(){
        //     geolocation.getCurrentLocation({
        //         desiredAccuracy: Accuracy.high,
        //         maximumAge: 5000,
        //         timeout: 10000
        //     }).then((loc) => {
        //         if (loc) {
        //             this.origin.latitude = loc.latitude
        //             this.origin.longitude = loc.longitude
        //         }
        //     }, (e) => {
        //         console.log("Error: " + (e.message || e));
        //     })
        // },
        async getStores(){
            try {
                let response = await firebase.firestore.collection('boutiques')
                                        .onSnapshot(query => {       
                                            query.forEach(doc => {
                                                this.boutiques.push(doc.data())
                                            })

                                        this.putBoutiques()
                                        })
            } catch (e) {
                console.log(e)
            }
                
        },

        putBoutiques(){
                // let marker = new Marker();

                // marker.position = Position.positionFromLatLng(28.676912, -106.080275);
                // marker.title = 'Limesoda'
                // marker.snippet = "Fashion boutique"
                // marker.userData = {index: 1}
                // this.mapView.addMarker(marker)
            
            

            this.boutiques.forEach((result) => {
                let marker = new Marker()
                marker.position = Position.positionFromLatLng(result.ubicacion.latitude, result.ubicacion.longitude)
                marker.title = result.nombre
                marker.snippet = "Fashion boutique"
                marker.id = result.id
                marker.userData = {index: 1}
                this.mapView.addMarker(marker)
            })

            // console.log(JSON.stringify(this.boutiques))
        },

        getStore(args){
            // console.log('Hola')
            // this.marker = args.object
            console.log(args.marker.id)
            this.$showModal(ModalBoutique, {
                props:{
                    id: args.marker.id,
                }
            })
        },

        //Actions MAP
        mapReady(args) {
            /* get the mapView instance */
            this.mapView = args.object;

            this.mapView.settings.scrollGesturesEnabled = true
            this.mapView.settings.zoomGesturesEnabled = true
            
            /* turn on my location button on map */
            this.enableMyLocationButton(true);
            /* add destination marker to map */
            this.addMarkerToMap(this.destinationMarker, true);
            /* add my location marker to map (which will point to our location when journey starts) - visibility hidden  */
            this.addMarkerToMap(this.myLocationMarker, false);
            /* set map origin coordinates to present device location */
            this.fetchMyLocation();

            this.getStores();
        },

        locationSelected(args) {
            /* get coordinates of the point where user long pressed */
            let lat = args.position.latitude;
            let lng = args.position.longitude;
            /* set the obtained coordinates as destination coordinates */
            this.destination.latitude = lat;
            this.destination.longitude = lng;
            /* move the destination marker to the same coordinates */
            this.setMarker(this.destinationMarker, lat, lng);        
        },

        getDirections() {
            /* hit Directions API - as origin and destination coordinates are set */
            this.hitDirectionsAPI().then(response => {
            /* draw route from encoded polyline points */
            this.drawRoute(response.encodedPolylinePoints);
            
            //if jouney started, don't adjust the camera 
            if (this.journeyStarted)
              return;

            /* adjust camera to bring route into view */
                this.getRouteInView(
                    response.northEastBounds,
                    response.southWestBounds
                );
            });            
        },

        clearRoute() {
            /* remove route drawn between locations on map */
            this.mapView.removeAllPolylines();
        },

        startJourney() {
            /* hide my location indicator and button */
            this.enableMyLocationButton(false);
            /* un-hide my location marker */
            this.myLocationMarker.visible = true;
            /* update journey details */
            this.journeyStarted = true;
            this.journeyDetails = "Journey started...";
            /* start watching for location changes and update the map and journey details accordingly */
            this.watchLocationAndUpdateJourney();
        },

        endJourney() {
            /* stop watching for location changes */
            this.clearWatch();
            /* remove the route drawn on map */
            this.clearRoute();
            /* hide my location marker  */
            this.myLocationMarker.visible = false;
            /* bring back my location button on screen */
            this.enableMyLocationButton(true);
            /* update journey details */
            this.journeyStarted = false;
            this.journeyDetails = "Destination Reached.";
        }
	}
}
</script>










