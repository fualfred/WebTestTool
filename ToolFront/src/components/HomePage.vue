<template>
  <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="安装端账号创建" name="first"><account-create></account-create></el-tab-pane>
    <el-tab-pane label="community创建" name="second"><community-create></community-create></el-tab-pane>
    <el-tab-pane label="building创建"  name="thirdth"><building-create></building-create></el-tab-pane>
    <el-tab-pane label="apartment创建" name="fourth"><aparement-create/></el-tab-pane>
    <el-tab-pane label="location创建"  name="fifth"><location-create/></el-tab-pane>
    <el-tab-pane label="网关入库"  name="sixth"><hubadd-factory/></el-tab-pane>
    <el-tab-pane label="子设备入库"  name="seventh"><subdeviceadd-factory/></el-tab-pane>
    <el-tab-pane label="添加设备插槽"  name="eighth"><devicelocation-create/></el-tab-pane>
     <el-tab-pane label="设备入库状态查询"  name="nineth"><query-device/></el-tab-pane>
  </el-tabs>
</template>
<script>
import accountCreate from "./accountCreate.vue"
import communityCreate from "./communityCreate.vue"
import buildingCreate from "./buildingCreate.vue"
import aparementCreate from "./apartmentCreate.vue"
import locationCreate from "./locationCreate.vue"
import hubaddFactory from "./hubaddFactory.vue"
import subdeviceaddFactory from "./subdeviceaddFactory.vue"
import devicelocationCreate from "./deviceLocationCreate.vue"
import queryDevice from "./queryDevices.vue"
  export default {
    data() {
      return {
        activeName: 'first'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      
        
      }
    },
    mounted(){
      this.$store.commit("getCommunites");
      this.$store.commit("getDeviceType");
      this.$store.commit("getAccounts");
    },
    components: {
    accountCreate,
    communityCreate,
    buildingCreate,
    aparementCreate,
    locationCreate,
    hubaddFactory,
    subdeviceaddFactory,
    devicelocationCreate,
    queryDevice
  }
  };
</script>