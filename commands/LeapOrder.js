import config from "../config"
import { getScoreboard, removeUnicode } from "../../BloomCore/utils/Utils"

/*
A: B H M T
B: A H M T
M: A B H T
T: A B H M
H: A B M T
*/

let customOrder = false;

export function isCustomOrder() {
    return customOrder;
}

let players = [];
let classes = [];

export const leapOrder = register("command", (...args) => {
    if (!args[0]) return ChatLib.chat(`${config.customPrefix} &cPlease enter the username of the second mage.`)
    let healerArg = args[0].toLowerCase();

    let odOrder = false;
    if (args[1] == "od") odOrder = true;

    players = [];
    classes = [];

    let sb = getScoreboard(false);
    if (!sb) return;

    // Add players to map
    for (let i = 0; i < sb.length; ++i) {
        let line = removeUnicode(sb[i]);
        let match = line.match(/\[(A|B|H|M|T)\] ([A-Za-z0-9_]+) .+/);
        if (!match) continue;

        let clazz = match[1];
        let name = match[2];

        classes.push(clazz);
        players.push(name.toLowerCase());
    }

    let healer = players.find(p => p.toLowerCase().startsWith(healerArg));
    if (!healer) return ChatLib.chat(`${config.customPrefix} &cNo username found that starts with &e${healerArg}`);

    setHealer(healer);

    // Check map size
    if (players.length != 5) return ChatLib.chat(`${config.customPrefix} &cSize of party is not 5.`);

    if (!checkClasses(classes)) return ChatLib.chat(`${config.customPrefix} &cClasses are not correct. Please make sure there is 1 archer, 1 bers, 2 mages, and 1 tank.`);

    let order = odOrder ? getOdOrder(getOwnClass()) : getOrder(getOwnClass());
    let namesOrder = getNamesOrder(order);

    ChatLib.chat(`${config.customPrefix} &aRunning command: &e/od leaporder ${namesOrder[0]} ${namesOrder[1]} ${namesOrder[2]} ${namesOrder[3]}`);
    ChatLib.command(`od leaporder ${namesOrder[0]} ${namesOrder[1]} ${namesOrder[2]} ${namesOrder[3]}`, true);
    ChatLib.chat(`${config.customPrefix} &aDupe class checker will now ignore dupe mage for the rest of the session.`)
    customOrder = true;
}).setName("leaporder").setAliases(["lo"])

function setHealer(name) {
    let ind = players.indexOf(name);
    if (ind < 0) return ChatLib.chat(`${config.customPrefix} &e${name} &cnot found in list of players.`);
    if (classes[ind] != "M") ChatLib.chat(`${config.customPrefix} &e${name} &cis not on the mage class.`);
    classes[ind] = "H";
}

function checkClasses(arr) {
    return (
        arr.filter(c => c === "A").length === 1 &&
        arr.filter(c => c === "B").length === 1 &&
        arr.filter(c => c === "M").length === 1 &&
        arr.filter(c => c === "T").length === 1 &&
        arr.filter(c => c === "H").length === 1
    );
}

function getOwnClass() {
    let ind = players.indexOf(Player.getName().toLowerCase());
    if (ind < 0) return ChatLib.chat(`${config.customPrefix} &cCould not find own class.`);
    return classes[ind];
}

function getOrder(ownClass) {
    switch (ownClass) {
        case "A":
            return ["B", "H", "M", "T"];
        case "B":
            return ["A", "H", "M", "T"];
        case "M":
            return ["A", "B", "H", "T"];
        case "T":
            return ["A", "B", "H", "M"];
        case "H":
            return ["A", "B", "M", "T"];
        default:
            ChatLib.chat("error getting leap order");
            break;
    }
}

function getOdOrder(ownClass) {
    switch (ownClass) {
        case "A":
            return ["M", "B", "H", "T"];
        case "B":
            return ["A", "M", "H", "T"];
        case "M":
            return ["A", "B", "H", "T"];
        case "T":
            return ["A", "B", "H", "M"];
        case "H":
            return ["A", "B", "M", "T"];
        default:
            ChatLib.chat("error getting od leap order");
            break;
    }
}

function getNamesOrder(arr) {
    let names = [];
    for (let i = 0; i < 4; ++i) {
        let ind = classes.indexOf(arr[i]);
        names.push(players[ind]);
    }
    return names;
}