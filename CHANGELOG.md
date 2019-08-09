# CHANGELOG

## 2.1.0
* 利用コンテンツを `akashic export` すると動作しなくなる問題を修正
  * `require("@akashic-extension/akashic-hover-plugin").HoverPlugin` がなくなります。
  * ゲーム開発者がこの値を参照する必要は通常ありませんが、
    必要な場合は `require("@akashic-extension/akashic-hover-plugin/lib/HoverPlugin")` をご利用ください。

## 2.0.1
* TypeScript の `strict: true` 指定時にビルドが失敗する件の修正

## 2.0.0
* 初期リリース
