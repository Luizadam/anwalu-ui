export default {
  install(Vue) {
    Vue.prototype.$currency = new Intl.NumberFormat("en-ID", {
      style: "currency",
      currency: "IDR",
    });
    Vue.prototype.$currency.deformat = (data) => {
      if (typeof data !== Number) {
        return parseInt(data.split(/ /)[0].replace(/[^.\d]/g, ""));
      }
      return null;
    };
  },
};
