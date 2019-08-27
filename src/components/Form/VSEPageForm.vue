<template>
<div>
  <q-separator/>
  <q-expansion-item
    icon="description"
    class="bg-secondary"
    group="the-pages"
    ref="PageForm"
    dense-toggle
    switch-toggle-side
    default-opened
    dense
    :label="ThePageNumber"
		@hide="onSubmit">

	<q-card class="bg-grey-9 text-grey-4">
		<q-form
			@submit="onSubmit"
			@reset="onReset"
			no-error-focus
			class="q-gutter-sm"
			ref="EditPageForm">

			<q-card-section class="q-gutter-xs">

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

				<!-- Art File Filepicker-->
				<vse-file-picker 
					v-model="the_order.file_art"
					:file.sync="the_order.file_art"
					:load="true"
					:varsArr.sync="variables"
					:rules="[ val => !!val ]"
					:defaultPath="settings.working ? settings.working : null"
					label="art file"
					@fill="variables = $event" />

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

				<!-- Art File Filepicker-->
				<vse-file-picker 
					v-if="!the_order.same_face"
					v-model="the_order.file_art_back"
					:file.sync="the_order.file_art_back"
					:load="true"
					:varsArr.sync="back_variables"
					:rules="[ val => !!val ]"
					:defaultPath="settings.working ? settings.working : 'C:\\'"
					label="art file (back)"
					@fill="back_variables = $event" />

				<!-- THIS IS WHERE WE WILL POPULATE THE INPUTS FOR VARIABLES -->
				<q-list
					v-if="TotalVariables.length !== 0">
					<vse-variable-input
						v-for="(tv, key) in TotalVariables"
						:key="key"
						v-model="the_order.variablesArr[key].value"
						:varType="tv.type"
						:varValue.sync="the_order.variablesArr[key].value"
						:label="the_order.variablesArr[key].name"
						:rules="[ val => !!val ]"
						class="q-pt-xs"/>
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
					:defaultPath="settings.templates ? settings.templates : null"
					label="proof file" />

			</q-card-section>	

			<q-card-actions align="around" class="q-pb-md">
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
		<pre v-if="debugMenu">{{ TotalVariables }}</pre>

		</q-form>
	</q-card>

  </q-expansion-item>
</div>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';

export default {
  props: ['order', 'id'],

  data () {
    return {

      the_order: {

        file_art:      null,
        file_art_back: null,
        file_proof:    null,
          
        address:       '',
        quantity:      null,
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

			onSubmit () {

				this.$refs.EditPageForm.validate(true) //true represents a 'should-focus' flag
				.then(success => {
					if (success) {
						this.the_order.address = this.TotalAddress;
						this.the_order.totalVariables = this.TotalVariables;
						let pkg = Object.assign({}, this.the_order);
						this.$emit('fill', pkg);
						this.$refs.PageForm.hide();
					} else {
						this.$refs.PageForm.show();
					}
				})
			},

			onReset () {

				this.the_order.address = '';
				this.the_order.type = null;
				this.the_order.quantity = null;
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
		},

		computed: {

			...mapGetters('settings', ['settings']),
			 
			 TotalVariables: function () {

					 let arr = this.$_.unionWith(this.variables, this.back_variables, this.$_.isEqual);
					 this.the_order.variablesArr = [];

					 for(var i = 0; i < arr.length; i++){
							this.the_order.variablesArr.push({name: arr[i].name, value: ""});
					}

					return arr;
				},

				TotalAddress: function () {

						let addy = this.addressLine1 + '\r' + this.addressLine2;
						this.the_order.address = (' ' + addy).slice(1);
						return addy;
        },
        
        ThePageNumber: function () {

          return `page ${this.id + 1}`
        }
		},
		
		components: {

				'vse-select' : require('components/Form/VSESelect.vue').default,
				'vse-date' : require('components/Form/VSEDate.vue').default,
				'vse-file-picker' : require('components/Form/VSEFilePicker.vue').default,
				'vse-variable-input' : require('components/Form/VSEVariableInput.vue').default,
		},

		mounted () {

      if(this.order){ //if this is null or empty, then it's not an edit

				//copy info in to form
				this.the_order = this.$_.cloneDeep(this.order);
				
				//let's see if this does what we need it to...
				this.variables = this.the_order.variablesArr;

				//split address back into multi-line
				this.addressLine1 = this.addressLine2 = "";

				let addy = this.the_order.address.split(/\r\n|\r|\n/);
				this.addressLine1 = addy[0];
				this.addressLine2 = addy[1];

				//this.$refs.PageForm.hide();
			} else {
				this.onReset();
			}
		},
}
</script>

<style lang="stylus" scoped>
.btn-toggle
		border 1px solid #5b6670
</style>