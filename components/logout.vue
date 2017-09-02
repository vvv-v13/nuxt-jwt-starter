<template>
    <a href="#" v-on:click="logout()">Logout</a>
</template>

<script>
export default {
    methods: {
        async logout() {
            await this.$store.dispatch('logout')
            this.$router.replace("/login")
        }
    }
}
</script>
