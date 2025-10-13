import config from "../config"
import { getDistance, EnderCrystal } from "../util/util"
import { data } from "../util/data"

let pickedUp;

register("chat", (name) => {
    if (!config.crystalPlaceTimer) return;
    if (name != Player.getName()) return;
    pickedUp = Date.now();
    placeListener.register();
}).setCriteria(/(\w+) picked up an Energy Crystal!/)

const placeListener = register("tick", () => {
    const entities = World.getAllEntitiesOfType(EnderCrystal);
    for (let e of entities) {
        if (getDistance(e.getX(), e.getZ(), Player.getX(), Player.getZ()) < 5 && e.getY() == 224.375) {
            crystalMsg();
            pickedUp = null;
            placeListener.unregister();
        }
    }
}).unregister();

function crystalMsg() {
    const placed = Date.now();
    const placeTime = parseFloat(((placed - pickedUp) / 1000).toFixed(3));
    let msg = `${config.customPrefix} &aCrystal placed in &e${placeTime}s&a.`;
    if (placeTime < data.crystalPlaceTimer.pb) {
        data.crystalPlaceTimer.pb = placeTime;
        data.save();
        msg += " &d&l(PB)";
    }

    new Message(new TextComponent(msg).setHover("show_text", `&dPersonal Best: &a${data.crystalPlaceTimer.pb}s`)).chat();
}

register("worldLoad", () => {
    pickedUp = null;
    placeListener.unregister();
})