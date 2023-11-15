<template>
  <div id="app">
    <header class="header" :style="{ backgroundImage: `url(${backgroundImage})` }">
      <h1>Welcome to IE Online Bank</h1>
    </header>
    <template>
      <div class="button-container">
        <router-link to="/skull" class="button">Skull</router-link>
        <router-link to="/accounts" class="button">Account Management</router-link>
      </div>
    </template>
    <section class="section">
      <h2>Mission & Vision</h2>
      <p>Ace the assignment of building online bank!</p>
      <p>Get a good grade in this assignment...</p>
    </section>
  </div>
</template>


<script>
export default {
  name: 'WelcomePage',
  data() {
    return {
      backgroundImage: require('../assets/images/header-background.jpg')
    }
  }
}
</script>


<style scoped>
body {
  font-family: Arial, sans-serif;
}


.menu {
  background-color: #333;
  overflow: hidden;
}


.menu ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}


.menu li a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}


.header {
  padding: 60px;
  text-align: center;
  color: white;
  background-image: "require(`./assets/images/header-background.png`)";
  background-size: cover;
}


.section {
  padding: 20px;
}


.section h2 {
  color: #ea81c4;
}


.button-container {
  display: flex;
  justify-content: center;
  margin-top: 50px;
}


.button {
  margin: 0 10px;
  padding: 10px 20px;
  background-color: #ea81c4;
  color: #ffffff;
  text-decoration: none;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}
</style>
