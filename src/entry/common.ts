import Site from '../model/site'
import User from '../model/user'
import UserImpl from '../model/user_impl'

import UsosSiteImpl from '../sites/usos'
import LeonSiteImpl from '../sites/leon'
import Studia3SiteImpl from '../sites/studia3'
import Studia2SiteImpl from '../sites/studia2'
import getWindow from '../userscript/window'
import ApiConnectorImpl from '../api/connector_impl'


const user: User = new UserImpl()

const commonSites: Site[] = [
    new UsosSiteImpl(user),
    new LeonSiteImpl(user),
    new Studia3SiteImpl(user),
    new Studia2SiteImpl(user),
]

const executeInjection = (sites: Site[]) => {
    sites.forEach(site => {
        console.log('site: ', site)
        if (site.match()) {
            console.log('site matched')
            site.execute()
        }
    })
}

const commonApiHosts: string[] = [
    'nd.pedali.ca',
]

const executeApiInjection = (hosts: string[]): boolean => {
    hosts.forEach(host => {
        if (getWindow().location.hostname === host) {
            console.log('host matched for api injection')
            
            const connector = new ApiConnectorImpl()
            connector.inject()
        }
    })
    return false
}

export {
    commonSites,
    executeInjection,
    commonApiHosts,
    executeApiInjection,
}