<template>
  <!--TODO: ADD click event, to open an editing modal for the order -->
  <q-item
    @click="updateOrder({id: id, updates: {type: 'banana'} })"
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
        <q-btn
        @click="promptToDelete(id)"
        class="gt-xs text-negative"
        size="11px"
        flat
        dense
        round
        icon="delete" />
        
        <q-btn
        class="gt-xs text-positive"
        size="11px"
        flat
        dense
        round
        icon="send" />

      </div>
    </q-item-section>
  </q-item>

</template>

<script>
import { mapActions } from 'vuex';

export default {

    props: ['order', 'id'],

    methods: {
      ...mapActions('orders', ['updateOrder']),

      promptToDelete(id){
        if(confirm()){
          console.log(id + ' deleted');
        }
      },

      confirm () {
        this.$q.dialog({
          title: 'confirm',
          message: 'delete?',
          cancel: true,
          persistent: true
        }).onOk(() => {
          console.log('>>>> OK')
        })
      },
    }
}
</script>

<style>

</style>
