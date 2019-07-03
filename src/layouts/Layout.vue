<template>
  <q-layout view="hHh lpR fFf">
  <!-- <q-layout view="hHr lpR fFr"> -->
    <!-- <q-header>
      <q-toolbar>

        <q-toolbar-title absolute-center>
         VSE Feed Store
        </q-toolbar-title>

      </q-toolbar>
    </q-header> -->
    <tool-bar />

    <q-drawer
      v-model="leftDrawerOpen"
      :breakpoint=10
      :width=175
      content-class="bg-secondary">

      <img class="absolute-top" src="~assets/vse-logo.svg" style="width: 175px">
      
      <q-list style="margin-top: 110px">

        <!--Loops through the navs array-->
        <q-item
          v-for="nav in navs"
          :key=nav.label
          :to=nav.to
          active-class="menu-highlight"
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

        <div class="q-pa-sm">
            <q-btn
            style="width: 160px; height 10px"
            color="grey-8"
            label="illy"/>
        </div>
    </q-drawer>

    <q-drawer
      v-model="orderDrawerOpen"
      :breakpoint=10
      :width=400
      side="right"
      elevated
      content-class="bg-grey-9">
      <add-order
       @closeDrawer="orderDrawerOpen = false"/>
    </q-drawer>

    <q-page-container>
      <router-view 
        @closeDrawer="orderDrawerOpen = true"/>
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'
const child = require('child_process').execFile;

export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: true,
      orderDrawerOpen: true,
      builderDrawerOpen: false,
      
      navs: [
        {
          to: '/',
          label: 'feed',
          icon: 'send',
        },
        // {
        //   to: '/addbuilder',
        //   label: 'add client',
        //   icon: 'add_circle',
        // },
        {
          to: '/settings',
          label: 'settings',
          icon: 'settings',
        },
      ]
    }
  },
  methods: {
    openURL,

    openILST () {
      child('C:\\Program Files\\Adobe\\Adobe Illustrator CC 2019\\Support Files\\Contents\\Windows\\Illustrator.exe',
            ['C:\\Users\\dmontgomery\\Documents\\TEST\\VSE\\Templates\\Home.ai'],
            function(err, data) {
              console.log(err);
              console.log(data.toString());
      });
    },
  },
  components: {
    'add-order' : require('components/Drawers/AddOrder.vue').default,
    'tool-bar' : require('./Bar.vue').default
  },
}
</script>

<style lang="stylus">
.menu-highlight
  color white
  background $info
</style>
