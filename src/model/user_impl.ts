import User from './user'
import GramaticalGender from './gramatical_gender'

import storage from '../userscript/storage'

const USER_FIRST_NAME_KEY = 'user_first_name'
const USER_LAST_NAME_KEY = 'user_last_name'
const USER_GRAMATICAL_GENDER_KEY = 'user_gender'
const USER_EMOJI_KEY = 'user_emoji'
const USER_HAS_CONFIGURED_KEY = 'user_has_configured'

const ALL_USER_KEYS = [
    USER_EMOJI_KEY,
    USER_FIRST_NAME_KEY,
    USER_LAST_NAME_KEY,
    USER_GRAMATICAL_GENDER_KEY,
]

class UserImpl extends User {
    firstName: string
    lastName: string
    gramaticalGender: GramaticalGender
    emoji: string
    hasUserConfigured: boolean = storage.get(USER_HAS_CONFIGURED_KEY, false)

    constructor() {
        super()
        this.firstName = storage.get(USER_FIRST_NAME_KEY, 'hiii')
        this.lastName = storage.get(USER_LAST_NAME_KEY, 'haaii :3')
        this.gramaticalGender = this.deserializeGender(storage.get(USER_GRAMATICAL_GENDER_KEY, ''))
        this.emoji = storage.get(USER_EMOJI_KEY, '👋')
    }

    private deserializeGender(gender: String): GramaticalGender {
        // FEMININE is encoded as 'f', MASCULINE is encoded as 'm'
        // Default to feminine
        switch (gender) {
            case 'n':
                return GramaticalGender.NEUTER
            case 'm':
                return GramaticalGender.MASCULINE
            case 'f':
                default:
                return GramaticalGender.FEMININE
        }
    }

    private serializeGender(gender: GramaticalGender): string {
        switch (gender) {
            case GramaticalGender.NEUTER:
                return 'n'
            case GramaticalGender.MASCULINE:
                return 'm'
            case GramaticalGender.FEMININE:
            default:
                return 'f'
        }
    }

    setFirstName(firstName: string): void {
        this.firstName = firstName
        storage.set(USER_FIRST_NAME_KEY, firstName)
    }

    setLastName(lastName: string): void {
        this.lastName = lastName
        storage.set(USER_LAST_NAME_KEY, lastName)
    }

    setGramaticalGender(value: string): void {
        this.gramaticalGender = this.deserializeGender(value)
        
        switch (this.gramaticalGender) {
            case GramaticalGender.NEUTER:
                storage.set(USER_GRAMATICAL_GENDER_KEY, 'n')
                break
            case GramaticalGender.MASCULINE:
                storage.set(USER_GRAMATICAL_GENDER_KEY, 'm')
                break
            case GramaticalGender.FEMININE:
            default:
                storage.set(USER_GRAMATICAL_GENDER_KEY, 'f')
        }
    }

    getGramaticalGenderString(): string {
        return this.serializeGender(this.gramaticalGender)
    }

    setEmoji(emoji: string): void {
        this.emoji = emoji
        storage.set(USER_EMOJI_KEY, emoji)
    }

    setHasUserConfigured(): void {
        this.hasUserConfigured = true
        storage.set(USER_HAS_CONFIGURED_KEY, true)
    }
}

export default UserImpl
export { ALL_USER_KEYS }