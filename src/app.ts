import { Wave, Observer } from "./wave";



document.getElementById('app').innerText = 'Hello World!'


Wave.new(Observer.new<Event>(document.getElementById("app"), 'mousedown'))
    .map<["mousedown", number]>(e => ["mousedown", e.timeStamp])
    .concat(
        Wave.new(Observer.new<Event>(document.getElementById("app"), 'mouseup'))
            .map<["mouseup", number]>(e => ["mouseup", e.timeStamp])
    )
    .multiMap<true>((e, ctx, push) => {
        if (e[0] === 'mousedown') ctx(e[1])
        else if (e[0] === 'mouseup' && e[1] - ctx() > 1000) {
            push(true)
        }
    })
    .forEach(e => { alert('deep press') })


