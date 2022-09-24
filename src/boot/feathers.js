import { boot } from 'quasar/wrappers'
import io from 'socket.io-client'
import feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import authentication from '@feathersjs/authentication-client'
import { paramsForServer } from 'feathers-graph-populate'
import controller from 'src/controllers'

// eslint-disable-next-line no-unused-vars
import { bus } from 'boot/global-event-bus'

const client = feathers()
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({app}) => {
  const socket = io(process.env.socket, {
    transports :['websocket'],
    forceNew :true
  })
  console.log('socket url:', socket.io.uri)
  client.configure(socketio(socket, {
    timeout :10000
  }))
  client.configure(authentication({
    storageKey :process.env.auth
  }))
// "async" is optional;
  client.hooks({
    before :{
      all :[
        paramsForServer('$populateParams')
      ]
    }
  })
  client.io.on('disconnect', (reason) => {
    console.log('disconnect', reason)
    bus.$emit('modules:is-connected', reason)
  })
  controller.config(client)
  await client.io.on('connection', async () => {
    console.log('connection')
  })
  await client.io.on('connect', async () => {
    console.log('connect')
    bus.$emit('modules:is-connected', true)
  })
  console.log('connect modules')
  app.config.globalProperties.$q.client = client
  app.config.globalProperties.$client = client
})
export { client }
