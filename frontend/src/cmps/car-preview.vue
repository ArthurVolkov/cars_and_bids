<template>
  <li class="car-preview flex flex-col">
    <div class="img-container">
      <!-- <img src="../assets/images/22222/1.jpg" alt="" /> -->
      <!-- <img src="/assets/images/22222/1.jpg" alt=""> -->
      <img :src="getImgUrl(car.imgUrls[0])" alt="" />
    </div>

    <h3>{{ car.year }} {{ car.vendor }} {{ car.model }}</h3>
    <p>Mileage: {{ car.mileage }}</p>
    <p>Bid: {{ lastBid }}</p>
    <!-- <p>Time Left: {{ timeLeft }}</p> -->
    <p>Time Left: {{ timeLeft | duration('humanize') }}</p>
    <!-- <div class="preview-btn-container flex justify-between align-center">
      <router-link class="preview-btn" :to="'/car/details/' + car._id"
        >Details</router-link
      >
      <router-link class="preview-btn" :to="'/car/edit/' + car._id"
        >Edit</router-link
      >
      <button class="preview-remove-btn" @click="removeCar(car)">X</button>
    </div> -->
  </li>
</template>

<script>
//import carPreview from "@/cmps/car-preview.vue";

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
      if (this.car.auction.bids.length) {
        return this.car.auction.bids[0].bidPrice
      } else {
        return this.car.auction.startPrice
      }
    },
    timeLeft() {
      return this.car.auction.createdAt + this.car.auction.duration - this.now
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
    console.log('car in preview', this.car);
  },
  destroyed() {
    clearInterval(this.timeLeftInterval);
  }
};
</script>