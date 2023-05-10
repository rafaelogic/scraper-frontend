import { getError } from "@/utils/helpers";
import ProductService from "@/services/ProductService";

export const namespaced = true;

export const state = {
  product: null,
  products: [],
  loading: false,
  error: null,
};

export const getters = {
  error: (state) => state.error,
  loading: (state) => state.loading,
  product: (state) => state.product,
  products: (state) => state.products,
};

export const mutations = {
  SET_PRODUCT(state, product) {
    state.product = product;
  },
  SET_PRODUCTS(state, payload) {
  state.products = payload;
  },
  SET_LOADING(state, loading) {
    state.loading = loading;
  },
  SET_ERROR(state, error) {
    state.error = error;
  },
  SET_PRODUCT_REFRESH(state, payload) {
    if (payload?.deleted) {
      state.products = state.products.filter((product) => product.title !== payload.product.title);
    }

    if (payload?.added) {
      state.products = [payload.product, ...state.products];
    }
  }
};

export const actions = {
  getProducts({ commit }, payload) {
    commit("SET_LOADING", true);
    
    let getProduct = null;

    if (payload?.page && payload?.keyword) {
      getProduct = ProductService.searchProduct(payload.keyword, payload.page);
    } else {
      getProduct = payload?.page ? ProductService.getProductsByPage(payload.page): ProductService.getProducts();
    }
   
    if (getProduct) {
      getProduct.then((res) => {
        commit("SET_PRODUCTS", res.data.data);
        commit('pagination/SET_PAGINATION_META', res.data.meta, {root: true});
      })
      .catch((err) => {
        commit("SET_LOADING", false);
        commit("SET_ERROR", getError(err));
      });
    } else {
      commit("SET_ERROR", getError('getProducts:error'));
    }
  },
  delete({ commit }, product) {
    ProductService.deleteProduct(product)
      .then(() => {
        commit("SET_LOADING", false);
        commit('SET_PRODUCT_REFRESH', {product, deleted: true});
      })
      .catch((err) => {
        commit("SET_LOADING", false);
        commit("SET_ERROR", getError(err));
      });
  },
  update({ commit }, payload) {
    ProductService.updateProduct(payload)
      .then((res) => {
        commit('SET_PRODUCT', res.data.data);
      })
      .catch((err) => {
        commit("SET_LOADING", false);
        commit("SET_ERROR", getError(err));
      });
  },
  create({ commit }, payload) {
    ProductService.createProduct(payload)
      .then((res) => {
        commit('SET_PRODUCT_REFRESH', {product: res.data.data, added: true});
      })
      .catch((err) => {
        commit("SET_LOADING", false);
        commit("SET_ERROR", getError(err));
      });
  }
};