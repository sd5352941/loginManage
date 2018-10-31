<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="活动名称" prop="name">
      <el-input v-model="ruleForm.name" style="width: 200px"></el-input>
    </el-form-item>
    <el-form-item label="活动区域" prop="region">
      <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
        <el-option label="区域一" value="区域1"></el-option>
        <el-option label="区域二" value="区域2"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="活动时间" required>
      <el-col :span="11">
        <el-form-item prop="date1">
          <el-date-picker
            v-model="ruleForm.date1"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item label="活动标签" prop="type">
      <el-checkbox-group v-model="ruleForm.type">
        <el-checkbox label="休闲骑" name="type"></el-checkbox>
        <el-checkbox label="拉扯" name="type"></el-checkbox>
        <el-checkbox label="妹子" name="type"></el-checkbox>
        <el-checkbox label="长途" name="type"></el-checkbox>
        <el-checkbox label="跑量" name="type"></el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="活动性质" prop="resource">
      <el-radio-group v-model="ruleForm.resource">
        <el-radio label="免费"></el-radio>
        <el-radio label="收费"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="活动描述" prop="desc">
      <el-input type="textarea" v-model="ruleForm.desc"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>

</template>

<script>

  export default {
    data() {
      return {
        nextState:false,
        getTime:function (inputTime) {
          var date = new Date(inputTime);
          var y = date.getFullYear();
          var m = date.getMonth() + 1;
          m = m < 10 ? ('0' + m) : m;
          var d = date.getDate();
          d = d < 10 ? ('0' + d) : d;
          var h = date.getHours();
          h = h < 10 ? ('0' + h) : h;
          var minute = date.getMinutes();
          var second = date.getSeconds();
          minute = minute < 10 ? ('0' + minute) : minute;
          second = second < 10 ? ('0' + second) : second;
          return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
        },
        ruleForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          type: [],
          resource: '',
          desc: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { max: 15, message: '最多 15 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动描述', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        // this.$refs[formName].validate((valid) => {
        //   if (valid) {
        //     this.ruleForm.date1 = this.getTime(this.ruleForm.date1)
        //     this.$store.commit("SET_INFORMATION",this.ruleForm)
        //     this.nextState = true
        //   } else {
        //     this.nextState = false
        //     return this.nextState;
        //   }
        // });

        this.ruleForm.date1 = this.getTime(this.ruleForm.date1)
        this.$store.commit("SET_INFORMATION",this.ruleForm)
        this.nextState = true
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
  }
</script>

<style>
  .el-input__inner{
  ;
  }
</style>
