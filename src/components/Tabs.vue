<template>
  <div>
      <md-tabs class="md-primary" md-alignment="centered">
      <md-tab id="tab-home" md-label="Home"></md-tab>
      <md-tab id="tab-pages" to="/" md-label="Table of restaurants"></md-tab>
      <md-tab id="tab-posts" to="/card" md-label="Cards of restaurants"></md-tab>
      <md-tab id="tab-favorites" md-label="Contact"></md-tab>
    </md-tabs>
  </div>
</template>

<script>
export default {
    name: 'Tabs',
}
</script>

<style>

</style>