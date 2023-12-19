// Wrapper around GM_getValue and GM_setValue

// Typescript doesn't know about GM_getValue and GM_setValue, so we need to declare them
declare const GM_getValue: (key: string, defaultValue: any) => any
declare const GM_setValue: (key: string, value: any) => void

// TODO: move to GM.* when we're ready
declare const GM: {
    getValue: (key: string, defaultValue: any) => Promise<any>
    setValue: (key: string, value: any) => Promise<any>
}

const storage = {
    get(key: string, defaultValue: any): any {
        //if (typeof GM.getValue != 'undefined') {
        //    return GM.getValue(key, defaultValue)
        //}
        return GM_getValue(key, defaultValue) 
    },
    set(key: string, value: any): void {
        //if (typeof GM.setValue != 'undefined') {
        //    return GM.setValue(key, value)
        //}
        GM_setValue(key, value)
    },
}

export default storage