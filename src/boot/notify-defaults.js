import { Notify } from 'quasar'

Notify.setDefaults({
  position: 'bottom-right',
  timeout: 1500,
  color: 'primary', 
  textColor: 'white',
  actions: [{ icon: 'info', color: 'info' }]
})
