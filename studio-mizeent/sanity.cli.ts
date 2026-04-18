import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'dy5vkbef',
    dataset: 'production'
  },
  deployment: {
    appId: 'f2kz6g167kja4if7kjzsfn61',
    autoUpdates: true,
  }
})
