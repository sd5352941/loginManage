<template>
  <div>
    <Card style="height:100%">
      <div style="margin: 50px 0px 40px 0">
        <!--<el-select v-model="type" placeholder="用户状态">-->
        <!--<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">-->
        <!--</el-option>-->
        <!--</el-select>-->
        <el-input v-model="activityNameQ" :placeholder="placeholder" style="width: 200px;margin-left: 20px"></el-input>
        <el-button type="primary" @click="queryList" style="margin-left: 20px">查询</el-button>
      </div>
      <card>
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[1,5, 10]"
          :page-size="pageSize"
          layout="sizes, prev, pager, next"
          :total="total">
        </el-pagination>
        <el-table :data="dataList" v-loading="loading" border style="width: 100%;margin-top: 5px">
          <el-table-column  prop="state" label="活动状态" width="120" align="center">
            <template scope="scope">
              <div>
                <el-tag type="success" v-if="scope.row.state==1">有效</el-tag>
                <el-tag type="danger" v-else>过期</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column  prop="name" label="活动名称">
          </el-table-column>
          <el-table-column prop="date1" label="活动时间"></el-table-column>
          <el-table-column prop="phone" label="联系电话" >
          </el-table-column>
          <el-table-column prop="type" label="活动类型">
          </el-table-column>
          <el-table-column prop="resource" label="活动标签">
          </el-table-column>
          <el-table-column prop="desc" label="活动描述">
          </el-table-column>
          <el-table-column label="操作" align="center" width="180">
            <template scope="scope">
              <div>
                <el-button type="primary" size="mini" @click="toDesc(scope.row.id)">详情</el-button>
                <el-button type="danger" @click="deleteActivity(scope.row)" size="mini">删除</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </card>
    </Card>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from "axios"
  import * as api from "@/axios/activity"
  import ElInput from "../../../node_modules/element-ui/packages/input/src/input";
  import ElButton from "../../../node_modules/element-ui/packages/button/src/button";


  export default {
    components: {
      ElButton,
      ElInput},
    data() {
      return {
        dataList:[],
        UserNum:"",
        loading:false,
        tableName:"姓名",
        placeholder:"请输入活动名",
        total:0,
        pageSize:5,
        pageNub:1,
        activityNameQ:"",
        validity:"",
        userID:"",
        type:0,
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
        userName:"",
        state:"",
        tableData: [],
        rules:{
          name: [
            { required: true, message: '请输入会员姓名', trigger: 'blur' },
          ],
          expireTime: [
            { type: 'date',required: true, message: '请输入有效期', trigger: 'change' },
          ],
        }
      }
    },
    methods:{
      toDesc(id){
        if(id){
          this.$router.push({path:"activityDesc",query:{id:id}})
        }
      },
      getTime(date){
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        m = m < 10 ? '0' + m : m;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        return y + '-' + m + '-' + d;
      },
      handleClose(){
        this.dialogVisible = false
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.queryList()
      },
      handleCurrentChange(val) {
        this.pageNub = val
        this.queryList()
      },
      queryList(){
        var data = {
          name:""
        }
        api.activityQuery(data).then((res)=>{
          this.dataList = []
          if(res.data.code==200){
            var data
            for(let key in res.data.result){
              data = res.data.result[key].esInformation
              data.id = res.data.result[key]._id
              data.mapPoint = res.data.result[key].mapPoint
              this.dataList.push(data)
            }
          }else{
            this.$message.error("暂无数据")
          }
        })
      },
      deleteActivity(row){
        this.$confirm('是否永久删除该活动信息?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          api.activityDelete(row.id).then((res)=>{
            this.$message({
              type:res.data.type,
              message:res.data.message,
            })
            this.queryList()
          })
        })
      }
    },
    mounted:function () {
      axios.interceptors.request.use((config)=> {
        this.loading = true
        return config;
      });

      axios.interceptors.response.use((response) =>{
        this.loading = false
        return response;
      });
      this.queryList()
    }
  }
</script>
