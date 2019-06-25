import io from 'socket.io-client'

// "async" is optional
export default async ({ Vue }) => {
  Vue.prototype.$socket = io('http://localhost:9574', {
    autoConnect: false,
  });
}
