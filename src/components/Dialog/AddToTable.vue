<template>
	<q-card class="bg-primary text-grey-4">
		<q-card-section>
			<div class="text-h6">Add Order to Batch</div>
		</q-card-section>

		<q-separator />

		<q-form
			@submit="onSubmit"
			@reset="onReset"
			no-error-focus
			class="q-gutter-sm"
			ref="addToTableForm"
			>
			<q-card-section class="q-gutter-xs">

				<!-- Order Number -->
				<q-input
					v-model="batch.orderNumber"
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

				<!-- Subdivision -->
				<q-input
					v-model="batch.subdivision"
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
					v-model="batch.quantity"
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
					type="submit"/>

			</q-card-actions>
		</q-form>
	</q-card>
</template>

<script>
export default {
	data () {
		return {

			addressLine1: '',
			addressLine2: '',

			batch: {
				orderNumber: null,
				subdivision: null,
				quantity: null,
				address: null,
			},
		}
	},

	methods: {

		onSubmit() {

			this.$refs.addToTableForm.validate()
			.then(success => {
				if (success) {
					console.log('form submitted!')
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

			this.batch.orderNumber = null;
			this.batch.subdivision = null;
			this.batch.quantity = null;
			this.batch.address = null;
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
