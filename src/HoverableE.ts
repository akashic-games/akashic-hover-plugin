/**
 * ホバー可能なエンティティ
 */
export interface HoverableE extends g.E {
	/**
	 * ホバー可能かどうか。
	 * この値がtrulyである場合、HoverPluginは以下の操作を行う。
	 *  - 対象のエンティティにマウスオーバーした際に `hovered` トリガを発火する。
	 *  - 対象のエンティティからマウスアウトした際に `unhovered` トリガを発火する。
	 */
	hoverable: boolean;
	/**
	 * このエンティティにマウスオーバーした際に発火するトリガ。
	 */
	hovered: g.Trigger<void>;
	/**
	 * このエンティティからマウスアウトした際に発火するトリガ。
	 */
	unhovered: g.Trigger<void>;
	/**
	 * このエンティティにマウスホバーした際に変化するカーソルの形状。
	 */
	cursor?: string;
	/**
	 * このエンティティのtitle。
	 * `HoverPluinOptions#showTooltip` が true の場合、ツールチップとして表示される。
	 */
	title?: string;
}
