<template>
  <q-page padding>
    <div class="bg-grey-9 text-grey-4 text-h6">order feed</div>
    <q-list
      padding
      class="q-mx-md">

        <order
          v-for="(order, key) in orders"
          :key="key"
          :order="order"
          :id="key"
          class="q-ma-xs" 
          @sendOrder="sendOrder(order)"
          @update="updateOrder({order: order, id: key})"/>
    </q-list>
    
    <q-page-sticky
      position='bottom'
      :offset="[36,36]">
      <q-btn
        fab
        icon='add'
        color='secondary'
        @click="showAddOrderForm = true"/>
    </q-page-sticky>

    <div class="q-pa-md q-gutter-sm">
			<q-dialog
				v-model="showAddOrderForm"
				dark
				class="bg-primary"
				ref="AddOrder">
				<add-order-form
					@close="showAddOrderForm = false"/>
			</q-dialog>

			<q-dialog
				v-model="showEditOrderForm"
				dark
				class="bg-primary"
				ref="AddOrder">
				<edit-order-form
          :editPackage="editPackage"
					@close="showEditOrderForm = false"/>
			</q-dialog>
		</div>
  </q-page>
</template>


<script>

import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'

  export default {
    data() {
      return {

        showAddOrderForm: false,
        showEditOrderForm: false,

        editPackage: {
          id: null,
          order: {}
        },
      }
    },

    methods: {

      ...mapActions('orders', ['updateOrder', 'sendOrder']),

      sendOrder(payload){

        this.$socket.emit('order', JSON.stringify(payload));
      },

      updateOrder(payload){

        let obj = {}
        Object.assign(obj, payload);
        Object.assign(this.editPackage, obj);
        this.showEditOrderForm = true;
      }
    },
    computed: {

      ...mapGetters('orders', ['orders'])
    },
    components: {
      
      'order' : require('components/Order.vue').default,
      'add-order-form' : require('components/Dialog/DialogAddOrder.vue').default,
      'edit-order-form' : require('components/Dialog/DialogEditOrder.vue').default,
    }
   }

</script>

<style>
</style>