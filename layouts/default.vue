<template>
    <div>
        <div v-if="$store.state.authUser">
            <div class="item">
                <nuxt-link to="/">Index</nuxt-link>
            </div>
            <div class="item">
                <nuxt-link to="/statistics">Statistics</nuxt-link>
            </div>
            <div class="item">
                <Logout/>
            </div>
        </div>
        <nuxt/>
    </div>
</template>

<script>
import Logout from '~/components/logout.vue'
export default {
    components: {
        Logout
    }
}
</script>

<style scoped>
    .item {
        display: inline;
        margin: 10px;
    }
</style>

