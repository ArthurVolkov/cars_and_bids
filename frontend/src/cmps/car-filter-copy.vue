<template>
  <section class="car-filter flex justify-between">
    <div class="flex flex-col justify-center align-center">
      <label for="search"> Search a car: </label>
      <input
        id="search"
        ref="filterInput"
        type="text"
        @input="filterDebounce"
        placeholder="Search..."
        v-model="filterBy.name"
      />
    </div>
    <div class="flex flex-col justify-center align-center">
      <label for="typeFilter">Tipe:</label>
      <select id="typeFilter" @change="setFilter" v-model="filterBy.type">
        <option value="all">All</option>
        <option value="Funny">Funny</option>
        <option value="Adult">Adult</option>
        <option value="Educational">Educational</option>
      </select>
    </div>

    <div class="flex flex-col justify-center align-center">
      <label for="stockFilter">In stock:</label>
      <select id="stockFilter" @change="setFilter" v-model="filterBy.inStock">
        <option value="all">All</option>
        <option value="true">in stock</option>
        <option value="false">not in stock</option>
      </select>
    </div>

    <div class="flex flex-col justify-center align-center">
      <label for="sort">Sort:</label>
      <select id="sort" @change="setSort" v-model="sortBy">
        <option value="name">Name</option>
        <option value="price">Price</option>
      </select>
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
        name: '',
        inStock: 'all',
        type: 'all',
      },
      sortBy: 'name'
    }
  },
  methods: {
    setFilter() {
      this.$emit('setFilter', this.filterBy)
      this.filterBy.name = ''
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