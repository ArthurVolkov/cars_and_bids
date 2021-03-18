<template>
  <div v-if="car" class="car-details flex flex-col justify-center align-center">
    <div class="details-bid-info flex align-center justify-between">
      <h3>
        ⏱ Time Left <span>{{ timeLeft }}</span>
      </h3>
      <h3>
        Current Bid <span>{{ lastBid }}</span>
      </h3>
      <h3>
        # Bids <span>{{ car.auction.bids.length }}</span>
      </h3>
      <h3>
        &#128172; Comments <span>{{ car.auction.bids.length }}</span>
      </h3>
      <button class="round-main bid">Place Bid</button>
      <button class="round-main watch">💛 Watch</button>
    </div>

    <div class="short-info align-self-start">
      <h2>{{ car.year }} {{ car.vendor }} {{ car.model }}</h2>
      <h3>
        ~ {{ car.mileage }} Miles, {{ car.engine }} Engine,
        {{ car.transmission }} Gear
      </h3>
    </div>

    <div class="details-img-container details-img-grid">
      <!-- <img :src="getImgUrl(car.imgUrls[0])" alt="" /> -->
      <img
        v-for="(img, idx) in car.imgUrls"
        :key="idx"
        :src="getImgUrl(img)"
        alt=""
      />
    </div>

    <div class="main-info details-icon-grid">
      <pre
        class="flex align-center"
      ><font-awesome-icon icon="trademark" class="main-info-icon" />  Make:</pre>
      <span>{{ car.vendor }}</span>

      <pre
        class="flex align-center"
      ><font-awesome-icon icon="list-ul" class="main-info-icon" />  Model:</pre>
      <span>{{ car.model }}</span>

      <pre
        class="flex align-center"
      ><font-awesome-icon icon="calendar-alt" class="main-info-icon" />  Year:</pre>
      <span>{{ car.year }}</span>

      <pre
        class="flex align-center"
      ><font-awesome-icon icon="car-side" class="main-info-icon" />  Body Style:</pre>
      <span>{{ car.bodyStyle }}</span>

      <pre
        class="flex align-center"
      ><font-awesome-icon icon="calendar-alt" class="main-info-icon" />  Mileage:</pre>
      <span>{{ car.mileage }}</span>

      <pre
        class="flex align-center"
      ><font-awesome-icon icon="truck-monster" class="main-info-icon" />  Drivetrain:</pre>
      <span>{{ car.drivetrain }}</span>

      <pre
        class="flex align-center"
      ><font-awesome-icon icon="microchip" class="main-info-icon" />  Engine:</pre>
      <span>{{ car.engine }}</span>

      <pre
        class="flex align-center"
      ><font-awesome-icon icon="cogs" class="main-info-icon" />  Transmission:</pre>
      <span>{{ car.transmission }}</span>

      <pre
        class="flex align-center"
      ><font-awesome-icon icon="palette" class="main-info-icon" />  Exterior Color:</pre>
      <span>{{ car.exteriorColor }}</span>

      <pre
        class="flex align-center"
      ><font-awesome-icon icon="palette" class="main-info-icon" />  Interior Color:</pre>
      <span>{{ car.interiorColor }}</span>
    </div>

    <!-- <form @submit.prevent="addBid" class="review-form flex flex-col">
      <el-input type="number" placeholder="Place bid..." v-model="bid.price">
      </el-input>
      <button>Send</button>
    </form> -->

    <div class="flex flex-col comments-container">
      <h2>Comments & Bids</h2>

      <form @submit.prevent="addComment" class="add-comment flex">
        <textarea
          v-model="comment.txt"
          rows="3"
          placeholder="Add a Comment..."
        ></textarea>
        <button>Send</button>
      </form>

      <h3>Bids:</h3>
      <ul class="clean-list comments-list">
        <li v-for="bid in bidsToShow" :key="bid.id">
          <p>
            🤓 {{ bid.by.fullname }}
            <span>{{ bid.createdAt | moment("calendar") }}</span>
          </p>
          <div class="bid-price flex justify-center align-center">
            {{ bid.bidPrice }}
          </div>
        </li>
      </ul>
      <!-- <li v-for="bid in bidsToShow" :key="bid.id">
        <span
          >bid from: {{ bid.by.fullname }} ➡ {{ bid.bidPrice }} |
          {{ bid.createdAt | moment("dddd, MMMM Do YYYY, h:mm:ss a") }}</span
        >
      </li> -->

      <h3>Comments:</h3>
      <ul class="comments-list clean-list">
        <li v-for="comment in commentsToShow" :key="comment._id">
          <p>
            🤓 {{ comment.by.fullname }}
            <!-- <span>{{ comment.createdAt | moment("calendar") }}</span> -->
          </p>
          <div class="flex align-center">
            {{ comment.txt }}
          </div>
        </li>
      </ul>
    </div>
    <!-- 
    <ul class="review-container clean-list">
      <li v-for="bid in bidsToShow" :key="bid.id">
        <span
          >bid from: {{ bid.by.fullname }} ➡ {{ bid.bidPrice }} |
          {{ bid.createdAt | moment("dddd, MMMM Do YYYY, h:mm:ss a") }}</span
        >
      </li>
    </ul> -->

    <!-- <div class="details-btn-container">
      <router-link to="/car" class="back-btn">Back</router-link>
    </div> -->

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
import { showMsg } from '../services/eventBus.service.js'
var moment = require("moment");
//import { reviewService } from "../services/review.service.js";
//import chatRoom from '../cmps/chat-room'


import { library } from '@fortawesome/fontawesome-svg-core'
import { faCarSide } from '@fortawesome/free-solid-svg-icons'
import { faTrademark } from '@fortawesome/free-solid-svg-icons'
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import { faMicrochip } from '@fortawesome/free-solid-svg-icons'
import { faCogs } from '@fortawesome/free-solid-svg-icons'
import { faTruckMonster } from '@fortawesome/free-solid-svg-icons'
import { faPalette } from '@fortawesome/free-solid-svg-icons'
import { faListUl } from '@fortawesome/free-solid-svg-icons'

library.add(faCarSide)
library.add(faTrademark)
library.add(faCalendarAlt)
library.add(faMicrochip)
library.add(faCogs)
library.add(faTruckMonster)
library.add(faPalette)
library.add(faListUl)


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
    spesifications() {
      const {
        bodyStyle, drivetrain, engine, transmission, exteriorColor, interiorColor, mileage, vendor, model, year
      } = this.car
      return [
        // { icon: '<font-awesome-icon icon="user-secret" />', val: bodyStyle },
        // drivetrain,
        // engine,
        // transmission,
        // exteriorColor,
        // interiorColor,
        // mileage,
        // vendor,
        // model,
        // year
      ]
    },
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