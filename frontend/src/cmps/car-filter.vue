<template>
  <section class="car-filter flex justify-between">
    <!-- <div class="flex flex-col justify-center align-center"> -->

    <button @click="yearsRangeIsOpen = !yearsRangeIsOpen" class="filter-btn">
      Years
    </button>
    <div v-if="yearsRangeIsOpen" class="block years-range">
      <el-slider
        v-model="filterBy.byYears"
        range
        :min="1970"
        :max="2021"
        :marks="marks"
      >
        >
      </el-slider>
    </div>
    <!-- <el-select
        v-model="filterBy.fromYear"
        @change="setFilter"
        placeholder="From Year"
      >
        <el-option
          v-for="item in years"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>

      <el-select
        v-model="filterBy.toYear"
        @change="setFilter"
        placeholder="To Year"
      >
        <el-option
          v-for="item in years"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>  -->

    <div class="flex flex-col justify-center align-center">
      <!-- <label for="typeFilter">Tipe:</label> -->
      <el-select
        v-model="filterBy.bodyStyles"
        @change="setFilter"
        placeholder="Body style"
      >
        <el-option
          v-for="item in bodyStyles"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>

    <div class="flex flex-col justify-center align-center">
      <!-- <label for="sort">Sort:</label> -->
      <el-select
        v-model="filterBy.vendors"
        @change="setFilter"
        placeholder="vendors"
        multiple
        collapse-tags
      >
        <el-option
          v-for="item in vendors"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <button @click="setSort('ending-soon')" class="sort-btn">
      Ending soon
    </button>
    <button @click="setSort('newly-listed')" class="sort-btn">
      Newly listed
    </button>
    <button @click="setSort('lowest-mileage')" class="sort-btn">
      Lowest mileage
    </button>
  </section>
</template>

<script>
// function debounce(callback, wait) {
//   let timeout;
//   return (...args) => {
//     const context = this;
//     clearTimeout(timeout);
//     timeout = setTimeout(() => callback.apply(context, args), wait);
//   };
// }

export default {
  data() {
    return {
      filterBy: {
        year: {
          from: 0,
          to: 2021
        },
        bodyStyles: [],
        vendors: [],
        sortBy: '',
      },
      years: [],
      bodyStyles: [],
      vendors: [],
      yearsRangeIsOpen: false,

      // marks: {
      //   1970: '1970',
      //   2021: '2021',
      // }


    }
  },
  computed: {
    marks() {

      return {
        1970: '1970',
        2021: '2021',
      }
    }
  },
  methods: {
    setFilter() {
      console.log('this.filterBy:', this.filterBy)
      this.$store.commit({ type: 'setFilter', filterBy: this.filterBy })
      this.$store.dispatch({ type: 'loadCars' })
      // this.$emit('setFilter', this.filterBy)
    },
    setSort(sortBy) {
      this.filterBy.sortBy = sortBy
      this.$store.commit({ type: 'setSort', sortBy: this.filterBy.sortBy })
      this.$store.dispatch({ type: 'loadCars' })

    }
  },
  created() {
    //this.filterDebounce = debounce(this.setFilter, 1000);

    for (let i = 2021; i >= 1970; i--) {
      this.years.push({ value: i, label: i });
    }


    const bodyStyles = ['All', 'Coupe', 'Convertible', 'Sedan', 'SUV/Crossover', 'Hatchback']
    this.bodyStyles = bodyStyles.map(item => { return { value: item, label: item } })

    const vendors = ["Abarth", "Alfa Romeo", "Aston Martin", "Audi", "Bentley", "BMW", "Bugatti", "Cadillac", "Chevrolet", "Chrysler", "Citroën", "Dacia", "Daewoo", "Daihatsu", "Dodge", "Donkervoort", "DS", "Ferrari", "Fiat", "Fisker", "Ford", "Honda", "Hummer", "Hyundai", "Infiniti", "Iveco", "Jaguar", "Jeep", "Kia", "KTM", "Lada", "Lamborghini", "Lancia", "Land Rover", "Landwind", "Lexus", "Lotus", "Maserati", "Maybach", "Mazda", "McLaren", "Mercedes-Benz", "MG", "Mini", "Mitsubishi", "Morgan", "Nissan", "Opel", "Peugeot", "Porsche", "Renault", "Rolls-Royce", "Rover", "Saab", "Seat", "Skoda", "Smart", "SsangYong", "Subaru", "Suzuki", "Tesla", "Toyota", "Volkswagen", "Volvo"]
    this.vendors = vendors.map(item => { return { value: item, label: item } })
  },
}
</script>