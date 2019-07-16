<template>
  <!--TODO: ADD click event, to open an editing modal for the order -->
  <q-item
    @click="updateOrder({id: id, updates: {type: 'banana'} })"
    clickable
    v-ripple
    class="bg-secondary">

   <q-item-section class="col-2 gt-xs">
      <q-item-label class="text-overline text-weight-bolder">
        {{ order.orderNumber }}
      </q-item-label>
    </q-item-section>

    <q-item-section top class="q-pl-sm">
      <q-item-label lines="1">
        <span class="text-weight-bold">{{ order.customer }}</span>
        <span class="text-blue-grey-3"> - {{ order.subdivision }}</span>
      </q-item-label>
      <q-item-label class="q-mt-xs text-uppercase text-grey-4">
        <small><span class="q-pr-md">{{ order.type }}</span>
        <span class="">QTY : {{ order.quantity }}</span></small>
      </q-item-label>
    </q-item-section>

    <q-item-section side>
      <div class="text-grey-8 q-gutter-xs">
        <!-- TODO: ADD click events to the buttons to send and delete orders-->
        <q-btn
        @click.stop="confirmDelete(id)"
        class="gt-xs text-grey-4"
        size="11px"
        flat
        exact
        dense
        round
        icon="delete" />
        
        <q-btn
        @click.stop="sendOrder(id)"
        class="gt-xs text-blue-grey-3"
        size="11px"
        flat
        exact
        dense
        round
        icon="send" />

      </div>
    </q-item-section>
  </q-item>

</template>

<script>
import { Dialog } from 'quasar'
import { mapActions } from 'vuex';

export default {

    props: ['order', 'id'],

    methods: {
      ...mapActions('orders',
                      ['updateOrder',
                       'deleteOrder',
                       'sendOrder'
                       ]
                  ),


      confirmDelete(id) {
        this.$q.dialog({
          title: 'delete this order?',
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
          this.removeOrder(id)
        })
      },
      
      removeOrder (id) {
        this.deleteOrder(id)
        this.$q.notify('order effectively yeet\'d')
      },

      sendOrder(id) {

        this.$emit('sendOrder')
        this.$q.notify('order sent to illustrator panel')
      },
    }
}
</script>

<style>

</style>
