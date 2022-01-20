# akashic-hover-plugin

<p align="center">
<img src="https://github.com/akashic-games/akashic-hover-plugin/blob/master/img/akashic.png"/>
</p>

**akashic-hover-plugin**はAkashicでマウスホバー可能なエンティティを利用することができるプラグインです。

実装例は `sample` ディレクトリ以下にあるサンプルプロジェクトを参照してください。

## 利用方法

[akashic-cli](https://github.com/akashic-games/akashic-cli)をインストールした後、

```sh
akashic install @akashic-extension/akashic-hover-plugin
```

でインストールできます。

本プラグインをコンテンツへ登録し利用するには `g.OperationPluginManager#register()` を利用します。
`g.OperationPluginManager#register()` の第一引数にはプラグインの実態、第二引数には識別コードを指定する必要があります。識別コードは対象のプラグインを開始/停止する操作に必要となります。

```javascript
import * as hover from "@akashic-extension/akashic-hover-plugin";
...
g.game.operationPluginManager.register(hover.HoverPlugin, 5); // HoverPlugin を 識別コード 5 で 登録
g.game.operationPluginManager.start(5); // 識別コード 5 のプラグインを開始
...

g.game.operationPluginManager.stop(5) // 識別コード 5 のプラグインを停止
```

第三引数には次の名前のプロパティ名と対応する値を持つオブジェクトを指定することができます。

 * cursor
   * 文字列 (省略可能。省略された場合 `"pointer"`)
   * ホバー時のcursorを指定。CSSに準拠。
 * showTooltip
   * 真偽値 (省略可能。省略された場合 `false`)
   * ホバー時にtooltipを表示されるかどうか。
   * 表示内容は `HoverableE#title` 。

```javascript
g.game.operationPluginManager.register(hover.HoverPlugin, 5, { cursor: "help", showTooltip: true });
```

### コンテンツへの適用

`E#touchable`, `E#hoverable` プロパティが `true` を返すエンティティに対して `E#hovered`, `E#unhovered` トリガを発火させます。
このインタフェースは `HoverableE` として `src/HoverableE` に定義されています。

```javascript
export interface HoverableE extends g.E {
	hoverable: boolean;
	hovered: g.Trigger<void>;
	unhovered: g.Trigger<void>;
	cursor?: string;
}
```

`E#hovered` はホバー時、`E#unhovered` はホバーが外れた時に発火されます。

### 既存のエンティティへの適用

`g.FilledRect` など既存のエンティティをホバー可能にするには以下のようにします。

```javascript
import * as hover from "@akashic-extension/akashic-hover-plugin";

...
const rect = new g.FilledRect(...);
const hoveredRect = hover.Converter.asHoverable(rect);
hoveredRect.hovered.add(() => {
	rect.cssColor = "#f00";
	rect.modified();
});
hoveredRect.unhovered.add(() => {
	rect.cssColor = "#000";
	rect.modified();
});
```

## 注意点
本プラグインは **`g.OperationEvent` を生成しません。**
本プラグインによるホバー操作をPlaylogとして利用したい場合は、
利用者自身で `E#hovered`, `E#unhovered` の発火を契機とした `g.MessageEvent` の生成などを行う必要があります。

## ライセンス
本リポジトリは MIT License の元で公開されています。
詳しくは [LICENSE](https://github.com/akashic-games/akashic-hover-plugin/blob/master/LICENSE) をご覧ください。

ただし、画像ファイルおよび音声ファイルは
[CC BY 2.1 JP](https://creativecommons.org/licenses/by/2.1/jp/) の元で公開されています。
