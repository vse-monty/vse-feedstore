<template>
  <q-page padding>
    <div class="q-gutter-sm q-mx-auto">
      <div class="q-gutter-sm q-mx-auto">
      <q-toggle
        v-model="show_pdf"
        label="show proof pdf after order completion"
        dark
        keep-color
        color="info"/>
      </div>
      <q-toggle
        v-model="launch_illy"
        label="open illustrator on launch"
        dark
        keep-color
        color="info"/>
    <!-- illustrator folder picker-->
    <vse-folder-picker 
      v-model="illustrator"
      :file.sync="illustrator"
      label="illustrator directory" />
    
    <!-- working dir folder picker-->
    <vse-folder-picker 
      v-model="working"
      :file.sync="working"
      label="working file directory" />
    
    <!-- template dir picker-->
    <vse-folder-picker 
      v-model="templates"
      :file.sync="templates"
      label="proof templates directory" />
    
    <!-- art template dir picker-->
    <vse-folder-picker 
      v-model="art_templates"
      :file.sync="art_templates"
      label="art templates directory" />
    
    <!-- WIP (proofs) folder picker-->
    <vse-folder-picker 
      v-model="print"
      :file.sync="print"
      label="pdf proof output directory" />

    <!-- <pre>{{ settings }}</pre> -->
    <!-- <pre>{{ folders }}</pre> -->
    </div>
  </q-page>
</template>

<script>
const FileHound = require('filehound');
import { mapGetters, mapActions } from 'vuex'

export default {
  
  data () {
    return {

      folders: [],
    }
  },

  methods: {
    ...mapActions('settings', ['setIllustrator', 'setWorking', 'setTemplates', 'setArtTemplates', 'setPrint', 'setShowPDF', 'setLaunchIllustrator'])
  },

  mounted () {
  
  },

  computed: {

    ...mapGetters('settings', ['settings']),

    illustrator: {    
      get () {
        return this.settings.illustrator;
      },
      set (path) {
        this.setIllustrator(path);
      }
    },

    working: {
      get () {
        return this.settings.working;
      },
      set (path) {
        this.setWorking(path);
      }
    },

    templates: {
      get () {
        return this.settings.templates;
      },
      set (path) {
        this.setTemplates(path);
      }
    },

    art_templates: {
      get () {
        return this.settings.art_templates;
      },
      set (path) {
        this.setArtTemplates(path);
      }
    },

    print: {
      get () {
        return this.settings.print;
      },
      set (path) {
        this.setPrint(path);
      }
    },

    show_pdf: {
      get () {
        return this.settings.show_pdf
      },
      set (val) {
        this.setShowPDF(val)
      }
    },

    launch_illy: {
      get () {
        return this.settings.launch_illy
      },
      set (val) {
        this.setLaunchIllustrator(val)
      }
    },

    // totalWorking: function () {

    //   let result = [];

    //   if(this.settings.working){

    //     let path = this.settings.working;
    //     console.log('totalWorking')
    //     console.log(path)
    //     result = FileHound.create()
    //                           .path(`${path}`)
    //                           .depth(1)
    //                           .directory()
    //                           .ignoreHiddenDirectories()
    //                           .findSync();

      
    //     console.log(result);
    //     this.folders = [];
        
    //     for (let i = 0; i < result.length; i++){
          
    //       let temp = result[i].split('\\')
    //       console.log(temp);

    //       if(!temp[temp.length-1].startsWith('_')){
            
    //         this.folders.push(temp[temp.length-1]);
    //       }
    //     }
    //   }

    //   console.log(this.folders);
    //   return result;
    // }
  },

  components: {
  
    'vse-folder-picker' : require('components/Form/VSEFolderPicker.vue').default,
  },   
}
</script>

<style>

</style>