import { Observer } from "..";
import Wave from "../base";


export default function operatorsCreatorMap<T, S>() {
    return function concat<R>(target: Wave<R> | Observer<R>) {

        const res = new Observer<R | T>()

        const ob = target instanceof Wave ? target.ob : target

        ob.nextToDoList.push(a => {
            res.next(a)
        })
        ;(<Observer<T>>this.ob).nextToDoList.push(a => {
            res.next(a)
        })
        return new Wave<T | R>(res)
    }
}
