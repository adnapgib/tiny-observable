import Observer from "./Observer"
import Subscription from "./Subscription"

class Subscriber<T> implements Observer<T> {
    isComplete = false //indicate whether Observer.complete method is called
    constructor(
        private target: Observer<T>,
        private subscription: Subscription
    ) {
        subscription.add(() => { this.isComplete = true }) //emit complete signal when unsubscribe
    }
    next = (value: T) => {
        if (!this.isComplete) {
            this.target.next(value) //emit new value here
        }
    }
    error = (err: any) => {
        if (!this.isComplete) {
            this.isComplete = true //emit an error signal here and you can't emit new value any more
            this.target.error(err)
            this.subscription.unSubscribe()
        }
    }
    complete = () => {
        if (!this.isComplete) {
            this.isComplete = true // emit an complete signal here and you can't emit new value any more
            this.target.complete()
            this.subscription.unSubscribe()
        }
    }
}

export default Subscriber
