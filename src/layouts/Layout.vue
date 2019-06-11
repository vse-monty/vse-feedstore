<template>
  <q-layout view="hHh LpR fFf">
    <q-header elevated>
      <q-toolbar>

        <q-toolbar-title absolute-center>
         VSE Feed Store
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      :width=175
      content-class="bg-secondary" >

      <img class="absolute-top" src="~assets/vse-logo.svg" style="width: 175px">
      
      <q-list style="margin-top: 110px">
      
        <!-- <q-item-label header>Navigation</q-item-label> -->

        <!--Loops through the navs array-->
        <q-item
          v-for="nav in navs"
          :key=nav.label
          :to=nav.to
          active-class="my-menu-link"
          exact
          clickable
          >
          <q-item-section avatar>
            <q-icon :name=nav.icon />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ nav.label }}</q-item-label>
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
      leftDrawerOpen: this.$q.platform.is.desktop,
      navs: [
        {
          to: '/',
          label: 'feed',
          icon: 'send',
        },
        {
          to: '/addfood',
          label: 'add order',
          icon: 'add_circle',
        },
        {
          to: '/settings',
          label: 'settings',
          icon: 'settings',
        },
      ]
    }
  },
  methods: {
    openURL
  }
}
</script>

<style lang="stylus">
.my-menu-link
  color white
  background $info
</style>
