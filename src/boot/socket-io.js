import io from 'socket.io-client'

// "async" is optional
export default async ({ Vue, store }) => {
  store.$socket = Vue.prototype.$socket = io('http://localhost', {
    autoConnect: true,
  });
}
