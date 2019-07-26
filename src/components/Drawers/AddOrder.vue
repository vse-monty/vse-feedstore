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
			lazy-rules
			:rules="[ val => !!val && val.length == 6 ]"
			/>
		
		<!-- Customer -->
		<q-input
			v-model="orderToReturn.customer"
			filled
			dense
			dark
			clearable
			label="customer"
			standout="bg-secondary text-white"
			input-class="text-grey-4"
			hide-bottom-space
			lazy-rules
			:rules="[ val => !!val ]"
			/>

		<!-- Subdivision -->
		<q-input
			v-model="orderToReturn.subdivision"
			label="subdivision"
			filled
			dense
			dark
			clearable
			standout="bg-secondary text-white"
			input-class="text-grey-4"
			hide-bottom-space
			lazy-rules
			:rules="[ val => !!val ]"
			/>

		<!-- Address Line 1 -->
		<q-input
			v-model="addressLine1"
			label="address line 1"
			filled
			dense
			dark
			clearable
			standout="bg-secondary text-white"
			input-class="text-grey-4"
			hide-bottom-space
			/>
		
		<!-- Address Line 2 -->
		<q-input
			v-model="addressLine2"
			label="address line 2"
			filled
			dense
			dark
			clearable
			standout="bg-secondary text-white"
			input-class="text-grey-4"
			hide-bottom-space
			/>

		<!-- Quantity Input -->
		<q-input
			v-model="orderToReturn.quantity"
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

		<!-- Art File Filepicker-->
		<vse-file-picker 
			v-model="orderToReturn.file_art"
			:file.sync="orderToReturn.file_art"
			:load="true"
			:varsArr.sync="variables"
			:rules="[ val => !!val ]"
			label="art file"
			@fill="variables = $event" />
		
		<div class="q-gutter-xs">
			<!-- IS THIS SIGN SINGLE FACED OR DOUBLE-->
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
				v-model="orderToReturn.variablesArr[key].value"
				:id="key"
				:varType="tv.type"
				:varValue.sync="orderToReturn.variablesArr[key].value"
				:varsArr.sync="orderToReturn.variablesArr"
				:label="orderToReturn.variablesArr[key].name"
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

		<!-- shows the 'orderToReturn' Object at the bottom of the form-->
		<pre v-if="debugMenu">{{ orderToReturn }}</pre>
		<!-- <pre>{{ totalVariables }}</pre> -->
			
	</q-form>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';
import { constants } from 'fs';

export default {
    data () {
        return {

            orderToReturn: {
                artist:      'DAVE',
                address:       '',
                artDate:       null,
                customer:      null,
                file_art:      null,
                file_art_back: null,
                file_proof:    null,
                orderDate:     null,
                orderNumber:   null,
                quantity:      null,
                subdivision:   null,
                type:          null,
                double_face:   false,
                same_face:     true,
                variablesArr:  [],
            },
            
            variables: [],
            back_variables: [],

            addressLine1: '',
            addressLine2: '',

            debugMenu: false,

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
            this.orderToReturn.address = '';
            this.orderToReturn.customer = null;
            this.orderToReturn.subdivision = null;
            this.orderToReturn.type = null;
            this.orderToReturn.quantity = null;
            this.orderToReturn.orderDate =  this.orderToReturn.artDate;
            this.orderToReturn.file_art = null;
            this.orderToReturn.file_art_back = null;
            this.orderToReturn.file_proof = null;
            this.orderToReturn.same_face = true;
            this.orderToReturn.double_face = false;
            this.orderToReturn.variablesArr = [];
            this.variables = [];
            this.back_variables = [];
            this.addressLine1 = '';
            this.addressLine2 = '';
        },
       
        onSubmit () {

            this.$refs.addForm.validate()
            .then(success => {
                if (success) {
                    this.orderToReturn.address = this.totalAddress;
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
        
        addOption (obj) {
            switch(obj.type){
                case 'customer':
                    this.addBuilder(obj.value);
                    break;
                default:
                    return;
            }
        },
       
    },

    computed: {
        ...mapGetters('builders', ['builders']),
       
       totalVariables: function () {
           let arr = this.$_.unionWith(this.variables, this.back_variables, this.$_.isEqual);
           this.orderToReturn.variablesArr = [];

           for(var i = 0; i < arr.length; i++){
              this.orderToReturn.variablesArr.push({name: arr[i].name, value: ""});
          }

          return arr;
        },

        totalAddress: function () {
            let addy = this.addressLine1 + '\r' + this.addressLine2;
            this.orderToReturn.address = (' ' + addy).slice(1);
            return addy;
        }
    },
    
    components: {
        'vse-select' : require('components/Form/VSESelect.vue').default,
        'vse-date' : require('components/Form/VSEDate.vue').default,
        'vse-file-picker' : require('components/Form/VSEFilePicker.vue').default,
        'vse-variable-input' : require('components/Form/VSEVariableInput.vue').default,
    },

    mounted () {
        // this.$refs.addForm.onReset();
    },
}
</script>

<style lang="stylus" scoped>
.btn-toggle
    border 1px solid #5b6670
</style>