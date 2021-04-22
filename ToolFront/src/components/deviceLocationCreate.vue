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
   <el-form-item label="公寓地址" prop="apartment_name">
      <el-select v-model="form.apartment_name" filterable placeholder="请选择" @change="handleSelectapart">
    <el-option
      v-for="item in apartments"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      >
    </el-option>
  </el-select>
  </el-form-item>
    <el-form-item label="房间" prop="location_name">
        <el-select v-model="form.location_name" filterable placeholder="请选择" @change="handleSelectlocation">
    <el-option
      v-for="item in locations"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      >
    </el-option>
  </el-select>
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
   <el-form-item label="绑定时间" prop="bind_time">
   <el-date-picker
      v-model="form.bind_time"
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
        buildings:[],
        apartments:[],
        locations:[],
        form:{
            location_id:'',
            apartment_id:'',
            building_id:'',
            community_id:'',
            device_type:'',
            bind_time:'',
            building_name:'',
            location_name:'',
            apartment_name:''

        }
        
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            request.post("/api/createdeviceLocation",this.form).then(res=>{
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
      handleSelectapart(item){
        console.log(item);
        this.form.location_name = ""
        this.form.apartment_id=item;
        request.get('/api/getLocationByid?apartment_id='+item).then(res=>{
            let locations = res.data.data;
            this.locations = locations.map(obj=>{
              let robj = {}
              robj["value"] =obj.id;
              robj["label"] = obj.name;
              return robj
            })
        })

      },
      handleSelectbuild(item){
       console.log(item);
       console.log(this.form.building_name)
       this.form.apartment_name=""
       this.form.location_name = ""
       this.form.building_id = item
          request.get("/api/getApartmentByid?building_id="+item).then(res=>{
          // console.log("--------------")
          // console.log(res.data.data)
          this.apartments = res.data.data
          this.apartments = this.apartments.map((obj)=>{
            let robj = {};
            robj["value"]=obj.id;
            robj["label"]=obj.address
            return robj;
            
          });
          // console.log(this.accounts)
        })

      },
      handleSelect(item) {
        console.log(item)
        this.form.building_name = ""
        this.form.apartment_name=""
        this.form.location_name = ""
        this.form.community_id = item.id
         request.get("/api/getbuidingsByid?community_id="+item.id).then(res=>{
          // console.log("--------------")
          // console.log(res.data.data)
          this.buildings = res.data.data
          this.buildings = this.buildings.map((obj)=>{
            let robj = {};
            robj["value"]=obj.id;
            robj["label"]=obj.name
            return robj;
            
          });
          // console.log(this.accounts)
        })

      },
      handleSelecttype(item){
        console.log(item)
        this.form.device_type=item;
      },
      handleSelectlocation(item){
        console.log(item)
        this.form.location_id=item
      }
    },
    mounted() {
    //  this.loadAll()
    },
    
}
</script>