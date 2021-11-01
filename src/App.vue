<template>
  <div id="app">
    <Tabs/>
    <h1><ListOfRestaurants/></h1>
  </div>
</template>

<script>
import ListOfRestaurants from './components/RestaurantsList.vue'
import Tabs from './components/Tabs.vue'

export default {
  name: 'App',
  components: {
    ListOfRestaurants,
    Tabs,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #04315e;
  margin-top: 60px;
}
</style>  
