<template>
  <div class="chat-container">
    <h2>Chat About the car:</h2>
    <!-- <label>
      <input type="radio" value="Politics" v-model="topic" @change="changeTopic" /> 
      Politics
    </label>
    <label>
      <input type="radio" value="Love" v-model="topic" @change="changeTopic" /> 
      Love
    </label> -->
    <ul>
      <li v-for="(msg, idx) in msgs" :key="idx">
        <pre>
from: {{ msg.from }}
          {{ msg.txt }}
        </pre>
      </li>
    </ul>
    <div v-if="incTyping.isTyping">{{incTyping.name}} is typing...</div>
    <form @submit.prevent="sendMsg">
      <input @input="onTyping" type="text" v-model="msg.txt" />
      <button>Send</button>
    </form>
  </div>
</template>

<script>
import { socketService } from '@/services/socket.service.js';
import { userService } from '../services/user.service.js'

function debounce(callback, wait) {
  let timeout;
  return (...args) => {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => callback.apply(context, args), wait);
  };
}

export default {
  props: ['carId'],
  data() {
    return {
      msg: { from: '', txt: '' },
      msgs: [],
      topic: '',
      incTyping: {}
    }
  },
  async created() {
    socketService.setup();
    socketService.emit('chat topic', this.carId)
    socketService.on('chat addMsg', this.addMsg)
    socketService.on('chat user-typing', this.addTyping)
    this.topic = this.carId
    this.setUsername()
    this.onTyping = debounce(this.typing, 200);

  },
  destroyed() {
    socketService.off('chat addMsg', this.addMsg)
    socketService.terminate();
  },
  methods: {
    addMsg(msg) {
      this.msgs.push(msg)
    },
    addTyping(typing) {
      console.log('typing:', typing)
      this.incTyping = typing
    },
    sendMsg() {
      console.log('Sending', this.msg);
      socketService.emit('chat newMsg', this.msg)
      this.msg = { from: 'Me', txt: '' };
    },
    changeTopic() {
      socketService.emit('chat topic', this.topic)
    },
    async setUsername() {
      const user = await userService.getLoggedinUser()
      this.msg.from = user ? user.fullname : 'unauthorised user'
    },
    // onTyping() {
    //   // this.typing()
    //   debounce(this.typing, 1000)
    // },
    typing() {
      console.log('typing:')
      socketService.emit('chat typing', { isTyping: true, name: this.msg.from })
      setTimeout(() => {
        socketService.emit('chat typing', { isTyping: false, name: this.msg.from })
      }, 1000);
    }
  }
}
</script>
