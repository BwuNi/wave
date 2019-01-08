import { Observer } from "..";
import Wave from "../base";


export default function map<T, S>() {
    return function <R>(func: (a: T, ctx: (s?: S) => S) => R) {
        const res = new Observer<R>()
            ; (<Observer<T>>this.ob).update(b => { res.next(func(b, this.ctx.bind(this))) })
        return Wave.new(res)
    }
}
