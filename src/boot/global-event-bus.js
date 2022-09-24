import { boot } from 'quasar/wrappers'
import emitter from 'tiny-emitter/instance'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
const bus = {
  $on: (...args) => emitter.on(...args),
  $once: (...args) => emitter.once(...args),
  $off: (...args) => emitter.off(...args),
  $emit: (...args) => emitter.emit(...args)
}
export default boot(async ({ app }) => {
  // something to do
  // console.log(app)
  app.config.globalProperties.$q.bus = bus
})
export { bus }
