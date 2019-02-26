import * as hover from "@akashic-extension/akashic-hover-plugin";

export class HoverableLabel extends g.Label implements hover.HoverableE {
	hoverable: boolean = true;
	touchable: boolean = true;
	hovered: g.Trigger<void> = new g.Trigger<void>();
	unhovered: g.Trigger<void> = new g.Trigger<void>();
	_text: string;

	constructor(param: g.LabelParameterObject) {
		super(param);
		this._text = this.text;
		this.hovered.add(this.onHovered, this);
		this.unhovered.add(this.onUnhovered, this);
	}

	onHovered(): void {
		this.text = "hover!";
		this.textColor = "#f00";
		this.invalidate();
	}

	onUnhovered(): void {
		this.text = this._text;
		this.textColor = "#000";
		this.invalidate();
	}
}
