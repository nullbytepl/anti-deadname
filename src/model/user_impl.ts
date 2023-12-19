import User from './user'
import GramaticalGender from './gramatical_gender'

import storage from '../userscript/storage'

const USER_FIRST_NAME_KEY = 'user_first_name'
const USER_LAST_NAME_KEY = 'user_last_name'
const USER_GRAMATICAL_GENDER_KEY = 'user_gender'
const USER_EMOJI_KEY = 'user_emoji'

class UserImpl extends User {
    firstName: string
    lastName: string
    gramaticalGender: GramaticalGender
    emoji: string

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
}

export default UserImpl