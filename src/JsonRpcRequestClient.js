import JsonRpcRequestError from '../src/errors/JsonRpcRequestError.js';
// import JsonRpcRequestError from '../src/errors/JsonRpcRequestError.js';
// import JsonRpcRequestClient from '../src/JsonRpcRequestClient.js';

export class JsonRpcRequestClient {
    #version = '2.0';
    #method = '';
    #params = [];
    #lockId = false;
    #id = null;
    static globalId = 0;

    constructor(_method = '', _params = [], _autoId = true, _lockId = true) {
        this.lockId = _lockId;
        this.method = _method;
        this.params = _params;
        JsonRpcRequestClient.globalId += 1;

        if (_autoId === true) {
            this.#id = JsonRpcRequestClient.globalId;
        }
    }

    // get set for this.#version
    get version() {
        if (typeof this.#version !== 'string') {
            throw new JsonRpcRequestError('Поле version не является строкой.');
        }

        if (
            this.#version === '' ||
            this.#version.match(/^(\s+).*$/i) !== null ||
            this.#version.match(/.*(\s)$/i) !== null
        ) {
            throw new JsonRpcRequestError(
                'Поле version не должно быть пустой строкой или содержать пробелы в начале и конце.',
            );
        }

        return this.#version;
    }

    set version(value) {
        if (typeof value !== 'string') {
            throw new JsonRpcRequestError('Значение value для version не является строкой.');
        }

        if (value === '' || value.match(/^(\s+).*$/i) !== null || value.match(/.*(\s)$/i) !== null) {
            throw new JsonRpcRequestError(
                'Значение value для version не должно быть пустой строкой или содержать пробелы в начале и конце.',
            );
        }

        this.#version = value;
    }

    // get set for this.#method
    get method() {
        if (typeof this.#method !== 'string') {
            throw new JsonRpcRequestError('Поле method не является строкой.');
        }

        if (
            this.#method === '' ||
            this.#method.match(/^(\s+).*$/i) !== null ||
            this.#method.match(/.*(\s)$/i) !== null
        ) {
            throw new JsonRpcRequestError(
                'Поле method не должно быть пустой строкой или содержать пробелы в начале и конце.',
            );
        }
        return this.#method;
    }

    set method(value) {
        if (typeof value !== 'string') {
            throw new JsonRpcRequestError('Значение value для method не является строкой.');
        }

        this.#method = value;
    }

    // get set for this.#params
    get params() {
        if (!Array.isArray(this.#params) && typeof this.#params !== 'object') {
            throw new JsonRpcRequestError('Поле params не является массивом или объектом.');
        }
        return this.#params;
    }

    set params(value) {
        if (!Array.isArray(value) && typeof value !== 'object') {
            throw new JsonRpcRequestError('Значение value для params не является массивом или объектом.');
        }
        this.#params = value;
    }

    // get set for this.#lockId
    get lockId() {
        if (typeof this.#lockId !== 'boolean') {
            throw new JsonRpcRequestError('Поле lockId не является boolean.');
        }

        return this.#lockId;
    }

    set lockId(value) {
        if (typeof value !== 'boolean') {
            throw new JsonRpcRequestError('Значение value для lockId не является boolean.');
        }

        this.#lockId = value;
    }

    // get set for this.#id
    get id() {
        if (typeof this.#id !== 'number' && this.#id !== null) {
            throw new JsonRpcRequestError('Поле id не является числом или null.');
        }

        if (this.#id < 0) {
            throw new JsonRpcRequestError('Поле id не должно быть меньше 0.');
        }

        return this.#id;
    }

    set id(value) {
        if (this.lockId === true) {
            throw new JsonRpcRequestError(
                'Изменение id заблокировано. ' +
                    'Измените значение lockId, для разблокировки или используйте метод setIdNull, ' +
                    'для установки параметру id значение null.',
            );
        }

        if (typeof value !== 'number') {
            throw new JsonRpcRequestError('Значение value для id не является числом.');
        }

        if (value < 0) {
            throw new JsonRpcRequestError('Значение value для id не должно быть меньше 0.');
        }

        this.#id = value;
    }

    toJSON() {
        return this.getRequestObject();
    }

    setIdNull() {
        this.#id = null;
    }

    getRequestObject() {
        const obj = {
            jsonrpc: this.version,
            method: this.method,
        };

        if (typeof this.params === 'object' || this.params.length > 0) {
            obj.params = this.params;
        }

        if (this.id !== null) {
            obj.id = this.id;
        }

        return obj;
    }

    getRequestJson() {
        return JSON.stringify(this.getRequestObject());
    }
}
