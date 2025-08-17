import PogObject from "../../PogData/index"

export const data = new PogObject("ValleyAddons", {
    firstInstall: true,
    p3StartTimer: {
        x: Renderer.screen.getWidth() / 2,
        y: Renderer.screen.getHeight() / 2 + 10,
        scale: 1
    },
    relicSpawnTimer: {
        x: Renderer.screen.getWidth() / 2,
        y: Renderer.screen.getHeight() / 2 + 10,
        scale: 1
    },
    goldorTickTimer: {
        x: Renderer.screen.getWidth() / 2,
        y: Renderer.screen.getHeight() / 2 + 10,
        scale: 1
    },
    padTickTimer: {
        x: Renderer.screen.getWidth() / 2,
        y: Renderer.screen.getHeight() / 2 + 10,
        scale: 1
    },
    pillarExplode: {
        x: Renderer.screen.getWidth() / 2,
        y: Renderer.screen.getHeight() / 2 + 10,
        scale: 1
    },
    distanceToLedge: {
        x: Renderer.screen.getWidth() / 2,
        y: Renderer.screen.getHeight() / 2 + 10,
        scale: 1
    },
    dungeonWarpCooldown: {
        x: 0,
        y: 0,
        scale: 1
    },
    reaperDisplay: {
        x: Renderer.screen.getWidth() / 2,
        y: Renderer.screen.getHeight() / 2 + 10,
        scale: 1
    },
    ragDisplay: {
        x: Renderer.screen.getWidth() / 2,
        y: Renderer.screen.getHeight() / 2 - 10,
        scale: 1
    },
    pictureOnScreen: {
        x: 0,
        y: 0,
        scale: 1
    },
    predevTimer: {
        pb: 999999999
    },
    relicTimer: {
        Purple: 999,
        Blue: 999,
        Red: 999,
        Green: 999,
        Orange: 999
    },
    dragonSpawnTimer: {
        x: Renderer.screen.getWidth() / 2,
        y: Renderer.screen.getHeight() / 2 + 40,
        scale: 3
    },
    crystalSpawnTimer: {
        x: Renderer.screen.getWidth() / 2,
        y: Renderer.screen.getHeight() / 2 + 10,
        scale: 1
    }, 
    campSplits: {
        x: 0,
        y: 0,
        scale: 1
    },
    crystalPlaceTimer: {
        pb: 999999999
    },
    runSplits: {
        x: 0,
        y: 0,
        scale: 1
    },
    invincibilityDisplay: {
        x: 0,
        y: 0,
        scale: 1
    },
    leapNotification: {
        x: Renderer.screen.getWidth() / 2,
        y: Renderer.screen.getHeight() / 2 - 200,
        scale: 3
    },
    melodyWarning: {
        x: 0,
        y: 0,
        scale: 1
    },
    key: ""
}, "data.json")