import { boot } from 'quasar/wrappers'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
let navigation;
export default boot(async ({app, router}) => {
  // something to do
  navigation = router
})
export { navigation }
