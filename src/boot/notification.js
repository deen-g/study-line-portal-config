import { boot } from 'quasar/wrappers'
import { Notify } from 'quasar'

const notifications = {}
// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({
  app
}) => {
  notifications.positive = function (msg) {
    return Notify.create({
      type: 'positive',
      message: msg
    })
  }
  notifications.negative = function (msg) {
    return Notify.create({
      type: 'negative',
      message: msg
    })
  }
  notifications.warning = function (msg) {
    return Notify.create({
      type: 'warning',
      message: msg
    })
  }
  notifications.info = function (msg) {
    return Notify.create({
      type: 'info',
      message: msg
    })
  }
  notifications.ongoing = function (msg) {
    return Notify.create({
      type: 'ongoing',
      message: msg
    })
  }
  app.config.globalProperties.$q.notifications = notifications
  // something to do
})
export { notifications }
