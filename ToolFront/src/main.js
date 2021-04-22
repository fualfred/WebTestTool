import Vue from 'vue'
import App from './App.vue'
import Tabs from "element-ui"
import 'element-ui/lib/theme-chalk/index.css'
import store from "./js/store"
Vue.config.productionTip = false
Vue.use(Tabs)



new Vue({
  data(){
    return {

    }
  },
  store:store,
  render: h => h(App),
}).$mount('#app')
