<template>
  <q-page padding>
    <div class="q-gutter-sm q-mx-auto">
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
      label="template directory" />
    
    <!-- WIP (proofs) folder picker-->
    <vse-folder-picker 
      v-model="print"
      :file.sync="print"
      label="pdf proof output directory" />

    <pre>{{ settings }}</pre>
    <pre>{{ folders }}</pre>
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
    ...mapActions('settings', ['setIllustrator', 'setWorking', 'setTemplates', 'setPrint'])
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

    print: {
      
      get () {

        return this.settings.print;
      },
      
      set (path) {
        this.setPrint(path);
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