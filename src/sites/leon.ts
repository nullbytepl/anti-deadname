import Site from '../model/site'
import User from '../model/user'

import html from '../utils/para_html'
import address from '../utils/address'
import title from '../utils/title'

class LeonSiteImpl extends Site {
    private user: User

    constructor(user: User) {
        super(user)
        console.log('LeonSiteImpl#init() user: ', user)
        this.user = user
    }

    match(): boolean {
        return address().matchHost('leon.pw.edu.pl')
    }

    execute(): boolean {
        console.log('LeonSiteImpl#execute()')

        // User greeting (shows up once after logging in, only in /my/)
        const USER_GREETING_SELECTOR = '#page-header > div > .align-items-center > .mb-3'
        if (address().matchPath('/my/')) {
            html.selector(USER_GREETING_SELECTOR).textContent = this.generateGreeting()
        }

        // User initials in the top right corner
        const USER_INITIALS_SELECTOR = 'span.avatar > span.userinitials'
        html.selector(USER_INITIALS_SELECTOR).textContent = this.user.initials

        // Name and initials in /user/profile.php, as well the name in the title
        const USER_PROFILE_NAME_SELECTOR = '.page-context-header > .page-header-headings > h1'
        const USER_PROFILE_INITIALS_SELECTOR = 'div.page-header-image > a > span.userinitials'
        if (address().matchPath('/user/profile.php')) {
            html.selector(USER_PROFILE_NAME_SELECTOR).textContent = this.user.name
            html.selector(USER_PROFILE_INITIALS_SELECTOR).textContent = this.user.initials
            title.value = `${this.user.name} - Leon`
        }

        // Name and initials in grades table - /grade/report/user/index.php?...
        const GRADES_TABLE_INITIALS_SELECTOR = 'div.user-heading > div.h4 > span.userinitials'
        const GRADES_TABLE_NAME_SELECTOR = 'div.user-heading > div.ml-2 > a'
        if (address().matchPath('/grade/report/user/index.php')) {
            html.selector(GRADES_TABLE_INITIALS_SELECTOR).textContent = this.user.initials
            html.selector(GRADES_TABLE_NAME_SELECTOR).textContent = this.user.name
        }

        return true
    }

    private generateGreeting(): string {
        return `\n                Witaj ponownie, ${this.user.firstName}! ${this.user.emoji}\n            `
    }
}

export default LeonSiteImpl