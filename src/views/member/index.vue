<template>
  <div>
    <Card style="height:100%">
      <div style="margin: 50px 0px 40px 0">
        <!--<el-select v-model="type" placeholder="用户状态">-->
          <!--<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">-->
          <!--</el-option>-->
        <!--</el-select>-->
        <el-input v-model="userNameQ" :placeholder="placeholder" style="width: 200px;margin-left: 20px"></el-input>
        <el-button type="primary" @click="userData" style="margin-left: 20px">查询</el-button>
        <el-button type="danger" @click="dialogVisible=true">新增会员</el-button>
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
      <el-table :data="tableData" v-loading="loading" border style="width: 100%;margin-top: 5px">
        <el-table-column  prop="state" label="状态" width="120" align="center">
          <template scope="scope">
            <div>
              <el-tag type="success" v-if="scope.row.state==1">有效</el-tag>
              <el-tag type="danger" v-else>过期</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column  prop="membername" :label="tableName" width="150">
        </el-table-column>
        <el-table-column prop="expiretime" label="会员到期时间"></el-table-column>
        <el-table-column prop="phone" label="电话" >
        </el-table-column>
        <el-table-column prop="weixin" label="微信" >
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template scope="scope">
            <div>
              <el-button type="primary" size="small">编辑</el-button>
              <el-button type="danger" size="small">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      </card>
    </Card>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-form label-position="right" label-width="120px" :model="addmemberData"  :rules="rules" ref="ruleForm">
        <el-form-item label="会员姓名" prop="name">
          <el-input v-model="addmemberData.name"></el-input>
        </el-form-item>
        <el-form-item label="会员到期时间" prop="expireTime">
          <el-date-picker v-model="addmemberData.expireTime" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="addmemberData.phone"></el-input>
        </el-form-item>
        <el-form-item label="微信"  prop="weixin">
          <el-input v-model="addmemberData.weixin"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addMember('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
  import axios from "axios"
  import ElInput from "../../../node_modules/element-ui/packages/input/src/input";
  import ElButton from "../../../node_modules/element-ui/packages/button/src/button";


  export default {
    components: {
      ElButton,
      ElInput},
    data() {
      return {
        addmemberData:{
          name:"",
          expireTime:"",
          phone:"",
          weixin:"",
        },
        dialogVisible:false,
        UserNum:"",
        loading:false,
        tableName:"姓名",
        placeholder:"请输入姓名",
        total:0,
        pageSize:5,
        pageNub:1,
        userNameQ:"",
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
        this.userData()
      },
      handleCurrentChange(val) {
        this.pageNub = val
        this.userData()
      },
      userData(){
        var nowTime = Number(this.getTime(new Date()).replace(/-/g,""))
        axios.post("/memberData/query",{
            membername:this.userNameQ,
            nowtime:nowTime,
        }).then((res)=>{
            this.tableData = res.data.list
        })
      },
      addMember(data){
        this.$refs[data].validate((valid) => {
          if (valid) {
            axios.post("/memberData/add",{
                membername:this.addmemberData.name,
                expiretime:this.getTime(this.addmemberData.expireTime),
                phone:this.addmemberData.phone,
                weixin:this.addmemberData.phone,
            }).then((res)=>{
                if(res.data.code==200){
                  this.$message.success(res.data.message)
                  this.dialogVisible = false;
                  this.$refs[data].resetFields();
                  this.userData()
                }else{
                  this.$message.error(res.data.message)
                }

            })
          } else {
            this.$message('请填写必选项');
          }
        });
      },
      resetForm(data){
        this.$refs[data].resetFields();
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
      this.userData()
    }
  }
</script>
