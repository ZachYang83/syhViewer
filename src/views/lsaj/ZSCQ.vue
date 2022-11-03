<template>
  <div>
   <Popup
      id="infoBox"
      v-model="visible"
      title="属性"
      class="info-box"
      @onCancel="onCancel"
    >
      <el-table :data="tableData" border style="width: 100%" height="400" :header-cell-style="rowClass">
        <el-table-column  align="center" prop="prop" label="属性" width="100">
        </el-table-column>
        <el-table-column  align="center" prop="value" label="值" width="200"> </el-table-column>
      </el-table>
    </Popup>
    <Legend
      v-model="showLegend"
      title="图例"
      class="legend-box"
      @onCancel="unshow"
    >
      <div class="legendBody">
        <div style="font: bold 18px '微软雅黑'; marginBottom: 15px">
          社区案件数
        </div>
        <template v-for="item in legendItems">
          <li :index="item.index" :key="item.key" class="legendItem">
            <div class="color" :style="item.style"></div>
            <div class="legendText">{{ item.text }}</div>
          </li>
        </template>
      </div>
    </Legend>
    <data-bar title="Top10知识产权案件" id="dataBar">
      <el-table
        :data="caseData"
        border
        style="width: 100%"
        :header-cell-style="rowClass"
        :cell-class-name="addColor"
      >
        <el-table-column
          prop="id"
          label="序号"
          width="50"
          align="center"
        ></el-table-column>
        <el-table-column prop="name" align="center" label="社区名" width="120">
        </el-table-column>
        <el-table-column prop="caseNum" align="center" label="案件数量" width="50">
        </el-table-column>
        <el-table-column prop="casePct" align="center" label="案件占比" width="60">
        </el-table-column>
        <el-table-column prop="mktNum" align="center" label="批发市场数量" width="50">
        </el-table-column>
        <el-table-column prop="mktMerchant" align="center" label="市场内商户数" width="60">
        </el-table-column>
      </el-table>
    </data-bar>
  </div>
