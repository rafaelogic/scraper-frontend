import Vue from "vue";
import Vuex from "vuex";

import * as auth from "@/store/modules/Auth";
import * as product from "@/store/modules/Product";
import * as user from "@/store/modules/User";
import * as pagination from "@/store/modules/Pagination";
import * as stat from "@/store/modules/Stat";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,

  modules: {
    auth,
    product,
    user,
    pagination,
    stat,
  },
});
