import { HoverableE } from "./HoverableE";

/**
 * コンバータオプション。
 */
export interface ConverterOptions {
	/**
	 * ホバー時のカーソルの形状。
	 * CSSのcursorプロパティと同価。
	 * @default HoverPluginに渡したcursorの値
	 */
	cursor?: string;
}

/**
 * コンバータ機能を提供するクラス。
 */
export class Converter {

	/**
	 * エンティティをホバー可能に変換する。
	 */
	static asHoverable(e: g.E, opts?: ConverterOptions): HoverableE {
		const hoverableE = e as HoverableE;
		hoverableE.hoverable = true;
		hoverableE.touchable = true;
		hoverableE.hovered = hoverableE.hovered || new g.Trigger<void>();
		hoverableE.unhovered = hoverableE.unhovered || new g.Trigger<void>();
		hoverableE.moved = hoverableE.moved || new g.Trigger<void>();
		if (opts) {
			if (opts.cursor) hoverableE.cursor = opts.cursor;
		}
		return hoverableE;
	}

	/**
	 * エンティティのホバーを解除する。
	 */
	static asUnhoverable(e: g.E): g.E {
		const hoverableE = e as Partial<HoverableE>;
		delete hoverableE.hoverable;
		if (hoverableE.hovered && ! hoverableE.hovered.destroyed()) {
			hoverableE.hovered.destroy();
			delete hoverableE.hovered;
		}
		if (hoverableE.unhovered && ! hoverableE.unhovered.destroyed()) {
			hoverableE.unhovered.fire();
			hoverableE.unhovered.destroy();
			delete hoverableE.unhovered;
		}
		if (hoverableE.moved && !hoverableE.moved.destroyed()) {
			hoverableE.moved.destroy();
			delete hoverableE.moved;
		}
		return hoverableE as g.E;
	}
}
