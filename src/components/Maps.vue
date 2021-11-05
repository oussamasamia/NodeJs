<template>
  <div class="row map">
    <l-map :zoom="zoom" :center="[this.coord[1],this.coord[0]]" ref="mymap">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <l-marker :lat-lng="markerLatLng"></l-marker>
    </l-map>
  </div>
</template>


<script>
// If you need to reference 'L', such as in 'L.icon', then be sure to
// explicitly import 'leaflet' into your component
//import L from "leaflet";

import { LMap, LTileLayer, LMarker } from "vue2-leaflet";

export default {
  name: "RestaurantMap",
  data() {
    return {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 15,
      center: [0,0],
      markerLatLng: [51.504, -0.159],
    };
  },
  props:{
    coord:Array,
  },
  components: {
    LMap,
    LTileLayer,
    LMarker,
  },
  mounted(){
    this.center[0] = this.coord[1]
    this.center[1] = this.coord[0]

    this.markerLatLng[0] = this.coord[1]
    this.markerLatLng[1] = this.coord[0]

    //alert(this.center)
    //alert(this.markerLatLng)

   // console.log(this.$parent.restaurantDetails.cuisine+"/cui")
  },
  methods: {
    modalShown() {
      setTimeout(() => {
        //mapObject is a property that is part of leaflet
        this.$refs.mymap.mapObject.invalidateSize();
      }, 100);
    },
  },
};
</script>

<style>
.map {
  /* <--- class we added above */
  width: 100%;
  height: 400px;
}
</style>