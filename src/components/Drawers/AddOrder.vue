<template>
    <q-form
        @submit="onSubmit"
        @reset="onReset"
        no-error-focus
        class="q-gutter-xs"
        ref="addForm"
        >
        <!-- Art and Order Dates -->
        <div class="row q-pt-sm">
            <div class="col q-pr-xs">
                <vse-date
                    v-model="orderToReturn.orderDate"
                    :date.sync="orderToReturn.orderDate"
                    label="order date" />
            </div>
            <div class="col q-pl-auto">
                <vse-date
                    v-model="orderToReturn.artDate"
                    :date.sync="orderToReturn.artDate"
                    label="art date"
                    disable/>
            </div>
        </div>

        <!-- Order Number -->
        <q-input
            v-model="orderToReturn.orderNumber"
            autofocus
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

        <!-- Customer Dropdown -->
        <vse-select 
            :value.sync="orderToReturn.customer"
            label="customer"
            :options="Object.keys(builders)"
            :rules="[ val => !!val ]"
            @add-option="addOption"/>
        
        <!-- Subdivision Dropdown -->
        <vse-select
            v-if="orderToReturn.customer !== null"
            :value.sync="orderToReturn.subdivision"
            label="subdivision"
            :options="Object.keys(builders[orderToReturn.customer].locations)"
            :rules="[ val => !!val ]"
            @add-option="addOption"/>

        <!-- Art File Filepicker-->
        <vse-file-picker 
            v-model="orderToReturn.file_art"
            :file.sync="orderToReturn.file_art"
            :load="true"
            label="art file" />
        
        <!-- Signage Type Dropdown -->
        <!-- <vse-select
            v-if="orderToReturn.customer !== null"
            :value.sync="orderToReturn.type"
            label="type"
            :options="Object.keys(builders[orderToReturn.customer].signTypes)"
            :rules="[ val => !!val ]"
            @add-option="addOption"/> -->

        <!-- Quantity Input -->
        <q-input
            v-model="orderToReturn.qty"
            v-if="orderToReturn.type"
            label="quantity"
            filled
            dense
            dark
            clearable
            standout="bg-secondary text-white"
            input-class="text-grey-4"
            hide-bottom-space
            :rules="[ val => !!val ]"
            />

        <!-- Submit & Reset buttons for the 'Add Order' Form -->
            <div class="row q-pl-sm q-pt-md">
                <div class="col q-pr-xs">
                    <q-btn
                    style="width: 180px; height 10px"
                    type="reset"
                    color="grey-8"
                    label="reset"/>
                </div>

                <div class="col q-pl-xs">
                    <q-btn
                    style="width: 180px; height 10px"
                    type="submit"
                    color="secondary"
                    label="submit"/>
                </div>
            </div>
        <!-- Submit & Reset buttons for the 'Add Order' Form -->


        <!-- shows the 'orderToReturn' Object at the bottom of the form-->
        <pre v-if="debugMenu">{{ orderToReturn }}</pre>
        <pre>{{variables}}</pre>
        
    </q-form>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';

export default {
    data () {
        return {

            orderToReturn: {
                artDate:     null,
                customer:    null,
                file_art:    null,
                file_proof:  null,
                orderDate:   null,
                orderNumber: null,
                qty:         null,
                subdivision: null,
                type:        null,
            },

            variables: [],
            
            debugMenu: false,

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
            this.orderToReturn.orderDate =  this.orderToReturn.artDate;
            this.orderToReturn.file_art = null;
            this.orderToReturn.file_proof = null;
            this.variables = [];
        },
       
        onSubmit () {

            this.$refs.addForm.validate()
            .then(success => {
                if (success) {
                    this.addOrder(this.orderToReturn);
                    this.$refs.addForm.resetValidation();
                    this.clearFields();
                    this.$emit('closeDrawer');
                }
                else {
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
                }})
        },

        onReset () {
            this.clearFields();
        },

        getSubOptions () {
            return Object.keys(this.locations(this.orderToReturn));
        },
        
        addOption () {
            alert('TODO: add option method here...')
        },
    },

    computed: {
        ...mapGetters('builders', ['builders']),

    },
    
    components: {
        'vse-select' : require('components/Form/VSESelect.vue').default,
        'vse-date' : require('components/Form/VSEDate.vue').default,
        'vse-file-picker' : require('components/Form/VSEFilePicker.vue').default,
    },

    mounted () {
        this.$socket.on('give.variables', (data) => {
            console.log('received ->')
            let payload = JSON.parse(data);
            console.log(payload.type);
            console.log(payload.data);

            this.variables = payload.data;
        });
    },
}
</script>

<style>

</style>
