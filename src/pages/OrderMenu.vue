<template>
  <q-page padding>
    
    <q-list
    padding
    class="q-mx-md"
    style="max-width: 600px">

        <order
        v-for="(order, key) in orders"
        :key="key"
        :order="order"
        :id="key"
        class="q-ma-xs"> </order>

    </q-list>
  </q-page>
</template>


<script>
import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters('orders', ['orders'])
    },
    components: {
      'order' : require('components/Order.vue').default
    }
   }

</script>

<style>
</style>