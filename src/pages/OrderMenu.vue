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
          class="q-ma-xs" 
          @sendOrder="sendOrder(order)"
        />

    </q-list>
    
    <q-page-sticky
      position='bottom-right'
      :offset="[36,36]">
      
      <q-btn
        @click="showAdd"
        fab
        icon='add'
        color='secondary'/>
    
    </q-page-sticky>

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
    methods: {
      showAdd(){
        this.$emit('closeDrawer')
      },
      sendOrder(payload){
        console.log('sending order');
        console.log(payload);

        this.$socket.emit('order', JSON.stringify(payload));
      },
    },
    computed: {
      ...mapGetters('orders', ['orders'])
    },
    components: {
      'order' : require('components/Order.vue').default,
    }
   }

</script>

<style>
</style>