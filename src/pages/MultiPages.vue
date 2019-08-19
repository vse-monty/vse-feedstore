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

        <order
          v-for="(order, key) in batch_orders"
          :key="key"
          :order="order"
          @update="updateOrder({order: order, id: key})"
          class="q-ma-xs"/>

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
        @click="sendBatches()">
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
					@close="showEditShared = false"
          @first="hasShared = true;"/>
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
          :editPackage="editPackage"
					@close="showEditOrder = false"/>
			</q-dialog>
		</div>
  </q-page>
</template>


<script>

import { mapGetters } from 'vuex'
import { mapActions } from 'vuex'
import { setTimeout } from 'timers';

export default {

  data () {
    return {
    }
  },

  methods: {
    
    ...mapActions('batches', ['clearBatch', 'sendAll']),
  },

  computed: {

    ...mapGetters('batches', ['batch', 'batch_shared', 'batch_orders']),
  },

  components: {

    'order' : require('components/Order.vue').default,
    'add-mp-order' : require('components/Dialog/DialogAddMultiPage.vue').default,
  },

  mounted () {
  },

  }

</script>

<style>
</style>