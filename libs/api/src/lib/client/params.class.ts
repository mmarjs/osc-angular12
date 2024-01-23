interface Dictionary<T> {
  [index: string]: T;
}

export class Params {
  constructor(
    private request: Dictionary<any>,
    private path: Array<string> = [],
    private query: Array<string> = [],
    private body: Array<string> = []
  ) { }

  get forPath(): string {
    const params: Dictionary<any> = {};
    for (const key of this.path) {
      if (this.request.hasOwnProperty(key)) {
        params[key] = this.request[key];
      }
    }

    const keys = Object.keys(params);
    if (keys.length) {
      const esc = encodeURIComponent;
      return '?' + keys.map(k => esc(k) + '=' + esc(params.key)).join('&');
    }

    return '';
  }

  get forQuery() {
    const params = {};
    for (const key of this.query) {
      if (this.request.hasOwnProperty(key)) {
        params[key] = this.request[key];
      }
    }
    return params;
  }

  get forBody() {
    // TODO custom processing for multiple formData + body parameters
    // TODO consider FormData creation for files
    return this.body[0] && this.request?.hasOwnProperty(this.body[0])
      ? this.request[this.body[0]]
      : undefined;
  }
}
