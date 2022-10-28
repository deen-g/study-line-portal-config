const apis = {
  public :{
    portal :{
      account :{
        config :{
          login :'/public/portal/account/config/login'
        }
      }
    }
  },
  authorised :{
    session :'/authorised/config/session',
    config :{
      management :{
        configuration :{
          get :'/authorised/config/management/configuration/get',
          find :'/authorised/config/management/configuration/find',
          patch :'/authorised/config/management/configuration/patch',
          create :'/authorised/config/management/configuration/create',
          createOrPatch :'/authorised/config/management/configuration/create-or-patch'
        }
      },
      logout :'/authorised/config/logout',
      statistic :'/authorised/config/statistic',
      account :{
        config :{}
      }

    }
  }

}
export default apis
