import Observable from "./core/Observerable"
import Observer from "./core/Observer"
import map from "./operator/map"


const myObservable = new Observable((observer: Observer<number>) => {
    let i = 0
    const id = setInterval(() => {
        observer.next(i++)
        if (i > 5) {
            observer.complete()
        }
    }, 1000)
    return () => {
        clearInterval(id)
    }
})

const disposable = myObservable
    .pipe(
        map(x => x + 100),
        map(x => x % 2 === 0 ? '偶数' : '奇数')
    )
    .subscribe({
        next: val => console.log(val),
        error: err => console.error(err),
        complete: () => console.log('done')
    })



