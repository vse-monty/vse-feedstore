<template>
    <!-- ** THIS IS FOR GETTING FILES FROM SYSTEM **-->
    <q-input
        :value="varValue"
        :varType="varType"
        :label="label"
        :rules="rules"
        filled
        spread
        dense
        dark
        standout="bg-secondary text-white"
        input-class="text-grey-4"
        hide-bottom-space
        @input="$emit('update:varValue', $event)">

        <template v-slot:append>
            <q-btn
                v-if="checkValid()"
                round
                dense
                flat
                icon="cancel"
                @click.stop="clear" />
            <q-btn
                v-if="varType == 'image'"
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
    props: ['rules', 'label', 'varValue', 'varType'],
    components: {
        QInput
    },
    methods: {

        clear () {
            this.$emit('input', '')
        },

        checkValid () {

            if(this.varValue == null || this.varValue == ""){
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
                    console.log('just want a file name, not the variables');
                    this.$emit('input', fileString[0]);
            }
        },
    }
}
</script>