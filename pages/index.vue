<template>
  <div>
    <h1>Index</h1>
        {{$store.state.authUser}}
  </div>
</template>

<script>
export default {
  middleware: 'auth'
}
</script>
