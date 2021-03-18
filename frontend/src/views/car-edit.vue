<template>
  <section v-if="carToEdit" class="car-edit flex flex-col align-center">
    <h2>{{ title }}</h2>
    <form @submit.prevent="saveCar">
      <!-- <label for="input-price">Set price:</label>
      <el-input-number
        class="el-input"
        id="input-price"
        v-model.number="carToEdit.price"
        :min="1"
      >
      </el-input-number> -->

    <div class="flex flex-col justify-center align-center">
      <el-select
        v-model="carToEdit.bodyStyle"
        placeholder="Body style"
      >
        <el-option
          v-for="item in bodyStyles"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>

    <div class="flex flex-col justify-center align-center">
      <!-- <label for="sort">Sort:</label> -->
      <el-select
        v-model="carToEdit.vendor"
        @change="setModel"
        placeholder="vendors"
      >
        <el-option
          v-for="item in vendors"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>

    <div class="flex flex-col justify-center align-center">
      <!-- <label for="sort">Sort:</label> -->
      <el-select
        v-model="carToEdit.model"
        placeholder="model"
      >
        <el-option
          v-for="item in models"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>

    <div class="flex flex-col justify-center align-center">
      <el-select
        v-model.number="carToEdit.year"
        placeholder="year"
      >
        <el-option
          v-for="item in years"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>

    <div class="flex flex-col justify-center align-center">
      <el-select
        v-model="carToEdit.transmission"
        placeholder="transmission"
      >
        <el-option
          v-for="item in transmissions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>

    <div class="flex flex-col justify-center align-center">
      <el-select
        v-model="carToEdit.drivetrain"
        placeholder="drivetrain"
      >
        <el-option
          v-for="item in drivetrains"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>

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
import { dataService } from "@/services/review.service.js";
import { carService } from "@/services/car.service.js";
import { showMsg } from '../services/eventBus.service.js'

export default {
  name: "car-edit",
  data() {
    return {
      carToEdit: null,
      bodyStyles: carService.getBodyStyleList(),
      vendors: carService.getVendorList(),
      models: dataService.getCars(''),
      years: [],
      transmissions: carService.getTransmissionList(),
      drivetrains: carService.getDrivetrainList()
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
    setModel() {
      this.models = dataService.getCars(this.carToEdit.vendor)
    },
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
    for (let i = 2021; i >= 1970; i--) {
      this.years.push({ value: i, label: i });
    }
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