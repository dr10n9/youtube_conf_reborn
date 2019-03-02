<template>
  <div class="container">
    <Welcome/>
    <Socket/>
    <div v-if="loaded == true">
      <Form/>
    </div>
  </div>
</template>

<script>

import Welcome from '~/components/Welcome.vue';
import Navbar from '~/components/Navbar';
import Socket from '~/components/Socket';
import Form from '~/components/Form';
import axios from 'axios';
import store from '@/store/index';

export default {
  components: {
    Welcome,
    Navbar,
    Socket,
    Form
  },
  data() {
    return {
      user: {},
      loaded: false
    }
  },
  // asyncData() {
  //   console.log('asyncdata');
  //   return axios.get('http://127.0.0.1:3000/api/user').then(response => {
  //     console.log('data ' + response.data);
  //     let user = response.data;
  //     return { user } // equivalent to { products: products }
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   })
  // },
  computed: {
    doneUser () {
      return this.$store.getters.doneUser
    }
  },
  mounted() {
    this.$store.dispatch('authUser')
    .then(() => {
        this.user = this.$store.state.user;
        if (!this.user)
        this.loaded = true
      })
    // console.log('user async: ' + JSON.stringify(this.user));
    // axios.get('http://127.0.0.1:3000/api/user').then(response => {
    //   // Note that you can't access the `this` instance inside asyncData
    //   // this.products = response.data
    //   console.log(response.data);
    //   let userObj = response.data;
    //   this.user = userObj // equivalent to { products: products }
    // })
    // .catch((err) => {
    //   console.log(err);
    // })
    // axios.get('/api/user')
    // .then((res) => {
    //   console.log(res);
    // })
    // .catch((err)=>{
    //   console.log(err);
    // })
    // this.$store.dispatch('authUser');
    // console.log('storeuser: ' + JSON.stringify(this.doneUser));
  }
}
</script>

<style>

</style>
