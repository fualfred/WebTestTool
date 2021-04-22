import Vue from 'vue'
import Vuex from 'vuex'
import request from './request'
Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        commnunities:[],
        device_types:[],
        device_models:[],
        Accounts:[]
    },
    mutations:{
        getCommunites(state){
            request.get("/api/getCommunities").then(res=>{
                state.commnunities = res.data.data
                state.commnunities = state.commnunities.map((obj)=>{
                let robj = {};
                robj["value"]=obj.name;
                robj["id"]=obj.id
                return robj;
          });
        })
        },
        getDeviceType(state){
            request.get("/api/getDeviceType").then(res=>{
                let datas = res.data.data;
                state.device_types= datas.device_types.map((obj)=>{
                  let robj ={}
                  robj["value"]=obj.device_type;
                  robj["label"]=obj.device_type;
                  return robj;
      
                });
                state.device_models =datas.device_models.map((obj)=>{
                  let robj ={}
                  robj["value"]=obj.device_model;
                  robj["label"]=obj.device_model;
                  return robj;
                });
              });
            
        },
        getAccounts(state){
            request.get("/api/getAccounts").then(res=>{
                // console.log("--------------")
                // console.log(res.data.data)
                state.accounts = res.data.data
                state.accounts = state.accounts.map((obj)=>{
                  let robj = {};
                  robj["value"]=obj.email;
                  return robj;
                });
                // console.log(this.accounts)
              })
        }

    },



})
export default store