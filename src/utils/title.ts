import getWindow from '../userscript/window'

abstract class Title {
    value: string
}

class TitleImpl implements Title {
    constructor() {
    }

    get value(): string {
        return getWindow().document.title
    }

    set value(title: string) {
        getWindow().document.title = title
    }
}

const title = new TitleImpl()

export default title