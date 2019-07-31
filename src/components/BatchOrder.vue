<template>
  <q-item
    @click="$emit('update', order.orderNumber)"
    clickable
    v-ripple
    class="bg-secondary q-mx-auto"
    style="min-width: 400px; max-width: 700px">

   <q-item-section class="col-2 gt-auto">
      <q-item-label class="text-overline text-weight-bolder">
        {{ order.orderNumber }}
      </q-item-label>
    </q-item-section>

    <q-item-section class="q-pl-auto">
      <q-item-label lines="1">
        <span class="text-weight-medium text-grey-4">SUBDIVISION : </span><span class="text-weight-bold text-uppercase text-blue-grey-3">{{ order.subdivision }}</span>
      </q-item-label>
      <q-item-label class="q-mt-xs text-uppercase text-grey-4">
        <small><span class="q-pr-md">{{ order.type }}</span>
        <span class="">QTY : {{ order.quantity }}</span></small>
      </q-item-label>
    </q-item-section>

    <q-item-section class="q-pl-auto">
      <q-item-label lines="1" v-for="(o, idx) in order.variablesArr" :key="idx">
        <small><span class="text-cyan-3">{{ o.name }} - </span>
        <span class="text-blue-grey-2">{{ o.value }}</span></small>
      </q-item-label>
    </q-item-section>

    <q-item-section side>
      <div class="text-grey-8 q-gutter-xs">
        <q-btn
          @click.stop="confirmDelete(order.orderNumber)"
          class="gt-xs text-grey-4"
          size="11px"
          flat
          exact
          dense
          round
        icon="delete" />
      </div>
    </q-item-section>
  </q-item>

</template>

<script>
import { Dialog } from 'quasar'
import { mapActions } from 'vuex';

export default {

  props: ['order'],

  methods: {
    ...mapActions('batches', ['deleteOrder']),

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
      this.$q.notify('order yeet\'d from batch')
    },
  }
}
</script>

<style>

</style>
