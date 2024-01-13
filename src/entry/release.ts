import { commonSites,
    executeInjection,
    commonApiHosts,
    executeApiInjection } from './common'


const releaseApiHosts: string[] = [
    ...commonApiHosts,
]

if (!executeApiInjection(releaseApiHosts)) {
    executeInjection(commonSites)
}