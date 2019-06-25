<template>
    <!-- ** THIS IS FOR GETTING FILES FROM SYSTEM **-->
    <q-input
        :value="file"
        :label="label"
        :rules="rules"
        filled
        dense
        dark
        standout="bg-secondary text-white"
        input-class="text-grey-4"
        hide-bottom-space
        @input="$emit('update:value', $event)">

        <template v-slot:append>
            <q-btn
                v-if="file !== '' || file !== null"
                round
                dense
                flat
                icon="cancel"
                @click.stop="$emit('input', '')" />
            <q-btn
                round
                dense
                flat
                icon="add"
                @click.stop="getFile" />
        </template>
    </q-input>    
</template>

<script>
import { QInput } from "quasar";

export default {
    props: ['file', 'label', 'rules'],
    components: {
        QInput
    },
    methods: {

        getFile () {
            let options = {
                title: 'select art file',
                buttonLabel: 'use',
                filters: [
                    {
                        name: 'Illustrator Files',
                        extensions: [ 'ai', 'png', 'pdf' ],
                    },
                ],
                properties: [ 'openFile' ],
            }

            let fileString = this.$q.electron.remote.dialog.showOpenDialog(null, options);

            if(fileString){
                //console.log(fileString);
               this.$emit('input', fileString[0]);
            }
        },
    }
}
</script>

<style>

</style>
