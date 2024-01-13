
// Interface to talk between the script (storage) and the client (the config website)
// All methods are from the script's perspective
abstract class ApiConnector {
    abstract inject(): boolean
}

export default ApiConnector