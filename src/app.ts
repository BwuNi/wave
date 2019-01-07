import Wave, { Observer } from "./wave";


document.getElementById('app').innerText = 'Hello World!'


Wave.new(Observer.new<Event>(document.getElementById("app"), 'mousedown'))
    .map(e => Math.floor(Math.random() * 10))
    .filter(e => (console.log("1: " + e), e % 3 > 1))
    .map(e => e % 3)
    .forEach(e => console.log("2：" + e))

