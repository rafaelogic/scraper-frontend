<template>
  <div
    class="p-1 space-x-6 bg-white bg-opacity-50 shadow-xl rounded-xl group sm:flex hover:rounded-2xl"
  >
    <div
      class="absolute z-50 flex float-right bg-opacity-50 shadow-xl group bg-green-50"
    >
      <slot name="fn-group"></slot>
    </div>
    <img
      :src="product.image"
      alt="art cover"
      loading="lazy"
      width="500"
      height="300"
      class="object-cover object-top w-full transition duration-500 rounded-lg h-25 sm:h-full sm:w-5/12 group-hover:rounded-xl"
    />
    <div class="p-5 pl-0 sm:w-7/12">
      <div class="space-y-2">
        <div class="space-y-4">
          <h4 class="h-20 text-xl font-semibold text-left text-cyan-900">
            {{ product.title }}
          </h4>
          <div class="text-left">
            <ul class="divide-y-2">
              <li class="text-light text-cyan-800">SKU: {{ product.sku }}</li>
              <li class="text-light text-cyan-800">
                Price: {{ product.price }}
              </li>
              <li class="text-light text-cyan-800">
                Quantity: {{ product.quantity }}
              </li>
            </ul>
          </div>

          <slot name="fn-bottom"></slot> 
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ProductCard",
  props: {
    product: Object,
  },
};
</script>
