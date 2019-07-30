<template>
	<div class="q-pa-md">
		<q-card
			v-if="batchToReturn.customer"
			class="bg-grey-9 text-grey-4"
			dark
			flat>

			<q-card-section>
				<div class="text-h5">{{batchToReturn.customer}} - {{batchToReturn.type}}</div>
			</q-card-section>
		</q-card>

		<q-separator spaced/>
		
		<div class="row">
			<div class="col-1 q-pr-xs">	
				<q-btn
					icon="clear"
					color="secondary"
					@click="data = []"/>
			</div>

			<div class="col-1 q-pr-xs">	
				<q-btn 
					icon="edit"
					color="secondary"
					@click="showBatchForm=true"/>
			</div>

			<div class="col-1 q-pr-xs">	
				<q-btn 
					icon="add"
					color="secondary"
					@click="showTableForm=true"/>
			</div>

			<q-space />

			<q-btn 
				icon="send"
				color="secondary"/>
		</div>
	
		<!-- FORM FOR OVERALL ORDERS (CUST NAME, FILES, ETC...) -->
		<div class="q-pa-md q-gutter-sm">
			<q-dialog
				v-model="showBatchForm"
				dark
				class="bg-primary"
				ref="batchDialog">
				<batch-form
					:batchToEdit="batchToReturn"
					@fill="setBatch($event)"
					@close="showBatchForm = false"/>
			</q-dialog>
		</div>
		
		<!-- FORM FOR INDIVIDUAL ORDERS (ORDER NUMBER, SUBDIVISION, VARS...) -->
		<div class="q-pa-md q-gutter-sm">
			<q-dialog
				v-model="showTableForm"
				dark
				class="bg-primary"
				ref="batchTableDialog">
				<table-form
					:varsArr="batchToReturn.variablesArr"
					@fill="addToTable($event)"
					@close="showTableForm = false"/>
			</q-dialog>
		</div>

		<!-- shows the 'batchToReturn' Object at the bottom of the form-->
		<!-- <pre v-if="showDebug">{{ batchToReturn }}</pre> -->
		<!-- <pre v-if="showDebug">{{ data }}</pre> -->

	</div>
</template>


<script>
export default {
	data () {
		return {

			showDebug: true,
			showBatchForm: true,
			showTableForm: false,

			 batchToReturn: {

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
		}
	},
	
	methods: {},

	components: {
			'batch-form' : require('components/Dialog/BatchForm.vue').default,
			'table-form' : require('components/Dialog/AddToTable.vue').default,
		},
	
	computed: {	},

	watch: {},

	mounted () {},
}
</script>

<style>

</style>