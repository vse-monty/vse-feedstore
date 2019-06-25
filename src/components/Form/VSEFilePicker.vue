<template>
    <!-- ** THIS IS FOR GETTING FILES FROM SYSTEM **-->
    <q-input
        :value="file"
        :label="label"
        :rules="rules"
        :load="load"
        filled
        dense
        dark
        standout="bg-secondary text-white"
        input-class="text-grey-4"
        hide-bottom-space
        @input="$emit('update', $event)">

        <template v-slot:append>
            <q-btn
                v-if="file !== null"
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
    props: ['file', 'label', 'rules', 'load'],
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
                if(!this.load){
                    console.log('just want a file name, not the variables');
                    this.$emit('input', fileString[0]);
                    return;
                }
                console.log('sending file name to server')
                console.log(fileString[0])
               this.$socket.emit('get.variables', fileString[0])
               this.$emit('input', fileString[0]);
            }
        },
    }
}
</script>

<style>

</style>
