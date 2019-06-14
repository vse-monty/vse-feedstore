<template>
    <q-card
        dark
        class="bg-primary">

        <q-card-section class="row">
            <div class="text-h6 text-blue-grey-4">add order</div>
            <q-space />
            <q-btn
            v-close-popup
            class="gt-xs bg-secondary text-grey-4"
            size="8px"
            flat
            exact
            dense
            round
            icon="close"/>
        </q-card-section>

        <q-form
            @submit="submitOrder"
            autofocus
            style="min-width: 350px">

            <q-card-section>
                <div class="q-gutter-sm form-comp-styl" style="max-width: 300px">
                    
                    <q-input
                    v-model="orderToReturn.orderNumber"
                    filled
                    dark
                    label="order number"
                    standout="bg-secondary text-white"
                    input-class="text-grey-4"
                    lazy-rules
                    :rules="[
                        val => val && val.length > 0 || 'required',]"
                    />

                    <q-input
                    v-model="orderToReturn.customer"
                    filled
                    dark
                    label="customer"
                    standout="bg-secondary text-white"
                    input-class="text-grey-4"
                    />
                    
                    <q-input
                    v-model="orderToReturn.subdivision"
                    filled
                    dark
                    label="subdivision"
                    standout="bg-secondary text-white"
                    input-class="text-grey-4"
                    />

                    <q-input
                    v-model="orderToReturn.type"
                    filled
                    dark
                    label="sign type"
                    standout="bg-secondary text-white"
                    input-class="text-grey-4"
                    />

                    <q-input
                    v-model="orderToReturn.qty"
                    filled
                    dark
                    label="quantity"
                    standout="bg-secondary text-white"
                    input-class="text-grey-4"
                    />
                </div>
            </q-card-section>

            <q-card-actions align="right">
                <q-btn
                no-caps
                type="submit"
                dense
                label="add"
                color="secondary"
                v-close-popup />

            </q-card-actions>
        </q-form>
    </q-card>
</template>

<script>
export default {
    data () {
        return {
            orderToReturn: {
                orderNumber: null,
                customer:    null,
                subdivision: null,
                type:        null,
                qty:         null,
            }

        }
    },

    methods: {
        submitOrder(){
            this.$refs.orderToReturn.orderNumber.validate();
        },
    },
    
}
</script>

<style lang="stylus">
.form-comp-styl
  color $grey-4
  background $primary
</style>
