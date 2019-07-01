import lodash from 'lodash'

// "async" is optional
export default async ({ Vue }) => {
  Vue.prototype.$_ = lodash;
}
