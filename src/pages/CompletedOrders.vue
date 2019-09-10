<template>
  <div class="q-pa-md">
    <q-table
      title="Archive"
      :data="orders"
      :columns="columns"
      row-key="order_number"
      selection="multiple"
      :selected.sync="selected"
      :filter="filter"
      :loading="loading"
      flat
      dark
      dense
      hide-bottom>
      <template v-slot:top>
        <q-space />
        <q-input label="search" dark dense clearable debounce="300" v-model="filter">
          <template v-slot:prepend>
            <q-icon name="search"/>
          </template>
        </q-input>
      </template>
      <!--  -->
      <template v-slot:body="props">

        <q-tr :props="props" @click.native="props.selected = !props.selected">
          <q-td>
            <q-checkbox dense dark color="info" v-model="props.selected" />
          </q-td>
          <q-td auto-width key="order_number" :props="props">
            {{ props.row.order_number }}
            <q-btn dense round flat dark :icon="props.expand ? 'arrow_drop_up' : 'arrow_drop_down'" @click.stop="props.expand = !props.expand" />
          </q-td>
          <!-- <q-td key="order_number" :props="props">{{ props.row.order_number }}</q-td> -->
          <q-td auto-width key="customer" :props="props" >{{ props.row.customer }}</q-td>
          <q-td auto-width key="subdivision" :props="props" >{{ props.row.subdivision }}</q-td>
          <q-td auto-width key="order_date" :props="props" >{{ props.row.order_date }}</q-td>
          <q-td auto-width key="art_date" :props="props" >{{ props.row.art_date }}</q-td>
        </q-tr>

        <q-tr v-show="props.expand" :props="props">
          <q-td colspan="100%">
            <div class="text-left">
              <q-list
                class="q-mx-xs">
                <mini-page
                  v-for="(p, key) in props.row.pages"
                  :key="key"
                  :order="p"
                  :id="{id: props.row.order_number, pg: key}"
                  class="q-ma-xs"/>
              </q-list>
            </div>
          </q-td>
        </q-tr>
      </template>
      <!--  -->
      <!-- <template v-slot:bottom> -->
        <!-- <q-btn flat dense color="grey-3" :disable="loading" icon="refresh" @click="Refresh" /> -->
        <!-- <q-btn flat dense color="grey-3" :disable="loading" icon="send" @click="MoveToActive" /> -->
      <!-- </template> -->
    </q-table>

    <q-page-sticky
      position='top-right'
      :offset="[30,10]">
			<q-btn 
				icon="send"
				color="secondary"
        @click="MoveToActive">
          <q-tooltip>move selected orders back to the active feed on the 'orders' tab</q-tooltip>
			</q-btn>
    </q-page-sticky>

    <q-page-sticky
      position='top-left'
      :offset="[30,10]">
			<q-btn 
				icon="refresh"
				color="secondary"
        @click="Refresh">
          <q-tooltip>refresh the table</q-tooltip>
			</q-btn>
    </q-page-sticky>

    <pre v-if="debugMenu">{{ orders }}</pre>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {

      debugMenu: false,

      pagination: {
        sortBy: 'order_number',
        descending: true,
        rowsPerPage: 0,
      },

      filter: '',
      loading: false,
      selected: [],
      orders: [],

      columns: [
        {
          name: 'order_number',
          required: true,
          label: 'Order Number',
          align: 'left',
          field: row => row.order_number,
          sortable: true
        },
        { name: 'customer', align: 'center', label: 'Customer', field: 'customer', sortable: true },
        { name: 'subdivision', label: 'Subdivision', field: 'subdivision', sortable: true },
        { name: 'order_date', label: 'Order Date', field: 'order_date', sortable: true },
        { name: 'art_date', label: 'Art Date', field: 'art_date', sortable: true },
        // { name: 'pages.length', label: 'Pages', field: row => row.pages.length, sortable: false },
        // { name: 'pages.type', label: 'Types', field: row => row.pages.map(page => `${page.type}\r`), sortable: false },
      ],
    }
  },

  components: {
    
    'mini-page' : require('components/MiniPage.vue').default,
  },
  
  mounted () {
    this.Refresh();
  },

  methods: {

    ...mapActions('mp_orders', ['AddOrder']),

    Refresh () {
      this.loading = true
      const orders = this.orders = []

      this.$db.find({}, function(err, docs){
        if(err){
          console.log(`error: ${err}`)
        }else{
          console.log('docs->')
          console.log(docs)
          try{
            for(const doc of docs){
              orders.push(doc);
            }
          } catch (err){
            console.log(`error: ${err}`)
          }
        }
      })
      this.loading = false;
    },

    RemoveAll () {

      this.$db.remove({}, { multi: true }, function (err, numRemoved) {
        console.log(`cleared -> docs removed: ${numRemoved}`)
      })

      this.$db.persistence.compactDatafile()
      this.Refresh()
    },

    MoveToActive () {

      for(let order of this.selected){
        this.AddOrder(order);
      }
      this.selected = []
    }
  },
}
</script>

<style>

</style>