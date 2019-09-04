<template>
	<q-card class="bg-primary text-grey-4">

		<q-form
			@submit="onSubmit"
			@reset="onReset"
			no-error-focus
			ref="AddMultiPage">

			<q-card-section class="q-gutter-xs">

				<!-- Art and Order Dates -->
				<div class="row">
					<div class="col q-pr-xs">
						<vse-date
							v-model="the_order.order_date"
							:date.sync="the_order.order_date"
							label="order date" />
					</div>
					
					<div class="col q-pl-auto">
						<vse-date
							v-model="the_order.art_date"
							:date.sync="the_order.art_date"
							label="art date"
							disable/>
					</div>
				</div>

				<!-- Order Number -->
				<q-input
					v-model="the_order.order_number"
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
	props: ['order', 'isDupe'],

	data () {
		return {

			debugMenu: false,

			the_order: {

				subdivision: null,
				customer:    null,
				order_number: null,
				art_date:     null,
				order_date:   null,
				
				pages:     [null],
			},

		}
	},
	methods: {

		...mapActions('mp_orders', ['AddOrder']),

		clearFields () {

			this.the_order.subdivision = null;
			this.the_order.customer = null;
			this.the_order.order_number = null;
			this.the_order.order_date =  this.the_order.art_date;
			this.the_order.numPages = 1;
			this.the_order.pages = [null];
		},
		
		onSubmit () {

			console.log(this.$refs);
			this.$refs.AddMultiPage.validate(true)
				.then(success => {
						if (success) {
								this.AddOrder(this.the_order);
								this.$emit('close');
						}});
		},

		onReset () {
			this.clearFields();
		},

		AddPage () {

			this.the_order.pages.push(null);
		},

		ClearPages () {

			this.the_order.pages = [null];
		},

		FillPage (data, key) {

				this.the_order.pages[key] = this.$_.cloneDeep(data);
		},

		DeleteLastPage () {

			//confirm here, then...

			this.the_order.pages.pop();
		},

		DuplicateLastPage () {

			let idx = this.numPages - 1;
			this.the_order.pages.push(this.$_.cloneDeep(this.the_order.pages[idx]));
		},
	},

	computed: {

		...mapGetters('mp_orders', ['mp_order']),
		
		totalPages: function () {

		},

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

	beforeMount () {

		if(this.order){
			
			this.the_order = this.$_.cloneDeep(this.order);
			
			this.the_order.order_number = null;
		}
	},
}
</script>

<style lang="stylus" scoped>
.btn-toggle
		border 1px solid #5b6670
</style>