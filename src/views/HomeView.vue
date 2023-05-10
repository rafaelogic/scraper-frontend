<template>
  <div class="container pt-5 mx-auto">
    <ProductList header="Products"/>
  </div>
</template>

<script>
// @ is an alias to /src
import ProductList from '@/components/ProductList.vue'

export default {
  name: 'HomeView',
  components: {
    ProductList
  }
}
</script>
