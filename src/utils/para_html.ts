// Interface to abstract accessing HTML elements
// The main idea here is to reduce the amount of boilerplate code
// Mainly, we want to avoid checking if the element exists before accessing it
// All methods here are safe to use, even if the element doesn't exist
abstract class ParaHTMLElement {
    constructor() {} // The abstraction doesn't define the way we create the object from an HTMLElement
    selector: (selector: string) => ParaHTMLElement // Get subelement
    selectorAll: (selector: string) => ParaHTMLElement[]
    shadowRootSelector: (selector: string) => ParaHTMLElement // Get subelement from shadow root
    textContent: string // Text content of the element. Read-write
    innerText: string // Text content of the element. Read-write
    innerHTML: string // HTML content of the element. Read-write
    exists: boolean // Does the element exist? Read-only
    getAttribute: (name: string) => string | null // Get attribute value
    setAttribute: (name: string, value: string) => void // Set attribute value
}

class ParaHTMLElementImpl implements ParaHTMLElement {
    private element: Element

    constructor(selector: string | null = null, parent: Document | Element | ShadowRoot | null = document) {
        console.log(`ParaHTMLElementImpl#constructor() selector: ${selector}, (parent==document)=${parent==document}`)
        if (parent === null) {
            console.log('ParaHTMLElementImpl#constructor() parent==null')
        } else if (selector === null) {
            console.log('ParaHTMLElementImpl#constructor() selector==null')
        } else {
            let elements = parent.querySelectorAll(selector)
            if (elements.length > 1) {
                console.error(`ParaHTMLElementImpl#constructor() selector ${selector} matches more than one element!`)
            }
            this.element = elements[0]
            if (this.element === null) {
                console.log('ParaHTMLElementImpl#constructor() element==null')
            }
        }
        
    }

    static fromHTMLElement(element: Element): ParaHTMLElement {
        const paraHTMLElement = new ParaHTMLElementImpl()
        paraHTMLElement.element = element
        return paraHTMLElement
    }

    get exists(): boolean {
        return this.element !== null
    }

    get textContent(): string {
        return this.exists ? this.element.textContent : ''
    }

    set textContent(text: string) {
        if (this.exists) {
            this.element.textContent = text
        } else {
            console.log('ParaHTMLElementImpl#textContent=() element==null')
        }
    }

    get innerText(): string {
        return this.exists ? (this.element as HTMLElement).innerText : ''
    }

    set innerText(text: string) {
        if (this.exists) {
            (this.element as HTMLElement).innerText = text
        } else {
            console.log('ParaHTMLElementImpl#innerText=() element==null')
        }
    }

    get innerHTML(): string {
        return this.exists ? (this.element as HTMLElement).innerHTML : ''
    }

    set innerHTML(html: string) {
        if (this.exists) {
            (this.element as HTMLElement).innerHTML = html
        } else {
            console.log('ParaHTMLElementImpl#innerHTML=() element==null')
        }
    }

    selector(selector: string): ParaHTMLElement {
        return new ParaHTMLElementImpl(selector, this.element)
    }

    selectorAll(selector: string): ParaHTMLElement[] {
        return Array.from(this.element.querySelectorAll(selector)).map((element) => ParaHTMLElementImpl.fromHTMLElement(element))
    }

    shadowRootSelector(selector: string): ParaHTMLElement {
        return new ParaHTMLElementImpl(selector, this.element.shadowRoot)
    }

    getAttribute(name: string): string | null {
        return this.exists ? this.element.getAttribute(name) : null
    }

    setAttribute(name: string, value: string): void {
        if (this.exists) {
            this.element.setAttribute(name, value)
        } else {
            console.log('ParaHTMLElementImpl#setAttribute() element==null')
        }
    }
}

const html = {
    selector: (selector: string): ParaHTMLElement => {
        return new ParaHTMLElementImpl(selector)
    },
    selectorAll: (selector: string): ParaHTMLElement[] => {
        return Array.from(document.querySelectorAll(selector)).map((element) => ParaHTMLElementImpl.fromHTMLElement(element))
    },
}

export default html