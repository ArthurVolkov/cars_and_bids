<template>
  <section class="login-container">
    <section v-if="loggedinUser">
      Hello Master {{ loggedinUser.fullname }}
      <button @click="logout">Logout</button>
    </section>

    <el-card v-else>
      <h2>{{ title }}</h2>

      <el-form class="login-form" ref="form" @submit.native.prevent="send">
        <el-form-item v-if="isRegistration" prop="fullname">
          <el-input v-model="user.fullname" placeholder="Full name"></el-input>
        </el-form-item>

        <el-form-item prop="username">
          <el-input v-model="user.username" placeholder="Username"></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input
            v-model="user.password"
            placeholder="Password"
            type="password"
            show-password
          ></el-input>
        </el-form-item>

        <div class="flex justify-between">
          <el-form-item>
            <el-button
              class="login-button"
              type="primary"
              native-type="submit"
              block
              >Submit</el-button
            >
          </el-form-item>

          <el-form-item>
            <el-button
              @click.prevent.stop="toggleRegistration"
              class="login-button"
              type="primary"
              native-type="submit"
              block
              >{{ regBtn }}</el-button
            >
          </el-form-item>
        </div>
      </el-form>
    </el-card>
  </section>
</template>

<script>

import { showMsg } from '../services/eventBus.service.js'

export default {
  data() {
    return {
      user: {
        fullname: '',
        username: '',
        password: ''
      },
      isRegistration: false
    }
  },
  computed: {
    userId() {
      return this.$route.params.userId
    },
    title() {
      return this.isRegistration ? 'Sign up' : 'Login'
    },
    regBtn() {
      return this.isRegistration ? 'Cancel' : 'Registration'
    },
    loggedinUser() {
      console.log('this.$store.getters.loggedinUser:', this.$store.getters.loggedinUser)
      return this.$store.getters.loggedinUser
    }
  },
  methods: {
    send() {
      if (this.isRegistration) this.signUp()
      else this.login()
    },
    async signUp() {
      if (!this.user.username || !this.user.password || !this.user.fullname) {
        showMsg('Enter full name, username and password!');
        return
      }
      try {
        await this.$store.dispatch({ type: 'signUp', user: this.user })
        showMsg('signupp success')
      } catch (err) {
        showMsg('Cannot signupp', 'danger')
      }
    },
    async login() {
      if (!this.user.username || !this.user.password) {
        showMsg('Enter username and password!')
        return
      }
      try {
        await this.$store.dispatch({ type: 'login', user: this.user })
        showMsg('signupp success')
      } catch (err) {
        showMsg('Cannot signupp', 'danger')
      }
    },
    async logout() {
      console.log('Logout!');
      try {
        await this.$store.dispatch({ type: 'logout' })
        showMsg('logged out success')

      } catch (err) {
        showMsg('Cannot logout', 'danger')
      }
    },
    toggleRegistration() {
      this.isRegistration = !this.isRegistration
    },
  },
}
</script>