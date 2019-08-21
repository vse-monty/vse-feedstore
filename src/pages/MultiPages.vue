<template>
  <q-page>
    <q-list
      class="q-mx-auto col">

        <book
          v-for="(book, key) in mp_orders"
          :key="key"
          :order="book"
          class="q-ma-xs"/>

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
          @click="showAddOrder = true">
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
				v-model="showAddPage"
				dark
				class="bg-primary"
				ref="AddOrder">
				<add-page
					@close="showAddPage = false"/>
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

      showAddOrder: true,
      showAddPage: false,
    }
  },

  methods: {
    
    ...mapActions('mp_orders', ['ClearOrders']),

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
  },

  computed: {

    ...mapGetters('mp_orders', ['mp_orders', 'mp_order']),
  },

  components: {

    'book' : require('components/Book.vue').default,
    'add-mp-order' : require('components/Dialog/DialogAddMultiPage.vue').default,
  },

  mounted () {
  },

  }

</script>

<style>
</style>