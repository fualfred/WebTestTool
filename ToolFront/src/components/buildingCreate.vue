<template>
    <el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="社区名" prop="commnunity">
    <el-autocomplete 
      class="el-input"
      v-model="form.commnunity"
      :fetch-suggestions="querySearch"
      placeholder="请输入社区"
      :trigger-on-focus="false"
      @select="handleSelect"
    ></el-autocomplete>
  </el-form-item>
  <el-form-item label="楼栋名" prop="name">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
    <el-form-item label="楼栋地址" prop="address">
    <el-input v-model="form.address"></el-input>
  </el-form-item>
    <el-form-item label="公寓数量" prop="num">
    <el-input v-model="form.num"></el-input>
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
            commnunity:'',
            name:'',
            address:'',
            num:'',
            id:''
        }
        
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            request.post("/api/createBuilding",this.form).then(res=>{
            console.log(res)
            this.$message(res.data.msg);
            this.loadAll()
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
        let commnunities = this.$store.state.commnunities;
        // console.log(queryString)
        // console.log(accounts)
        var results = queryString ? commnunities.filter(this.createFilter(queryString)) : commnunities;
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
        console.log(item)
        this.form.id = item.id
      }
    },
    mounted() {
    //  this.loadAll()
    },

}
</script>