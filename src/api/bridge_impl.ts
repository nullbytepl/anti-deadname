import User from '../model/user'
import UserImpl from '../model/user_impl'
import ApiBridge from './bridge'
import info from '../userscript/info'

class ApiBridgeImpl implements ApiBridge {
    apiVersion: number = 1
    scriptVersion: string = info.version
    private user: User

    constructor() {
        console.log(`ApiBridgeImpl#constructor (apiVersion ${this.apiVersion})`)
        this.user = new UserImpl()
    }

    get firstName(): string {
        return this.user.firstName
    }

    set firstName(firstName: string) {
        this.user.setHasUserConfigured()
        this.user.setFirstName(firstName)
    }

    get lastName(): string {
        return this.user.lastName
    }

    set lastName(lastName: string) {
        this.user.setHasUserConfigured()
        this.user.setLastName(lastName)
    }

    get gender(): string {
        return this.user.getGramaticalGenderString()
    }

    set gender(gramaticalGender: string) {
        this.user.setHasUserConfigured()
        this.user.setGramaticalGender(gramaticalGender)
    }

    get emoji(): string {
        return this.user.emoji
    }

    set emoji(emoji: string) {
        this.user.setHasUserConfigured()
        this.user.setEmoji(emoji)
    }

    get hasUserConfigured(): boolean {
        return this.user.hasUserConfigured
    }
}

export default ApiBridgeImpl