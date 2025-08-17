import config from "../config"

export const rotate = register("command", (pitch, yaw) => {

    if (Math.abs(yaw) > 180 || Math.abs(pitch) > 90) {
        return ChatLib.chat(`${config.customPrefix} &cPitch and/or Yaw out of bounds.`);
    }

    ChatLib.chat(`${config.customPrefix} &aRotating.`);
    Player.getPlayer().field_70177_z = yaw;
    Player.getPlayer().field_70125_A = pitch;
    
}).setName("rotate");