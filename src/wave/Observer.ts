export default class Observer<T>{
    next(a: T) { this.nextToDoList.forEach(v => v(a)) }

    nextToDoList: ((a: T) => void)[] = []

    static new<T>(
        ...arg:
            [HTMLElement, string]
            | [Observer<T>]
    ): Observer<T> | Observer<Event> {

        if (arg[0] instanceof Observer) {
            const [ob] = <[Observer<T>]>arg
            const obClone = new Observer<T>()
            return obClone
        } else if (arg[0] instanceof HTMLElement && typeof arg[1] === 'string') {
            const [dom, event] = <[HTMLElement, string]>arg
            const ob = new Observer<Event>()
            dom.addEventListener(event, (e) => {
                ob.next(e)
            })
            return ob
        }
    }

    static formEvent() {

    }

    update(next: (a: T) => void) {
        this.nextToDoList.push(next)
    }
}
