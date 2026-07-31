// src\archive\models\common\utils\formatUtils.ts

/**
 * 转换器：从数组或逗号分隔的字符串中取第一个数值。
 *  (e.g., capacity, attackGap)。
 */
export function takeFirstNumber(value: any): number {
  if (Array.isArray(value)) {
    return Number(value[0]) || 0;
  }
  if (typeof value === 'string') {
    return parseInt(value, 10) || 0;
  }
  return Number(value) || 0;
}

/**
 * 转换器：从数组或逗号分隔的字符串中取最后一个数值。
 *  (e.g., shakeAngle, reloadGap)。
 */
export function takeLastNumber(value: any): number {
  if (Array.isArray(value) && value.length > 0) {
    return Number(value[value.length - 1]) || 0;
  }
  if (typeof value === 'string') {
    const parts = value.split(',');
    return parseInt(parts[parts.length - 1], 10) || 0;
  }
  return Number(value) || 0;
}

/**
 * 给字符串补0的功能函数
 */
export function toNum(str: string, num: number): string {
  const len: number = str.length;
  let add: string = '';
  for(let i: number = 0;i <= num - len - 1;i++) {
    add += "0";
  }
  return add + str;
}

/**
 * 根据权重数组随机获取索引
 * 原理：计算总权重，生成一个随机数，看落在哪个区间。
 * @param arr0 权重数组 (支持 number 或能转为 number 的 string)
 * @returns 选中的数组索引 (index)
 */
export function getPro_byArrSum(arr0: Array<number | string>): number {
  // 边界检查
  if (!arr0 || arr0.length === 0) {
    return -1;
  }

  // 计算总权重 (Max)
  let max0 = 0;
  for (let i = 0; i < arr0.length; i++) {
    max0 += Number(arr0[i]) || 0;
  }

  // 如果总权重为0，直接返回最后一个
  if (max0 <= 0) {
    return arr0.length - 1;
  }

  // 随机选择逻辑
  const randomTarget = Math.random() * max0; 
  
  let num0 = 0;
  for (let i = 0; i < arr0.length; i++) {
    num0 += Number(arr0[i]) || 0;
    
    // 只要当前累加值超过了随机阈值，就是命中该项
    if (randomTarget < num0) {
      return i;
    }
  }

  return arr0.length - 1;
}

/**
 * 限制索引在数组范围内 (0 到 length-1)
 * 注意：如果数组为空(len0=0)会返回 -1。
 * @param i0 索引值 (支持浮点数，会自动向下取整)
 * @param len0 数组长度
 * @returns 合法的索引值
 */
export function gotoIndex(i0: number, len0: number): number {
  let idx = Math.floor(i0);
  return Math.min(Math.max(0, idx), len0 - 1);
}