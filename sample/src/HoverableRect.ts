import * as hover from "@akashic-extension/akashic-hover-plugin";

export class HoverableRect extends g.FilledRect implements hover.HoverableE {
	hoverable: boolean = true;
	touchable: boolean = true;
	hovered: g.Trigger<void> = new g.Trigger<void>();
	unhovered: g.Trigger<void> = new g.Trigger<void>();
	_cssColor: string;

	constructor(param: g.FilledRectParameterObject) {
		super(param);
		this._cssColor = this.cssColor;
		this.hovered.add(this.onHovered, this);
		this.unhovered.add(this.onUnhovered, this);
	}

	onHovered(): void {
		this.cssColor = "#f00";
		this.modified();
	}

	onUnhovered(): void {
		this.cssColor = this._cssColor;
		this.modified();
	}
}
