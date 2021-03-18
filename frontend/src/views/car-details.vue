<template>
  <div v-if="car" class="car-details flex flex-col justify-center align-center">
     <div class="img-container">
      <img :src="getImgUrl(car.imgUrls[0])" alt="" />
    </div>
    <h2>{{ car.year }} {{ car.vendor }} {{car.model }}</h2>
    <h3>Mileage: {{ car.mileage }}</h3>
    <h3>Time Left: {{ timeLeft | duration('humanize') }}</h3>
    <h2>Bids:</h2>
    <h3>Last Bid: {{ lastBid }}</h3>

    <form
      @submit.prevent="addBid"
      class="review-form flex flex-col"
    >
      <el-input
        type="number"
        placeholder="Place bid..."
        v-model="bid.price"
      >
      </el-input>
      <button>Send</button>
    </form>

    <ul class="review-container clean-list">
      <li v-for="bid in bidsToShow" :key="bid.id">
        <span>bid from: {{ bid.by.fullname }} ➡ {{ bid.bidPrice}} | {{bid.createdAt | moment("dddd, MMMM Do YYYY, h:mm:ss a")}}</span>
      </li>
    </ul>

    <h2>Comments:</h2>
    <ul class="review-container clean-list">
      <li v-for="comment in commentsToShow" :key="comment._id">
        <span>{{ comment.by.fullname }} ➡ {{ comment.txt }}</span>
      </li>
    </ul>

    <form
      @submit.prevent="addComment"
      class="review-form flex flex-col"
    >
      <el-input
        type="textarea"
        :rows="4"
        placeholder="Write your review here"
        v-model="comment.txt"
      >
      </el-input>
      <button>Send</button>
    </form>

    <div class="details-btn-container">
      <router-link to="/car" class="back-btn">Back</router-link>
    </div>

    <!-- <chat-room :carId="car._id"></chat-room> -->
  </div>
  <div
    v-else
    v-loading.fullscreen.lock="isLoading"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  ></div>
</template>



<script>
import { carService } from "@/services/car.service.js";
//import { reviewService } from "../services/review.service.js";
import { showMsg } from '../services/eventBus.service.js'
//import chatRoom from '../cmps/chat-room'


export default {
  name: "car-details",
  data() {
    return {
      car: null,
      comment: {
        id: '',
        txt: '',
        createdAt: null,
        by: null
//        carId: ''
      },
      comments: [],
      bid: {
        id: '',
        price: this.lastBid + 1,
        createdAt: null,
        by: null
      },
      bids: [],
      isLoading: false,
      now: Date.now(),
      timeLeftInterval: null
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
    commentsToShow() {
      return this.car.comments
    },
    bidsToShow() {
      return this.car.auction.bids
    }
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
      const carId = this.$route.params.carId;
      this.isLoading = true
      try {
        const car = await carService.getById(carId)
        this.car = car
        console.log(this.car)
        this.comments = car.comments
        this.bids = car.auction.bids
      } catch (err) {
        showMsg('Cannot load car', 'danger')
      } finally {
        this.isLoading = false
      }
    },
    getImgUrl(pic) {
      return require('../assets/' + pic)
    },
    // async loadReview() {

    //   try {
    //     const filterBy = { carId: this.car._id }
    //     const reviews = await reviewService.query(filterBy)
    //     this.reviews = reviews
    //     console.log('reviews in car details:', reviews)
    //   } catch (err) {
    //     showMsg('Cannot load reviews', 'danger')
    //   }
    // },
    async addComment() {
      try {
        this.comment.id = carService.makeId();
        this.comment.createdAt = Date.now();
        // TODO: Real user
        this.comment.by = carService.makeRandomUser();
//        await this.$store.dispatch({ type: 'addReview', review: this.review })
//        this.loadCar()
        this.comments.unshift(this.comment)
        this.comment = {
          id: '',
          txt: '',
          createdAt: null,
          by: null
        }
        showMsg('Review saved successfuly')
      } catch (err) {
        showMsg('Cannot save review', 'danger')
      }
    },
    async addBid() {
      try {
        this.bid.id = carService.makeId();
        this.bid.createdAt = Date.now();
        // TODO: Real user
        this.bid.by = carService.makeRandomUser();
//        await this.$store.dispatch({ type: 'addReview', review: this.review })
//        this.loadCar()

        if (this.bid.price > this.lastBid) {
          this.bids.unshift(this.bid)
          this.bid = {
            id: '',
            price: this.lastBid + 1,
            createdAt: null,
            by: null
          }  
        showMsg('Bid placed successfuly')
        } else {
          showMsg('Bid price must be over ' + this.lastBid, 'danger')
        }
      } catch (err) {
        showMsg('Cannot save review', 'danger')
      }
    }
  },
  created() {
    this.loadCar()
    this.timeLeftInterval = setInterval(() => {
      this.now = Date.now()
    }, 1000);

  },
  watch: {
    "$route.params.carId"(id) {
      console.log("Changed to", id);
      this.loadCar();
    },
  },
  destroyed() {
    clearInterval(this.timeLeftInterval);
  },
  components: {
//    chatRoom
  }
};
</script>