import { HoverPluginOptions } from "./HoverPluginOptions";
import { HoverableE } from "./HoverableE";

/**
 * ホバー機能を提供するプラグイン。
 */
export class HoverPlugin implements g.OperationPlugin {
	static isSupported(): boolean {
		return (typeof document !== "undefined") && (typeof document.addEventListener === "function");
	}

	game: g.Game;
	view: HTMLElement;
	beforeHover: HoverableE | null;
	operationTrigger: g.Trigger<g.OperationPluginOperation | (number | string)[]>;

	_onMouseMove_bound: (e: MouseEvent) => void;
	_onMouseOut_bound: (e: MouseEvent) => void;
	_getScale: (() => {x: number, y: number}) | null;

	_cursor: string;
	_showTooltip: boolean;

	constructor(game: g.Game, view: g.OperationPluginView, option: HoverPluginOptions = {}) {
		this.game = game;
		this.view = (view as any).view;
		this.beforeHover = null;
		this.operationTrigger = new g.Trigger();
		this._cursor = option.cursor || "pointer";
		this._showTooltip = !!option.showTooltip;
		this._getScale = (view as any).getScale ? () => (view as any).getScale() : null;

		this._onMouseMove_bound = this._onMouseMove.bind(this);
		this._onMouseOut_bound = this._onMouseOut.bind(this);
	}

	start(): boolean {
		this.view.addEventListener("mousemove", this._onMouseMove_bound, false);
		this.view.addEventListener("mouseout", this._onMouseOut_bound, false);
		return true;
	}

	stop(): void {
		this.view.removeEventListener("mousemove", this._onMouseMove_bound, false);
		this.view.removeEventListener("mouseout", this._onMouseOut_bound, false);
	}

	_onMouseMove(e: MouseEvent): void {
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
		const target = this.game.scene().findPointSourceByPoint(point).target as HoverableE;
		if (target && target.hoverable) {
			if (target !== this.beforeHover) {
				if (this.beforeHover && this.beforeHover.hoverable) {
					this._onUnhovered(target);
				}
				this._onHovered(target);
			}
			this.beforeHover = target;
		} else if (this.beforeHover) {
			this._onUnhovered(this.beforeHover);
		}
	}

	_onHovered(target: HoverableE): void {
		if (target.hoverable) {
			this.view.style.cursor = target.cursor ? target.cursor : this._cursor;
			if (this._showTooltip && target.title) {
				this.view.setAttribute("title", target.title);
			}
			target.hovered.fire();
		}
	}

	_onUnhovered(target: HoverableE): void {
		this.view.style.cursor = "auto";
		if (this.beforeHover && this.beforeHover.unhovered) {
			this.beforeHover.unhovered.fire();
			if (this._showTooltip) {
				this.view.removeAttribute("title");
			}
		}
		this.beforeHover = null;
	}

	_onMouseOut(): void {
		if (this.beforeHover)
			this._onUnhovered(this.beforeHover);
	}
}

module.exports = HoverPlugin;
