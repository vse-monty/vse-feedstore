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
            :varsArr.sync="variables"
            :rules="[ val => !!val ]"
            label="art file"
            @fill="variables = $event" />
        
        <!-- IS THIS SIGN SINGLE FACED OR DOUBLE-->
        <div class="q-gutter-xs">
            <q-btn-toggle
                v-model="orderToReturn.double_face"
                spread
                dense
                rounded
                no-caps
                class="btn-toggle"
                toggle-color="secondary"
                color="primary"
                text-color="grey-4"
                :options="[
                    {label: 'single face', value: false},
                    {label: 'double face', value: true}]" />
        
         <!-- IF DOUBLE, IS IT SAME FACE ON BOTH SIDES-->
            <q-btn-toggle
                v-model="orderToReturn.same_face"
                v-if="orderToReturn.double_face"
                spread
                dense
                rounded
                no-caps
                class="btn-toggle"
                toggle-color="secondary"
                color="primary"
                text-color="grey-4"
                :options="[
                    {label: 'same face', value: true},
                    {label: 'different face', value: false}]" />
        </div>

        <!-- Art File Filepicker-->
        <vse-file-picker 
            v-if="!orderToReturn.same_face"
            v-model="orderToReturn.file_art_back"
            :file.sync="orderToReturn.file_art_back"
            :load="true"
            :varsArr.sync="back_variables"
            :rules="[ val => !!val ]"
            label="art file (back)"
            @fill="back_variables = $event" />



        <!-- THIS IS WHERE WE WILL POPULATE THE INPUTS FOR VARIABLES -->
        <q-list
            v-if="totalVariables.length !== 0"
            class="q-gutter-xs" >

            <vse-variable-input
                v-for="(tv, key) in totalVariables"
                :key="key"
                v-model="orderToReturn.variables[key].value"
                :id="key"
                :varType="tv.type"
                :varValue.sync="orderToReturn.variables[key].value"
                :varsArr.sync="orderToReturn.variables"
                :label="orderToReturn.variables[key].name"
                :rules="[ val => !!val ]"
                />

        </q-list>
        <!-- END VARIABLE POPULATION -->


        <!-- Sign Type Dropdown -->
        <vse-select
            :value.sync="orderToReturn.type"
            label="sign type"
            :options="signOptions"
            :rules="[ val => !!val ]"
            @add-option="addOption"/>

        <!-- Quantity Input -->
        <q-input
            v-model="orderToReturn.qty"
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

        <!-- Proof File Filepicker-->
        <vse-file-picker 
            v-model="orderToReturn.file_proof"
            :file.sync="orderToReturn.file_proof"
            :load="false"
            :rules="[ val => !!val ]"
            label="proof file" />

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
        <!-- <pre>{{ totalVariables }}</pre> -->
        
    </q-form>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';

export default {
    data () {
        return {

            orderToReturn: {
                artDate:       null,
                customer:      null,
                file_art:      null,
                file_art_back: null,
                file_proof:    null,
                orderDate:     null,
                orderNumber:   null,
                qty:           null,
                subdivision:   null,
                type:          null,
                double_face:   false,
                same_face:     true,
                variables: [],
            },
            
            variables: [],
            back_variables: [],
            shouldUpdateVariables: false,
            showVariablesInputs: false,

            debugMenu: true,

            signOptions : [ 'Available - Sold',
                            'Construction',
                            'Development',
                            'Lot Signs',
                            'Main ID',
                            'Misc',
                            'Model Exteriors',
                            'Model Interiors',
                            ],

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
            this.orderToReturn.file_art_back = null;
            this.orderToReturn.file_proof = null;
            this.orderToReturn.same_face = true;
            this.orderToReturn.double_face = false;
            this.orderToReturn.variables = [];
            this.orderToReturn.back_variables = [];
            this.variables = [];
            this.back_variables = [];
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
       
       totalVariables: function () {
          let arr = this.$_.unionWith(this.variables, this.back_variables, this.$_.isEqual);
          this.orderToReturn.variables = [];
          for(var i = 0; i < arr.length; i++){
              this.orderToReturn.variables.push({name: arr[i].name, value: ""});
          }
          return arr;
        },
    },
    
    components: {
        'vse-select' : require('components/Form/VSESelect.vue').default,
        'vse-date' : require('components/Form/VSEDate.vue').default,
        'vse-file-picker' : require('components/Form/VSEFilePicker.vue').default,
        'vse-variable-input' : require('components/Form/VSEVariableInput.vue').default,
    },

    mounted () {
    },
}
</script>

<style lang="stylus" scoped>
.btn-toggle
    border 1px solid #5b6670
</style>