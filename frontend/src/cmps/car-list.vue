<template>
  <section class="list-container main-container">
    <div class="block">
      <!-- <el-pagination
        layout="prev, pager, next"
        background
        :total="carsCount"
        :page-size="10"
        @current-change="setPage"
      ></el-pagination> -->
    </div>
    <!-- <ul v-if="!loading" class="car-list card-grid flex"> -->
    <ul
      v-loading.fullscreen.lock="loading"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      class="car-list card-grid flex clean-list"
    >
      <car-preview
        v-for="car in cars"
        :car="car"
        :key="car._id"
        class="car-item-container flex flex-col justify-between align-center"
      ></car-preview>
    </ul>
    <!-- <div v-else class="car-loading flex justify-center align-center">
      LOADING...
    </div> -->
  </section>
</template>

<script>
import carPreview from "@/cmps/car-preview.vue";
import { Loading } from 'element-ui';

export default {
  props: {
    cars: {
      type: Array,
    },
  },
  name: "car-list",
  data() {
    return {
    }
  },
  methods: {
    // remove(car) {
    //   this.$emit('remove', car);
    // },
    setPage(val) {
      console.log('val:', val)
      this.$emit('setPage', val);
    }
  },
  computed: {
    loading() {
      return false
      // return this.$store.getters.loading
    },
    carsCount() {
      return this.$store.getters.carsCount
    }
  },
  components: {
    carPreview,
  },
  created() {
  },
};
</script>