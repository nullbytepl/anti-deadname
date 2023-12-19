import Site from './model/site'
import User from './model/user'
import UserImpl from './model/user_impl'

import UsosSiteImpl from './sites/usos'
import LeonSiteImpl from './sites/leon'
import Studia3SiteImpl from './sites/studia3'

const user: User = new UserImpl()

const sites: Site[] = [
    new UsosSiteImpl(user),
    new LeonSiteImpl(user),
    new Studia3SiteImpl(user),
]

sites.forEach(site => {
    console.log('site: ', site)
    if (site.match()) {
        console.log('site matched')
        site.execute()
    }
})