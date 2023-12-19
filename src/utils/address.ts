import getWindow from '../userscript/window'

abstract class Address {
    matchHost: (host: string | RegExp) => boolean
    matchPath: (path: string | RegExp) => boolean
    matchQuery: (query: Map<string, string>) => boolean
    path: string
}

class AddressImpl implements Address {
    private url: URL

    constructor(url: URL) {
        this.url = url
    }

    matchHost(host: string | RegExp): boolean {
        if (typeof host == 'string') {
            return this.url.host == host
        } else {
            return host.test(this.url.host)
        }
    }

    matchPath(path: string | RegExp): boolean {
        if (typeof path == 'string') {
            return this.url.pathname == path
        } else {
            return path.test(this.url.pathname)
        }
    }

    matchQuery(query: Map<string, string>): boolean {
        for (const [key, value] of query) {
            if (this.url.searchParams.get(key) != value) {
                return false
            }
        }

        return true
    }

    get path(): string {
        return this.url.pathname
    }
    
}

const address = (): Address => {
    return new AddressImpl(new URL(getWindow().location.href))
}

export default address