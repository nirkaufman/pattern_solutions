
/************************
 *  version I
 ***********************/
interface Subscriber {
  update(publisher: Publisher): void;
}

class Publisher {
  private subscribers: Subscriber[];

  constructor() {
    this.subscribers = [];
  }

  subscribe(subscriber: Subscriber) {
    if (this.subscribers.includes(subscriber)) return;
    this.subscribers.push(subscriber);
  }

  unsubscribe(subscriber: Subscriber) {
    const index = this.subscribers.indexOf(subscriber);

    if (index !== -1) {
      this.subscribers.splice(index, 1);
    }
  }

  publish() {
    this.subscribers.forEach(subscriber => subscriber.update(this))
  }
}


/************************
 *  version II
 ************************/
interface Observable<T> {
  update(state: T): void;
}

class Subject<T> {
  private observables: Set<Observable<T>>;

  constructor() {
    this.observables = new Set<Observable<T>>();
  }

  subscribe(observable: Observable<T>): void {
    this.observables.add(observable);
  }

  unsubscribe(observable: Observable<T>): void {
    this.observables.delete(observable);
  }

  next(state: T): void {
    this.observables.forEach(observables => observables.update(state));
  }
}

class StatefulSubject<T> extends Subject<T> {
  private state: T;

  constructor(initialState: T) {
    super();
    this.state = initialState;
  }

  subscribe(observable: Observable<T>) {
    super.subscribe(observable);
    observable.update(this.state);
  }

  next(state: T) {
    this.state = state;
    super.next(this.state);
  }
}

class Auth extends Publisher {
  private _currentUser: any;

  constructor() {
    super()
    this._currentUser = null;
  }

  get currentUser(): any {
    return this._currentUser;
  }

  signIn() {
    this._currentUser = {name: "Nir"};
    this.publish();
  }

  signOut() {
    this._currentUser = null;
    this.publish();
  }
}


class ToastMessage implements Subscriber{
  showToast(message: string) {
    console.log('Display toast message: ' + message);
  }

  update(publisher: Auth): void {
    if (publisher.currentUser) {
      this.showToast(publisher.currentUser.name)
    }
  }
}
class PermissionManager implements Subscriber{
  getPermissionsForUser(user: any) {
    console.log('Fetching permissions for: ' + user);
  }

  update(publisher: Auth): void {
    this.getPermissionsForUser(publisher.currentUser)
  }
}
class Router implements Subscriber{
  redirectTo(routeName: string) {
    console.log('Redirectong to ' + routeName);
  }
  update(publisher: Auth): void {
    console.log(publisher.currentUser);
    this.redirectTo(publisher.currentUser ? 'dashboard' : 'login')
  }
}

const auth = new Auth();

const toast = new ToastMessage();
const permission = new PermissionManager();
const router = new Router();

auth.subscribe(toast);
auth.subscribe(permission);
auth.subscribe(router);

auth.signIn();
auth.signOut();