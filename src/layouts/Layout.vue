<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
         VSE Feed Store
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
      content-class="bg-grey-2"
    >
      <q-list>
        <q-item-label header>Navigation</q-item-label>

        <!--The link to the main 'list' page-->
        <q-item
          to="/"
          exact
          clickable
          >
          <q-item-section avatar>
            <q-icon name="cloud_upload" />
          </q-item-section>
          <q-item-section>
            <q-item-label>feed</q-item-label>
            <q-item-label caption>send illustrator job(s)</q-item-label>
          </q-item-section>
        </q-item>

        <!--The link to the form order builder page-->
        <q-item
          to="/addfood"
          exact
          clickable>
          <q-item-section avatar>
            <q-icon name="add_circle_outline" />
          </q-item-section>
          <q-item-section>
            <q-item-label>add item</q-item-label>
            <q-item-label caption>compose new job item</q-item-label>
          </q-item-section>
        </q-item>

        <!--The link to the settings page-->
        <q-item
          to="/settings"
          exact
          clickable>
          <q-item-section avatar>
            <q-icon name="settings" />
          </q-item-section>
          <q-item-section>
            <q-item-label>settings</q-item-label>
            <!-- <q-item-label caption>settings for this app</q-item-label> -->
          </q-item-section>
        </q-item>

      </q-list>

    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  methods: {
    openURL
  }
}
</script>

<style>
</style>
