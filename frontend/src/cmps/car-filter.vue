<template>
  <section class="car-filter flex justify-between">
    <div class="flex flex-col justify-center align-center">
      <el-select
        v-model="filterBy.fromYear"
        @change="setFilter"
        placeholder="From Year"
        size="small"
      >
        <el-option
          v-for="item in years"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>

    <div class="flex flex-col justify-center align-center">
      <el-select
        v-model="filterBy.toYear"
        @change="setFilter"
        placeholder="To year"
        size="small"
      >
        <el-option
          v-for="item in years"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>

    <div class="flex flex-col justify-center align-center">
      <!-- <label for="typeFilter">Tipe:</label> -->
      <el-select
        v-model="filterBy.bodyStyle"
        @change="setFilter"
        placeholder="Body style"
        size="small"
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
      <!-- <label for="stockFilter">In stock:</label> -->
      <el-select
        v-model="filterBy.bodyStyle"
        @change="setFilter"
        placeholder="In stock:"
        size="small"
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
        v-model="filterBy.manufacturer"
        @change="setFilter"
        placeholder="Manufacturers"
        size="small"
      >
        <el-option
          v-for="item in manufacturers"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
  </section>
</template>

<script>
function debounce(callback, wait) {
  let timeout;
  return (...args) => {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => callback.apply(context, args), wait);
  };
}

export default {
  data() {
    return {
      filterBy: {
        fromYear: '',
        toYear: '',
        bodyStyle: '',
        manufacturer: '',
      },
      sortBy: '',
      years: [],
      bodyStyles: [],
      manufacturers: []
      // bodyStyles: [{
      //   value: 'all',
      //   label: 'All'
      // }, {
      //   value: 'Funny',
      //   label: 'Funny'
      // }, {
      //   value: 'Adult',
      //   label: 'Adult'
      // }, {
      //   value: 'Educational',
      //   label: 'Educational'
      // }],

    }
  },
  methods: {
    setFilter() {
      this.$emit('setFilter', this.filterBy)
    },
    setSort() {
      this.$emit('setSort', this.sortBy)
    }
  },
  created() {
    this.filterDebounce = debounce(this.setFilter, 1000);

    for (let i = 2021; i >= 1970; i--) {
      this.years.push({value: i, label: i});
    }
  },
}
</script>