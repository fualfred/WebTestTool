<template>
    <el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="邮箱" prop="email">
    <el-autocomplete 
      class="el-input"
      v-model="form.email"
      :fetch-suggestions="querySearch"
      placeholder="请输入邮箱"
      :trigger-on-focus="false"
      @select="handleSelect"
    ></el-autocomplete>
  </el-form-item>
  <el-form-item label="社区名" prop="name">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
    <el-form-item label="社区地址" prop="address">
    <el-input v-model="form.address"></el-input>
  </el-form-item>
    <el-form-item label="省份" prop="state">
    <el-input v-model="form.state"></el-input>
  </el-form-item>
    <el-form-item label="城市" prop="city">
    <el-input v-model="form.city"></el-input>
  </el-form-item>
    <el-form-item label="街道" prop="street">
    <el-input v-model="form.street"></el-input>
  </el-form-item>
    <el-form-item label="邮编" prop="postcode">
    <el-input v-model="form.postcode"></el-input>
  </el-form-item>
    <el-form-item label="时区" prop="time_zone">
    <el-input v-model="form.time_zone"></el-input>
  </el-form-item>
  <el-form-item label="号码" prop="phone">
    <el-input v-model="form.phone"></el-input>
  </el-form-item>
  <el-form-item label="楼栋数量" prop="building_count">
    <el-input v-model="form.building_count"></el-input>
  </el-form-item>
  <el-form-item label="公寓数量" prop="apartment_count">
    <el-input v-model="form.apartment_count"></el-input>
  </el-form-item>
  <el-form-item label="租客数量" prop="tenant_count">
    <el-input v-model="form.tenant_count"></el-input>
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
        accounts: [],
        form:{
            email:'',
            name:'',
            address:'',
            state:'',
            city:'',
            street:'',
            postcode:'',
            time_zone:'Asia/Shanghai',
            phone:'',
            building_count:'',
            apartment_count:'',
            tenant_count:'',
            admin_count:1
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            request.post("/api/createCommunity",this.form).then(res=>{
            // console.log(res)
            this.$store.commit("getCommunites")
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
      querySearch(queryString, cb) {
        let accounts = this.$store.state.accounts;
        // console.log(queryString)
        // console.log(accounts)
        var results = queryString ? accounts.filter(this.createFilter(queryString)) : accounts;
        // console.log("-----------")
        // console.log(results)
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
  
      createFilter(queryString){
         return (state) => {
          return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        console.log(item);
      }
    },
    mounted() {
    //  this.loadAll()
    },

}
</script>