import JsonRpcRequestError from '../src/errors/JsonRpcRequestError.js';
// import JsonRpcRequestError from '../src/errors/JsonRpcRequestError.js';
// import JsonRpcRequestClient from '../src/JsonRpcRequestClient.js';

export class JsonRpcRequestClient {
    #version = '';
    #method = '';
    #params = [];
    #id = null;

    constructor() {
        console.log('Класс JsonRpcRequestClient');
    }

    get version() {
        return this.#version;
    }

    set version(value) {
        this.#version = value;
    }

    get method() {
        return this.#method;
    }

    set method(value) {
        this.#method = value;
    }

    get params() {
        if (!Array.isArray(this.#params)) {
            throw new JsonRpcRequestError('Поле параметры не является массивом.');
        }
        return this.#params;
    }

    set params(value) {
        if (!Array.isArray(this.#params)) {
            throw new JsonRpcRequestError('Поле параметры не является массивом.');
        }
        this.#params = value;
    }

    get id() {
        return this.#id;
    }

    set id(value) {
        this.#id = value;
    }
}
