# CHANGELOG

## 3.1.1
* `g.OperationPluginManager#register()` を使用した README と sample の修正。

## 3.1.0
* 内部的な型定義のミスを修正 (#15)
* `Converter.asUnhoverable()` の戻り値を `HoverableE` から `g.E` に変更 (#16)
  * 動作に変更はありません。(従来から `g.E` 相当の値が返されていました)
  * **ゲーム開発者への影響**: TypeScript でのゲーム開発者が戻り値を利用していた場合、型の追従が必要な場合があります。

## 3.0.0
* akashic-engine@3.0.0 に追従。

## 2.1.0
* 利用コンテンツを `akashic export` すると動作しなくなる問題を修正
  * `require("@akashic-extension/akashic-hover-plugin").HoverPlugin` がなくなります。
  * ゲーム開発者がこの値を参照する必要は通常ありませんが、
    必要な場合は `require("@akashic-extension/akashic-hover-plugin/lib/HoverPlugin")` をご利用ください。

## 2.0.1
* TypeScript の `strict: true` 指定時にビルドが失敗する件の修正

## 2.0.0
* 初期リリース
