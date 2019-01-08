import { Observer } from "..";
import Wave from "../base";


export default function multiMap<T, S>() {
    return function <R>(func: (a: T, ctx: (s?: S) => S, push: (r: R) => void) => void) {
        const res = new Observer<R>()
        const push = (r: R) => { res.next(r) }
        ;(<Observer<T>>this.ob).update(b => { func(b, this.ctx.bind(this), push) })
        return Wave.new(res)
    }
}
