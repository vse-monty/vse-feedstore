import Datastore from 'nedb'
import path from 'path'
import { remote } from 'electron'


export default async ({ store, Vue }) => {
  store.$db = Vue.prototype.$db = new Datastore({
    autoload: true,
    filename: path.join(remote.app.getPath('userData'), '/_vse.db')
  })

  // console.log(path.join(remote.app.getPath('userData'), '/_vse.db'))
}
