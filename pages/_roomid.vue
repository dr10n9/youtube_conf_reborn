<template>
  <div class="container">
   
    <div class="row">
      <div class="col-md-7">
        <h1>Room [{{room.roomid}}]</h1>
        <p>Creator: {{room.creator}}</p>
        <hr>
      </div>
      <div class="col-md-3">
        <h1>Members</h1>
        <p>Online: </p>
        <hr>
      </div>
    </div>
    
    <div class="row">
      <div class="col-md-7">
        <div id="player-1"></div>
        <hr>
        <div class="input-group mb-3">
          <input type="text" class="form-control"  v-on:keyup.enter="loadVideo" v-model="videoId"
          placeholder="Youtube video link" aria-label="Youtube video link" aria-describedby="button-addon2">
          <div class="input-group-append">
            <button v-on:click="loadVideo" class="btn btn-outline-secondary" type="button" id="button-addon2">Load</button>
          </div>
        </div>
        <hr>
        <div class="btn-group btn-block" role="group" aria-label="Basic example">
          <button type="button" class="btn btn-outline-primary">Play</button>
          <button type="button" class="btn btn-outline-primary">Pause</button>
          <button type="button" class="btn btn-outline-primary">Skip</button>
          <button type="button" class="btn btn-outline-primary">Start</button>
        </div>
      </div>
      <div class="col-md-3">
            <div  class="list-group">
          <template v-for="member in room.members">
            <a href="#" v-bind:key="member" class="list-group-item list-group-item-action">{{ member.username }}</a>
          </template>
            </div>
      </div>
    </div>

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
      videoId: ''
    }
  },
  methods: {
    joinProcess() {
      axios.get('/api/room/' + this.room.roomid)
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
        if (decodeURIComponent(pair[0]) == 'v') {
          return decodeURIComponent(pair[1]);
        }
      }
    },
    loadVideo() {
      if (this.user.displayName == this.room.creator) {
        let parsed = querystring.parseUrl(this.videoId);
        this.player1.loadVideoById(parsed.query.v, 5, "large");
        let data = {
          roomid: this.room.roomid,
          videoId: this.videoId
        }
        socket.emit('changeVideo', data);
      } 
    },
    shareCurrentTime() {
      if (this.user.displayName == this.room.creator) {
        setInterval(() => {
          this.player1.getCurrentTime().then((time) => {
            if (this.room.roomid && time) {
              let data = {
                roomid: this.room.roomid,
                currentTime: time
              }
              socket.emit('shareCurrentTime', data);
            }
          })
        }, 1000)
      } else {
        console.log('non creator time');
        socket.on('shareCurrentTime', (data) => {
          console.log('data time: ', data);
          this.player1.getCurrentTime().then((time) => {
            if (Math.round(data) != Math.round(time)) {
              console.log('seekTo ', data);
              this.player1.seekTo(data);
            }
          })
        })
      }
    },
    listenVideo() {
      socket.on('changeVideo', (data) => {
        console.log('Data: ', data);
        this.videoId = data;
        let parsed = querystring.parseUrl(this.videoId);
        this.player1.loadVideoById(parsed.query.v, 5, "large");
      })
    }
  },
  beforeMount() {
    this.$store.dispatch('authUser')
    .then(() => {
      this.user = this.$store.state.user;
    })

    axios.get('/api/room/' + this.$route.path.replace(/\//g,""))
      .then((response) => {
        if (!response.data) {
          this.$router.push('/invite/error');
        } else {
          this.room = response.data;
          this.joinProcess();
          this.playVideo();
          socket.emit('create', this.room);
          this.listenVideo();
          this.shareCurrentTime();
        }
      })
  }
}
</script>

<style>

</style>
