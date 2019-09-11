<template>
  <q-item
    class="bg-grey-8">

    <q-item-section class="col-1 gt-auto">
      <q-item-label class="text-overline text-weight-bold">
        pg {{ id.pg + 1 }}
      </q-item-label>
    </q-item-section>
   
    <q-item-section class="col-2">
      <q-item-label class="q-mt-xs text-uppercase text-grey-2">
        {{ order.type }}
      </q-item-label>
      <q-item-label class="q-mt-xs text-grey-2">
        QTY : {{ order.quantity }}
      </q-item-label>
    </q-item-section>
   
    <q-item-section class="col-3">
       <q-item-label class="q-mt-xs text-grey-2">
        {{ order.substrate }}
      </q-item-label>
    </q-item-section>

    <q-item-section class="col">
      <q-item-label>
        ADDRESS : {{ order.address.replace(/\r/, " - ") }}
      </q-item-label>
    </q-item-section>
  </q-item>

</template>

<script>
import { mapActions } from 'vuex';

export default {

    props: ['order', 'id'],
}
</script>

<style>
.bg-page {

	background: #69737d;
}
</style>