</template>
<script>
import { add_tms } from "@/utils/loadLayer.js";
import { init_map } from "@/utils/initMap.js";
import { removeLayers } from "utils/removeLayers.js";
import { getCase } from "@/api/getCase.js";
import Popup from "@/components/Popup.vue";
import Legend from "@/components/Popup.vue";
import DataBar from "@/components/DataBar.vue";
export default {
  data() {
    return {
      visible: false,
      showLegend: false,
      tableData: [],
      legendItems: [
        {
          index: 1,
          text: "0 - 1",
          style: "backgroundColor:#FED6D6",
        },
        {
          index: 2,
          text: "2 - 7",
          style: "backgroundColor:#E68080",
        },
        {
          index: 3,
          text: "8 - 16",
          style: "backgroundColor:#CE2A2A",
        },
        {
          index: 4,
          text: "17 - 32",
          style: "backgroundColor:#B30000",
        },
        {
          index: 5,
          text: "33 - 60",
          style: "backgroundColor:#950000",
        },
        {
          index: 6,
          text: "61 - 98",
          style: "backgroundColor:#780000",
        },
      ],
      caseData:[],
    };
  },
  components: {
    Popup,
    Legend,
    DataBar,
  },
  mounted() {
    init_map(window.MAP, [113.40206, 23.228857], 9);
    this.initLayers();
    this.getCaseData();
    this.mouseEvent();
  },
  methods: {
    initLayers() {
      add_tms(window.MAP, "syh-sqaj", "fill", {
        "fill-outline-color": "#FBF3ED",
        "fill-color": [
          "case",
          ["<", ["get", "知识产"], 2],
          "#FED6D6",
          ["<", ["get", "知识产"], 8],
          "#E68080",
          ["<", ["get", "知识产"], 17],
          "#CE2A2A",
          ["<", ["get", "知识产"], 33],
          "#B30000",
          ["<", ["get", "知识产"], 61],
          "#950000",
          "#780000",
        ],
      });
      add_tms(window.MAP, "gzqx_line", "line", {
        "line-color": "#757575",
        "line-width": 1.1,
      });
      add_tms(window.MAP, "syh-zscq_mkt", "circle", {
        "circle-color": "#84ffff",
        "circle-radius": 6,
        "circle-stroke-width": 1, 
        "circle-stroke-color": "#fff", 
      });
      this.showLegend = true;
    },
    mouseEvent() {
      let _this = this;
      window.MAP.on("mousemove", function (e) {
        window.MAP.getCanvas().style.cursor = "pointer";
      });
      window.MAP.on("click", function (e) {
        var features = window.MAP.queryRenderedFeatures(e.point);
        var props = features[0].properties;
        if (features[0].source.substr(-3, 3) === "mkt") {
          _this.tableData = [
            {
              prop: "市场名",
              value: props["市场名"],
            },
            {
              prop: "所在区",
              value: props["所在区"],
            },
            {
              prop: "所在街",
              value: props["所在街"],
            },
            {
              prop: "经营品",
              value: props["经营品"],
            },
            {
              prop: "地址",
              value: props["地址"],
            },
            {
              prop: "商户数",
              value: props["商户数"],
            },
            {
              prop: "运营",
              value: props["市场运"],
            },
            {
              prop: "物业权",
              value: props["物业权"],
            },
          ];
        } else {
          _this.tableData = [
            {
              prop: "所属区",
              value: props["所属区"],
            },
            {
              prop: "社区名",
              value: props["社区名"],
            },
            {
              prop: "案件数",
              value: props["化妆品"],
            },
          ];
        }
        _this.visible = true;
        _this.showLegend = true;
        var infoBox = document.getElementById("infoBox");
         var sidebar = document.getElementsByClassName("sidebar")[0];
        if(sidebar.className.indexOf("fold") != -1 ){
          infoBox.style.top = e.originalEvent.clientY - 60 + "px";
          infoBox.style.left = e.originalEvent.clientX + 20 + "px";
        }else{
          infoBox.style.top = e.originalEvent.clientY - 60 + "px";
          infoBox.style.left = e.originalEvent.clientX - 150 + "px";
        }
      });
    },
    getCaseData() {
      let _this = this;
      getCase({
        kind: "知识产权",
      }).then((res) => {
        if (res.data.code === "0") {
          var data = res.data.data;
          for (let i = 0; i < data.length; i++) {
            data[i]["id"] = i + 1;
            _this.caseData.push(data[i]);
          }
        } else {
          console.log("error getCase!!");
          this.loading = false;
          return false;
        }
      });
    },
    rowClass({ row, rowIndex }) {
      return "font:bold 14px '微软雅黑';color:#212121;backgroundColor:rgba(117,117,117,0.3)";
    },
     addColor({ columnIndex, rowIndex }) {
      console.log('afasfsafsd');
      if (columnIndex === 0) {
        if (rowIndex === 0) {
          console.log('orange');
          return "orange";
        }
        if (rowIndex === 1) {
          console.log('yellow');
          return "yellow";
        }
        if (rowIndex === 2) {
          console.log('blue');
          return "blue";
        }
      }
    },
    onCancel() {
      this.visible = false;
    },
    unshow() {
      this.showLegend = false;
    },
  },
  destroyed() {
    removeLayers(window.MAP, ["gzqx_line", "syh-sqaj","syh-zscq_mkt"]);
  },
};
</script>
<style lang="scss" scoped>
.info-box {
  position: absolute;
  width: 300px;
  height: auto;
  // top: 45px;
  // right: 100px;
}

.legend-box {
  position: absolute;
  width: 200px;
  height: auto;
  bottom: 10px;
  left: 10px;
}

.legendBody {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  padding: 10px;
}
::-webkit-scrollbar {
  display: none;
}

.legendItem {
  width: 100%;
  height: 30px;
  margin-bottom: 10px;
  display: flex;

  .color {
    display: flex;
    flex: 1;
    height: 30px;
    margin: 0 10px;
    border-radius: 7px;
    // background: #17c5a5;
  }

  .legendText {
    display: flex;
    flex: 2;
    height: 30px;
    color: #fff;
    align-items: center;
    justify-content: center;
    line-height: 30px;
    font-size: 15px;
  }
}
.legendItem:last-child {
  margin-bottom: 0px;
}

#dataBar {
  top: 40px;
  right: 20px;
  width: 400px;
  height: auto;
  max-height: calc(100% - 50px);
}

::v-deep .orange {
  .cell {
    width:25px;
    height:25px;
    line-height: 25px;
    margin:0 auto;
    text-align:center;
    vertical-align: center;
    border-radius: 30%;
    background: #ff7f31 ;
    color: #fff ;
  }
}
::v-deep .yellow {
  .cell {
    width:25px;
    height:25px;
    line-height: 25px;
    margin:0 auto;
    text-align:center;
    vertical-align: center;
    border-radius: 30%;
    background: #ffba32 ;
    color: #fff ;
  }
}
::v-deep .blue {
  .cell {
    width:25px;
    height:25px;
    line-height: 25px;
    margin:0 auto;
    text-align:center;
    vertical-align: center;
    border-radius: 30%;
    background: #3288ff;
    color: #fff;
  }
}
</style>