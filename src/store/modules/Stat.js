import { getError } from "@/utils/helpers";
import StatService from "@/services/StatService";

export const namespaced = true;

export const state = {
  quantityDatasets: null,
};

export const getters = {
  quantityDatasets: (state) => state.quantityDatasets,
};

export const mutations = {
  SET_QUANTITITY_DATASETS(state, products) {
    let labels = products.map((product) => product.title);
    let quantities = products.map((product) => product.quantity);

    state.quantityDatasets = Object.assign({}, {
        labels,
        datasets: [{ 
            label: 'Top 10 Products',
            data: quantities 
        }],
      });
  },
  UPDATE_QUANTITY_DATASETS(state, datasets) {
    state.quantityDatasets = datasets;
  }
};

export const actions = {
    updateDatasets({ commit }, datasets) {
        commit('UPDATE_QUANTITY_DATASETS', datasets);
    },
  getQuantities({ commit }) {
    StatService.getQuantitiesStats()
      .then((res) => {
        commit("SET_QUANTITITY_DATASETS", res.data.data);
      })
      .catch((err) => {
        commit("SET_ERROR", getError(err));
      });
  },
};
