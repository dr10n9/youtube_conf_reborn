<template>
    <div>
        <!-- <button v-on:click="tmp">{{temp}}</button> -->
        <div v-if="loaded">
          <div class="btn-group btn-block">
            <a class="btn btn-outline-primary" href="#" v-on:click="createRoom">Create room</a>
            <a class="btn btn-outline-primary" href="#">Join room</a>
            <a class="btn btn-outline-primary" href= "#" v-on:click="createRoom">Find room</a>
            <a class="btn btn-outline-primary" href= "/showrooms" v-on:click="createRoom">Show rooms</a>
          </div>
        </div>
    </div>
</template>

<script>
import socket from '~/plugins/socket.io.js';
import axios from 'axios';

export default {
  data(){
    return {
      // temp: 'button',
      token: '',
      user: {},
      loaded: false
    }
  },
  methods: {
    // tmp(){
    // console.log('asd');
    // socket.emit('click', {message: 'clicked'});
    // },
    createRoom() {
      axios.post('/api/room')
        .then((res) => {
          if (res.data) {
            axios.post('/api/user/joinedrooms/' + res.data.roomid)
            .then((res2) => {
              this.$router.push(res.data.roomid);
            })
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
      if (this.user) this.loaded = true;
    })
  },
  mounted: () => {
    // console.log('mounted');
    // socket.emit('asd', {message: 'asd from client'});
  }
}
</script>