<template>
  <q-page>
    <q-list
      class="q-mx-auto col">

        <book
          v-for="(book, key) in mp_orders"
          :key="key"
          :order="book"
          class="q-ma-xs"
          @update="UpdateOrder({id: key, order: book})"/>

    </q-list>
    
    <q-page-sticky
      position='bottom-left'
      :offset="[30,30]">
				<q-btn
					icon="clear"
					color="secondary"
          @click="ClearAllOrders">
          <q-tooltip>clear all orders</q-tooltip>
				</q-btn>
    </q-page-sticky>
 
    <q-page-sticky
      position='bottom-left'
      :offset="[100,30]">
				<q-btn
					icon="autorenew"
					color="secondary"
          @click="showDupeOrder = last_order ? true : false">
          <q-tooltip>duplicate last order</q-tooltip>
				</q-btn>
    </q-page-sticky>
 
    <q-page-sticky
      position='bottom-left'
      :offset="[170,30]">
				<q-btn
					icon="add"
					color="secondary"
          @click="showAddOrder = true">
          <q-tooltip>add order</q-tooltip>
				</q-btn>
    </q-page-sticky>

    <q-page-sticky
      position='bottom-right'
      :offset="[30,30]">
			<q-btn 
				icon="send"
				color="secondary"
        @click="true">
          <q-tooltip>send all</q-tooltip>
				</q-btn>
    </q-page-sticky>

    <div class="q-pa-md q-gutter-sm">
      <q-dialog
				v-model="showAddOrder"
				dark
				class="bg-primary"
				ref="AddOrder">
				<add-mp-order
					@close="showAddOrder = false"/>
			</q-dialog>

      <q-dialog
				v-model="showDupeOrder"
				dark
				class="bg-primary"
				ref="AddOrder">
				<add-mp-order
          :order="Object.assign({}, last_order)"
          :isDupe="true"
					@close="showDupeOrder = false"/>
			</q-dialog>
			
      <q-dialog
				v-model="showEditOrder"
				dark
				class="bg-primary"
				ref="AddOrder">
				<edit-mp-order
          :editPackage="editPackage"
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

      showAddOrder:   true,
      showEditOrder: false,
      showDupeOrder: false,

      editPackage: {
        id: null,
        order: {}
      },
    }
  },

  methods: {
    
    ...mapActions('mp_orders', ['ClearOrders', 'AddOrder']),

    ClearAllOrders () {

      this.$q.dialog({
          title: `delete all orders?`,
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
          this.ClearOrders();
        })
    },

    UpdateOrder (payload) {

        this.editPackage.id = payload.id;
        Object.assign(this.editPackage.order, payload.order);

        this.showEditOrder = true;      
    },
  },

  computed: {

    ...mapGetters('mp_orders', ['mp_orders', 'mp_order', 'last_order']),

  },

  components: {

    'book' : require('components/Book.vue').default,
    'add-mp-order' : require('components/Dialog/DialogAddMultiPage.vue').default,
    'edit-mp-order' : require('components/Dialog/DialogEditMultiPage.vue').default,
  },

  mounted () {


  },

  }

</script>

<style>
</style>