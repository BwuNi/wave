import Observer from './Observer'

import {
    map, forEach, multiMap, concat, filter,buffer,debounce
} from './Operators'


export default class Wave<T, S = any>{

    ob: Observer<T>

    _ctx: S = null

    ctx(s?: S) {
        if (s !== undefined) { this._ctx = s }
        return this._ctx
    }

    constructor(ob: Observer<T>, ctx: S = null) {
        this.ob = ob
        this._ctx = null
    }
    static new<T>(ob: Observer<T>) {
        return new this<T>(ob)
    }

    map = map<T, S>()
    forEach = forEach<T, S>()
    multiMap = multiMap<T, S>()
    concat = concat<T, S>()
    filter = filter<T, S>()
    buffer = buffer<T,S>()
    debounce =debounce<T,S>()
}
