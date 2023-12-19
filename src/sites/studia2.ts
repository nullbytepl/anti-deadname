import Site from '../model/site'
import User from '../model/user'

import html from '../utils/para_html'
import address from '../utils/address'
import title from '../utils/title'

import matchTableCellByColumnName from './studia_common'

class Studia2SiteImpl extends Site {
    private user: User

    constructor(user: User) {
        super(user)
        console.log('Studia2SiteImpl#init() user: ', user)
        this.user = user
    }

    match(): boolean {
        return address().matchHost('studia2.elka.pw.edu.pl')
    }

    execute(): boolean {
        console.log('Studia2SiteImpl#execute()')

        // User name in title
        title.value = this.user.name

        // /{en,pl}/*/-/plan/* - user name in header
        const HEADER_NAME_SELECTOR = 'body > div > table:nth-child(2) > tbody > tr > th:nth-child(2) > h1'
        const PLAN_PATH_REGEX = /^\/(pl|en)\/.*\/-\/plan\/.*/
        if (address().matchPath(PLAN_PATH_REGEX)) {
            html.selector(HEADER_NAME_SELECTOR).textContent = this.user.name
        }

        // /{pl,en}/.{3}/ - user name in header (no subpages!)
        const HEADER_NAME_SELECTOR_MAIN = 'tbody > tr > th[width="85%"] > h1'
        const MAIN_PATH_REGEX = /^\/(pl|en)\/.{3}\/$/
        if (address().matchPath(MAIN_PATH_REGEX)) {
            html.selector(HEADER_NAME_SELECTOR_MAIN).textContent = this.user.name
        }

        // /{pl,en}/.{3}/*/info/ - user name in grade table

        // Technically, there are two tables with this class, but the first one is the one we want
        const GRADES_TABLE_SELECTOR = 'table.list' 
        const GRADES_LASTNAME_COLUMN_NAME = 'Nazwisko'
        const GRADES_FIRSTNAME_COLUMN_NAME = 'Imiona'
        const GRADES_PATH_REGEX = /^\/(pl|en)\/.{3}\/.*\/info\/$/
        if (address().matchPath(GRADES_PATH_REGEX)) {
            const GRADES_LASTNAME_SELECTOR = matchTableCellByColumnName(GRADES_TABLE_SELECTOR, GRADES_LASTNAME_COLUMN_NAME)
            const GRADES_FIRSTNAME_SELECTOR = matchTableCellByColumnName(GRADES_TABLE_SELECTOR, GRADES_FIRSTNAME_COLUMN_NAME)
            GRADES_LASTNAME_SELECTOR.textContent = this.user.lastName
            GRADES_FIRSTNAME_SELECTOR.textContent = this.user.firstName
        }

        // <3
        const EASTER_EGG_SELECTOR = '.nawig > tbody > tr > td:nth-child(1) > font'
        html.selector(EASTER_EGG_SELECTOR).textContent = '\n💙🩷🤍🩷💙\n'

        return true
    }
}

export default Studia2SiteImpl