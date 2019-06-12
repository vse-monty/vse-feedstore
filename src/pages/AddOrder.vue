<template>
  <q-page class="q-pa-md">
    
    <q-select
      filled
      autofocus
      v-model="model"
      square
      use-input
      input-debounce="0"
      @new-value="createValue"
      :options="filterOptions"
      options-dense=""
      @filter="filterFn"
      hint="customer name"
      dark
      popup-content-class="select-style"
      style="width: 250px"
    />

  </q-page>
</template>


<script>
const builderOptions = [
  'Beazer', 'Home Maker Homes', 'CB Jeni', 'Meritage Homes', 'Highland Homes'
]

export default {
  data () {
    return {
      model: null,

      filterOptions: builderOptions
    }
  },

  methods: {
    createValue (val, done) {
      // Calling done(var) when new-value-mode is not set or "add", or done(var, "add") adds "var" content to the model
      // and it resets the input textbox to empty string
      // ----
      // Calling done(var) when new-value-mode is "add-unique", or done(var, "add-unique") adds "var" content to the model
      // only if is not already set
      // and it resets the input textbox to empty string
      // ----
      // Calling done(var) when new-value-mode is "toggle", or done(var, "toggle") toggles the model with "var" content
      // (adds to model if not already in the model, removes from model if already has it)
      // and it resets the input textbox to empty string
      // ----
      // If "var" content is undefined/null, then it doesn't tampers with the model
      // and only resets the input textbox to empty string

      if (val.length > 0) {
        if (!builderOptions.includes(val)) {
          builderOptions.push(val)
        }
        done(val, 'toggle')
      }
    },

    filterFn (val, update) {
      update(() => {
        if (val === '') {
          this.filterOptions = builderOptions
        }
        else {
          const needle = val.toLowerCase()
          this.filterOptions = builderOptions.filter(
            v => v.toLowerCase().indexOf(needle) > -1
          )
        }
      })
    }
  }
}
</script>

<style lang="stylus">
  .select-style
   color $grey-3
   background $primary
</style>