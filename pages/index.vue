<template>
  <div class="container">
    <Navbar/>
    <Welcome/>
  </div>
</template>

<script>

import Welcome from '~/components/Welcome.vue'
import Navbar from '~/components/Navbar'

export default {
  components: {
    Welcome,
    Navbar
  }
}
</script>

<style>

</style>
