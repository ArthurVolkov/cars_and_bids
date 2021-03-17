<template>
  <div v-if="car" class="car-details flex flex-col justify-center align-center">
    <h2>{{ car.year }} {{ car.vendor }} {{car.model }}</h2>
    <h3>Mileage: {{ car.mileage }}</h3>
    <h3>Bid: {{ lastBid }}</h3>
    <h3>Time Left: {{ timeLeft }}</h3>

    <ul class="review-container clean-list">
      <li v-for="comment in comments" :key="comment._id">
        <span>Comment from: {{ car.auction.comments.by.fullname }} ➡ </span>
        <pre>   {{ car.auction.comments.txt }}</pre>
      </li>
    </ul>

    <div class="details-btn-container">
      <button @click="reviewShown = !reviewShown">Add review</button>
      <router-link to="/car" class="back-btn">Back</router-link>
    </div>

    <form
      v-if="reviewShown"
      @submit.prevent="addReview"
      class="review-form flex flex-col"
    >
      <el-input
        type="textarea"
        :rows="4"
        placeholder="Write your review here"
        v-model="review.content"
      >
      </el-input>
      <button>Send</button>
    </form>

    <chat-room :carId="car._id"></chat-room>
  </div>
  <div
    v-else
    v-loading.fullscreen.lock="loading"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  ></div>
</template>



<script>
import { carService } from "@/services/car.service.js";
import { reviewService } from "../services/review.service.js";
import { showMsg } from '../services/eventBus.service.js'
import chatRoom from '../cmps/chat-room'


export default {
  name: "car-details",
  data() {
    return {
      car: null,
      reviewShown: false,
      review: {
        content: '',
        carId: ''
      },
      reviews: [],
      loading: false
    };
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
    },
    // reviews() {
    //   console.log('this.$store.getters.reviewsToShow:', this.$store.getters.reviewsToShow)
    //   return this.$store.getters.reviewsToShow
    // }
  },
  methods: {
    // async loadReviews() {
    //   try {
    //     console.log('this.car._id:', this.car._id)
    //     const reviews = await this.$store.dispatch({ type: 'loadReviews', carId: this.car._id})
    //     this.reviews = reviews
    //   } catch (err) {
    //     showMsg('Cannot load reviews', 'danger')
    //   } 
    // },
    async loadCar() {
      const id = this.$route.params.carId;
      this.loading = true
      try {
        const car = await carService.getById(id)
        this.car = car
        try {
          this.loadReview()
        } catch (err) {
          showMsg('Cannot load reviews', 'danger')
        }
      } catch (err) {
        showMsg('Cannot load car', 'danger')
      } finally {
        this.loading = false
      }
    },
    async loadReview() {

      try {
        const filterBy = { carId: this.car._id }
        const reviews = await reviewService.query(filterBy)
        this.reviews = reviews
        console.log('reviews in car details:', reviews)
      } catch (err) {
        showMsg('Cannot load reviews', 'danger')
      }
    },
    async addReview() {
      this.review.carId = this.car._id
      try {
        this.reviewShown = false
        await this.$store.dispatch({ type: 'addReview', review: this.review })
        this.loadCar()
        this.review = {
          content: '',
          carId: ''
        }
        showMsg('Review saved successfuly')
      } catch (err) {
        showMsg('Cannot save review', 'danger')
      }
    }
  },
  created() {
    this.loadCar()
    // this.loadReviews()
  },
  watch: {
    "$route.params.carId"(id) {
      console.log("Changed to", id);
      this.loadCar();
    },
  },
  components: {
    chatRoom
  }
};
</script>