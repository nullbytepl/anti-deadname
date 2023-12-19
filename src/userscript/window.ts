// Wrapper around unsafeWindow

// Typescript doesn't know about unsafeWindow, so we need to declare it
declare const unsafeWindow: Window | undefined

const getWindow = () => {
    if (typeof unsafeWindow === 'undefined') {
        return window
    }
    return unsafeWindow
}

export default getWindow