import userService from "./users"
import schoolService from "./schools"
import configurationService from "./configurations"
import statisticService from "./statistics"

let services = {
  users :null,
  schools :null,
  configurations :null
}
const loadServices = async (client) => {
  services.users = await userService.configure(client)
  services.schools = await schoolService.configure(client)
  services.configurations = await configurationService.configure(client)
  services.statistics = await statisticService.configure(client)
}
const useService = () => {
  return services
}
export { useService, loadServices, services }
