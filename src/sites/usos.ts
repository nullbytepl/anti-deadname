import Site from '../model/site'
import User from '../model/user'
import GramaticalGender from '../model/gramatical_gender'
import { replaceExpressions } from '../model/gendered_strings'

import html from '../utils/para_html'
import address from '../utils/address'
import title from '../utils/title'

import allUsosStrings from './usos_strings'
import { genericStudentStrings } from './usos_strings'

class UsosSiteImpl extends Site {
    private user: User

    constructor(user: User) {
        super(user)
        console.log('UsosSiteImpl#init() user: ', user)
        this.user = user
    }

    match(): boolean {
        return address().matchHost('usosweb.usos.pw.edu.pl')
    }

    execute(): boolean {
        console.log('UsosSiteImpl#execute()')

        // User name in the top right corner
        html.selector('#layout-cas-bar').shadowRootSelector('#user > b').textContent = this.user.name

        // Linkage box (kontroler.php?_action=home/index)
        const LINEAGE_BOX_SELECTOR = 'div.local-home-table > div:nth-child(1) > usos-frame:nth-child(1) > p'
        if (this.matchAction('home/index')) {
            const linkageBox = html.selector(LINEAGE_BOX_SELECTOR)
            linkageBox.textContent = replaceExpressions(linkageBox.textContent, allUsosStrings, this.user.gramaticalGender)
        }

        // Tests and classes boxes (kontroler.php?_action=home/index)
        const BOXES_SELECTOR = 'usos-frame.student'
        if (this.matchAction('home/index')) {
            const boxes = html.selectorAll(BOXES_SELECTOR)
            for (const box of boxes) {
                const boxTitle = box.selector('h2 > a')
                boxTitle.textContent = replaceExpressions(boxTitle.textContent, genericStudentStrings, this.user.gramaticalGender)
            }
        }

        // Registration calendar kontroler.php?_action=dla_stud/rejestracja/kalendarz
        const REGISTRATION_CALENDAR_BOX_SELECTOR = '.usos-ui > info-box'
        if (this.matchAction('dla_stud/rejestracja/kalendarz')) {
            const registrationCalendarBox = html.selector(REGISTRATION_CALENDAR_BOX_SELECTOR)
            registrationCalendarBox.innerHTML = replaceExpressions(registrationCalendarBox.innerHTML, allUsosStrings, this.user.gramaticalGender)
        }

        // kontroler.php?_action=dla_stud/rejestracja/koszyk: info box + registrationstatus + filters
        const REGISTRATION_BASKET_BOX_SELECTOR = '.usos-ui > div > div > info-box'
        const REGISTRATION_BASKET_STATUS_SELECTOR = 'td.strong > table > tbody > tr > td:nth-child(2) > span.note'
        const REGISTRATION_BASKET_FILTERS_SELECTOR = 'usos-frame > div > fieldset > div > label'
        if (this.matchAction('dla_stud/rejestracja/koszyk')) {
            const registrationBasketBox = html.selector(REGISTRATION_BASKET_BOX_SELECTOR)
            registrationBasketBox.innerHTML = replaceExpressions(registrationBasketBox.innerHTML, allUsosStrings, this.user.gramaticalGender)

            const registrationBasketStatus = html.selectorAll(REGISTRATION_BASKET_STATUS_SELECTOR)
            for (const status of registrationBasketStatus) {
                status.innerHTML = replaceExpressions(status.innerHTML, allUsosStrings, this.user.gramaticalGender)
            }

            const registrationBasketFilters = html.selectorAll(REGISTRATION_BASKET_FILTERS_SELECTOR)
            for (const filter of registrationBasketFilters) {
                filter.innerHTML = replaceExpressions(filter.innerHTML, allUsosStrings, this.user.gramaticalGender)
            }
        }

        // kontroler.php?_action=katalog2/przedmioty/rejestracjaNaPrzedmiotCyklu - status
        const CYCLE_REGISTRATION_STATUS_SELECTOR = '.autostrong > tr:nth-child(2) > td:nth-child(2)'
        if (this.matchAction('katalog2/przedmioty/rejestracjaNaPrzedmiotCyklu')) {
            const cycleRegistrationStatus = html.selector(CYCLE_REGISTRATION_STATUS_SELECTOR)
            cycleRegistrationStatus.innerHTML = replaceExpressions(cycleRegistrationStatus.innerHTML, allUsosStrings, this.user.gramaticalGender)
        }

        // kontroler.php?_action=dla_stud/studia/oceny/index - info box
        const GRADES_INFO_BOX = '.usos-ui > info-box'
        if (this.matchAction('dla_stud/studia/oceny/index')) {
            const gradesInfoBox = html.selector(GRADES_INFO_BOX)
            gradesInfoBox.innerHTML = replaceExpressions(gradesInfoBox.innerHTML, allUsosStrings, this.user.gramaticalGender)
        }

        // kontroler.php?_action=home/grupy - title
        const GROUPS_TITLE_SELECTOR = 'usos-frame.student > h2'
        if (this.matchAction('home/grupy')) {
            const groupsTitle = html.selector(GROUPS_TITLE_SELECTOR)
            groupsTitle.textContent = replaceExpressions(groupsTitle.textContent, allUsosStrings, this.user.gramaticalGender)
        }

        // kontroler.php?_action=dla_stud/studia/decyzje/index - first info box
        const DECISIONS_INFO_BOX_SELECTOR = '.usos-ui > info-box > p:nth-child(2)'
        if (this.matchAction('dla_stud/studia/decyzje/index')) {
            const decisionsInfoBox = html.selector(DECISIONS_INFO_BOX_SELECTOR)
            decisionsInfoBox.innerHTML = replaceExpressions(decisionsInfoBox.innerHTML, allUsosStrings, this.user.gramaticalGender)
        }

        // kontroler.php?_action=dla_stud/studia/stypendia/stypendia
        const SCHOLARSHIPS_INFO_BOX_SELECTOR = '.usos-ui > info-box > dl'
        if (this.matchAction('dla_stud/studia/stypendia/stypendia')) {
            const scholarshipsInfoBox = html.selector(SCHOLARSHIPS_INFO_BOX_SELECTOR)
            scholarshipsInfoBox.innerHTML = replaceExpressions(scholarshipsInfoBox.innerHTML, allUsosStrings, this.user.gramaticalGender)
        }

        // User profile - katalog2/osoby/pokazOsobe 
        const USER_PROFILE_ATTRS_SELECTOR = 'div[id=user-attrs-id]'
        const USER_PROFILE_HEADER_SELECTOR = 'h1.uwb-inline-heading'
        const USER_PROFILE_SIDEBAR_ENTRY_SELECTOR = 'ul > li > span.selected.dynamic'
        const USER_PROFILE_ATTRS_FIRST_NAME_SELECTOR = 'div[id=user-attrs-id] > div.uwb-side-defs > div.uwb-clearfix:nth-child(1) > div:nth-child(2)'
        const USER_PROFILE_ATTRS_LAST_NAME_SELECTOR = 'div[id=user-attrs-id] > div.uwb-side-defs > div.uwb-clearfix:nth-child(2) > div:nth-child(2)'
        const USER_PROFILE_BASIC_INFO_SELECTOR = 'div.uwb-section-content'
        const USER_PROFILE_AVATAR_SELECTOR = 'div.uwb-imgcover-photo-wrapper > img'

        const FEMININE_AVATAR_URL = 'https://apps.usos.pw.edu.pl/res/up/200x250/blank-female-4.jpg'
        const MASCULINE_AVATAR_URL = 'https://apps.usos.pw.edu.pl/res/up/200x250/blank-male-4.jpg'

        if (this.matchAction('katalog2/osoby/pokazOsobe')) {
            // We need to check if the profile is of the current user
            // To do that, check if the user attributes box contains a line called "USOS ID"
            const userAttributesBox = html.selector(USER_PROFILE_ATTRS_SELECTOR)
            if (userAttributesBox.textContent.includes('USOS ID')) {
                // If it does, we can replace the name

                // First: The title
                // The title is in the format "Firstname Lastname - USOS - something"
                // We want to keep the part after the dash, so we split by dash and keep the parts except the first one
                const profileTitle = title.value
                const profileTitleParts = profileTitle.split('-')
                const profileTitleWithoutName = profileTitleParts.slice(1).join('-')
                title.value = `${this.user.name} - ${profileTitleWithoutName}`

                // Second: Name in the header
                const profileHeader = html.selector(USER_PROFILE_HEADER_SELECTOR)
                profileHeader.textContent = this.user.name

                // Third: Name in the sidebar 
                const profileSidebarEntry = html.selector(USER_PROFILE_SIDEBAR_ENTRY_SELECTOR)
                profileSidebarEntry.textContent = this.user.name

                // Fourth: Name in the user attributes box
                const profileAttrsFirstName = html.selector(USER_PROFILE_ATTRS_FIRST_NAME_SELECTOR)
                profileAttrsFirstName.textContent = this.user.firstName
                const profileAttrsLastName = html.selector(USER_PROFILE_ATTRS_LAST_NAME_SELECTOR)
                profileAttrsLastName.textContent = this.user.lastName

                // Fifth: student/studentka in the user basic info box (only in polish)
                if (!this.isUsosLanguageEnglish()) {
                    const profileBasicInfo = html.selector(USER_PROFILE_BASIC_INFO_SELECTOR)
                    profileBasicInfo.innerHTML = replaceExpressions(profileBasicInfo.innerHTML, allUsosStrings, this.user.gramaticalGender)
                }

                // Sixth: avatar
                // We only have fem and masc variants available, so lets use masc for neutral for now
                const profileAvatar = html.selector(USER_PROFILE_AVATAR_SELECTOR)
                profileAvatar.setAttribute('src', this.user.gramaticalGender === GramaticalGender.FEMININE ? FEMININE_AVATAR_URL : MASCULINE_AVATAR_URL)
            }
        }

        // <3
        html.selector('usos-copyright').shadowRootSelector('#layoutCopyright > p').textContent = '💙🩷🤍🩷💙'
        
        return true
    }

    private matchAction(action: string): boolean {
        return address().matchQuery(new Map([['_action', action]])) && address().matchPath('/kontroler.php')
    }

    private isUsosLanguageEnglish(): boolean {
        // Check the service name in the top left corner
        return html.selector('div[slot="service-name"]').textContent.includes('Warsaw University of Technology')
    }
}

export default UsosSiteImpl