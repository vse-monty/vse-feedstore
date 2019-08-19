<template>
	<q-card class="bg-primary text-grey-4">

		<q-form
			@submit="onSubmit"
			@reset="onReset"
			no-error-focus
			class="q-gutter-sm"
			ref="AddMultiPage">

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
		<!-- <pre v-if="debugMenu">{{ the_order }}</pre> -->

		</q-form>
	</q-card>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';

export default {

	data () {
		return {

			debugMenu: false,
			hasVars:   false,
		}
	},
	methods: {

		...mapActions('batches', ['addOrder']),

		clearFields () {
		},
		
		onSubmit () {

		},

		onReset () {
			this.clearFields();
		},
	},

	computed: {

		...mapGetters('batches', ['batch_shared']),
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