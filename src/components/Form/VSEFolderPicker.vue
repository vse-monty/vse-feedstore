<template>
	<!-- ** THIS IS FOR GETTING FOLDER LOCATIONS FROM SYSTEM **-->
	<q-field
		:value="file"
		:label="label"
		filled
		dark
		standout="bg-secondary text-white"
		hide-bottom-space
		@input="$emit('update:file', $event)">

		<template v-slot:control>
			<div class="self-center text-right text-no-wrap">{{file}}</div>
		</template>

		<template v-slot:append>
			<q-btn
				round
				dense
				flat
				icon="add"
				@click="getFolder" />
		</template>
	</q-field>    
</template>

<script>
import { QField } from "quasar";

export default {

	props: ['file', 'label'],
	
	components: {
		QField
	},
		
	methods: {

		clear () {
				this.$emit('input', '')
		},

		getFolder () {
			
			let options = {
				title: 'select folder',
				buttonLabel: 'use',
				properties: [ 'openDirectory' ],
			}

			let fileString = this.$q.electron.remote.dialog.showOpenDialog(null, options);

			if(fileString){

				this.$emit('input', fileString[0]);
				return;
			}
		},
	}
}
</script>

<style>

</style>
