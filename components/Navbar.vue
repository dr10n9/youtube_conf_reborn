<template>
<div>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="/">YConf</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div class="navbar-nav">
      <a class="nav-item nav-link" href="/">Home <span class="sr-only">(current)</span></a>
      <a class="nav-item nav-link" href="/showrooms">Rooms</a>
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">API</button>
    </div>
  </div>
  <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
    <ul class="navbar-nav ml-auto">
      <li class="nav-item">
        <a class="nav-link" href="#">Help</a>
      </li>
        <li  class="nav-item">
      <div v-if="loaded == true">
          <a v-if="user" class="nav-link btn btn-outline-info my-2 my-sm-0" href="/logout">Sign out</a>
          <a v-else class="nav-link btn btn-outline-info my-2 my-sm-0" href="/auth/google">Sign in</a>
      </div>
        </li>
    </ul>
  </div>
  </nav>
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
  beforeMount() {
    this.$store.dispatch('authUser')
    .then(() => {
      this.user = this.$store.state.user;
      this.loaded = true;
    })
  }
}
</script>
