import { Observer } from "..";
import Wave from "../base";


export default function filter<T, S>() {
    return function (func: (a: T, ctx: (s?: S) => S) => boolean) {
        const res = new Observer<T>()
        ;(<Observer<T>>this.ob).update(b => { if (func(b, this.ctx.bind(this))) res.next(b) })
        return Wave.new(res)
    }
}
