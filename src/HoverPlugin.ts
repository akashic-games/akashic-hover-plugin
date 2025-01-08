import { HoverableE } from "./HoverableE";
import { HoverPluginOptions } from "./HoverPluginOptions";

export interface HoverPluginLike extends g.OperationPlugin {
	game: g.Game;
	beforeHover: HoverableE | null;
	getLatestHoveredPoint(): g.CommonOffset | null;
}

export interface HoverPluginStatic {
	isSupported: () => boolean;
	new (game: any, viewInfo: g.OperationPluginViewInfo | null, option?: any): HoverPluginLike;
}

/**
 * ホバー機能を提供するプラグイン。
 */
class HoverPlugin implements HoverPluginLike {
	game: g.Game;
	view: HTMLElement;
	beforeHover: HoverableE | null;
	operationTrigger: g.Trigger<g.OperationPluginOperation | (number | string)[]>;
	_latestHoveredPoint: g.CommonOffset | null;

	_onMouseMove_bound: (e: MouseEvent) => void;
	_onMouseOut_bound: (e: MouseEvent) => void;
	_getScale: (() => { x: number; y: number }) | null;

	static isSupported(): boolean {
		return (typeof document !== "undefined") && (typeof document.addEventListener === "function");
	}

	constructor(game: g.Game, viewInfo: g.OperationPluginViewInfo | null, option: HoverPluginOptions = {}) {
		console.log('HoverPlugin construct!');
		this.game = game;
		this.view = viewInfo!.view as HTMLElement; // viewInfo が必ず渡ってくるため null にはならない
		this.beforeHover = null;
		this.operationTrigger = new g.Trigger();
		this._latestHoveredPoint = null;
		this._getScale = (viewInfo as any).getScale ? () => (viewInfo as any).getScale() : null;

		this._onMouseMove_bound = this._onMouseMove.bind(this);
		this._onMouseOut_bound = this._onMouseOut.bind(this);
	}

	isMobileDevice() {
		if (typeof navigator === "undefined") return false;
		// is iPad Desktop mode
		if (typeof document !== "undefined") {
			if (/Mac OS/.test(navigator.userAgent) && document.ontouchstart != null) {
				// Note: If PC Mac & enable touch device, return true
				return true;
			}
		}
		return /Mobi|Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop|Fennec|BlackBerry|BB10|PlayBook|Silk/.test(navigator.userAgent);
	}
	start(): boolean {
		if (this.isMobileDevice()==false) {
			this.view.addEventListener("mousemove", this._onMouseMove_bound, false);
			this.view.addEventListener("mouseout", this._onMouseOut_bound, false);
			this.view.addEventListener("pointerout", this._onMouseOut_bound, false);
		}
		return true;
	}

	stop(): void {
		this.view.removeEventListener("mousemove", this._onMouseMove_bound, false);
		this.view.removeEventListener("mouseout", this._onMouseOut_bound, false);
		this.view.removeEventListener("pointerout", this._onMouseOut_bound, false);
	}

	// 現在ホバーしている座標を返す。ホバーしていない時は null を返す。
	getLatestHoveredPoint(): g.CommonOffset | null {
		return this._latestHoveredPoint;
	}

	_onMouseMove(e: MouseEvent): void {
		const scene = this.game.scene();
		if (!scene) return;

		const rect = this.view.getBoundingClientRect();
		const positionX = rect.left + window.pageXOffset;
		const positionY = rect.top + window.pageYOffset;
		const offsetX = e.pageX - positionX;
		const offsetY = e.pageY - positionY;
		let scale = { x: 1, y: 1 };
		if (this._getScale) {
			scale = this._getScale();
		}

		const point = { x: offsetX / scale.x, y: offsetY / scale.y };
		const target = scene.findPointSourceByPoint(point).target as HoverableE;
		if (target && target.hoverable) {
			this._latestHoveredPoint = point;
			if (target !== this.beforeHover) {
				if (this.beforeHover && this.beforeHover.hoverable) {
					this._onUnhovered(target);
				}
				this._onHovered(target);
			}
			this.beforeHover = target;
		} else if (this.beforeHover) {
			this._latestHoveredPoint = null;
			this._onUnhovered(this.beforeHover);
		}
	}

	_onHovered(target: HoverableE): void {
		if (target.hoverable) {
			target.hovered.fire();
		}
	}

	_onUnhovered(_target: HoverableE): void {
		if (this.beforeHover && this.beforeHover.unhovered) {
			this.beforeHover.unhovered.fire();
		}
		this.beforeHover = null;
	}

	_onMouseOut(): void {
		if (this.beforeHover)
			this._onUnhovered(this.beforeHover);
	}
}

module.exports = HoverPlugin;
