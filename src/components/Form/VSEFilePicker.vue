<template>
    <!-- ** THIS IS FOR GETTING FILES FROM SYSTEM **-->
    <q-input
        :value="file"
        :label="label"
        :rules="rules"
        :load="load"
        :vars="varsArr"
        filled
        dense
        dark
        standout="bg-secondary text-white"
        input-class="text-grey-4"
        hide-bottom-space
        @input="$emit('update:file', $event)">

        <template v-slot:append>
            <q-btn
                v-if="checkValid()"
                round
                dense
                flat
                icon="cancel"
                @click.stop="clear" />
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
    props: ['file', 'label', 'rules', 'load', 'varsArr'],
    components: {
        QInput
    },
    methods: {

        clear () {
            this.$emit('input', '')
            this.$emit('fill', [])
        },

        checkValid () {

            if(this.file == null || this.file == ""){
                return false;
            }
            
            return true;
        },

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

                //set up listener event
                this.$socket.on('give.variables', (data) => {
                    console.log('received ->')
                    let payload = JSON.parse(data);
                    console.log(payload.type);
                    console.log(payload.data);

                    console.log('sending data to vars array');
                    this.$emit('update:varsArr', payload.data); //put the data into -THIS- picker's load
                    console.log('removing listener for \'give.variables\' for: ' + this.label);
                    this.$socket.removeListener('give.variables'); //stop listening for this event
                });

               this.$socket.emit('get.variables', encodeURI(fileString[0]));
               this.$emit('input', fileString[0]);
            }
        },
    }
}
</script>

<style>

</style>
