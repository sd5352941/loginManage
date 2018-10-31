<template>
  <div>
    <el-button type="primary" @click="$router.go(-1)">返回</el-button>
    <h1 v-if="!descShow">查无此活动</h1>
    <div v-else="descShow">
      活动名称:<b>{{activityDesc.esInformation.name}}</b>
      <br/>
      活动时间:<b>{{activityDesc.esInformation.date1}}</b>
      <br/>
      活动区域:<b>{{activityDesc.esInformation.region}}</b>
      <br/>
      活动性质:<b>{{activityDesc.esInformation.resource}}</b>
      <br/>
      活动类型:<b>{{activityDesc.esInformation.type}}</b>
      <br/>
      活动描述:<b>{{activityDesc.esInformation.desc}}</b>
      <br/>
      活动地图:<div id="map"></div>
    </div>
  </div>
</template>

<script>
  import * as api from "@/axios/activity"

  export default {
    data(){
      return{
        descShow:false,
        activityID:"",
        activityDesc:{},
        map:{},
      }
    },
    mounted:function () {
      if(this.$route.query.id){
        this.activityID = this.$route.query.id
        this.queryDesc()
      }
    },
    methods:{
      queryDesc(){
        api.activityDesc(this.activityID).then((res)=>{
          this.descShow = true
          this.activityDesc = res.data.result[0]
        }).catch((err)=>{
          this.descShow = false
        })
      },
      initMap(){
        this.map = new BMap.Map("map");          // 创建地图实例
        this.map.centerAndZoom("成都", 14);                 // 初始化地图，设置中心点坐标和地图级别
        this.map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
        if(this.activityDesc.mapPoint){
          this.route(this.activityDesc.mapPoint)
        }
      },
      route(mapPoint){
        var driving = new BMap.RidingRoute(this.map, {
          renderOptions:{
            map: this.map,
            autoViewport: true,
            enableDragging : true,
          }
        });
        let start = new BMap.Point(mapPoint.startPoint.lng,mapPoint.startPoint.lat);
        let end = new BMap.Point(mapPoint.endPoint.lng,mapPoint.endPoint.lat);
        driving.search(start,end)
      }
    },
    updated:function () {
      if(this.descShow){
        this.initMap()
      }
    }
  }

</script>

<style>
#map{
  height: 500px;
  width: 1000px;
}
</style>
