<template>
  <div class="container">
    <div class="col-md-4">
      <h1>Rooms</h1>
      <hr>
      <div class="list-group">
        <template v-for="room in user.joinedrooms">
          <div :key="room">
            <a href="#" class="list-group-item list-group-item-action list-group-item-primary">
              {{ room.roomid }} {{ room.roomname }}
            </a>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: '',
      loaded: false
    }
  },
  mounted() {
    this.$store.dispatch('authUser')
    .then(() => {
      this.user = this.$store.state.user;
      if (this.user) this.loaded = true;
    })
  }
}
</script>

<style>

</style>
