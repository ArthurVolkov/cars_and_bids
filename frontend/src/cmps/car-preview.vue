<template>
  <li>
    <h3>{{ car.name }}</h3>
    <p>Price: {{ car.price }}</p>
    <p>Type: {{ car.type }}</p>
    <p>In stock: {{ inStock }}</p>
    <p>Created at: {{ createdAt }}</p>
    <div class="preview-btn-container flex justify-between align-center">
      <router-link class="preview-btn" :to="'/car/details/' + car._id"
        >Details</router-link
      >
      <router-link class="preview-btn" :to="'/car/edit/' + car._id"
        >Edit</router-link
      >
      <button class="preview-remove-btn" @click="removeCar(car)">X</button>
    </div>
  </li>
</template>



<script>
import carPreview from "@/cmps/car-preview.vue";

export default {
  name: "car-preview",
  computed: {
    createdAt() {
      const now = new Date(Date.now());
      const createdDate = new Date(this.car.createdAt);
      if (
        now.getDate() === createdDate.getDate() &&
        now - createdDate < 1000 * 60 * 60 * 24
      )
        return createdDate.toTimeString().substr(0, 5);
      else if (now.getFullYear() === createdDate.getFullYear())
        return createdDate.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });
      else return createdDate.toISOString().substr(0, 10);
    },
    inStock() {
      return this.car.inStock ? '✔' : '❌'
    }
  },
  methods: {
    removeCar(car) {
      this.$emit("remove", car);
    },
  },
  props: {
    car: {
      type: Object,
    },
  },
  components: {
    carPreview,
  },
  created() {
  }
};
</script>