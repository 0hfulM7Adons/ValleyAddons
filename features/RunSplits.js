import Dungeon from "../../BloomCore/dungeons/Dungeon"
import config from "../config"
import { formatMinutes, S32PacketConfirmTransaction, START_MSG, RUN_END_CRITERIA } from "../util/util"
import splitInfo from "../util/splits"
import { onChatPacket } from "../../BloomCore/utils/Events"
import { data } from "../util/data"
import { registerWhen } from "../../BloomCore/utils/Utils"

let currRunSplits = null;
const triggers = [];
let currentFloor = null;

let ticks = 0;
let combinedSplits = [];
let msgSent = false;

let splitMsg = new Text("").setShadow(true).setAlign("RIGHT");
let namesMsg = new Text("").setShadow(true);

const tickChecker = register("packetReceived", () => {
    ticks++;
}).setFilteredClass(S32PacketConfirmTransaction).unregister();

const cleanUp = () => {
    while (triggers.length) {
        triggers.pop().unregister();
    }
    currRunSplits = null;
    currentFloor = null;
}

register("worldLoad", () => {
    cleanUp();
    ticks = 0;
    msgSent = false;
    combinedSplits = [];
    splitsListener.unregister();
    tickChecker.unregister();
})

const registerSplits = (floor) => {
    if (!floor) return;
    let floorKey = floor;
    
    if (!(floorKey in splitInfo)) {
        floorKey = "F" + floorKey.slice(1);
        if (!(floorKey in splitInfo)) {
            ChatLib.chat(`Could not find split for ${floor}`);
            return;
        }
    }

    currentFloor = floor;
    const splitData = splitInfo[floorKey];
    currRunSplits = {};

    for (let i = 0; i < splitData.length; ++i) {
        let phase = splitData[i];

        currRunSplits[phase.name] = {
            start: null,
            end: null,
            startTicks: null,
            endTicks: null
        }

        let currSplit = currRunSplits[phase.name];
        let currSplitIndex = i;

        let startCriteria = phase.start ?? null;
        let endCriteria = phase.end ?? RUN_END_CRITERIA;

        let startTrigger = null;
        if (startCriteria) startTrigger = onChatPacket(() => {
            currSplit.start = Date.now();
            currSplit.startTicks = ticks;
            startTrigger.unregister();
        }).setCriteria(startCriteria)

        let endTrigger = onChatPacket(() => {
            if (!currSplit.start) return;

            currSplit.end = Date.now();
            currSplit.endTicks = ticks;
            let { start, end, startTicks, endTicks } = currSplit;
            const delta = end - start;
            const deltaTicks = endTicks - startTicks;

            let timePhase = config.runSplitsMode == 0 ? `${phase.name} &atook ${config.rtc}${formatMinutes(delta / 1000, true)} ${config.pc}(${config.stc}${formatMinutes(deltaTicks / 20)}${config.pc})` : `${phase.name} &atook ${config.rtc}${formatMinutes(delta / 1000, true)} ${config.pc}(${config.stc}${calcDiff(delta, deltaTicks)}${config.pc})`;
            combinedSplits.push(timePhase);
            
            ChatLib.chat(timePhase);
            
            if (endCriteria == RUN_END_CRITERIA) endTrigger.unregister();

            if (currSplitIndex < splitInfo[floorKey].length - 1 && !splitInfo[floorKey][currSplitIndex + 1].start) {
                let nextPhase = splitInfo[floorKey][currSplitIndex + 1].name;
                currRunSplits[nextPhase].start = Date.now();
                currRunSplits[nextPhase].startTicks = ticks;
            }
        }).setCriteria(endCriteria)

        if (startTrigger) triggers.push(startTrigger);
        triggers.push(endTrigger);
    }

    triggers.push(register("renderOverlay", () => {
        if (!Dungeon.inDungeon) return;
        renderGui();
    }))

}

