import config from "../config"
import { data } from "../util/data"
import { registerWhen } from "../../BloomCore/utils/Utils"

let image;
let imageWidth = 0;
let imageHeight = 0;

function findImage() {
    try {
        image = new Image("pictureOnScreen.png", "../assets/pictureOnScreen.png");
        imageWidth = image.getTextureWidth();
        imageHeight = image.getTextureHeight();
        config.pictureOnScreen ? display.register() : display.unregister();
    } catch (e) {
        ChatLib.chat(":/");
    }
}

findImage();

register("command", () => {
    findImage();
}).setName("refreshimage")

const display = register("renderOverlay", () => {
    let x = data.pictureOnScreen.x;
    let y = data.pictureOnScreen.y;
    let w = imageWidth * data.pictureOnScreen.scale;
    let h = imageHeight * data.pictureOnScreen.scale;
    image.draw(x, y, w, h);
}).unregister();

const exampleHud = register("renderOverlay", () => {
    image.draw(data.pictureOnScreen.x, data.pictureOnScreen.y, data.pictureOnScreen.scale * imageWidth, data.pictureOnScreen.scale * imageHeight);
}).unregister();

registerWhen(register("dragged", (dx, dy, x, y, bn) => {
    const checkClose = register("GuiClosed", () => {
        checkClose.unregister();
        exampleHud.unregister();
    })
    exampleHud.register();
    if (bn == 2) return;
    data.pictureOnScreen.x = x;
    data.pictureOnScreen.y = y;
    data.save();
}), () => config.pictureOnScreenGui.isOpen())

register("scrolled", (x, y, dir) => {
    if (!config.pictureOnScreenGui.isOpen()) return;
    if (dir == 1) data.pictureOnScreen.scale += 0.01;
    else data.pictureOnScreen.scale -= 0.01;
    data.save();
})