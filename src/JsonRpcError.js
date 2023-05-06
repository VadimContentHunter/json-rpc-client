import JsonRpcRequestError from '../src/errors/JsonRpcRequestError.js';

export class JsonRpcError {
    #code;
    #message;
    #data = null;

    constructor(json) {
        this.initializeObject(json);
    }

    get code() {
        if (!Number.isInteger(this.#code)) {
            throw new JsonRpcRequestError('Поле code не является целочисленным числом.');
        }
        return this.#code;
    }

    get message() {
        if (typeof this.message !== 'string') {
            throw new JsonRpcRequestError('Поле message не является строкой.');
        }

        if (
            this.#message === '' ||
            this.#message.match(/^(\s+).*$/i) !== null ||
            this.#message.match(/.*(\s)$/i) !== null
        ) {
            throw new JsonRpcRequestError(
                'Поле message не должно быть пустой строкой или содержать пробелы в начале и конце.',
            );
        }

        return this.#message;
    }

    get data() {
        return this.#data;
    }

    initializeObject(json) {
        if (typeof json !== 'string') {
            throw new JsonRpcRequestError('Параметр json не является строкой.');
        }

        let object = JSON.parse(json);
        if (!Object.hasOwn(object, 'code')) {
            throw new JsonRpcRequestError('Не удалось найти в json свойство code');
        }

        if (!Object.hasOwn(object, 'message')) {
            throw new JsonRpcRequestError('Не удалось найти в json свойство message');
        }

        if (!Number.isInteger(object.code)) {
            throw new JsonRpcRequestError('Поле object.code не является целочисленным числом.');
        }

        if (typeof object.message !== 'string') {
            throw new JsonRpcRequestError('Поле object.message не является строкой.');
        }

        if (
            object.message === '' ||
            object.message.match(/^(\s+).*$/i) !== null ||
            object.message.match(/.*(\s)$/i) !== null
        ) {
            throw new JsonRpcRequestError(
                'Поле object.message не должно быть пустой строкой или содержать пробелы в начале и конце.',
            );
        }

        this.#code = object.code;
        this.#message = object.message;
        if (object.hasOwnProperty.call('data')) {
            this.#data = object.data;
        }
    }
}
