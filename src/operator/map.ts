import Observable from "../core/Observerable"

const map = <T, R>(fn: (value: T) => R) => //map orginal value to new value
    (source: Observable<T>) => {
        return new Observable<R>(subscriber => {
            const disposable = source.subscribe({
                next: (value: T) => subscriber.next(fn(value)), //forward new value to subscriber
                error: err => subscriber.error(err),
                complete: () => subscriber.complete()
            })
            return () => {
                disposable.unSubscribe()
            }
        })
    }


export default map