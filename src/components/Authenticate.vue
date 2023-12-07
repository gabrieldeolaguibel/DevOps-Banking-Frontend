<template>
  <div>
    <h1>Authenticate</h1>
    <form>
      <label for="username">Username</label>
      <input
        type="text"
        id="username"
        v-model="username"
        placeholder="Enter username"
      />
      <label for="password">Password</label>
      <input
        type="password"
        id="password"
        v-model="password"
        placeholder="Enter password"
      />
      <button type="button" @click="RESTgetAccounts">Authenticate</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Authenticate",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    RESTgetAccounts() {
      const path = `${process.env.VUE_APP_ROOT_URL}/auth/${this.username}:${this.password}`;
      axios
        .get(path)
        .then((response) => {
          console.log(response);
          // Check if the response has at least one field
          if (response.data && Object.keys(response.data).length > 0) {
            this.$router.push(`/accounts/customer/${response.data.id}`);
          } else {
            console.log("The response does not have any fields.");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
}
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}
label {
  margin-bottom: 10px;
}
input {
  padding: 5px;
  margin-bottom: 10px;
}
button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
}
</style>
