<template>
  <card style="padding: 30px">
    <el-steps :active="active" finish-status="success">
      <el-step title="活动基本信息" icon="el-icon-edit"></el-step>
      <el-step title="活动路线位置" icon="el-icon-location"></el-step>
      <el-step title="确认信息" icon="el-icon-picture"></el-step>
    </el-steps>
    <div style="margin: 40px">
      <messege v-show="active==0" ref="activityMessage"></messege>
      <BMap v-show="active==1" ref="activityMap"></BMap>
      <confimInfor v-show="active==2" ref="confimInfor"></confimInfor>
    </div>
    <div style="float: right">
      <el-button style="margin-top: 12px;" @click="back">上一步</el-button>
      <el-button style="margin-top: 12px;" @click="next" type="primary">{{status}}</el-button>
    </div>
    <div style="clear:both"></div>
    <el-dialog
      @close="dialogClose"
      :visible.sync="dialogVisible"
      width="30%">
      <div>
        <h3>发布成功,请选择分享地址</h3>
        <div class="bdsharebuttonbox" data-tag="share_1">
          <a class="bds_mshare" data-cmd="mshare"></a>
          <a class="bds_qzone" data-cmd="qzone" href="#"></a>
          <a class="bds_tsina" data-cmd="tsina"></a>
          <a class="bds_baidu" data-cmd="baidu"></a>
          <a class="bds_weixin" data-cmd="weixin"></a>
          <a class="bds_tieba" data-cmd="tieba"></a>
        </div>
      </div>
    </el-dialog>
  </card>
</template>

<script>
  import messege from "./activityStep/massege"
  import BMap from "./activityStep/BMap"
  import confimInfor from "./activityStep/confimInfor"
  import * as api from '@/axios/activity'
  import { mapGetters } from "vuex"






  export default {
    data() {
      return {
        activityID:"",
        dialogVisible:false,
        markArray:[],
        active: 0,
        status:"下一步"
      };
    },
    computed: {
      ...mapGetters([
        'mapPoint',
        'esInformation',
      ])
    },
    beforeMount:function(){

    },
    methods: {
      dialogClose(){
        this.$router.push({path:'activityDesc',query:{id:this.activityID}})
      },
      next() {
        switch(this.active)
        {
          case 0:
            this.$refs.activityMessage.submitForm("ruleForm")
            // this.active++
            if(this.$refs.activityMessage.nextState){
              this.active++
              setTimeout(()=>{
                this.$refs.activityMap.initMap()
              },100)
            }
            break;
          case 1:
            if(this.$refs.activityMap.nextState){
              this.active++
              this.$refs.activityMap.submit()
              this.$refs.confimInfor.route()
              this.status = "提交";
            }else {
              this.$message.error("请选择骑行路线")
            }
            break;
          case 2:
            this.activityAdd()
            break;
        }
      },
      back(){
        if(this.active!=0){
          if (this.active --> 1) {
            this.status = "下一步";
          }
        }
      },

      //发布活动
      activityAdd(){
        this.$confirm('是否确认发布该活动信息?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          api.activityAdd(this.mapPoint,this.esInformation).then((res)=>{
            this.$message({
              type:res.data.type,
              message:res.data.message
            })
            if(res.data.code==200){
              window._bd_share_main=""
              function SetShareUrl(cmd, config) {
                config.bdUrl = "https://shiyousan.com/";
                return config;
              }
              window._bd_share_config = {
                common : {
                  onBeforeClick:SetShareUrl,
                  bdText : '测试text',
                  bdDesc : '测试Desc',
                },
                "share": {
                  "bdSize" : 32,
                }
              };
              const s = document.createElement('script');
              s.type = 'text/javascript';
              s.src = 'http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion=' + ~(-new Date() / 36e5);
              document.body.appendChild(s);

              this.dialogVisible = true
              this.activityID = res.data.result.insertedIds[0]
              // this.$router.push("activityManage")
              // this.$router.push({path:'activityDesc',query:{id:res.data.result.insertedIds[0]}})
            }
          })
        })
      },
    },
    components:{
      messege,
      BMap,
      confimInfor
    },
    watch:{
      active(){
          if(this.$refs.activityMap.pointArray<2){
            this.active==1 ?this.$alert('点击地图上位置位置选择活动起始点', '选取起始点') : this.active
          }
        }
      }
  }
</script>

<style>

</style>
