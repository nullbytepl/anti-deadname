import getWindow from '../userscript/window'
import ApiBridge from './bridge'
import ApiBridgeImpl from './bridge_impl'
import ApiConnector from './connector'

// Tell TypeScript that we will be adding a new property to the window object
declare global {
    interface Window {
        api: ApiBridge
    }
}

class ApiConnectorImpl implements ApiConnector {
    bridge: ApiBridge

    constructor() {
        console.log('ApiConnectorImpl#constructor')
        this.bridge = new ApiBridgeImpl()
    }

    inject() {
        getWindow().api = this.bridge

        return true
    }
}

export default ApiConnectorImpl