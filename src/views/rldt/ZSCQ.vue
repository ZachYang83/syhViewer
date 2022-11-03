<template>
  <div>
  </div>
</template>
<script>
console.log("hello");
// import { add_tms } from "@/utils/loadLayer.js";
// window.MAP.addSource("syh-sqaj", {
//   type: "vector",
//   scheme: "tms",
//   tiles: [
//     "http:/localhost:8080/geoserver/gwc/service/tms/1.0.0/syh%3Asyh-sqaj@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf",
//   ],
//   // maxzoom: 8,
// });
// window.MAP.addLayer({
//   id: "syh-sqaj_layer",
//   source: "syh-sqaj",
//   "source-layer": "syh-sqaj",
//   type: "fill",
//   paint: {
//     "fill-outline-color": "#FBF3ED",
//     "fill-color": [
//       "case",
//       ["<", ["get", "知识产"], 1],
//       "#FED6D6", //<10.8
//       ["<", ["get", "知识产"], 7],
//       "#E68080", //>=10.8 & <17.2
//       ["<", ["get", "知识产"], 16],
//       "#CE2A2A",
//       ["<", ["get", "知识产"], 32],
//       "#B30000",
//       ["<", ["get", "知识产"], 60],
//       "#950000",
//       "#780000", // 默认值, >=50.1
//     ],
//   },
// });
// var paint = {
//   "line-color": "#757575",
//   "line-width": 1.1,
// };
// add_tms(window.MAP, "gzqx_line", "line", paint);
export default {
  mounted(){
    console.log('hhhhhhhhhhhhhhhh');
  }
}
</script>
<style>
</style>