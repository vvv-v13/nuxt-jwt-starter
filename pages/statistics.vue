<template>
    <div>
        <h1>Statistics</h1>
        {{$store.state.statistics}}
    </div>
</template>

<script>

export default {
    middleware: 'auth',
    async fetch ({ store }) {
        await store.dispatch('statistics')
    },
}
</script>
