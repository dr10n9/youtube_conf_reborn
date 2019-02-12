<template>
  <div class="container">
    <!-- <div v-if="user"> -->
      <h1>Room [{{room.roomid}}]</h1>
      <p>Creator: {{room.creator}}</p>

      <!-- <div v-if="!isJoined">
        <button class="btn btn-primary" v-on:click="joinProcess">Join room</button>
      </div>
      <div v-else> -->
        <div class="col-md-7">
          <div id="player-1"></div>
          <hr>
          <div class="input-group mb-3">
            <input type="text" class="form-control"  v-on:keyup.enter="loadVideo" v-model="videoId"
            placeholder="Youtube video link" aria-label="Youtube video link" aria-describedby="button-addon2">
            <div class="input-group-append">
              <button class="btn btn-outline-secondary" type="button" id="button-addon2">Load</button>
            </div>
          </div>
          <hr>
          <div class="btn-group" role="group" aria-label="Basic example">
            <button type="button" class="btn btn-primary">Play</button>
            <button type="button" class="btn btn-primary">Pause</button>
          </div>
        </div>
      <!-- </div> -->
    <!-- </div> -->
  </div>
</template>

<script>
import socket from '~/plugins/socket.io.js';
import axios from 'axios';
import lodash from 'lodash';
import YouTubePlayer from 'youtube-player'
import querystring from 'query-string'

export default {
  data() {
    return {
      roomid: '',
      creator: '',
      room: '',
      user: null,
      isJoined: false,
      player1: '',
      videoId: 'NMEoIV5yvUk'
    }
  },
  methods: {
    joinProcess() {
      axios.get('/api/room' + '?roomid=' + this.room.roomid)
      .then((res) => {
        let result = (_.find(res.data.members, {username: this.user.displayName}));
        this.isJoined =  result ? true : false
      })
      .catch((err) => {
        console.log(err);
        return false
      })
    },
    playVideo() {
      this.player1 = YouTubePlayer('player-1', {
        videoId: this.videoId
      });
    },
    decodeUrl(url) {
      var query = url;
      var vars = query.split('&');
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == 'watch') {
          return decodeURIComponent(pair[1]);
        }
      }
    },
    loadVideo() {
      let parsed = querystring.parseUrl(this.videoId);
      console.log('parsed ' + JSON.stringify(parsed));
      this.player1.loadVideoById(parsed.query.v, 5, "large");

    }
  },
  beforeMount() {
    this.$store.dispatch('authUser')
    .then(() => {
      this.user = this.$store.state.user;
    })

    axios.get('/api/room' + '?roomid=' + this.$route.path.replace(/\//g,""))
      .then((response) => {
        if (!response.data) {
          this.$router.push('/invite/error');
        } else {
          this.room = response.data;
          this.joinProcess();
          this.playVideo();
          socket.emit('create', this.room);
        }
      })
  }
}
</script>

<style>

</style>
