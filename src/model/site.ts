import User from './user'

abstract class Site {
    constructor(user: User) {}
    abstract execute(): boolean
    abstract match(): boolean
}

export default Site