<template>
    <el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="SN序列号" prop="sn">
    <el-input v-model="form.sn" placeholder="请输入sn"></el-input>
  </el-form-item>
    <el-form-item label="设备id" prop="sub_device_id">
    <el-input v-model="form.sub_device_id" placeholder="请输入sub_device_id"></el-input>
  </el-form-item>
    <el-form-item label="产品key" prop="product_key">
    <el-input v-model="form.product_key" placeholder="请输入product_key:sensor"></el-input>
  </el-form-item>
    <el-form-item label="设备类型" prop="device_type">
       <el-select v-model="form.device_type" filterable placeholder="请选择" @change="handleSelecttype">
    <el-option
      v-for="item in this.$store.state.device_types"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      >
    </el-option>
  </el-select>
  </el-form-item>
    <el-form-item label="设备模型" prop="device_model">
       <el-select v-model="form.device_model" filterable placeholder="请选择" @change="handleSelectmodle">
    <el-option
      v-for="item in this.$store.state.device_models"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      >
    </el-option>
  </el-select>
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
            sub_device_id:'',
            product_key:'',
            device_type:'',
            device_model:'',
            manufacture_time:''
        }
        
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            request.post("/api/addSubdeviceToFactory",this.form).then(res=>{
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
      },
      handleSelecttype(item){
        console.log(item)
        this.form.device_type=item;
      },
      handleSelectmodle(item){
        console.log(item)
        this.form.device_model=item
      },
     
    },
    mounted() {
    //  this.loadAll()
    },
    
}
</script>