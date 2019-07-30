<template>
  <q-page padding>

    <div class="row q-mx-xl">
      <div class="col-6 q-pr-md">
        <q-card dark class="bg-secondary text-center" style="min-height: 150px">
          <q-card-section>
            <span class="text-h6">{{ batch_shared.customer }}</span>
            <span class="text-overline"> - {{ batch_shared.type }}</span>
            <q-separator dark  spaced/>
            <div class="text-overline">orders in batch - {{ totalOrders }}</div>
          </q-card-section>
        </q-card>
      </div>
      
      <div class="col-6 q-pl-md">
        <q-card dark class="bg-secondary text-center" style="min-height: 150px">
          <q-card-section>
            <div class="text-h6">dynamic slots</div>
            <q-separator dark spaced/>
            <div v-for="(o, idx) in batch_shared.totalVariables" :key="idx">
              <small><span class="text-cyan-3">{{ o.name }} - </span>
              <span class="text-blue-grey-2">{{ o.type }}</span></small>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <q-list
      padding
      class="q-mx-lg col">

        <batch-order
          v-for="(order, key) in batch_orders"
          :key="key"
          :order="order"
          :id="key"
          class="q-ma-xs" 
          @sendOrder="console.log(order)"/>

    </q-list>
    
    <q-page-sticky
      position='bottom-left'
      :offset="[30,30]">
				<q-btn
					icon="clear"
					color="secondary">
          <q-tooltip>clear all</q-tooltip>
				</q-btn>
    </q-page-sticky>
 
    <q-page-sticky
      position='bottom-left'
      :offset="[100,30]">
				<q-btn
					icon="edit"
					color="secondary"
          @click="showEditShared = true">
          <q-tooltip>edit shared info</q-tooltip>
				</q-btn>
    </q-page-sticky>
 
    <q-page-sticky
      position='bottom-left'
      :offset="[170,30]">
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
				color="secondary">
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

        editPackage: {
          id: null,
          order: {}
        },

        v_front: [],
        v_back:  [],
      }
    },

    methods: {

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
    },

    mounted () {
      this.showEditShared = true;
    }
   }

</script>

<style>
</style>