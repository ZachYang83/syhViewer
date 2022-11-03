<template>
  <div id="map" class="map">
    <router-view></router-view>
    <Toolbar @selectMap="selectMap"></Toolbar>
  </div>
</template>

<script>
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Toolbar from "../Toolbar.vue";

export default {
  mounted() {
    this.initMap();
  },
  components: {
    Toolbar,
  },
  methods: {
    initMap() {
      mapboxgl.accessToken =
        "pk.eyJ1IjoiemFjaHlhbmc4MyIsImEiOiJja211MjRsbm4waXMwMm5wZDE3d3BuZjBuIn0.lcRS0kbOWjzFw-UikwbyHQ";

      window.MAP = new mapboxgl.Map({
        container: "map",
        // style: "mapbox://styles/mapbox/dark-v9",
        // style:"mapbox://styles/mapbox/navigation-night-v1",
        style: {
          version: 8,
          sources: {
            mapsource: {
              type: "raster",
              tiles: [
                "https://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}",
              ],
              tileSize: 256,
            },
          },
          layers: [
            {
              id: "mapsource",
              type: "raster",
              source: "mapsource",
              minzoom: 0,
              maxzoom: 18,
            },
          ],
        },
        center: [113.332208, 23.122544],
        attributionControl: false,
        zoom: 11.5,
        antialias: false,
        // pitch: 60,
        // bearing: -5,
      });
    },
    selectMap(item) {
      console.log("daffsfsa");
      window.MAP.setStyle(item.style);
    },
  },
};
</script>

<style lang="scss">
.map {
  width: 100%;
  height: 100%;
}

.mapboxgl-ctrl-logo {
  display: none !important;
}
</style>