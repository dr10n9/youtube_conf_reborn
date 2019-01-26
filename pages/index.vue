<template>
  <div class="container">
    <Navbar/>
    <Welcome/>
    <Socket/>
  </div>
</template>

<script>

import Welcome from '~/components/Welcome.vue';
import Navbar from '~/components/Navbar';
import Socket from '~/components/Socket';

export default {
  components: {
    Welcome,
    Navbar,
    Socket
  }
}
</script>

<style>

</style>
