// Simple wrapper around GM_info
// Currently only used for version

// Typescript doesn't know about GM_info, so we need to declare it
declare const GM_info: {
    script: {
        version: string
    }
}

const info = {
    get version(): string {
        return GM_info.script.version
    },
}

export default info