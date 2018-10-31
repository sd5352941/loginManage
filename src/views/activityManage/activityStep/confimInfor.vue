<template>
  <div>
    <div v-for="item in desc.data" class="descDiv">
      <div v-if="item.isArray">{{item.title}}:
        <el-tag class="tag" v-for="arrayDesc in esInformation[item.desc]" size="small">
          {{arrayDesc}}
        </el-tag>
      </div>
      <div v-else class="descDiv">{{item.title}}:<b style="margin-left: 10px">{{esInformation[item.desc]}}</b></div>
    </div>
    <div>
      活动路线:
      <div id="map" style="margin-top: 30px"></div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from "vuex"
  import * as desc from "./inforMationDesc"

  export default {
    data(){
      return{
        map:{},
        desc,
      }
    },
    computed: {
      ...mapGetters([
        'mapPoint',
        'esInformation',
      ])
    },
    mounted:function () {
      this.initMap()
    },
    methods:{
      initMap(){
        this.map = new BMap.Map("map");          // 创建地图实例
        this.map.centerAndZoom("成都", 14);                 // 初始化地图，设置中心点坐标和地图级别
        this.map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放

      },
      route(){
        var driving = new BMap.RidingRoute(this.map, {
          renderOptions:{
            map: this.map,
            autoViewport: true,
            enableDragging : true,
          }
        });
        driving.search(this.mapPoint.startPoint,this.mapPoint.endPoint)
      }
    }
  }
</script>

<style>
  #map{
    height: 500px;
  }
  .tag+.tag{
    margin-left: 10px;
  }
  .descDiv{
    margin-bottom: 10px;
  }
</style>
