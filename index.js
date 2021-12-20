"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fetchar = void 0;
const axios_1 = __importDefault(require("axios"));
const handler = {
    get(target, key) {
        target.route.push(key);
        return new Proxy(target, handler);
    },
    apply(target, _, args) {
        return target.axios[target.method](target.route.join('/'), ...args);
    },
};
class Fetchar {
    constructor(config) {
        this.axios = axios_1.default.create(config);
    }
    make(method) {
        const rest = () => { };
        rest.method = method;
        rest.axios = this.axios;
        rest.route = [];
        return new Proxy(rest, handler);
    }
    get get() {
        return this.make('get');
    }
    get post() {
        return this.make('post');
    }
    get put() {
        return this.make('put');
    }
    get patch() {
        return this.make('patch');
    }
    get delete() {
        return this.make('delete');
    }
    get head() {
        return this.make('head');
    }
    get options() {
        return this.make('options');
    }
}
exports.Fetchar = Fetchar;
exports.default = Fetchar;
