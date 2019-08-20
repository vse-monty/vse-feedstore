<template>
  <q-item
    @click="$emit('update')"
    clickable
    v-ripple
    class="bg-secondary q-mx-auto"
    style="min-width: 400px; max-width: 700px">

   <q-item-section class="col-1 gt-auto">
      <q-item-label class="text-overline text-weight-bolder">
        {{ order.shared.orderNumber }}
      </q-item-label>
    </q-item-section>

    <q-item-section class="col-4 q-pl-md">
      <q-item-label lines="1">
        <span class="text-weight-medium text-grey-4">SUBDIVISION : </span><span class="text-weight-bold text-uppercase text-blue-grey-3">{{ order.shared.subdivision }}</span>
      </q-item-label>
      <q-item-label class="q-mt-xs text-uppercase text-grey-4">
        <small><span>PAGES : {{ totalPages }}</span></small>
      </q-item-label>
    </q-item-section>

    <q-item-section>
      <q-list
        class="q-mx-xs">
        <page
          v-for="(p, key) in order.pages"
          :key="key"
          :order="p"
          :id="key"
          class="q-ma-xs"/>
      </q-list>
    </q-item-section>

    <q-item-section side>
      <div class="text-grey-8 q-gutter-xs">
        <q-btn
          @click.stop="confirmDelete(order.shared.orderNumber)"
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
 
  components: {
      
      'page' : require('components/Page.vue').default,
    },

  computed: {

    totalPages: function (){
      let arr = Object.keys(this.order.pages);
      return arr.length;
    }
  },

  methods: {
    ...mapActions('mp_orders', ['deleteOrder']),

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
    }
  }
}
</script>

<style>

</style>
