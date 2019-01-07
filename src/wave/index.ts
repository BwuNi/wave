

export default class Wave<T>{

    ob: Observer<T>

    constructor(ob: Observer<T>) {
        this.ob = ob
    }
    static new<T>(ob: Observer<T>) {
        return new Wave<T>(ob)
    }
    map<R>(func: (a: T) => R) {
        const res = new Observer<R>()
        this.ob.update(b => { res.next(func(b)) })
        return Wave.new(res)
    }
    forEach(func: (a: T) => void) {
        this.ob.update((b) => { func(b) })
    }
    multiMap<R>(func: (a: T, push: (r: R) => void) => R) {
        const res = new Observer<R>()
        const push = (r: R) => { res.next(r) }
        this.ob.update(b => { func(b, push) })
        return Wave.new(res)
    }
    filter(func: (a: T) => boolean) {
        const res = new Observer<T>()
        this.ob.update(b => { if (func(b)) res.next(b) })
        return Wave.new(res)
    }
    concat<R>(target: Wave<R> | Observer<R>) {

        const res = new Observer<R | T>()

        const ob = target instanceof Wave ? target.ob : target

        ob.nextToDoList.push(a => {
            res.next(a)
        })
        this.ob.nextToDoList.push(a => {
            res.next(a)
        })

        return res
    }


}


export class Observer<T>{
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

    constructor() { }

    update(next: (a: T) => void) {
        this.nextToDoList.push(next)
    }
}


var a = document.getElementById("3")