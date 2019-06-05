import * as hover from "@akashic-extension/akashic-hover-plugin";
import { HoverableLabel } from "./HoverableLabel";
import { HoverableRect } from "./HoverableRect";

export function main(param: g.GameMainParameterObject): void {
	const scene = new g.Scene({game: g.game, assetIds: ["aco"]});
	scene.loaded.addOnce(() => {
		const font = new g.DynamicFont({
			game: g.game,
			size: 40,
			fontFamily: g.FontFamily.SansSerif
		});

		for (let i = 0; i < 5; i++) {
			(() => {
				const aco = new g.FrameSprite({
					scene: scene,
					src: scene.assets["aco"] as g.ImageAsset,
					x: 5,
					y: i * 50,
					width: 32,
					height: 48,
					frames: [5, 6, 7, 6]
				});
				const hoverableAco = hover.Converter.asHoverable(aco);
				hoverableAco.hovered.add(() => {
					aco.start();
				});
				hoverableAco.unhovered.add(() => {
					aco.stop();
				});
				hoverableAco.title = `aco${i + 1}: こんにちわ！`;

				const rect = new HoverableRect({
					scene: scene,
					x: 40,
					y: i * 50 + 20,
					width: 20,
					height: 20,
					cssColor: "#000"
				});

				const label = new HoverableLabel({
					scene: scene,
					x: 65,
					y: i * 50 + 18,
					text: `test${i + 1}`,
					fontSize: 20,
					font: font
				});

				scene.append(aco);
				scene.append(rect);
				scene.append(label);
			})();
		}
	});
	g.game.pushScene(scene);
}

module.exports = main;
