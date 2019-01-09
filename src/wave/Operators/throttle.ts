import { Observer } from "..";
import Wave from "../base";


export default function debounce<T, S>() {
    return function <R>(
        cb: (() => (Wave<R> | Observer<R>) | void),
        target?:
            Wave<R> |
            Observer<R> |
            number,
    ) {




        const res = new Observer<T>()

        const ob = target instanceof Wave ? target.ob : target

        let isContinue = true
            ;

        // 根据固定的 Observer
        (<Observer<R>>ob).update(a => {
            isContinue = true
        })
            ;
        (<Wave<T, S>>this).ob.update(a => {
            if (isContinue) {
                res.next(a)
                isContinue = false

                // 根据延迟固定时间
                if (typeof ob === 'number') setTimeout(() => { isContinue = true }, ob)

                // 根据 callback 返回的 Observer
                const m = cb()
                const ob0 = a instanceof Wave ? a.ob : a
                    ;
                (<Observer<R>>ob0).update(n => {
                    isContinue = true
                })


            }
        })

        return new Wave(res)
    }
}