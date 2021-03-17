<template>
  <section class="car-filter flex justify-between">
    <div class="flex flex-col justify-center align-center">
      <label for="search"> Search a car: </label>
      <el-input
        id="search"
        ref="filterInput"
        type="text"
        @input="filterDebounce"
        placeholder="Search..."
        v-model="filterBy.name"
        size="small"
        clearable
      >
      </el-input>
    </div>

    <div class="flex flex-col justify-center align-center">
      <label for="typeFilter">Tipe:</label>
      <el-select
        id="typeFilter"
        v-model="filterBy.type"
        @change="setFilter"
        placeholder="Tipe:"
        size="small"
      >
        <el-option
          v-for="item in tipes"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>

    <div class="flex flex-col justify-center align-center">
      <label for="stockFilter">In stock:</label>
      <el-select
        id="stockFilter"
        v-model="filterBy.inStock"
        @change="setFilter"
        placeholder="In stock:"
        size="small"
      >
        <el-option
          v-for="item in stock"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>

    <div class="flex flex-col justify-center align-center">
      <label for="sort">Sort:</label>
      <el-select
        id="sort"
        v-model="sortBy"
        @change="setSort"
        placeholder="Sort:"
        size="small"
      >
        <el-option
          v-for="item in sort"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <!-- <div class="flex flex-col justify-center align-center">
      <label for="sort">Sort:</label>
      <select id="sort" @change="setSort" v-model="sortBy">
        <option value="name">Name</option>
        <option value="price">Price</option>
      </select>
    </div> -->
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
        name: '',
        inStock: 'all',
        type: 'all',
      },
      sortBy: 'name',
      tipes: [{
        value: 'all',
        label: 'All'
      }, {
        value: 'Funny',
        label: 'Funny'
      }, {
        value: 'Adult',
        label: 'Adult'
      }, {
        value: 'Educational',
        label: 'Educational'
      }],
      stock: [{
        value: 'all',
        label: 'All'
      }, {
        value: 'true',
        label: 'in stock'
      }, {
        value: 'false',
        label: 'not in stock'
      }],
      sort: [{
        value: 'name',
        label: 'Name'
      }, {
        value: 'price',
        label: 'Price'
      }],
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
  },
}
</script>