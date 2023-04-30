export default class JsonRpcRequestClient {
    #version = '';
    #method = '';
    #params = [];
    #id = null;

    get version() {
        return this.#version;
    }

    set version(value) {
        this.#version = value;
    }

    get method() {
        if (Array.isArray(this.#method)) {
            throw new SyntaxError('Данные неполны: нет имени');
        }
        return this.#method;
    }

    set method(value) {
        this.#method = value;
    }

    get params() {
        return this.#params;
    }

    set params(value) {
        this.#params = value;
    }

    get id() {
        return this.#id;
    }

    set id(value) {
        this.#id = value;
    }
}
