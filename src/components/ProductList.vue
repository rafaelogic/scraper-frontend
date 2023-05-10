<template>
  <div v-cloak>
    <Modal v-if="showModal" @close="showModal = false">
      <template v-slot:header>{{ modalHeader }}</template>
      <template v-slot:body>
        <div v-if="showInfo">
          <p>{{ productData.ingredients }}</p>
        </div>
        <ProductForm @closeModal="showModal = false" :product="productData" v-else/>
      </template>
    </Modal>
    <!-- component -->
    <div class="py-16 bg-gradient-to-br from-green-50 to-cyan-100">
      <div class="container px-6 m-auto text-gray-600 md:px-12 xl:px-6">
        <div class="mb-12 space-y-2">
          <h2 class="text-2xl font-bold text-cyan-900 md:text-4xl">
            {{ header }}
          </h2>

          <div class="relative w-full pt-2 mx-auto text-gray-600 md:w-1/2">
            <input
              class="w-full h-10 px-5 pr-16 text-sm bg-white border-2 border-gray-300 rounded-lg focus:outline-none"
              type="search"
              name="search"
              placeholder="Search"
              v-model="keyword"
            />
            <button
              type="submit"
              class="absolute top-0 right-0 mt-5 mr-4"
              @click="searchProduct"
            >
              <IconSearch />
            </button>
          </div>

          <div class="flex flex-row-reverse">
            <button
              class="p-2 mb-2 rounded-md hover:bg-green-200"
              @click.stop="createProduct"
            >
              + Add New Product
            </button>
          </div>

          <div class="grid gap-4 lg:grid-cols-3">
            <ProductCard
              :product="product"
              v-for="product in products"
              :key="product._id + product.title"
            >
              <template v-slot:fn-group>
                <div class="hidden gap-2 group-hover:block">
                  <button
                    class="p-2 mr-4 hover:bg-green-200"
                    @click="updateProduct(product)"
                  >
                    <IconEdit />
                  </button>
                  <button
                    class="p-2 hover:bg-green-200"
                    @click="deleteProduct(product)"
                  >
                    <IconTrash />
                  </button>
                </div>
              </template>

              <template v-slot:fn-bottom>
                <button class="float-right p-2 rounded-md hover:bg-green-200" @click="viewIngredients(product)">View Ingredients</button>
              </template>
            </ProductCard>
          </div>
        </div>

        <AppPagination
          :totalPages="totalPages"
          :total="totalPages"
          :perPage="totalPages"
          :currentPage="currentPage"
          :hasMorePages="hasMorePages"
          @pagechanged="showMore"
        />
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import { mapGetters } from "vuex";

import Modal from "@/components/AppModal.vue";
import ProductForm from "@/components/ProductForm.vue";
import AppPagination from "@/components/AppPagination.vue";
import ProductCard from "@/components/ProductCard.vue";
import IconEdit from "@/components/IconEdit.vue";
import IconTrash from "@/components/IconTrash.vue";
import IconSearch from "@/components/IconSearch.vue";

export default {
  name: "ProductList",
  props: {
    header: String,
  },
  components: {
    Modal,
    ProductForm,
    AppPagination,
    ProductCard,
    IconEdit,
    IconTrash,
    IconSearch,
  },
  data() {
    return {
      showModal: false,
      productData: null,
      modalHeader: "",
      keyword: "",
      showInfo: false,
    };
  },
  beforeCreate: function () {
    store.dispatch("product/getProducts");
  },
  computed: {
    ...mapGetters("product", ["products"]),
    ...mapGetters("pagination", [
      "totalPages",
      "total",
      "perPage",
      "hasMorePages",
    ]),
    currentPage: {
      get() {
        return store.getters["pagination/currentPage"];
      },
      set(newValue) {
        return store.dispatch("pagination/updateCurrentPage", newValue);
      },
    },
  },
  methods: {
    showMore: function (page) {
      this.page = page;
      this.currentPage = page;

      store.dispatch("product/getProducts", { page });
      window.scrollTo(0, 0);
    },
    createProduct: function () {
      this.productData = null;
      this.showModal = true;
      this.modalHeader = "Create New Product";
    },
    updateProduct: function (product) {
      this.productData = product;
      this.showModal = true;
      this.modalHeader = "Edit Product";
    },
    deleteProduct: function (product) {
      store.dispatch("product/delete", product);
    },
    searchProduct: function () {
      store.dispatch("product/getProducts", {
        keyword: this.keyword,
        page: this.currentPage,
      });
    },
    viewIngredients: function(product) {
      this.productData = product;
      this.showModal = true;
      this.showInfo = true;
      this.modalHeader = product.title+" Ingredients";
    }
  },
};
</script>
<style>
[v-cloak] {
  display: none;
}
</style>
