import config from "../config"
import { EntityItem, RenderUtils, ColorUtils, AxisAlignedBB, javaColor, START_MSG } from "../util/util"

const secrets = new Set(["Revive Stone", "Trap", "Decoy", "Inflatable Jerry", "Defuse Kit", "Dungeon Chest Key", "Treasure Talisman", "Architect's First Draft", "Spirit Leap", "Healing VIII Splash Potion", "Training Weights"])

register("chat", () => {

	itemRender.register();

}).setCriteria(START_MSG)

register("worldLoad", () => {

	itemRender.unregister();

})

const itemRender = register("renderEntity", (entity, pos, partialTick, event) => {

	if (!config.itemHighlight) return;
	
	const d = entity.distanceTo(Player.getPlayer())
	if (d >= 20) return
	const itemDropped = new Item(entity.getEntity())
	const itemName = itemDropped?.getNBT()?.toObject()?.tag?.display?.Name?.removeFormatting()
	if (!itemName || itemName == undefined || !secrets.has(itemName)) return

	const x = entity.getX() - 0.1
	const y = entity.getY()
	const z = entity.getZ() - 0.2

	let [r, g, b] = []

	if (d < 3.5) {
		if (entity.getTicksExisted() < 11) {
			[r, g, b] = [255, 255, 0]
		} else {
			[r, g, b] = [0, 255, 0]
		}
	} else {
		[r, g, b] = [255, 0, 0]
	}
	const w = 0.3
	const h = 0.3
	const fillColor = new ColorUtils(javaColor.RGBtoHSB(r, g, b, null), 255 * 255)
	const newBox = new AxisAlignedBB(x - w / 2, y, z - w / 2, x + w / 2, y + h, z + w / 2)
	RenderUtils.INSTANCE.drawFilledAABB(newBox, fillColor, false)
	
	cancel(event)

}).setFilteredClass(EntityItem.class).unregister()