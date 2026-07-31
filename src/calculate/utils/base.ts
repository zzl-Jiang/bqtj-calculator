// src\calculate\base.ts

/**
 * 通过武器显示等级 + 颜色，返回计算等级。
 * 特别注意，黑色随机武器由于没有颜色设置，会默认传输“red”。
 */
export function getCalculateLv(lv_a: number, color: string): number {
  let lv_add: number = 0;

  // 这行逻辑其实没有必要。但是为了逻辑清晰还是加上了判定
  if (['white', 'green', 'blue', 'purple', 'orange'].includes(color)) return lv_a;

  // 红武修正值 + 1
  if (color === 'red') lv_add = 1;

  // 黑色及以上修正值 + 5
  if (moreBlackB(color)) lv_add = 5;

  return lv_a + lv_add;
}

/**
 * 根据计算等级获取显示基础战力。
 * 虽然等级肯定不小于 99，但还是把逻辑都写上吧。
 * 是个通用公式，后期可以考虑移植。
 */
export function getBaseDPS(lv_c: number): number {
  if (lv_c < 51) return 4 * lv_c * lv_c + 20;
  return lv_c * lv_c * 15 - 28000;
}

/** 
 * 计算真实基础战力。
 */
export function getRealBaseDPS(dps_bv: number, color: string, dps_mul: number): number {
  const dps_mul_bl_def = moreBlackB(color) ? 1.3 : 1;
  return dps_bv * dps_mul_bl_def * dps_mul;
}

/**
 * 通用计算工具。
 * 判定武器颜色是否为黑色及以上。
 */
export function moreBlackB(color: string): boolean {
  if (['black', 'darkgold', 'purgold', 'yagold'].includes(color)) return true;
  return false;
}