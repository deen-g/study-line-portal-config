import { boot } from 'quasar/wrappers'
import { EventBus } from 'quasar'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
// const bus = {
//   // $on: (...args) => emitter.on(...args),
//   // $once: (...args) => emitter.once(...args),
//   // $off: (...args) => emitter.off(...args),
//   // $emit: (...args) => emitter.emit(...args)
// }
const bus = new EventBus()
export default boot(async ({ app }) => {

  app.config.globalProperties.$q.bus = bus
})
export { bus }
