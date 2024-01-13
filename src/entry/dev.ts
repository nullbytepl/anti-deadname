import { commonSites,
    executeInjection,
    commonApiHosts,
    executeApiInjection } from './common'


const devApiHosts: string[] = [
    '127.0.0.1',
    ...commonApiHosts,
]

console.warn('RUNNING IN DEV MODE - THIS IS UNSAFE AND SHOULD NOT BE USED IN PRODUCTION')
if (!executeApiInjection(devApiHosts)) {
    executeInjection(commonSites)
}