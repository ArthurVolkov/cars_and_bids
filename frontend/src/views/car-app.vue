<template>
  <section class="car-app flex flex-col">
    <car-filter @setFilter="setFilter" @setSort="setSort"></car-filter>

    <car-list
      :cars="carsToShow"
    ></car-list>
  </section>
</template>

<script>
import carList from "@/cmps/car-list.vue";
import carFilter from "@/cmps/car-filter.vue";
import { showMsg } from '../services/eventBus.service.js'

export default {
  name: "car-app",
  computed: {
    carsToShow() {
      // console.log("carsToShow in car-app:", this.$store.getters.carsToShow);
      return this.$store.getters.carsToShow;
    },
  },
  methods: {
    async removeCar(car) {
      console.log("Removing...", car);
      // try {
      //   await this.$store.dispatch({ type: "removeCar", car })
      //   showMsg("Car removed");
      //   try {
      //     await this.$store.dispatch({ type: "loadCars" });
      //   } catch (err) {
      //     showMsg("Cannot load cars", "danger");
      //   }
      // } catch (err) {
      //   showMsg("Cannot remove car", "danger");
      // };
    },
    async removeCar(car) {
      console.log("Removing...", car);
      // try {
      //   await this.$store.dispatch({ type: "removeCar", car })
      //   showMsg("Car removed");
      // } catch (err) {
      //   showMsg("Cannot remove car", "danger");
      // };
    },
    async setFilter(filterBy) {
      // this.$store.commit({
      //   type: "setFilter",
      //   filterBy: JSON.parse(JSON.stringify(filterBy))
      // });
      // try {
      //   await this.$store.dispatch({ type: "loadCars" });
      // } catch (err) {
      //   showMsg("Cannot load cars", "danger");
      // }
    },
    async setPage(page) {
      // this.$store.commit({ type: "setPage", page });
      // try {
      //   await this.$store.dispatch({ type: "loadCars" });
      // } catch (err) {
      //   showMsg("Cannot load cars", "danger");
      // }
    },
    async setSort(sortBy) {
      // this.$store.commit({ type: 'setSort', sortBy })
      // try {
      //   await this.$store.dispatch({ type: "loadCars" });
      // } catch (err) {
      //   showMsg("Cannot load cars", "danger");
      // }
    }
  },
  components: {
    carList,
    carFilter,
  },
};
</script>