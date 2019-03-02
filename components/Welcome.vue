<template>
  <div class="jumbotron">
    <div class="row">
      <div class="col-md-5">
        <h1>Youtube Conf Reborn</h1>
        <hr>
        <p>Мертворожденный и ныне перерожденный</p>
      </div>
      <div class="col-md-7">
        <h1>Welcome, {{ user.displayName }}!</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: ''
    }
  },
  beforeMount() {
    this.$store.dispatch('authUser')
    .then(() => {
      this.user = this.$store.state.user;
    })
  }
}
</script>
