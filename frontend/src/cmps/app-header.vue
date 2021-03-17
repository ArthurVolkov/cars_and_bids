<template>
  <div class="header full main-layout">
    <div class="header-container flex align-center justify-between">
      <router-link to="/" class="logo">Cars<span>&</span>Bids</router-link>

      <el-input placeholder="Search for car" v-model="searchStr" clearable>
      </el-input>
      <router-link to="/car" class="btn">Explore</router-link>
      <router-link to="/car/edit" class="btn">Sell a Car</router-link>
      <!-- <router-link to="/about">About</router-link> -->
      <el-button type="info" round>Sign Up</el-button>
    </div>
  </div>
</template>



<script>
export default {
  name: "app-nav",
  data() {
    return {
      searchStr: ''
    }
  }
};
</script>
