<template>
  <q-page>
    <q-item
      @click="showEditShared = true"
      clickable
      v-ripple
      dark
      class="row bg-blue-grey-7 q-mx-auto"
      style="max-width: 750px">

      <q-item-section class="q-pl-xl">
        <q-item-label lines="1">
          <span class="text-h6 text-weight-bold text-grey-4">{{ batch_shared.customer }}</span>
        </q-item-label>
      </q-item-section>
  
      <q-item-section class="q-pl-xl text-subtitle1">
        <q-item-label>
          <span class="text-weight-medium text-grey-4">{{ batch_shared.type }}</span>
        </q-item-label>
      </q-item-section>
  
      <q-item-section>
        <q-item-label class="q-pr-xl text-uppercase text-overline text-grey-4">
          <small>orders in batch - {{ totalOrders }}</small>
        </q-item-label>
      </q-item-section>
    </q-item>

    <q-list
      padding
      class="q-mx-lg col">

        <batch-order
          v-for="(order, key) in batch_orders"
          :key="key"
          :order="order"
          class="q-ma-xs" 
          @update="updateOrder($event)"/>

    </q-list>
    
    <q-page-sticky
      position='bottom-left'
      :offset="[30,30]">
				<q-btn
					icon="clear"
					color="secondary"
          @click="confirmDelete()">
          <q-tooltip>clear all</q-tooltip>
				</q-btn>
    </q-page-sticky>
 
    <q-page-sticky
      position='bottom-left'
      :offset="[100,30]">
				<q-btn
					icon="add"
					color="secondary"
          @click="showAddOrder = true">
          <q-tooltip>add order to batch</q-tooltip>
				</q-btn>
    </q-page-sticky>

    <q-page-sticky
      position='bottom-right'
      :offset="[30,30]">
			<q-btn 
				icon="send"
				color="secondary"
        @click="sendAll()">
          <q-tooltip>send all</q-tooltip>
				</q-btn>
    </q-page-sticky>

    <div class="q-pa-md q-gutter-sm">
			<q-dialog
				v-model="showEditShared"
				dark
				class="bg-primary"
				ref="EditShared">
				<edit-batch-shared
          :variables.sync="v_front"
          :variables_back.sync="v_back"
					@close="showEditShared = false"/>
			</q-dialog>
			
      <q-dialog
				v-model="showAddOrder"
				dark
				class="bg-primary"
				ref="AddOrder">
				<add-batch-order
					@close="showAddOrder = false"/>
			</q-dialog>
			
      <q-dialog
				v-model="showEditOrder"
				dark
				class="bg-primary"
				ref="EditOrder">
				<edit-batch-order
          :editID="editID"
					@close="showEditOrder = false"/>
			</q-dialog>
		</div>

  </q-page>
</template>


<script>

import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'

  export default {
    data () {
      return {
        
        showEditShared: false,
        showAddOrder: false,
        showEditOrder: false,

        editID: null,

        editPackage: {
          id: null,
          order: {}
        },

        v_front: [],
        v_back:  [],
      }
    },

    methods: {
      
      ...mapActions('batches', ['clearOrders', 'sendAll']),

      updateOrder(id) {
        this.editID = id;
        this.showEditOrder = true;
      },

      confirmDelete(id) {
        this.$q.dialog({
          title: 'delete all orders from batch?',
          message: '',
          position: 'standard',
          ok: {
            push: true,
            color: 'negative',
            flat: true,
          },
          cancel: {
            push: true,
            color: 'white',
            flat: true,
          },
          dark: true,
          persistent: true,
        }).onOk(() => {
          this.clearOrders();
          this.$q.notify('all orders yeet\'d from batch');
        })
      },
    },

    computed: {

      ...mapGetters('batches', ['batch', 'batch_shared', 'batch_orders']),

      totalOrders: function () {
        return Object.keys(this.batch_orders).length;
      }
    },

    components: {

      'batch-order' : require('components/BatchOrder.vue').default,
      'edit-batch-shared' : require('components/Dialog/EditBatchSharedDialog.vue').default,
      'add-batch-order' : require('components/Dialog/AddBatchOrderDialog.vue').default,
      'edit-batch-order' : require('components/Dialog/EditBatchOrderDialog.vue').default,
    },

    mounted () {
      this.showEditShared = true;
    }
   }

</script>

<style>
</style>