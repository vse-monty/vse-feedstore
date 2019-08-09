<template>
  <div id="q-app" class="bg-grey-9 text-grey-5">
    <router-view />
  </div>
</template>

<script>
import { mapActions } from 'vuex'

  export default {

    methods: {

      ...mapActions('settings', ['loadSettings'])
    },

    mounted () {

      this.loadSettings();
    }
  }
</script>

<style>
::-webkit-scrollbar {
  display: none;
}
</style>
