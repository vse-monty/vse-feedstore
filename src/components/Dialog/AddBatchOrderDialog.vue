<template>
	<q-card class="bg-primary text-grey-4">
		<q-form
			@submit="onSubmit"
			@reset="onReset"
			no-error-focus
			class="q-gutter-sm"
			ref="AddBatchOrderForm">

			<q-card-section class="q-gutter-xs">

				<!-- Order Number -->
				<q-input
					v-model="the_order.orderNumber"
					:autofocus="true"
					filled
					dense
					dark
					clearable
					label="order number"
					standout="bg-secondary text-white"
					input-class="text-grey-4"
					hide-bottom-space
					lazy-rules
					:rules="[ val => !!val && val.length == 6 ]"/>

				<!-- Subdivision -->
				<q-input
					v-model="the_order.subdivision"
					label="subdivision"
					filled
					dense
					dark
					clearable
					standout="bg-secondary text-white"
					input-class="text-grey-4"
					hide-bottom-space
					lazy-rules
					:rules="[ val => !!val ]"/>

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
					hide-bottom-space/>
				
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
					hide-bottom-space/>

				<!-- Quantity Input -->
				<q-input
					v-model="the_order.quantity"
					label="quantity"
					filled
					dense
					dark
					clearable
					standout="bg-secondary text-white"
					input-class="text-grey-4"
					hide-bottom-space
					:rules="[ val => !!val ]"/>

				<!-- THIS IS WHERE WE WILL POPULATE THE INPUTS FOR VARIABLES -->
				<q-list
					v-if="hasVars">
					<vse-variable-input
						v-for="(tv, key) in batch_shared.totalVariables"
						:key="key"
						v-model="the_order.variablesArr[key].value"
						:varType="tv.type"
						:varValue.sync="the_order.variablesArr[key].value"
						:label="the_order.variablesArr[key].name"
						:rules="[ val => !!val ]"
						class="q-pb-xs"/>
				</q-list>

			</q-card-section>	

			<q-card-actions align="around" class="q-pb-lg">
				<q-btn
					dense
					style="width: 200px"
					label="reset"
					color="secondary"
					type="reset" />
				
				<q-btn
					dense
					style="width: 200px"
					label="submit"
					color="secondary"
					type="submit"/>

			</q-card-actions>

		<!-- shows the 'orderToReturn' Object at the bottom of the form-->
		<pre v-if="debugMenu">{{ the_order }}</pre>

		</q-form>
	</q-card>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';
import { constants } from 'fs';

export default {

	data () {
		return {

			the_order: {

				address:       '',
				orderNumber:   null,
				quantity:      null,
				subdivision:   null,

				variablesArr:  [],
			},

			addressLine1: '',
			addressLine2: '',

			debugMenu: false,
			hasVars:   false,
		}
	},
	methods: {

		...mapActions('batches', ['addOrder']),

		clearFields () {

			this.the_order.orderNumber = null;
			this.the_order.address = '';
			this.the_order.subdivision = null;
			this.the_order.quantity = null;

			this.clearVarArray();

			this.addressLine1 = '';
			this.addressLine2 = '';
		},
		
		onSubmit () {

			this.$refs.AddBatchOrderForm.validate()
			.then(success => {
				if (success) {
					this.the_order.address = this.totalAddress;
					this.the_order.totalVariables = this.batch_shared.totalVariables;
					this.addOrder(this.the_order);
					this.$emit('close');
				}})
		},

		onReset () {
			this.clearFields();
		},

		clearVarArray () {
			
			let arr = this.batch_shared.totalVariables;

			for(var i = 0; i < arr.length; i++){
				this.the_order.variablesArr.push({name: arr[i].name, value: ""});
			}
		}
	},

	computed: {

		...mapGetters('batches', ['batch_shared']),

		totalAddress: function () {
			
			let addy = this.addressLine1 + '\r' + this.addressLine2;
			this.the_order.address = (' ' + addy).slice(1);
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
		console.log(this.batch_shared);

		if(this.batch_shared.totalVariables.length !== 0){

			this.hasVars = true;

			let arr = this.batch_shared.totalVariables;

			for(let i = 0; i < arr.length; i++){
				this.the_order.variablesArr.push({name: arr[i].name, value: ""});
			}
		}
		console.log('mounted add-batch-order')
		console.log(this.the_order);
	},
}
</script>

<style lang="stylus" scoped>
.btn-toggle
		border 1px solid #5b6670
</style>