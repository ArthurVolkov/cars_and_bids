<template>
  <li class="car-preview flex flex-col">
    <router-link class="img-container" :to="'/car/details/' + car._id">
      <!-- <img :src="getImgUrl(car.imgUrls[0])" alt=""> -->
      <div class="block">
        <el-carousel trigger="click" :autoplay="false">
          <el-carousel-item
            v-for="(img, idx) in car.imgUrls"
            :key="idx"
            height="200px"
          >
            <img :src="getImgUrl(img)" alt="" />
          </el-carousel-item>
        </el-carousel>
      </div>
    </router-link>

    <div class="bid-info flex justify-between align-center">
      <div class="flex flex-col justify-center align-center">
        <p>⏱ {{ timeLeft }}</p>
        <p class="description">Before ends</p>
      </div>
      <div class="flex flex-col justify-center align-center">
        <p>{{ lastBid }}</p>
        <p class="description">Current Bid</p>
      </div>
      <div class="flex flex-col justify-center align-center">
        <p>{{ car.auction.bids.length }}</p>
        <p class="description">Bids</p>
      </div>
    </div>

    <h3>{{ car.year }} {{ car.vendor }} {{ car.model }}</h3>
    <p>{{ car.engine }} Engine, {{ car.transmission }} Gear</p>
    <p>~ {{ car.mileage }} Miles</p>
    <p class="preview-address">{{ car.location.address }}</p>
    <!-- <p>Time Left: {{ timeLeft }}</p> -->
    <div class="preview-btn-container flex justify-between align-center">
      <!-- <router-link class="preview-btn" :to="'/car/details/' + car._id"
        >Details</router-link
      > -->
    </div>
  </li>
</template>

<script>
//import carPreview from "@/cmps/car-preview.vue";
var moment = require("moment");
var momentDurationFormatSetup = require("moment-duration-format");

export default {
  name: "car-preview",
  props: {
    car: {
      type: Object,
    },
  },
  data() {
    return {
      now: Date.now(),
      timeLeftInterval: null
    }
  },
  computed: {
    lastBid() {
      var bid = 0
      if (this.car.auction.bids.length) {
        bid = this.car.auction.bids[0].bidPrice
      } else {
        bid = this.car.auction.startPrice
      }
      // return bid
      return bid.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })
    },
    timeLeft() {
      const diff = this.car.auction.createdAt + this.car.auction.duration - this.now
      if (diff <= 0) return 'Finished'
      return moment.duration(diff).format()
    }
    // createdAt() {
    //   const now = new Date(Date.now());
    //   const createdDate = new Date(this.car.createdAt);
    //   if (
    //     now.getDate() === createdDate.getDate() &&
    //     now - createdDate < 1000 * 60 * 60 * 24
    //   )
    //     return createdDate.toTimeString().substr(0, 5);
    //   else if (now.getFullYear() === createdDate.getFullYear())
    //     return createdDate.toLocaleDateString("en-US", {
    //       month: "short",
    //       day: "numeric",
    //     });
    //   else return createdDate.toISOString().substr(0, 10);
    // },
    // inStock() {
    //   return this.car.inStock ? '✔' : '❌'
    // }
  },
  methods: {
    removeCar(car) {
      this.$emit("remove", car);
    },
    getImgUrl(pic) {
      return require('../assets/' + pic)
    }
  },
  created() {
    this.timeLeftInterval = setInterval(() => {
      this.now = Date.now()
    }, 1000);
  },
  destroyed() {
    clearInterval(this.timeLeftInterval);
  }
};
</script>