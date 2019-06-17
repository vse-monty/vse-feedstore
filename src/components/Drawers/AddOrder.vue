<template>
    <q-form
        @submit="onSubmit"
        @reset="onReset"
        autofocus
        class="q-gutter-xs"
        >
        
        <q-input
            v-model="orderToReturn.orderNumber"
            ref="orderNumber"
            filled
            dense
            dark
            clearable
            label="order number"
            standout="bg-secondary text-white"
            input-class="text-grey-4"
            hide-bottom-space
            :rules="[ val => !!val && val.length == 6]"
            />

        <q-select
            filled
            dense
            dark
            clearable
            options-dense
            options-dark
            label="customer"
            standout="bg-secondary text-white"
            input-class="text-grey-4"
            v-model="orderToReturn.customer"
            :options="builderOptions"
            ref="customer"
            hide-bottom-space
            :rules="[ val => !!val]"
            >
                <template v-slot:append>
                    <q-btn round dense flat icon="add" @click.stop />
                </template>
        </q-select>

        <q-select
            filled
            dense
            dark
            clearable
            options-dense
            options-dark
            label="subdivision"
            standout="bg-secondary text-white"
            fill-input
            input-class="text-grey-4"
            v-model="orderToReturn.subdivision"
            :options="subdivisionOptions"
            ref="subdivision"
            hide-bottom-space
            :rules="[ val => !!val]"
            >
                <template v-slot:append>
                    <q-btn round dense flat icon="add" @click.stop />
                </template>
        </q-select>

        <q-select
            filled
            dense
            dark
            clearable
            options-dense
            options-dark
            label="signage type"
            standout="bg-secondary text-white"
            fill-input
            input-class="text-grey-4"
            v-model="orderToReturn.type"
            :options="signTypeOptions"
            ref="type"
            hide-bottom-space
            :rules="[ val => !!val]"
            >
                <template v-slot:append>
                    <q-btn round dense flat icon="add" @click.stop />
                </template>
        </q-select>

        <q-input
            v-model="orderToReturn.qty"
            ref="qty"
            filled
            dense
            dark
            clearable
            label="quantity"
            standout="bg-secondary text-white"
            input-class="text-grey-4"
            hide-bottom-space
            :rules="[ val => !!val]"
            />

        <!-- Submit button for the form Add Order Form -->
        <q-btn
        type="reset"
        label="reset"/>
        
        <q-btn
        type="submit"
        label="submit"/>
        
    </q-form>
</template>

<script>
import { mapActions } from 'vuex';

const bOptions = [
                'Beazer',
                'DR Horton',
                'Highland',
                'Meritage',
                'MI']

const sOptions = [
                'Corporate',
                'The Valley']

const tOptions = [
                'available',
                'sold',
                '8x4',
                '8x12',
                'Main ID']



export default {
    data () {
        return {

            orderToReturn: {
                orderNumber: null,
                customer:    null,
                subdivision: null,
                type:        null,
                qty:         null,
            },

            builderOptions: bOptions,
            subdivisionOptions: sOptions,
            signTypeOptions: tOptions,
        }
    },
    methods: {

        ...mapActions('orders', ['addOrder']),

        clearFields () {
            this.orderToReturn.orderNumber = null;
            this.orderToReturn.customer = null;
            this.orderToReturn.subdivision = null;
            this.orderToReturn.type = null;
            this.orderToReturn.qty = null;
        },
       
        onSubmit () {
            console.log('form submitted.')

            this.addOrder(this.orderToReturn)
        },

        onReset () {
            this.clearFields();
        }
    },
}
</script>

<style>

</style>