const renderGui = () => {
    const splitTimes = {};
    let [rt, st, p] = [config.rti, config.sti, config.pi];

    Object.entries(currRunSplits).forEach(([name, info]) => {
        let { start, end, startTicks, endTicks } = info;
        let timeStr = `${config.rti}0.00s ${config.pi}(${config.sti}0.00s${config.pi})`;
        if (!end) {
            if (start) {
                rt = config.rto;
                st = config.sto;
                p = config.po;
            }
            end = Date.now();
            endTicks = ticks;
        } else {
            rt = config.rtc;
            st = config.stc;
            p = config.pc;
        }
        if (start) {
            let delta = end - start;
            let deltaTicks = endTicks - startTicks;
            timeStr = config.runSplitsMode == 0 ? `${rt}${formatMinutes(delta / 1000, true)} ${p}(${st}${formatMinutes(deltaTicks / 20)}${p})` : `${rt}${formatMinutes(delta / 1000, true)} ${p}(${st}${calcDiff(delta, deltaTicks)}${p})`;
        } else {
            rt = config.rti;
            st = config.sti;
            p = config.pi;
        }

        splitTimes[name] = timeStr;

        const phaseNames = Object.keys(splitTimes).join("\n");
        const phaseTimes = Object.values(splitTimes).join("\n");

        namesMsg.setString(phaseNames);
        namesMsg.setScale(data.runSplits.scale);
        namesMsg.draw(data.runSplits.x, data.runSplits.y);

        splitMsg.setString(phaseTimes);
        splitMsg.setScale(data.runSplits.scale);
        splitMsg.draw(data.runSplits.x + (data.runSplits.scale * 170), data.runSplits.y);
    })
}

const splitsListener = register("tick", () => {
    if (!config.runSplits) {
        cleanUp();
        return;
    }
    if (triggers.length) return;

    registerSplits(Dungeon.floor);
}).unregister();

register("chat", () => {
    splitsListener.register();
    tickChecker.register();
}).setCriteria(/\w+ is now ready!/)

register("chat", () => {
    if (msgSent) return;
    let timeLoss = (((currRunSplits[Object.keys(currRunSplits)[Object.keys(currRunSplits).length - 1]].end - currRunSplits[Object.keys(currRunSplits)[0]].start) / 1000) - (currRunSplits[Object.keys(currRunSplits)[Object.keys(currRunSplits).length - 1]].endTicks - currRunSplits[Object.keys(currRunSplits)[0]].startTicks) / 20).toFixed(2);
    let msg = "";
    msgSent = true;
    setTimeout(() => {
        for (let i = 0; i < combinedSplits.length - 1; ++i) {
            if (combinedSplits[i]) msg += `${combinedSplits[i]}\n`;
        }
        msg += combinedSplits[combinedSplits.length - 1];
        ChatLib.chat(msg);
        ChatLib.chat(`${config.customPrefix} &aApproximately &e${timeLoss}s &alost to lag.`);
    }, 1000)
}).setCriteria(RUN_END_CRITERIA)

const exampleHud = register("renderOverlay", () => {
    let tempSplitNames = `&4Blood Open
    &cBlood Clear
    &dPortal
    &9Boss Entry
    &5Maxor
    &3Storm
    &eTerminals
    &6Goldor
    &cNecron
    &4Dragons
    `;

    let tempSplitTimes = ``;
    for (let i = 0; i < 10; ++i) {
        tempSplitTimes += `${config.rti}0.00s ${config.pi}(${config.sti}0.00s${config.pi})\n`;
    }

    namesMsg.setString(tempSplitNames);
    namesMsg.setScale(data.runSplits.scale);
    namesMsg.draw(data.runSplits.x, data.runSplits.y);

    splitMsg.setString(tempSplitTimes);
    splitMsg.setScale(data.runSplits.scale);
    splitMsg.draw(data.runSplits.x + (170 * data.runSplits.scale), data.runSplits.y);
}).unregister();

registerWhen(register("dragged", (dx, dy, x, y, bn) => {
    const checkClose = register("GuiClosed", () => {
        checkClose.unregister();
        exampleHud.unregister();
    })
    exampleHud.register();
    if (bn == 2) return;
    data.runSplits.x = x;
    data.runSplits.y = y;
    data.save();
}), () => config.runSplitsGui.isOpen())

register("scrolled", (x, y, dir) => {
    if (!config.runSplitsGui.isOpen()) return;
    if (dir == 1) data.runSplits.scale += 0.05;
    else data.runSplits.scale -= 0.05;
    data.save();
})

register("guiMouseClick", (x, y, bn) => {
    if (!config.runSplitsGui.isOpen() || bn != 2) return;
    data.runSplits.x = 0;
    data.runSplits.y = 0;
    data.runSplits.scale = 1;
    data.save();
})

function calcDiff(real, server) {
    let a = real / 1000;
    let b = server / 20;
    let diff = a - b;
    if (diff >= 0) {
        return `+${diff.toFixed(2)}s`;
    }
    return `${diff.toFixed(2)}s`;
}