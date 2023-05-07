import JsonRpcRequestError from '../src/errors/JsonRpcRequestError.js';
import { JsonRpcError } from '../src/JsonRpcError.js';

export class JsonRpcResponseClient {
    #lockVersion = '2.0';
    #version;
    #result;
    #error;
    #id;

    constructor(json) {
        if (typeof json === 'object') {
            this.initialize(json);
        } else {
            this.initializeObjectFromJson(json);
        }
    }

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

    get id() {
        if (typeof this.#id !== 'number' && this.#id !== null) {
            throw new JsonRpcRequestError('Поле id не является числом или null.');
        }

        if (this.#id < 0 && this.#id !== null) {
            throw new JsonRpcRequestError('Поле id не должно быть меньше 0.');
        }

        return this.#id;
    }

    get result() {
        if (typeof this.#result === 'undefined') {
            throw new JsonRpcRequestError('Поле result должно иметь значение.');
        }

        if (typeof this.#result !== 'undefined' && this.#error instanceof JsonRpcError) {
            throw new JsonRpcRequestError(
                'Только одно поле должно иметь значение ИЛИ JsonRpcResponseClient.result ИЛИ JsonRpcResponseClient.error!',
            );
        }

        return this.#result;
    }

    get error() {
        if (!(this.#error instanceof JsonRpcError)) {
            throw new JsonRpcRequestError('Поле error должно быть объектом JsonRpcError класса.');
        }

        if (typeof this.#result !== 'undefined' && this.#error instanceof JsonRpcError) {
            throw new JsonRpcRequestError(
                'Только одно поле должно иметь значение ИЛИ JsonRpcResponseClient.result ИЛИ JsonRpcResponseClient.error!',
            );
        }

        return this.#error;
    }

    initializeObjectFromJson(json) {
        if (typeof json !== 'string') {
            throw new JsonRpcRequestError('Параметр json не является строкой.');
        }

        let object = JSON.parse(json, (key, value) => {
            if (key === 'error') return new JsonRpcError(value);
            return value;
        });

        if (Array.isArray(object)) {
            object.forEach((elemObject) => {
                this.initialize(elemObject);
            });
        } else {
            this.initialize(object);
        }
    }

    initialize(object) {
        if (!Object.hasOwn(object, 'version') && !Object.hasOwn(object, 'jsonrpc')) {
            throw new JsonRpcRequestError('Не удалось найти в json свойство version или jsonrpc');
        }

        if (Object.hasOwn(object, 'jsonrpc')) {
            // eslint-disable-next-line no-param-reassign
            object.version = object.jsonrpc;
        }

        if (!Object.hasOwn(object, 'id')) {
            throw new JsonRpcRequestError('Не удалось найти в json свойство id');
        }

        if (!Object.hasOwn(object, 'result') && !Object.hasOwn(object, 'error')) {
            throw new JsonRpcRequestError('Не удалось найти в json свойство result или error');
        }

        if (typeof object.version !== 'string') {
            throw new JsonRpcRequestError('Поле object.version не является строкой.');
        }

        if (
            object.version === '' ||
            object.version.match(/^(\s+).*$/i) !== null ||
            object.version.match(/.*(\s)$/i) !== null
        ) {
            throw new JsonRpcRequestError(
                'Поле object.version не должно быть пустой строкой или содержать пробелы в начале и конце.',
            );
        }

        if (object.version !== this.#lockVersion) {
            throw new JsonRpcRequestError('Версия ответа не ' + this.#lockVersion);
        }

        if (!Number.isInteger(object.id) && object.id !== null) {
            throw new JsonRpcRequestError('Поле object.id не является числом или null.');
        }

        if (object.id < 0 && object.id !== null) {
            throw new JsonRpcRequestError('Поле object.id не должно быть меньше 0.');
        }

        if (typeof object.result !== 'undefined' && object.error instanceof JsonRpcError) {
            throw new JsonRpcRequestError('Только одно поле должно иметь значение ИЛИ object.result ИЛИ object.error!');
        }

        this.#version = object.version;
        this.#id = object.id !== null ? Number(object.id) : null;

        if (typeof object.result === 'undefined') {
            this.#error = object.error;
        } else {
            this.#result = object.result;
        }
    }
}
