export default class JsonRpcRequestError extends Error {
    constructor(message) {
        super(message);
        this.name = 'JsonRpcRequestError';
    }
}
