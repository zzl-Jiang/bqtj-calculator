// src/archive/models/common/utils/textUtils.ts

/** 格式化游戏内描述文本，处理换行符 [n] 和颜色标签 {/} */
export function formatDescription(text: any): string {
  if (!text) return '';
  // 数组 → 换行拼接
  if (Array.isArray(text)) return text.map(t => formatDescription(t)).join('\n');
  // 非字符串 → 转换
  if (typeof text !== 'string') return String(text);
  return text
    .replace(/\[n\]/g, '\n')
    .replace(/\{/g, '<')
    .replace(/\}/g, '>');
}

/**
 * 左侧补 0 至目标长度。
 * 例: toNum("52", 5) → "00052"，toNum("1k", 4) → "001k"
 */
export function toNum(str: string, num: number): string {
  return str.padStart(num, "0");
}

/** 将文本包裹为带颜色的 HTML font 标签 */
export function processColor(str0: string, color0: string = "#999999", size0: number = 0): string {
  const sizeStr0 = size0 === 0 ? "" : `size='${size0}' `;
  return `<font ${sizeStr0}color='${color0}'>${str0}</font>`;
}
