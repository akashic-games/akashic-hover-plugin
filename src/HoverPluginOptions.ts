/**
 * HoverPluginに渡すオプション。
 */
export interface HoverPluginOptions {
	/**
	 * ホバー時のカーソルの形状。
	 * CSSのcursorプロパティと同価。
	 * @default "pointer"
	 */
	cursor?: string;

	/**
	 * ホバー時にtooltipを表示されるかどうか。
	 * 表示内容は `HoverableE#title` 。
	 */
	showTooltip?: boolean;
}
