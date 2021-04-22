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
  <el-form-item label="楼栋名" prop="building_name">
      <el-select v-model="form.building_name" filterable placeholder="请选择" @change="handleSelectbuild">
    <el-option
      v-for="item in buildings"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      >
    </el-option>
  </el-select>
  </el-form-item>
    <el-form-item label="公寓名" prop="aname">
    <el-input v-model="form.aname"></el-input>
  </el-form-item>
  <el-form-item label="公寓地址" prop="address">
    <el-input v-model="form.address"></el-input>
  </el-form-item>
   <el-form-item label="房间类型" prop="room_type">
    <el-input v-model="form.room_type"></el-input>
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
        buildings:[],
        form:{
            bname:'',
            address:'',
            room_type:'',
            building_id:'',
            building_name:'',
            aname:''
        }
        
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            request.post("/api/createApartment",this.form).then(res=>{
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
      handleSelectbuild(item){
       console.log(item);
       this.form.building_id=item;
      },
      handleSelect(item) {
        console.log(item)
        let community_id = item.id
         request.get("/api/getbuidingsByid?community_id="+community_id).then(res=>{
          // console.log("--------------")
          // console.log(res.data.data)
          this.form.building_name = ''
          this.buildings = res.data.data
          this.buildings = this.buildings.map((obj)=>{
            let robj = {};
            robj["value"]=obj.id;
            robj["label"]=obj.name
            return robj;
            
          });
          // console.log(this.accounts)
        })

      }
    },
    mounted() {
    //  this.loadAll()
    },
    

}
</script>