<template>
    <el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="SN序列号" prop="sn">
    <el-input v-model="form.sn" placeholder="请输入sn"></el-input>
  </el-form-item>
    <el-form-item label="设备id" prop="deviceId">
    <el-input v-model="form.deviceId" placeholder="请输入deviceId"></el-input>
  </el-form-item>
    <el-form-item label="产品key" prop="product_key">
    <el-input v-model="form.product_key" placeholder="请输入product_key:hub"></el-input>
  </el-form-item>
    <el-form-item label="设备类型" prop="device_type">
    <el-input v-model="form.device_type" placeholder="请输入device_type:hub"></el-input>
  </el-form-item>
    <el-form-item label="设备模型" prop="device_model">
    <el-input v-model="form.device_model" placeholder="请输入device_model:hub_ds"></el-input>
  </el-form-item>
    <el-form-item label="sim号码" prop="sim_number">
    <el-input v-model="form.sim_number" placeholder="请输入sim_number"></el-input>
  </el-form-item>
    <el-form-item label="Mac地址" prop="mac">
    <el-input v-model="form.mac" placeholder="请输入Mac地址"></el-input>
  </el-form-item>
  <el-form-item label="制造时间" prop="manufacture_time">
   <el-date-picker
      v-model="form.manufacture_time"
      type="datetime"
      placeholder="选择日期时间">
    </el-date-picker>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('form')">立即创建</el-button>
    <el-button @click="resetForm('form')">重置</el-button>
  </el-form-item>
</el-form>
</template>

<script>
import request from '../js/request'
export default {
     data() {
      return {
        form:{
            sn:'',
            deviceId:'',
            product_key:'',
            device_type:'',
            device_model:'',
            sim_number:'',
            mac:'',
            manufacture_time:'',
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            request.post("/api/addHubtoFactory",this.form).then(res=>{
            console.log(res)
            this.$message(res.data.msg);
        })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }

}
</script>