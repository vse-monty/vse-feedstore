<template>
    <q-form
        @submit="onSubmit"
        @reset="onReset"
        no-error-focus
        class="q-gutter-xs"
        ref="addForm"
        >
        
         <q-input
            v-model="orderToReturn.file"
            ref="file"
            filled
            dense
            dark
            clearable
            label="file"
            standout="bg-secondary text-white"
            input-class="text-grey-4"
            hide-bottom-space>

            <template v-slot:append>
                <q-btn round dense flat icon="add" @click.stop="getFile" />
            </template>

         </q-input>

        <q-input
            v-model="orderToReturn.orderNumber"
            ref="orderNumber"
            autofocus
            filled
            dense
            dark
            clearable
            label="order number"
            standout="bg-secondary text-white"
            input-class="text-grey-4"
            lazy-rules
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
            v-if="orderToReturn.orderNumber"
            :options="Object.keys(builders)"
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
            v-if="orderToReturn.customer"
            :options="Object.keys(builders[orderToReturn.customer].locations)"
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
            v-if="orderToReturn.subdivision"
            :options="Object.keys(builders[orderToReturn.customer].signTypes)"
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
            v-if="orderToReturn.type"
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
        label="submit"
        v-if="orderToReturn.qty"/>
        
    </q-form>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';

export default {
    data () {
        return {

            orderToReturn: {
                orderNumber: null,
                customer:    null,
                subdivision: null,
                type:        null,
                qty:         null,
                file:        null,
            },

            variables: [],

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
            
            this.$refs.addForm.validate().then(success => {
            if (success) {
                // yay, models are correct
                
                this.addOrder(this.orderToReturn);
                this.$refs.addForm.resetValidation();
                this.clearFields();
                this.$emit('closeDrawer');
            }
            else {
                // oh no, user has filled in
                // at least one invalid value
                this.$q.dialog({
                    title: 'oh no!',
                    message: 'fix your form!',
                    position: 'standard',
                    ok: {
                        push: true,
                        color: 'negative',
                        flat: true,
                    },
                    dark: true,
                    persistent: true,
                    })
            }
            })
            
        },

        onReset () {
            this.clearFields();
        },

        getSubOptions () {
            return Object.keys(this.locations(this.orderToReturn));
        },

        getFile () {
            let options = {
                title: 'select art file',
                buttonLabel: 'use',
                filters: [
                    {
                        name: 'Illustrator Files',
                        extensions: [ 'ai', 'png', 'pdf' ],
                    },
                ],
                properties: [ 'openFile' ],
            }

            let fileString = this.$q.electron.remote.dialog.showOpenDialog(null, options)
            
            if(fileString){
                this.orderToReturn.file = encodeURI(fileString);
                this.$socket.emit('to.panel', {type: "get.variables", data: fileString});
            }
        }
    },

    computed: {
        ...mapGetters('builders', ['builders']),

    },
}
</script>

<style>

</style>
