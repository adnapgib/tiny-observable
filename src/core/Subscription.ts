type Disposable = () => void //perform unsubscribe operation on this object

class Subscription {
    private disposables: Disposable[] = []
    add(disposable: Disposable) {
        this.disposables.push(disposable)
    }
    unSubscribe() {
        this.disposables.forEach(disposable => disposable()) //clear for all subscriber
        this.disposables = []
    }
}

export default Subscription
export { Disposable }