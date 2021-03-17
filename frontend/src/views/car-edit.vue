<template>
  <section v-if="carToEdit" class="car-edit flex flex-col align-center">
    <h2>{{ title }}</h2>
    <form @submit.prevent="saveCar">
      <label for="input-name">Set name:</label>
      <el-input
        id="input-name"
        type="text"
        placeholder="Your next car name"
        v-model="carToEdit.name"
        clearable
      >
      </el-input>
      <label for="input-price">Set price:</label>
      <el-input-number
        class="el-input"
        id="input-price"
        v-model.number="carToEdit.price"
        :min="1"
      >
      </el-input-number>
      <label for="typeFilter">Tipe:</label>
      <el-select
        id="typeFilter"
        v-model="carToEdit.type"
        class="el-input"
        placeholder="Tipe:"
      >
        <el-option
          v-for="item in tipes"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <button>Save</button>
      <router-link to="/car" class="back-btn">Back</router-link>
    </form>
  </section>
  <div
    v-else
    v-loading.fullscreen.lock="loading"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
  </div>
</template>



<script>
import { carService } from "@/services/car.service.js";
import { showMsg } from '../services/eventBus.service.js'


export default {
  name: "car-edit",
  data() {
    return {
      carToEdit: null,
      tipes: [{
        value: 'Funny',
        label: 'Funny'
      }, {
        value: 'Adult',
        label: 'Adult'
      }, {
        value: 'Educational',
        label: 'Educational'
      }],
    }
  },
  computed: {
    carId() {
      return this.$route.params.carId
    },
    title() {
      return this.carId ? 'Car Edit' : 'Car Add'
    },
    loading() {
      return this.carToEdit ? false : true
    },
  },
  methods: {
    async saveCar() {
      console.log('Saving...', this.carToEdit);
      try {
        await this.$store.dispatch({ type: 'saveCar', car: this.carToEdit })
        showMsg('Car saved')
        this.carToEdit = carService.getEmptyCar()
        this.$router.push('/car')
        try {
          await this.$store.dispatch({ type: "loadCars" });
        } catch (err) {
          showMsg("Cannot load cars", "danger");
        }
      } catch (err) {
        showMsg('Cannot save cars', 'danger')
      }
    },
  },
  created() {
    if (this.carId) {
      try {
        carService.getById(this.carId)
          .then((car) => {
            console.log('car:', car)
            this.carToEdit = car
          })
      } catch (err) {
        showMsg('Cannot load car', 'danger')
      }
    } else {
      this.carToEdit = carService.getEmptyCar()
    }
  },
};
</script>