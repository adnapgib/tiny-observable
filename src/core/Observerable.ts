import Subscription, { Disposable } from './Subscription'
import Observer from './Observer'
import Subscriber from './Subscriber'

class Observable<T> {
    constructor(private init: ((observer: Observer<T>) => Disposable)) {

    }

    //helper function
    private static _pipe = (...fns: Array<(source: Observable<any>) => Observable<any>>) => {
        return (source: Observable<any>) => fns.reduce((prev, fn) => fn(prev), source)
    }

    subscribe(observer: Observer<T>) {
        const subscription = new Subscription()
        const subscriber = new Subscriber(observer, subscription)
        subscription.add(this.init(subscriber))
        return subscription
    }

    pipe<R>(...fns: Array<(source: Observable<any>) => Observable<any>>): Observable<R> {
        /*
            pipe method take a function which transform one observable to another observable
            and return the new observable
        */
        return Observable._pipe(...fns)(this)

    }
}

export default Observable