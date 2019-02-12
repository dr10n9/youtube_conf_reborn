<template>
    <div>
        <!-- <button v-on:click="tmp">{{temp}}</button> -->
        <div v-if="user">
          <a class="btn btn-primary" v-on:click="createRoom">Create room</a>
        </div>
    </div>
</template>

<script>
import socket from '~/plugins/socket.io.js';
import axios from 'axios';

export default {
  data(){
    return {
    temp: 'button',
    token: '',
    user: {}
    }
  },
  methods: {
    tmp(){
    console.log('asd');
    socket.emit('click', {message: 'clicked'});
    },
    createRoom() {
      axios.get('/api/create_room')
        .then((response) => {
          if (response) {
            this.$router.push(response.data.roomid);
          }
        })
    }
  },
  beforeMount() {
    // socket.on('temp', (data) => console.log(data));
    // socket.on('click_answer', data => console.log(data));
    this.$store.dispatch('authUser')
    .then(() => {
      this.user = this.$store.state.user;
    })
  },
  mounted: () => {
    // console.log('mounted');
    // socket.emit('asd', {message: 'asd from client'});
  }
}
</script>