<template>
    <div class="container">
        <h1>Please login</h1>
        <form v-if="!$store.state.authUser" @submit.prevent="login">
            <p class="error" v-if="formError">{{ formError }}</p>
            <p>
                <i>To login, use
                    <b>demo</b> as username and
                    <b>demo</b> as password.</i>
            </p>
            <p>Username: <input type="text" v-model="formUsername" name="username" /></p>
            <p>Password: <input type="password" v-model="formPassword" name="password" /></p>
            <button type="submit">Login</button>
        </form>
        <div v-else>
            Hello {{ $store.state.authUser.username }}!
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            formError: null,
            formUsername: '',
            formPassword: ''
        }
    },
    methods: {
        async login() {
            try {
                await this.$store.dispatch('login', {
                    username: this.formUsername,
                    password: this.formPassword
                })
                this.formUsername = ''
                this.formPassword = ''
                this.formError = null
        
                let path = this.$route.query.path || "/"
                this.$router.replace(path)
            } catch (e) {
                this.formError = e.message
            }
        },
    }
}
</script>

<style>
.container {
    padding: 100px;
}

.error {
    color: red;
}
</style>
