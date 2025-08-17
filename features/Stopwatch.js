import config from "../config"
import { registerWhen } from "../../BloomCore/utils/Utils"

let start, stop
let text = new Text('').setScale(1).setShadow(true).setAlign('CENTER')

const stopwatchKey = new KeyBind("Start/Stop Stopwatch", Keyboard.KEY_NONE, "Valley Addons").registerKeyPress(() => {
    if (!start) {
        start = Date.now()
        ChatLib.chat(`${config.customPrefix} &aStopwatch Started.`)
    } else {
        stop = Date.now()
        let elapsed = ((stop - start) / 1000).toFixed(3)
        ChatLib.chat(`${config.customPrefix} &cStopwatch Stopped after &e${elapsed}s`)
        start = stop = null
    }
})

registerWhen(register("renderOverlay", () => {
    if (start == null) return
    let elapsed = ((Date.now() - start) / 1000).toFixed(3)
    text.setString(elapsed)
    text.draw(Renderer.screen.getWidth() / 2, Renderer.screen.getHeight() / 2 - 20)
}), () => start)