<template>
  <div id="app">
    <messenger />
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
    Messenger: () => import('@/components/Messenger'),
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/main.scss';
</style>
