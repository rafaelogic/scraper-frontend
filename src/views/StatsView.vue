<template>
  <div class="container mx-auto">
    <BarChartQuanity />
  </div>
</template>
<script>
import BarChartQuanity from "@/components/BarChartQuanity.vue";

export default {
  name: "StatsView",
  components: {
    BarChartQuanity,
  },
};
</script>
