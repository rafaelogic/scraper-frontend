<template>
  <div class="w-full">
    <FlashMessage :error="error" />

    <form
      @submit.prevent="submitproductData"
      class="py-4 text-left"
    >
      <div class="mb-4">
        <label class="block mb-2 text-sm font-bold text-gray-700" for="title">
          Title
        </label>
        <input
          class="w-full px-3 py-2 leading-tight text-gray-700 border rounded rounded-lg shadow appearance-none focus:outline-none focus:shadow-outline"
          id="title"
          type="text"
          placeholder="Title"
          v-model="form.title"
        />
      </div>

      <div class="mb-4">
        <label
          class="block mt-2 mb-2 text-sm font-bold text-gray-700"
          for="ingredients"
        >
          Ingredients
        </label>
        <textarea
          id="ingredients"
          class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          v-model="form.ingredients"
          rows="10"
        >
        </textarea>
      </div>

      <div class="mb-4">
        <label
          class="block mt-2 mb-2 text-sm font-bold text-gray-700"
          for="price"
        >
          Price
        </label>
        <input
          class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          id="price"
          type="text"
          placeholder="0.00"
          v-model="form.price"
        />
      </div>

      <div class="mb-4">
        <label
          class="block mt-2 mb-2 text-sm font-bold text-gray-700"
          for="quantity"
        >
          Quantity
        </label>
        <input
          class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          id="quantity"
          type="number"
          placeholder="0"
          v-model="form.quantity"
        />
      </div>

      <div class="mb-4">
        <label
          class="block mt-2 mb-2 text-sm font-bold text-gray-700"
          for="sku"
        >
          SKU
        </label>
        <input
          class="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
          id="sku"
          type="number"
          placeholder="0"
          v-model="form.sku"
        />
      </div>

      <button
        type="button"
        class="float-right px-4 py-2 mt-4 text-white bg-green-400 rounded hover:bg-green-600"
        @click="submitProductData"
      >
        Submit
      </button>
    </form>
  </div>
</template>
<script>
import store from "@/store";
import { mapGetters } from "vuex";
import FlashMessage from "./FlashMessage.vue";

export default {
  name: "ProductForm",
  props: {
    product: Object,
  },
  components: {
    FlashMessage,
  },
  data() {
    return {
      form: {
        title: this.product?.title || "",
        ingredients: this.product?.ingredients || "",
        price: this.product?.price || 0.00,
        quantity: this.product?.quantity || 0,
        sku: this.product?.sku || "",
      },
    };
  },
  computed: {
    ...mapGetters("product", ["error"]),
  },
  methods: {
    submitProductData: function () {
      if (this.product) {
        const payload = {
          id: this.product._id.$oid,
          data: this.form,
        };
        store.dispatch("product/update", payload)
             .then(() => this.$emit('closeModal'));
      } else {
        store.dispatch("product/create", this.form)
             .then(() => this.$emit('closeModal'));
      }
    }
  },
};
</script>
