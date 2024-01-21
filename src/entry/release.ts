import { commonSites,
    executeInjection,
    commonApiHosts,
    executeApiInjection, 
    defaultConfigurationUrl} from './common'


const releaseApiHosts: string[] = [
    ...commonApiHosts,
]

if (!executeApiInjection(releaseApiHosts)) {
    executeInjection(commonSites, defaultConfigurationUrl)
}