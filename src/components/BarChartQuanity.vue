<template>
  <div>
    <h1 class="4xl text-semibold mb-4">Quantity Stats</h1>
    <Bar  ref="bar" :data="quantityDatasets" :options="chartOptions" />
  </div>
</template>
<script>
// import { mapGetters } from "vuex";
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import store from "@/store";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  name: "StatsBarChart",
  components: { Bar },
  data() {
    return {
      chartOptions: {
        responsive: true
      },
      loaded: false,
    }
  },
  computed: {
    quantityDatasets: {
      get() {
        return store.getters['stat/quantityDatasets'];
      },
      set(newValue) {
        return store.dispatch('stat/updateDatasets', newValue);
      }
    }
  },
  beforeCreate() {
    store.dispatch('stat/getQuantities');
  },
  created() {
    console.log(this.quantityDatasets)
    
    this.$nextTick(() => {
      if (this.quantityDatasets != null) {
      this.loaded = true
    }
    })
  }
};
</script>
