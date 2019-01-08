import { Observer } from "..";
import Wave from "../base";


export default function forEach<T, S>() {
    return function (func: (a: T, ctx: (s?: S) => S) => void){
        (<Observer<T>>this.ob).update(b => { func(b, this.ctx.bind(this)) })
    }
}
