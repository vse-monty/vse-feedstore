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
        class="q-ma-xs" />

    </q-list>
    
    <!-- <q-page-sticky
      position='bottom-right'
      :offset="[36,36]">
      
      <q-btn
        @click="showAddOrder = true"
        fab
        icon='add'
        color='secondary'/>
    
    </q-page-sticky> -->

    <q-dialog v-model="showAddOrder">
      <add-order/>
    </q-dialog>

  </q-page>
</template>


<script>

import { mapGetters } from 'vuex'

  export default {
    data() {
      return{
        showAddOrder: false
      }
    },
    computed: {
      ...mapGetters('orders', ['orders'])
    },
    components: {
      'order' : require('components/Order.vue').default,
      'add-order' : require('components/Modals/AddOrder.vue').default
    }
   }

</script>

<style>
</style>