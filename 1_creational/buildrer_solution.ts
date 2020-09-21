interface Builder<T> {
  build(): T;
}

interface HttpRequest {
  url:string;
  method:string;
  body?:any;
  params?:string;
  headers?:any;
  retry?:string;
}

// encapsulate the creation of httpOptions and break it to a step by step process
class HttpRequestBuilder implements Builder<HttpRequest> {
  private httpRequestOptions: any;
  
  constructor() {
    this.httpRequestOptions = {};      
  }

  setUtl(url: string) {
    Object.assign(this.httpRequestOptions, {url});
    return this;
  }

  setMethod(method: string) {
    Object.assign(this.httpRequestOptions, {method});
    return this;
  }

  setHeaders(headers:Record<string, string>) {    
    Object.assign(this.httpRequestOptions, {headers});
    return this;
  }

  build(): HttpRequest {
    return this.httpRequestOptions;
  }
}

const request =  new HttpRequestBuilder(); request

request.setUtl('//').setMethod('get');
request.setHeaders({token: '123123123'})

const done = request.build();

console.log(done);