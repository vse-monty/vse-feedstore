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

        <div class="q-pa-sm">
            <q-btn
            style="width: 160px; height 10px"
            color="blue-grey-7"
            label="close illy"
            @click="closeILST()"/>
        </div>

        <div class="q-pa-sm">
            <q-btn
            style="width: 160px; height 10px"
            color="blue-grey-7"
            label="restart illy"
            @click="restartILST()"/>
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
import { setTimeout } from 'timers';
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
          label: 'orders',
          icon: 'file_copy',
        },
        {
          to: '/old',
          label: 'archive',
          icon: 'archive',
        },
        {
          to: '/settings',
          label: 'settings',
          icon: 'settings',
        },
      ]
    }
  },

  components: {

    'tool-bar' : require('./Bar.vue').default
  },

  mounted(){

    let foot   = this.setFooter //for scope reasons
    let reboot = this.restartILST
    let set    = this.settings
    
    if(set.launch_illy){
      this.openILST()
    }

    //listeners for illustrator connections...
    this.$socket.on('illustrator.disconnected', () => {
      foot('text-center bg-negative', 'this app is not connected to illustrator panel...')
    });

    this.$socket.on('illustrator.connected', () => {
      foot('text-center bg-positive', 'connected to illustrator panel...');
      this.$socket.emit('illustrator.settings', JSON.stringify(set));
    });

    this.$socket.on('illustrator.reboot', () => {
      reboot();
    });

    //set up listener(s) for order completed/(faileD?) events from server
    this.$socket.on('completed', (data) => {

      let obj = JSON.parse(data)
      let that = this

      console.log(`order completed! -> ${obj.order_number}`)
      this.RemoveOrderFromStore(obj.order_number) //remove the copy from our vuex store

      that.$db.persistence.compactDatafile() //see if this fixes stuff
      //check if the order is already in the database
      that.$db.findOne({order_number: obj.order_number}, function(err, doc){
        if(doc === null){
          //order not found in db, add the order
          that.$db.insert(obj, function(err, doc){
            console.log(`document inserted-> ${doc.order_number} | ${doc._id}`)
          })
        } else{
          //order is found, update existing order
          that.$db.update({order_number: obj.order_number}, obj, {}, function(err, numReplaced){

            console.log(`order updated: ${doc.order_number}`)
          })
        }
      })
    })
  },

  computed: {

    ...mapGetters('settings', ['settings']),
  },

   methods: {

    ...mapActions('mp_orders', ['DeleteOrder']),

    RemoveOrderFromStore (id) {

      this.DeleteOrder(id)
    },

    closeILST () {
      console.log('closing illustrator')
      this.$socket.emit('illustrator.close')
      this.setFooter('text-center bg-negative', 'this app is not connected to illustrator panel...')
    },

    restartILST () {
      this.closeILST()
      let ILST = this.openILST;
      setTimeout(ILST, 5000)
    },

    openILST () {
      console.log('opening illustrator')
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
}
</script>

<style lang="stylus">
.menu-highlight
  color white
  background $info
</style>
