import Vue from 'vue'
import App from './App.vue'
import router from './routes.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import store from './store'
import IdleVue from 'idle-vue'
import VueSimpleAlert from "vue-simple-alert";
import VueEllipseProgress from 'vue-ellipse-progress';
import Vuetify from 'vuetify'
import Modal from "@burhanahmeed/vue-modal-2";
import vuetify from './plugins/vuetify'
import '@mdi/font/css/materialdesignicons.css' 
import "vue-select/dist/vue-select.css";
import vSelect from "vue-select";

var VueScrollactive = require('vue-scrollactive');
Vue.use(VueScrollactive);

Vue.component("v-select", vSelect);

Vue.use(Vuetify);
export default new Vuetify({
  icons: {
    iconfont: 'mdi', // default - only for display purposes
  },
})

Vue.use(VueEllipseProgress);



//import Amplify, * as AmplifyModules from 'aws-amplify';
//import { AmplifyPlugin } from 'aws-amplify-vue';
//import aws_exports from './aws-exports';
//Amplify.configure(aws_exports)

//Vue.use(AmplifyPlugin, AmplifyModules);

const eventsHub = new Vue()

Vue.use(Modal);

Vue.use(IdleVue, {
  eventEmitter: eventsHub,
  idleTime: 350000
})




Vue.use(VueSimpleAlert);

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresLogin)) {
    if (!store.getters.loggedIn) {
      next({ name: 'login' })
    } else {
      next()
    }
  } else {
    next()
  }
})





new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')


