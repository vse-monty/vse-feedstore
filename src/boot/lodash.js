import lodash from 'lodash'

// "async" is optional
export default async ({ store, Vue }) => {
 store.$_ =  Vue.prototype.$_ = lodash;
}
