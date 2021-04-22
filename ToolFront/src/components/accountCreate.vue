<template>
    <el-form ref="form" :model="form" label-width="80px" :rules="rules">
  <el-form-item label="名字" prop="first_name">
    <el-input v-model="form.first_name"></el-input>
  </el-form-item>
  <el-form-item label="姓氏" prop="last_name">
    <el-input v-model="form.last_name"></el-input>
  </el-form-item>
  <el-form-item label="邮箱" prop="email">
    <el-input v-model="form.email"></el-input>
  </el-form-item>
  <el-form-item label="密码">
    <el-input v-model="form.password" disabled></el-input>
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
          first_name: '',
          last_name: '',
          email: '',
          password:"Aa123456"
        },
        rules:{
            first_name: [
            { required: true, message: '请输入名字', trigger: 'blur' },
          ],
            last_name: [
            { required: true, message: '请输入姓氏', trigger: 'blur' },
          ],
            email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
          ]
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            request.post("/api/addAcount",this.form).then(res=>{
            // console.log(res)
            this.$store.commit("getAccounts");
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