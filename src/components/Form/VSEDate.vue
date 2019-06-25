<template>
    <q-input
        :value="date"
        :label="label"
        ref="dateInput"
        filled
        dense
        dark
        lazy-rules
        standout="bg-secondary text-white"
        input-class="text-grey-4"
        hide-bottom-space
        :rules="[ val => !!val ]"
        @input="$emit('update:date', $event)" >
        
        <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy 
                    ref="datePopup"
                    transition-show="scale"
                    transition-hide="scale">
                    <q-date
                        ref="datepicker"
                        :value="date"
                        mask="MM.DD.YY"
                        today-btn
                        minimal
                        dark
                        @input="updateAndClose($event)" />
                </q-popup-proxy>
            </q-icon>
        </template>
    </q-input>    
</template>

<script>
import { QInput } from 'quasar'

export default {
    props: ['date', 'label'],
    components: {
        QInput
    },
    methods: {
        updateAndClose(payload){
            this.$refs.datePopup.hide();
            this.$emit('update:date', payload);
        },
        fillDates () {
            let date = new Date();
            let options = { month: '2-digit', day: '2-digit', year: '2-digit' };

            let today = date.toLocaleDateString('en-US', options);

            this.$emit('update:date', today);
        }
    },
    mounted () {
        //seed the date inputs with today's date
        this.fillDates();
    },
}
</script>

<style>

</style>
