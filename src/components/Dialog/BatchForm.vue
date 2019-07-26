<template>
	<q-card class="bg-primary text-grey-4">
		<q-card-section>
			<div class="text-h6">Batch Shared Details</div>
		</q-card-section>

		<q-separator />

		<q-form
			@submit="onSubmit"
			@reset="onReset"
			no-error-focus
			class="q-gutter-sm"
			ref="batchForm"
			>
		<q-card-section class="q-gutter-xs">

				<!-- Art and Order Dates -->
				<div class="row q-pt-sm">
					<div class="col q-pr-xs">
						<vse-date
							v-model="batch.orderDate"
							:date.sync="batch.orderDate"
							label="order date" />
					</div>
					
					<div class="col q-pl-auto">
						<vse-date
							v-model="batch.artDate"
							:date.sync="batch.artDate"
							label="art date"
							disable/>
					</div>
				</div>

				<!-- Customer -->
				<q-input
					v-model="batch.customer"
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

				<!-- Art File Filepicker-->
				<vse-file-picker 
					v-model="batch.file_art"
					:file.sync="batch.file_art"
					:load="true"
					:varsArr.sync="variables"
					:rules="[ val => !!val ]"
					label="art file"
					@fill="variables = $event" />

				<div class="q-gutter-xs">
					<!-- IS THIS SIGN SINGLE FACED OR DOUBLE-->
					<q-btn-toggle
						v-model="batch.double_face"
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
						v-model="batch.same_face"
						v-if="batch.double_face"
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
					v-if="!batch.same_face"
					v-model="batch.file_art_back"
					:file.sync="batch.file_art_back"
					:load="true"
					:varsArr.sync="back_variables"
					:rules="[ val => !!val ]"
					label="art file (back)"
					@fill="back_variables = $event" />

				<!-- Sign Type Dropdown -->
				<vse-select
					:value.sync="batch.type"
					label="sign type"
					:options="signOptions"
					:rules="[ val => !!val ]"/>

				<!-- Proof File Filepicker-->
				<vse-file-picker 
					v-model="batch.file_proof"
					:file.sync="batch.file_proof"
					:load="false"
					:rules="[ val => !!val ]"
					label="proof file" />

			</q-card-section>	

			<q-card-actions align="around">
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
					type="submit" />
			</q-card-actions>

		</q-form>

	</q-card>
</template>

<script>
export default {
	data () {
		return {

			batch: {

				artist: 'DAVE',

				artDate: null,
				orderDate: null,
				
				customer: null,
				type:     null,
				double_face: false,
				same_face: true,
				
				file_art: null,
				file_art_back: null,
				file_proof: null,

				variablesArr: [],
				batchArr: [],
			},

			variables: [],
			back_variables: [],

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

		onSubmit() {

			this.$refs.batchForm.validate()
			.then(success => {
				if (success) {
					this.$emit('fill', this.batch);
					this.$emit('close');
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

		onReset() {
			this.batch.orderDate =  this.batch.artDate;
			this.batch.customer = null;
			this.batch.type = null;
			
			this.batch.double_face = false;
			this.batch.same_face = true;
			
			this.batch.file_art = null;
			this.batch.file_art_back = null;
			this.batch.file_proof = null;

			this.variablesArr = [];
			this.batchArr = [];
		},
	},
			
	components: {
		'vse-select' : require('components/Form/VSESelect.vue').default,
		'vse-date' : require('components/Form/VSEDate.vue').default,
		'vse-file-picker' : require('components/Form/VSEFilePicker.vue').default,
		'vse-variable-input' : require('components/Form/VSEVariableInput.vue').default,
	},
}
</script>

<style lang="stylus" scoped>
.btn-toggle
    border 1px solid #5b6670
</style>
