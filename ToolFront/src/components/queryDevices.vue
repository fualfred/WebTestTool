<template>
    <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="设备id" prop="device_id">
    <el-input v-model="form.device_id"></el-input>
  </el-form-item>
   <el-form-item label="设备类型" prop="device_type">
      <el-select v-model="form.device_type" filterable placeholder="请选择">
    <el-option
      v-for="item in device_types"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      >
    </el-option>
  </el-select>
  </el-form-item>
  <el-form-item>
  <span  v-show ="dislay==true">{{message}}</span>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('form')">立即查询</el-button>
    <el-button @click="resetForm('form')">重置</el-button>
  </el-form-item>
</el-form>
</template>

<script>
import request from '../js/request'
export default {
     data() {
      return {
        buildings:[],
        device_types:[
          {
            value:1,
            label:"hub"
          },
          {
            value:2,
            label:"sensor"
          }

        ],
        message:"",
        dislay:false,
        form:{
            device_id:'',
            device_type:''
        }
        
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            request.post("/api/queryDevice",this.form).then(res=>{
            // console.log(res)
            // this.$message(res.data.msg);
            this.message = res.data.msg
            this.dislay = true
        })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.dislay = false
      }
    },
    mounted() {
    //  this.loadAll()
    },
    
}
</script>