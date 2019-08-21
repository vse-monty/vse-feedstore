<template>
  <q-item
    class="bg-page">

    <q-item-section class="col-2 gt-auto">
      <q-item-label class="text-overline text-weight-bolder">
        pg {{ id.pg + 1 }}
      </q-item-label>
    </q-item-section>
   
    <q-item-section class="q-pl-sm">
      <q-item-label class="q-mt-xs text-uppercase text-grey-4">
        <small><span class="q-pr-md">{{ order.type }}</span></small>
      </q-item-label>
    </q-item-section>

    <q-item-section class="q-pl-sm">
      <q-item-label class="q-mt-xs text-uppercase text-grey-4">
        <small><span class="">QTY : {{ order.quantity }}</span></small>
      </q-item-label>
    </q-item-section>

    <q-item-section side>
      <div class="text-grey-8 q-gutter-xs">
        <q-btn
        @click.prevent.stop="ConfirmDelete"
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

    props: ['order', 'id'],

    methods: {
      
      ...mapActions('mp_orders', ['DeletePage']),

      ConfirmDelete() {
        this.$q.dialog({
          title: `delete page ${this.id.pg + 1}?`,
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
          this.RemovePage()
        })
      },
      
      RemovePage () {
        let clone = {};
        Object.assign(clone, this.id);
        this.DeletePage(clone);
        this.$q.notify('page effectively yeet\'d')
      },
    }
}
</script>

<style>
.bg-page {

	background: #69737d;
}
</style>
