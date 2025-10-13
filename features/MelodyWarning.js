import config from "../config"
import { getClassByName } from "../util/util"
import { data } from "../util/data"
import { registerWhen } from "../../BloomCore/utils/Utils"

let playersStackingMelody = [];
let playerName = "";
let melodyProgress = "";
let furthestAlongMelody = 0;
let currentMelodyProgress = 0;
let phase;
let lastCompleted = [];
let gateBlown = false;
let inP3 = false;

let text = new Text("").setScale(2).setShadow(true).setAlign("CENTER");

register("chat", (message) => {
    if (!config.melodyWarning) return;
    const melodyMatch = message.match(/^Party >[\s\[\w+\]]* (\w+): .*(\d\/\d|\d\d%)$/);

    if (melodyMatch) {
        playersStackingMelody.push(melodyMatch[1]);
        if (melodyMatch[1] === Player.getName()) return;
        currentMelodyProgress = melodyMatch[2];
        if (parseInt(currentMelodyProgress) >= 25) currentMelodyProgress = parseInt(currentMelodyProgress) / 25 + "/4";
        if (currentMelodyProgress > furthestAlongMelody || furthestAlongMelody == 0) {;
            playerName = melodyMatch[1];
            furthestAlongMelody = currentMelodyProgress;
            melodyProgress = furthestAlongMelody;
            World.playSound("note.harp", 2, 2);
            display.register();
        }
        return;
    }

    const terminalMatch = message.match(/^(\w+) activated a terminal! \(\d\/\d\)$/);
    if (terminalMatch && playersStackingMelody.includes(terminalMatch[1])) resetMelody();
    
    const termMessageMatch = message.match(/^(?:\w+ \w{9,9} a \w{5,8}! \((\d)\/(\d)\)|The gate has been destroyed!|The Core entrance is opening!)$/);
    if (!termMessageMatch) return;
    const completed = termMessageMatch[1];
    const total = termMessageMatch[2];

    if (message === "The gate has been destroyed!") {
        gateBlown = true;
        if (lastCompleted[0] == lastCompleted[1]) newPhase();
        return;
    } else if (message === "The Core entrance is opening!") {
        inP3 = false;
        return;
    }
    if (lastCompleted[0] > completed || lastCompleted[1] != total || (completed == total && gateBlown)) newPhase();
    else lastCompleted = [completed, total];
}).setCriteria("${message}")

const resetMelody = () => {
    while (playersStackingMelody.length) playersStackingMelody.pop();
    melodyProgress = "";
    furthestAlongMelody = 0;
    display.unregister();
}

const newPhase = () => {
    while (playersStackingMelody.length) playersStackingMelody.pop();
    melodyProgress = "";
    furthestAlongMelody = 0;
    phase++;
    gateBlown = false;
    lastCompleted = [0, phase === 2 ? 8 : 7];
    display.unregister();
}

register("chat", () => {
    inP3 = true;
    phase = 1;
}).setCriteria("[BOSS] Goldor: Who dares trespass into my domain?")

register("worldLoad", () => {
    newPhase();
    phase = 1;
    inP3 = false;
    lastCompleted = [0, 7];
})

const display = register("renderOverlay", () => {
    if (!melodyProgress) return
    let name;
    if (config.melodyClass) name = getClassByName(playerName);
    else name = playerName;
    let displayMessage = `&5&l${name} &r&dhas Melody! ${melodyProgress}`

    text.setString(displayMessage);
    text.setScale(data.melodyWarning.scale)
    text.draw(data.melodyWarning.x, data.melodyWarning.y)
}).unregister();

const exampleHud = register("renderOverlay", () => {
    const displayMessage = `&ddumbit has Melody! 3/4`

    text.setString(displayMessage);
    text.setScale(data.melodyWarning.scale)
    text.draw(data.melodyWarning.x, data.melodyWarning.y)
}).unregister();

registerWhen(register("dragged", (_0, _1, x, y, bn) => {
    const checkClose = register("GuiClosed", () => {
        checkClose.unregister();
        exampleHud.unregister();
    })
    exampleHud.register();
    if (bn === 2) return;
    data.melodyWarning.x = x;
    data.melodyWarning.y = y;
    data.save();
}), () => config.melodyWarningGui.isOpen())

register("scrolled", (_0, _1, dir) => {
    if (!config.melodyWarningGui.isOpen()) return;
    if (dir == 1) data.melodyWarning.scale += 0.05;
    else data.melodyWarning.scale -= 0.05;
    data.save();
})

register("guiMouseClick", (x, y, bn) => {
    if (!config.melodyWarningGui.isOpen() || bn != 2) return;
    data.melodyWarning.x = 0;
    data.melodyWarning.y = 0;
    data.melodyWarning.scale = 1;
    data.save();
})