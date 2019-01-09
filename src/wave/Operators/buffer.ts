import { Observer } from "..";
import Wave from "../base";


export default function buffer<T, S>() {
    return function <R>(target: Wave<R> | Observer<R>) {

        const res = new Observer<[T[],R]>()

        const ob = target instanceof Wave ? target.ob : target

        let temp:T[] = []

        const _this:Wave<T,S> = this

        _this.ob.update(a=>{
            temp.push(a)
        })

        ob.update(a=>{
            res.next([temp,a])
            temp = []
        })

        return new Wave(res)
    }
}
