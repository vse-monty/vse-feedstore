<template>
  <q-page>
    <q-item
      dark
      class="row bg-blue-grey-7 q-mx-auto"
      style="max-width: 750px">
    </q-item>

    <q-list
      padding
      class="q-mx-lg col">

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
          @click="true">
          <q-tooltip>clear all orders</q-tooltip>
				</q-btn>
    </q-page-sticky>
 
    <q-page-sticky
      position='bottom-left'
      :offset="[100,30]">
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
        @click="showAddOrder = true">
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
    
    ...mapActions('mp_orders', ['clearOrders']),
  },

  computed: {

    ...mapGetters('mp_orders', ['mp_orders', 'mp_order']),
  },

  components: {

    'book' : require('components/Book.vue').default,
    'add-mp-order' : require('components/Dialog/DialogAddMultiPage.vue').default,
    'add-page' : require('components/Dialog/DialogAddPage.vue').default,
  },

  mounted () {
  },

  }

</script>

<style>
</style>