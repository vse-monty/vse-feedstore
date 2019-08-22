<template>
	<q-card class="bg-primary text-grey-4">

		<q-form
			@submit="onSubmit"
			@reset="onReset"
			no-error-focus
			ref="EditMultiPage">

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
					disable
					clearable
					label="order number"
					standout="bg-secondary text-white"
					input-class="text-grey-4"
					hide-bottom-space
					lazy-rules
					:rules="[ val => !!val && val.length == 6 ]"/>

				<!-- Customer -->
				<q-input
					v-model="the_order.customer"
					label="customer"
					filled
					dense
					dark
					clearable
					standout="bg-secondary text-white"
					input-class="text-grey-4"
					hide-bottom-space
					lazy-rules
					:rules="[ val => !!val ]"/>

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

				<q-list
					padding
					dark >
					<vse-page 
						v-for="(page, key) in the_order.pages"
						:key="key"
						:id="key"
						:order="page"
						@fill="FillPage($event, key)"/>
				</q-list>
			</q-card-section>

			<q-card-actions align="center">
				<q-btn
					label="add"
					outline
					dense
					color="grey-4"
					@click="AddPage"/>

				<q-btn
					label="duplicate last"
					outline
					dense
					color="grey-4"
					@click="DuplicateLastPage"/>

				<q-btn
					label="remove last"
					outline
					dense
					color="grey-4"
					@click="DeleteLastPage"/>

				<q-btn
					label="clear"
					outline
					dense
					color="grey-4"
					@click="ClearPages"/>
			</q-card-actions>

			<q-card-actions align="around" class="q-py-lg">
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

export default {

	props: ['editPackage'],

	data () {
		return {

			debugMenu: true,

			the_order: {

				subdivision: null,
				customer:    null,
				orderNumber: null,
				artDate:     null,
				orderDate:   null,
				
				pages:     [null],
			},

		}
	},

	methods: {

		...mapActions('mp_orders', ['UpdateOrder']),
		
		onSubmit () {

			this.$refs.EditMultiPage.validate(true)
				.then(success => {
						if (success) {
								this.UpdateOrder({id: this.the_order.orderNumber, updates: this.the_order});
								this.$emit('close');
						}});
		},

		onReset () {

			this.the_order.subdivision = null;
			this.the_order.customer = null;
			this.the_order.orderDate =  this.the_order.artDate;
			this.the_order.pages = [null];
		},

		AddPage () {

			this.the_order.pages.push(null);
		},

		ClearPages () {

			this.the_order.pages = [null];
		},

		FillPage (data, key) {

			console.log('fill page method');
			this.the_order.pages[key] = Object.assign({}, data);
		},

		DeleteLastPage () {

			//confirm here, then...

			this.the_order.pages.pop();
		},

		DuplicateLastPage () {

			let idx = this.numPages - 1;
			this.the_order.pages.push(Object.assign({}, this.the_order.pages[idx]));
		},
	},

	computed: {

		...mapGetters('mp_orders', ['mp_order']),

		numPages: function () {
			
			return this.the_order.pages.length;
		}
	},
	
	components: {
			'vse-page' : require('components/Form/VSEPageForm.vue').default,
			'vse-select' : require('components/Form/VSESelect.vue').default,
			'vse-date' : require('components/Form/VSEDate.vue').default,
			'vse-file-picker' : require('components/Form/VSEFilePicker.vue').default,
			'vse-variable-input' : require('components/Form/VSEVariableInput.vue').default,
	},

	beforeMount () { //must be before to get in before 'pages' are loaded

		Object.assign(this.the_order, this.editPackage.order);
		
		this.the_order.pages = [];
		let arr = [...this.editPackage.order.pages];
		this.the_order.pages = arr;
	},
}
</script>

<style lang="stylus" scoped>
.btn-toggle
		border 1px solid #5b6670
</style>