export { Converter } from "./Converter";
export { HoverableE } from "./HoverableE";
import { HoverPluginStatic } from "./HoverPlugin";
export  { HoverPluginLike, HoverPluginStatic } from "./HoverPlugin";

// HoverPlugin.ts で module.exports しているため、そのまま export すると使用側で型がおかしくなる。
// 後方互換性のため module.exports は残しここでキャストしている。
import * as plugin from "./HoverPlugin";
const hoverPlugin = plugin as HoverPluginStatic;
export { hoverPlugin as HoverPlugin };
