import config from "../config"
import { getScoreboard, removeUnicode } from "../../BloomCore/utils/Utils"
import { isCustomOrder } from "../commands/LeapOrder"

let text = new Text('DUPLICATE CLASS DETECTED').setScale(4).setShadow(true).setAlign('CENTER').setColor(Renderer.DARK_RED);
let classes = [];

register("chat", () => {
    if (!config.dupeClass) return;
    classes = [];
    let sb = getScoreboard(false);
    if (!sb) return;
    for (let i = 0; i < sb.length; ++i) {
        let line = removeUnicode(sb[i]);
        let match = line.match(/\[\S\] \w+ .+/);
        if (match) {
            let c = match[0].substring(1, 2);
            if (classes.indexOf(c) < 0) {
                classes.push(c);
            } else {
                if (c == "M" && isCustomOrder()) continue;
                ChatLib.chat(`${config.customPrefix} &cDuplicate Class Detected`);
                World.playSound(config.dupeClassSound, 2, 1);
                display.register();
                return;
            }
        }
    }
    display.unregister();
}).setCriteria(/^Starting in \d second(s)?\./)

const display = register("renderOverlay", () => {
    text.draw(Renderer.screen.getWidth() / 2, Renderer.screen.getHeight() / 2);
}).unregister();

register("chat", () => {
    display.unregister();
}).setCriteria("[NPC] Mort: Here, I found this map when I first entered the dungeon.")

register("worldLoad", () => {
    display.unregister();
})