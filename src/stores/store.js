import { useConfigurationStore } from "stores/configuration.store"
import { useUserStore } from "stores/user.store"
import { useSchoolStore } from "stores/school.store"
import { useStatisticStore } from "stores/statistics.store"

const useStore = () => {
  return {
    configuration :useConfigurationStore(),
    user :useUserStore(),
    school :useSchoolStore(),
    statistic :useStatisticStore(),
  }
}
export default useStore
