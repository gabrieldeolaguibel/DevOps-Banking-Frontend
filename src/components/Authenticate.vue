<template>
    <div>
        <h1>Login</h1>
        <form @submit="submitForm">
            <label for="username">Username:</label>
            <input type="text" id="username" v-model="username" required>
            <br>
            <label for="password">Password:</label>
            <input type="password" id="password" v-model="password" required>
            <br>
            <button type="submit">Sign In</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            password: ''
        };
    },
    methods: {
        submitForm(event) {
            event.preventDefault();
            // Perform authentication logic here
            console.log('Username:', this.username);
            console.log('Password:', this.password);
            // Reset form fields
            this.username = '';
            this.password = '';
        }
    }
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
