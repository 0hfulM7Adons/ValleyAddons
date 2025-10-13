import config from "../config"
import { getClass, ArmorStand, START_MSG } from "../util/util"

let wither = new Text("&8&lWither Key Dropped").setScale(2).setShadow(true);
let blood = new Text("&4&lBlood Key Dropped").setScale(2).setShadow(true);
let witherDropped = false;
let bloodDropped = false;

register("worldLoad", () => {
    witherDisplay.unregister();
    bloodDisplay.unregister();
    tickListener.unregister();
})

register("chat", () => {
    if (!config.witherBloodKeys) return;
    tickListener.register();
}).setCriteria(START_MSG)

register("chat", () => {
    tickListener.unregister();
}).setCriteria(/\[BOSS\] The Watcher: .+/)

const tickListener = register("tick", () => {
    if (getClass() != "Archer" && getClass() != "Mage") return;
    
    const entities = World.getAllEntitiesOfType(ArmorStand);
    for (let i = 0; i < entities.length; ++i) {
        let entity = entities[i];
        if (entity.getName().includes("Wither Key")) {
            witherDisplay.register();
            if (!witherDropped) {
                World.playSound("random.orb", 2, 0.5);
                witherDropped = true;
            }
        } else if (entity.getName().includes("Blood Key")) {
            bloodDisplay.register();
            if (!bloodDropped) {
                World.playSound("random.orb", 2, 0.5);
                bloodDropped = true;
            }
        }
    }
}).unregister();

const witherDisplay = register("renderOverlay", () => {
    wither.draw((Renderer.screen.getWidth() - wither.getWidth()) / 2, (Renderer.screen.getHeight() - wither.getHeight()) / 2 - 50)
}).unregister();

const bloodDisplay = register("renderOverlay", () => {
    blood.draw((Renderer.screen.getWidth() - blood.getWidth()) / 2, (Renderer.screen.getHeight() - blood.getHeight()) / 2 - 50)
}).unregister();

register("chat", () => {
    setTimeout(() => {
        witherDisplay.unregister();
        witherDropped = false;
    }, 500)
}).setCriteria("has obtained Wither Key!").setContains()

register("chat", () => {
    setTimeout(() => {
        witherDisplay.unregister();
        witherDropped = false;
    }, 500)
}).setCriteria("A Wither Key was picked up!")

register("chat", () => {
    setTimeout(() => {
        bloodDisplay.unregister();
        bloodDropped = false;
    }, 500)
}).setCriteria("has obtained Blood Key!").setContains()

register("chat", () => {
    setTimeout(() => {
        bloodDisplay.unregister();
        bloodDropped = false;
    }, 500)
}).setCriteria("A Blood Key was picked up!")