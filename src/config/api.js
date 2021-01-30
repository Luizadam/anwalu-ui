import axios from '../services/api'

export default {
    install(Vue) {
      Vue.prototype.$axios = axios;
    }
  };