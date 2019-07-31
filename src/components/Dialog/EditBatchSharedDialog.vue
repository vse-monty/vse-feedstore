<template>
	<q-card class="bg-primary text-grey-4">
		<q-form
			@submit="onSubmit"
			@reset="onReset"
			no-error-focus
			class="q-gutter-sm"
			ref="EditBatchSharedForm">

			<q-card-section class="q-gutter-xs">

				<!-- Art and Order Dates -->
				<div class="row">
					<div class="col q-pr-xs">
						<vse-date
							v-model="the_shared.orderDate"
							:date.sync="the_shared.orderDate"
							label="order date" />
					</div>
					
					<div class="col q-pl-auto">
						<vse-date
							v-model="the_shared.artDate"
							:date.sync="the_shared.artDate"
							label="art date"
							disable/>
					</div>
				</div>

				<!-- Customer -->
				<q-input
					v-model="the_shared.customer"
					filled
					dense
					dark
					clearable
					label="customer"
					standout="bg-secondary text-white"
					input-class="text-grey-4"
					hide-bottom-space
					lazy-rules
					:rules="[ val => !!val ]"/>

				<!-- Sign Type Dropdown -->
				<vse-select
					:value.sync="the_shared.type"
					label="sign type"
					:options="signOptions"
					:rules="[ val => !!val ]"/>

				<!-- Art File Filepicker-->
				<vse-file-picker 
					v-model="the_shared.file_art"
					:file.sync="the_shared.file_art"
					:load="true"
					:varsArr.sync="v_"
					:rules="[ val => !!val ]"
					label="art file"
					@fill="$emit('update:variables', $event)"/>

				<div class="q-gutter-xs">
					<!-- IS THIS SIGN SINGLE FACED OR DOUBLE-->
					<q-btn-toggle
						v-model="the_shared.double_face"
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
						v-model="the_shared.same_face"
						v-if="the_shared.double_face"
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
					v-if="!the_shared.same_face"
					v-model="the_shared.file_art_back"
					:file.sync="the_shared.file_art_back"
					:load="true"
					:varsArr.sync="variables_back"
					:rules="[ val => !!val ]"
					label="art file (back)"
					@fill="$emit('update:variables_back', $event)" />

				<!-- Proof File Filepicker-->
				<vse-file-picker 
					v-model="the_shared.file_proof"
					:file.sync="the_shared.file_proof"
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
		<pre v-if="debugMenu">{{ the_shared }}</pre>
		<pre v-if="debugMenu">{{ totalVariables }}</pre>

		</q-form>
	</q-card>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';
import { constants } from 'fs';

export default {

	props: ['variables', 'variables_back'],

	data () {

		return {

			the_shared: {

				artist:       'DAVE',
				artDate:        null,
				orderDate:      null,
				customer:       null,
				type:           null,

				file_art:       null,
				file_art_back:  null,
				file_proof:     null,
				
				double_face:   false,
				same_face:      true,

				totalVariables:   [],
			},

			v_: [],
			vb_: [],

			debugMenu: false,

			signOptions : [ 'Available - Sold',
											'Construction',
											'Development',
											'Lot Signs',
											'Main ID',
											'Misc',
											'Model Exteriors',
											'Model Interiors', ],
		}
	},
	methods: {

		...mapActions('batches', ['updateBatch']),

		clearFields () {

			this.the_shared.customer = null;
			this.the_shared.type = null;
			this.the_shared.orderDate =  this.the_shared.artDate;

			this.the_shared.file_art = null;
			this.the_shared.file_art_back = null;
			this.the_shared.file_proof = null;

			this.the_shared.same_face = true;
			this.the_shared.double_face = false;
			this.the_shared.totalVariables = [];

			this.$emit('update:variables', []);
			this.$emit('update:variables_back', []);
			
			this.v_ = [];
			this.vb_ = [];
		},
		
		onSubmit () {

			this.$refs.EditBatchSharedForm.validate()
			.then(success => {
					if (success) {
						this.the_shared.totalVariables = this.totalVariables;
						this.updateBatch(this.the_shared);
						this.$emit('first');
						this.$emit('close');
					}})
		},

		onReset () {

			this.clearFields();
		},		 
	},

	computed: {

			...mapGetters('batches', ['batch_shared']),

			totalVariables: function () {

				let arr = this.$_.unionWith(this.variables, this.variables_back, this.$_.isEqual);

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

			//this needs to work right...
			//so i can try to use same modal for editing
			if(this.batch_shared.customer){
				Object.assign(this.the_shared, this.batch_shared);
			}
			this.v_ = this.variables;
			this.vb_ = this.variables_back;
	},

	watch: {

		variables: function () {

			this.v_ = this.variables;
		},

		variables_back: function () {

			this.vb_ = this.variables_back;
		},
	}
}
</script>

<style lang="stylus" scoped>
.btn-toggle
		border 1px solid #5b6670
</style>