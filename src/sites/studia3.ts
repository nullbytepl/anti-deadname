import Site from '../model/site'
import User from '../model/user'
import { replaceExpressions } from '../model/gendered_strings'

import html from '../utils/para_html'
import address from '../utils/address'
import title from '../utils/title'

import getWindow from '../userscript/window'

import allStudiaStrings from './studia_strings'
import matchTableCellByColumnName from './studia_common'

class Studia3SiteImpl extends Site {
    private user: User

    constructor(user: User) {
        super(user)
        console.log('Studia3SiteImpl#init() user: ', user)
        this.user = user
    }

    match(): boolean {
        return address().matchHost('studia.elka.pw.edu.pl')
    }

    execute(): boolean {
        console.log('Studia3SiteImpl#execute()')

        // Logged in user name in the top right corner
        const USER_NAME_SELECTOR = '#log_name'
        html.selector(USER_NAME_SELECTOR).textContent = this.user.name

        // User name in title
        title.value = this.user.name

        // /{pl,en}/*/-/plan/* - user name in header
        const HEADER_NAME_SELECTOR = '#page_tabs > div[style="font-size: 250%; text-align: center"]'
        const PLAN_PATH_REGEX = /^\/(pl|en)\/.*\/-\/plan\/.*/
        if (address().matchPath(PLAN_PATH_REGEX)) {
            html.selector(HEADER_NAME_SELECTOR).textContent = this.user.name
        }

        // Global: strings injected in <script> tags (access via window[name])
        const strings = [
            'studia_popup',
            'studia_logout',
            'studia_notlogged',
        ]
        for (const string of strings) {
            getWindow()[string] = replaceExpressions(getWindow()[string], allStudiaStrings, this.user.gramaticalGender)
        }

        // /{pl,en}/.{3}/*/info/ - user name in grade table

        // Technically, there are two tables with this class, but the first one is the one we want
        const GRADES_TABLE_SELECTOR = 'table.list' 

        const GRADES_LASTNAME_COLUMN_NAME = 'Nazwisko'
        const GRADES_LASTNAME_SELECTOR = matchTableCellByColumnName(GRADES_TABLE_SELECTOR, GRADES_LASTNAME_COLUMN_NAME)
        const GRADES_FIRSTNAME_COLUMN_NAME = 'Imiona'
        const GRADES_FIRSTNAME_SELECTOR = matchTableCellByColumnName(GRADES_TABLE_SELECTOR, GRADES_FIRSTNAME_COLUMN_NAME)
        const GRADES_PATH_REGEX = /^\/(pl|en)\/.{3}\/.*\/info\/$/
        if (address().matchPath(GRADES_PATH_REGEX)) {
            GRADES_LASTNAME_SELECTOR.textContent = this.user.lastName
            GRADES_FIRSTNAME_SELECTOR.textContent = this.user.firstName
        }

        // <3
        const EASTER_EGG_SELECTOR = '#page_tail_lbl'
        html.selector(EASTER_EGG_SELECTOR).textContent = '\n💙🩷🤍🩷💙\n'

        return true
    }
}

export default Studia3SiteImpl