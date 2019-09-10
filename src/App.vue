<template>
  <div id="q-app" class="bg-grey-9 text-grey-5">
    <router-view />
  </div>
</template>

<script>
import { mapActions } from 'vuex'

  export default {

    methods: {

      ...mapActions('settings', ['loadSettings']),
      ...mapActions('mp_orders', ['LoadOrders'])
    },

    mounted () {

      this.loadSettings()
      this.LoadOrders()
    },
  }
</script>

<style>
::-webkit-scrollbar {
  display: none;
}
</style>
