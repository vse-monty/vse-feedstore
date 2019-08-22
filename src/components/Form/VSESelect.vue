<template>
    <q-select
        :value="value"
        :options="options"
        :rules="rules"
        :label="label"
        filled
        dense
        dark
        options-dense
        options-dark
        standout="bg-secondary text-white"
        input-class="text-grey-4"
        hide-bottom-space
        hide-dropdown-icon
        @input="$emit('update:value', $event)">

        <!-- <template v-slot:append>
            <q-btn
                round
                dense
                flat
                icon="add"
                @click.stop="$emit('add-option')" />
        </template> -->

    </q-select>
</template>

<script>
import { QSelect } from 'quasar'

export default {
    props: ['value', 'options', 'rules', 'label'],
    components: {
        QSelect
    }
}
</script>

<style>

</style>
