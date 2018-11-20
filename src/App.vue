<template>
  <div id="app">
    <router-view/>
    <vue-progress-bar/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
body {
  background-color: #f6f6f6;
}
</style>
