<template>
  <div class="container">
    <Welcome/>
    <Socket/>
    <Form/>
  </div>
</template>

<script>

import Welcome from '~/components/Welcome.vue';
import Navbar from '~/components/Navbar';
import Socket from '~/components/Socket';
import Form from '~/components/Form';

export default {
  components: {
    Welcome,
    Navbar,
    Socket,
    Form
  }
}
</script>

<style>

</style>
