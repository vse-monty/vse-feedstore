<template>
    <div class="q-pa-md">
        <q-header>
            <q-bar class="q-electron-drag">
                <q-icon name="whatshot" />
                <!-- <div>VSE Feed Store</div> -->
                <q-space />

                <q-btn dense flat icon="minimize" @click="minimize" />
                <q-btn dense flat icon="close" @click="closeApp" />
            </q-bar>
        </q-header>    
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    methods: {
        ...mapActions('mp_orders', ['SaveOrders']),

        minimize () {
            if (process.env.MODE === 'electron') {
                this.$q.electron.remote.BrowserWindow.getFocusedWindow().minimize()
            }
        },

        closeApp () {
            if (process.env.MODE === 'electron') {
                this.SaveOrders()
                this.$q.electron.remote.BrowserWindow.getFocusedWindow().close()
            }
        },
    }
}
</script>

<style>

</style>
