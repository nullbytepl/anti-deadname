import GramaticalGender from './gramatical_gender'

abstract class User {
    gramaticalGender: GramaticalGender
    firstName: string
    lastName: string
    emoji: string
    get name(): string {
        return `${this.firstName} ${this.lastName}`
    }
    toString(): string {
        return `${this.name} (${this.gramaticalGender})`
    }
    get initials(): string {
        // First letter of the first name + first letter of the last name
        // If either of the names is empty, return the first letter of the non-empty one
        // If both are empty, return '?'
        const firstName = this.firstName
        const lastName = this.lastName
        if (firstName.length == 0 && lastName.length == 0) {
            return '?'
        } else if (firstName.length == 0) {
            return lastName[0]
        } else if (lastName.length == 0) {
            return firstName[0]
        } else {
            return firstName[0] + lastName[0]
        }
    }
    abstract setFirstName(firstName: string): void
    abstract setLastName(lastName: string): void
    abstract setGramaticalGender(gramaticalGender: string): void
    abstract getGramaticalGenderString(): string
    abstract setEmoji(emoji: string): void
    
    // Methods to check whether the user has configured the extension
    hasUserConfigured: boolean
    abstract setHasUserConfigured(): void
}

export default User