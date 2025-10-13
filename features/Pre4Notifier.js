import config from "../config"

let notified = false
let text = new Text("&aDevice Completed!").setScale(2).setShadow(true)

register("chat", (name) => {
    if (!config.pre4Notifier) return;
    if (atDev() && name == Player.getName() && !notified) {
        notify();
        notified = true;
    }
}).setCriteria(/(\w+) completed a device! \(\d\/\d\)/)

function atDev() {
    if (Player.getX() >= 63 && Player.getX() <= 64 && Player.getY() == 127 && Player.getZ() >= 35 && Player.getZ() <= 36) return true;
    return false;
}

function notify() {
    notification.register();
    setTimeout(() => notification.unregister(), 1500);
    setTimeout(() => World.playSound(config.pre4NotifierSound, 1, 1.414), 1);
	setTimeout(() => World.playSound(config.pre4NotifierSound, 1, 1.587), 150);
	setTimeout(() => World.playSound(config.pre4NotifierSound, 1, 1.782), 300);
}

const notification = register("renderOverlay", () => {
    text.draw((Renderer.screen.getWidth() - text.getWidth()) / 2, (Renderer.screen.getHeight() - text.getHeight()) / 2 - 50);
}).unregister()

register("worldLoad", () => {
    notified = false;
    notification.unregister();
})