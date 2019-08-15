<template>
    <!-- ** THIS IS FOR GETTING FILES FROM SYSTEM **-->
    <q-input
        :value="file"
        :label="label"
        :rules="rules"
        :load="load"
        :vars="varsArr"
        :defaultPath="defaultPath"
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
    props: ['file', 'label', 'rules', 'load', 'varsArr', 'defaultPath'],
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
            
            console.log(this.defaultPath);

            let options = {
                title: 'select art file',
                defaultPath: this.defaultPath,
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

                    this.$emit('input', fileString[0]);
                    return;
                }

                //set up listener event
                this.$socket.on('give.variables', (data) => {
 
                    let payload = JSON.parse(data);

                    this.$emit('fill', payload.data); //put the data into -THIS- picker's load
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
