// src\calculate\utils\evo.ts

import { ArmsDefine } from "../../model/arms/define/armsDefine";

/**
 * 特殊武器包括卡特、天弓、圣诞礼炮、暗金（隼+源）。
 * 似乎目前没有用到，这里我就简化只写一般武器的逻辑了。
 */

// （普通武器）进阶等级对应的系数表
const hurtMulArr: number[] = [90,100,110,145,155,165,180,195,205,220,230,240,250,300,340,380];

/**
 * 根据进阶等级和武器定义获取加成
 */
export function getEvoHurtMul(d0: ArmsDefine): number {
  if (d0.evoMaxLv <= 0) return 1; // 只有能进阶的才有系数
  const index0: number = d0.evoMaxLv - 1 + d0.evoMustFirstLv; // 记得算上初始进阶等级
  let v0: number = hurtMulArr[index0] / 100;
  // 看着像是限制初始等阶高的枪在无双阶段的战力
  if (d0.color === 'purgold' && d0.evoMaxLv > 1 && index0 <= 13) v0 *= 0.8;
  return v0;
}