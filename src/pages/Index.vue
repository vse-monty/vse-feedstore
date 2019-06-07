<template>
  <q-page padding>
    <q-form
      autofocus>

      <div class="q-gutter-md"
      style="max-width: 300px"
      justify-end>
        <q-input v-model="customer" label="customer" />
        <q-input v-model="orderNumber" label="order number" />

        <q-btn @click="resetForm" label="clear"/>
      </div>
    </q-form>
  </q-page>
</template>


<script>
  export default {
    data() {
      return {
        customer: "Cash Customer",
        orderNumber: "11XXXX",
      }
    },
    methods: {
      resetForm (){
        this.data.customer = "Cash Customer";
        this.data.orderNumber = "11XXXX";
      },
    },
  }
</script>

<style>
</style>