<template>
	<q-card class="bg-primary text-grey-4">
		<q-form
			@submit="onSubmit"
			@reset="onReset"
			no-error-focus
			class="q-gutter-sm"
			ref="addOrderForm"
			>
			<q-card-section class="q-gutter-xs">

				<!-- Art and Order Dates -->
				<div class="row">
					<div class="col q-pr-xs">
						<vse-date
							v-model="the_order.orderDate"
							:date.sync="the_order.orderDate"
							label="order date" />
					</div>
					
					<div class="col q-pl-auto">
						<vse-date
							v-model="the_order.artDate"
							:date.sync="the_order.artDate"
							label="art date"
							disable/>
					</div>
				</div>

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
					:rules="[ val => !!val && val.length == 6 ]"
					/>

				<!-- Customer -->
				<q-input
					v-model="the_order.customer"
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
					v-model="the_order.quantity"
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
					v-model="the_order.file_art"
					:file.sync="the_order.file_art"
					:load="true"
					:varsArr.sync="variables"
					:rules="[ val => !!val ]"
					label="art file"
					@fill="variables = $event" />

				<div class="q-gutter-xs">
					<!-- IS THIS SIGN SINGLE FACED OR DOUBLE-->
					<q-btn-toggle
						v-model="the_order.double_face"
						spread
						dense
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
						v-model="the_order.same_face"
						v-if="the_order.double_face"
						spread
						dense
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
					v-if="!the_order.same_face"
					v-model="the_order.file_art_back"
					:file.sync="the_order.file_art_back"
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
						v-model="the_order.variablesArr[key].value"
						:varType="tv.type"
						:varValue.sync="the_order.variablesArr[key].value"
						:label="the_order.variablesArr[key].name"
						:rules="[ val => !!val ]"
						/>

				</q-list>

				<!-- Sign Type Dropdown -->
				<vse-select
					:value.sync="the_order.type"
					label="sign type"
					:options="signOptions"
					:rules="[ val => !!val ]"/>

				<!-- Proof File Filepicker-->
				<vse-file-picker 
					v-model="the_order.file_proof"
					:file.sync="the_order.file_proof"
					:load="false"
					:rules="[ val => !!val ]"
					label="proof file" />

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
		<pre>{{ totalVariables }}</pre>

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

						this.the_order.orderNumber = null;
						this.the_order.address = '';
						this.the_order.customer = null;
						this.the_order.subdivision = null;
						this.the_order.type = null;
						this.the_order.quantity = null;
						this.the_order.orderDate =  this.the_order.artDate;
						this.the_order.file_art = null;
						this.the_order.file_art_back = null;
						this.the_order.file_proof = null;
						this.the_order.same_face = true;
						this.the_order.double_face = false;
						this.the_order.variablesArr = [];
						this.variables = [];
						this.back_variables = [];
						this.addressLine1 = '';
						this.addressLine2 = '';
				},
			 
				onSubmit () {

						this.$refs.addOrderForm.validate()
						.then(success => {
								if (success) {
										this.the_order.address = this.totalAddress;
										this.addOrder(this.the_order);
										this.$emit('close');
								}})
				},

				onReset () {
						this.clearFields();
				},

				getSubOptions () {
						return Object.keys(this.locations(this.the_order));
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
			 
			 totalVariables: function () {
					 let arr = this.$_.unionWith(this.variables, this.back_variables, this.$_.isEqual);
					 this.the_order.variablesArr = [];

					 for(var i = 0; i < arr.length; i++){
							this.the_order.variablesArr.push({name: arr[i].name, value: ""});
					}

					return arr;
				},

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
				
		},
}
</script>

<style lang="stylus" scoped>
.btn-toggle
		border 1px solid #5b6670
</style>