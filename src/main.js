import Vue from 'vue'
import App from './App.vue'
import router from './routes.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import store from './store'
import IdleVue from 'idle-vue'
import VueSimpleAlert from "vue-simple-alert";
import VueEllipseProgress from 'vue-ellipse-progress';

Vue.use(VueEllipseProgress);

//import Amplify, * as AmplifyModules from 'aws-amplify';
//import { AmplifyPlugin } from 'aws-amplify-vue';
//import aws_exports from './aws-exports';
//Amplify.configure(aws_exports)

//Vue.use(AmplifyPlugin, AmplifyModules);

const eventsHub = new Vue()

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
  render: h => h(App),
}).$mount('#app')
