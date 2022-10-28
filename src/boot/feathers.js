import { boot } from 'quasar/wrappers'
import io from 'socket.io-client'
import feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import authentication from '@feathersjs/authentication-client'
import { paramsForServer } from 'feathers-graph-populate'
import { loadServices } from "src/services"
import { localForage } from "src/constants/localforge"

// eslint-disable-next-line no-unused-vars

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
    storageKey :process.env.auth,
    storage:localForage
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
  })

  await client.io.on('connection', async () => {
    console.log('connection')
  })
  await client.io.on('connect', async () => {
    console.log('connect')
  })
  try {
    let auth = await client.reAuthenticate()
    console.log(auth)
    await loadServices(client)
  } catch (e){
    console.log(e)
  }
  console.log('connect modules')
  app.config.globalProperties.$q.client = client
  app.config.globalProperties.$client = client
})
export { client }
