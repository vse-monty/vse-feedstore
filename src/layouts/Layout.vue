<template>
  <q-layout view="hHh LpR lFf">
    <tool-bar />

    <q-drawer
      v-model="leftDrawerOpen"
      elevated
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
            color="blue-grey-7"
            label="illustrator"
            @click="openILST()"/>
        </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer ref="MyFooter" :class="footer.footer_class" style="max-height: 30px">
        <small>{{ footer.footer_message }}</small>
    </q-footer>
  </q-layout>
</template>

<script>
import { Dialog } from 'quasar'
import { mapGetters, mapActions } from 'vuex'
const child = require('child_process').execFile;

export default {
  name: 'MyLayout',
  data () {
    return {

      leftDrawerOpen: true,

      footer: {
          footer_class: "text-center bg-negative",
          footer_message: 'this app is not connected to illustrator...'
        },
      
      navs: [
        {
          to: '/',
          label: 'order',
          icon: 'insert_drive_file',
        },
        {
          to: '/batch',
          label: 'batch orders',
          icon: 'file_copy',
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

    openILST () {
      
      if(this.settings.illustrator){

        let path = process.cwd() + '\\src\\assets\\Home.ai';
        let illy = this.settings.illustrator;
        let q = this.$q;

        try{

          child(`${illy}\\Illustrator.exe`, [path], function (error, stdout, stderr) {
          
            if(error){
              q.dialog({
                title: 'cannot open illustrator',
                message: 'Please check the illustrator path setting. The path should point to a folder containing \'Illustrator.exe\'',
                position: 'standard',
                dark: true,
                persistent: false,
                    ok: {
                      push: true,
                      color: 'negative',
                      flat: true,
                      to: '/settings'
                    },
              })
            }
          });

          } catch (err) {

            console.log(error);
          }

      } else {

        q.dialog({
          title: 'cannot open illustrator',
          message: 'Please check the illustrator path setting. The path should point to a folder containing \'Illustrator.exe\'',
          position: 'standard',
          dark: true,
          persistent: false,
              ok: {
                push: true,
                color: 'negative',
                flat: true,
                to: '/settings'
              },
        })
      }

     
    },

    setFooter (the_class, the_message) {

      this.footer.footer_class = the_class;
      this.footer.footer_message = the_message;
    },
  },

  components: {

    'tool-bar' : require('./Bar.vue').default
  },

  mounted(){

    let foot = this.setFooter; //for scope reasons
    let set = this.settings;

    //listeners for illustrator connections...
    this.$socket.on('illustrator.disconnected', () => {
      foot('text-center bg-negative', 'this app is not connected to illustrator panel...')
    });

    this.$socket.on('illustrator.connected', () => {
      foot('text-center bg-positive', 'connected to illustrator panel...');
      this.$socket.emit('illustrator.settings', JSON.stringify(set));
    });
  },

  computed: {

    ...mapGetters('settings', ['settings']),
  },
}
</script>

<style lang="stylus">
.menu-highlight
  color white
  background $info
</style>
