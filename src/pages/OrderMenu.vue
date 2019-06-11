<template>
  <q-page padding>
    <div class="q-pa-md">
        
        <q-list
        v-for="order in orders"
        :key=order.orderNumber
        class="q-pa-xs"
        style="max-width: 600px">

          <!--TODO: ADD click event, to open an editing modal for the order -->
          <q-item
            clickable
            v-ripple
            class="bg-secondary">

            <q-item-section class="col-2 gt-sm">
              <q-item-label class="q-mt-sm text-weight-bolder">{{ order.orderNumber }}</q-item-label>
            </q-item-section>

            <q-item-section top>
              <q-item-label lines="1">
                <span class="text-weight-bold">{{ order.customer }}</span>
                <span class="text-blue-grey-3"> - {{ order.subdivision }}</span>
              </q-item-label>
              <q-item-label class="q-mt-xs text-uppercase text-grey-4">
                <small><span class="q-pr-md">{{ order.type }}</span>
                <span class="">QTY : {{ order.qty }}</span></small>
              </q-item-label>
            </q-item-section>

            <q-item-section side>
              <div class="text-grey-8 q-gutter-xs">
                <!-- TODO: ADD click events to the buttons to send and delete orders-->
                <q-btn class="gt-xs text-negative" size="11px" flat dense round icon="delete" />
                <q-btn class="gt-xs text-positive" size="11px" flat dense round icon="send" />
              </div>
            </q-item-section>
          </q-item>

          <!-- <q-separator spaced /> -->

      </q-list>
    </div>
  </q-page>
</template>


<script>
  export default {
   data(){
     return{
       orders: [
         {
           orderNumber: '110001',
           customer:'Home Builder Homes',
           subdivision: 'Corporate',
           type:'Available',
           qty: '500',
         },
         {
           orderNumber: '110002',
           customer:'Home Builder Homes',
           subdivision: 'Corporate',
           type:'Sold',
           qty: '300',
         },
         {
           orderNumber: '110003',
           customer:'Home Builder Homes',
           subdivision: 'The Valley',
           type:'Development Sign',
           qty: '1',
         },
       ]
     }
   }
  }
</script>

<style>
</style>