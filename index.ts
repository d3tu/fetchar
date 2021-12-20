import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

type Method = 'get' | 'post' | 'put' | 'patch' | 'delete' | 'head' | 'options';

interface Target {
  (): Target;
  method: Method;
  axios: AxiosInstance;
  route: any[];
}

const handler = {
  get(target: Target, key: any): any {
    target.route.push(key);
    return new Proxy(target, handler);
  },
  apply(target: Target, _: any, args: any[]) {
    return target.axios[target.method](target.route.join('/'), ...args);
  },
};

export class Fetchar {
  private axios: AxiosInstance;

  constructor(config?: AxiosRequestConfig<any>) {
    this.axios = axios.create(config);
  }

  private make(method: Method): any {
    const rest = () => {};
    rest.method = method;
    rest.axios = this.axios;
    rest.route = [] as any[];
    return new Proxy(rest as Target, handler);
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

export { Method };

export default Fetchar;
