<template>
	<div class="q-pa-md">
		<q-card
			v-if="batchToReturn.customer"
			class="bg-grey-9 text-grey-4"
			dark
			flat>

			<q-card-section>
				<div class="text-h6">{{batchToReturn.customer}} - {{batchToReturn.type}}</div>
			</q-card-section>
		</q-card>
		
		<q-table
			title="Batch Orders"
			row-key="id"
			:data="data"
			:columns="columns"
			:filter="filter"
			:pagination.sync="pagination"
			dark
			class="bg-secondary"
		>
			<template v-slot:top-right>
				<div class="row">
					<div class="col">
					<q-input dark dense debounce="300" color="primary" v-model="filter">
						<template v-slot:append>
							<q-icon name="search" />
						</template>
					</q-input>
					</div>
				</div>
			</template>

		</q-table>
		
		<q-separator spaced/>
		
		<div class="row">
			<div class="col-1 q-pr-xs">	
				<q-btn
					icon="clear"
					color="secondary"/>
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
	
		<div class="q-pa-md q-gutter-sm">
			<q-dialog
				v-model="showBatchForm"
				dark
				class="bg-primary"
				ref="batchDialog">
				<batch-form 
					@fill="Object.assign(batchToReturn, $event)"
					@close="showBatchForm = false"/>
			</q-dialog>
		</div>
		
		<div class="q-pa-md q-gutter-sm">
			<q-dialog
				v-model="showTableForm"
				dark
				class="bg-primary"
				ref="batchTableDialog">
				<table-form 
					@fill="data.push($event)"
					@close="showTableForm = false"/>
			</q-dialog>
		</div>

		<!-- shows the 'orderToReturn' Object at the bottom of the form-->
		<pre v-if="showDebug">{{ batchToReturn }}</pre>
		<!-- <pre>{{ totalVariables }}</pre> -->
	</div>
</template>


<script>
export default {
	data () {
		return {

			showDebug: true,
			showBatchForm: true,
			showTableForm: false,
			filter: '',

			pagination: {
				sortBy: 'name',
				descending: false,
				page: 1,
				rowsPerPage: 0, //infinite
			},

			columns: [
				{
					name: 'orderNumber',
					required: true,
					label: 'Order Number #',
					align: 'left',
					field: row => row.orderNumber,
					format: val => `# ${val}`,
					sortable: true
				},
				{ name: 'subdivision', align: 'center', label: 'Subdivision', field: 'subdivision', sortable: true },
				{ name: 'quantity', label: 'Quantity', field: 'quantity', sortable: true },
				{ name: 'address', label: 'Address', field: 'address', sortable: false },
			],

			data: [],
			
			blank_batch: {
				address:       '',
				subdivision:   null,
				variablesArr:  [],
				},

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
	methods: {
		// addRow () {
		//   setTimeout(() => {
		//     const
		//       index = Math.floor(Math.random() * (this.data.length + 1)),
		//       row = this.original
		//     if (this.data.length === 0) {
		//       this.rowCount = 0
		//     }
		//     row.id = ++this.rowCount
		//     const addRow = { ...row } // extend({}, row, { name: `${row.name} (${row.__count})` })
		//     this.data = [...this.data.slice(0, index), addRow, ...this.data.slice(index)]
		//   }, 0)
		// },
	},
	components: {
			'batch-form' : require('components/Dialog/BatchForm.vue').default,
			'table-form' : require('components/Dialog/AddToTable.vue').default,
		}
}
</script>

<style>

</style>