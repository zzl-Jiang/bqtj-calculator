// src\calculate\utils\parts.ts

import { getBaseDPS } from "./base";
import { ArmsDefine } from "../../model/arms/define/armsDefine";
import { ArmsType } from "../../model/arms/define/armsType";

/**
 * 通用零件效能函数（文档公式 3.5.1）。
 * 零件效能 = C_part_type × (1 − (1 − dps_base(lv_part) / dps_base(lv_a)) × 0.4)
 * 该归一化缩放确保零件加成效果随武器等级动态伸缩，
 * 避免低级武器配高级零件时过度增强或反之收益过低。
 */
export function fPartEff(lv_part: number, lv_a: number, C_part_type: number): number {
  const dpsPart = getBaseDPS(lv_part);
  const dpsWeapon = getBaseDPS(lv_a);
  return C_part_type * (1 - (1 - dpsPart / dpsWeapon) * 0.4);
}

/**
 * 根据等级获取 DPS 系数。
 * 等级越高系数越大，用于后续战力缩放计算。
 */
export function getDpsValueByLv(lv: number): number {
  if (lv > 87) return 1.5;
  if (lv >= 84) return 1.4;
  if (lv >= 70) return 1.3;
  if (lv >= 65) return 1.2;
  if (lv >= 60) return 1.1;
  if (lv >= 55) return 1;
  if (lv >= 50) return 0.9;
  if (lv >= 45) return 0.75;
  if (lv >= 40) return 0.6;
  if (lv >= 35) return 0.45;
  return 0.3;
}

/**
 * 根据等级获取弹容量系数。
 */
export function getCapacityValueByLv(lv: number): number {
  if (lv > 87) return 0.89;
  if (lv >= 84) return 0.88;
  if (lv >= 70) return 0.87;
  if (lv >= 65) return 0.86;
  if (lv >= 60) return 0.85;
  if (lv >= 55) return 0.83;
  if (lv >= 50) return 0.81;
  if (lv >= 45) return 0.73;
  if (lv >= 40) return 0.65;
  if (lv >= 35) return 0.57;
  if (lv >= 30) return 0.49;
  if (lv >= 25) return 0.41;
  if (lv >= 20) return 0.33;
  return 0.25;
}

/**
 * 根据等级获取攻击间隔系数（负值，表示缩减）。
 */
export function getAttackGapValueByLv(lv: number): number {
  if (lv > 87) return -0.58;
  if (lv >= 84) return -0.57;
  if (lv >= 70) return -0.56;
  if (lv >= 65) return -0.55;
  if (lv >= 60) return -0.54;
  if (lv >= 55) return -0.52;
  if (lv >= 50) return -0.5;
  if (lv >= 45) return -0.46;
  if (lv >= 40) return -0.42;
  if (lv >= 35) return -0.38;
  if (lv >= 30) return -0.34;
  if (lv >= 25) return -0.3;
  if (lv >= 20) return -0.26;
  return -0.22;
}

/**
 * 根据等级获取换弹间隙系数（负值，表示缩减）。
 */
export function getReloadValueByLv(lv: number): number {
  if (lv > 87) return -0.81;
  if (lv >= 84) return -0.8;
  if (lv >= 70) return -0.79;
  if (lv >= 65) return -0.77;
  if (lv >= 60) return -0.75;
  if (lv >= 55) return -0.72;
  if (lv >= 50) return -0.69;
  if (lv >= 45) return -0.62;
  if (lv >= 40) return -0.55;
  if (lv >= 35) return -0.48;
  if (lv >= 30) return -0.41;
  if (lv >= 25) return -0.34;
  if (lv >= 20) return -0.27;
  return -0.2;
}

/**
 * 根据等级获取精准系数（负值，表示缩减）。
 */
export function getPrecisionValueByLv(lv: number): number {
  if (lv > 87) return -0.65;
  if (lv >= 84) return -0.64;
  if (lv >= 70) return -0.63;
  if (lv >= 65) return -0.61;
  if (lv >= 60) return -0.59;
  if (lv >= 55) return -0.57;
  if (lv >= 50) return -0.55;
  if (lv >= 45) return -0.5;
  if (lv >= 40) return -0.45;
  if (lv >= 35) return -0.4;
  if (lv >= 30) return -0.35;
  if (lv >= 25) return -0.3;
  if (lv >= 20) return -0.25;
  return -0.2;
}

/**
 * 根据等级获取射程值。
 */
export function getShootRangeValueByLv(lv: number): number {
  if (lv > 87) return 610;
  if (lv >= 84) return 600;
  if (lv >= 70) return 585;
  if (lv >= 65) return 570;
  if (lv >= 60) return 550;
  if (lv >= 55) return 525;
  if (lv >= 50) return 500;
  if (lv >= 45) return 450;
  if (lv >= 40) return 400;
  if (lv >= 35) return 350;
  if (lv >= 30) return 300;
  if (lv >= 25) return 250;
  if (lv >= 20) return 200;
  return 150;
}

/**
 * 获取芯类零件颜色伤害加成 C_part_color_hurt。
 */
export function getColorHurtMul(): number {
  return 0;
}

/** 零件类型 */
export type PartType = 'acc' | 'range' | 'ag';

/**
 * 获取零件有效等级（不兼容的零件位返回 0）。
 *
 * 三种会被锁定的零件位：
 * - acc (精准度): shakeAngle==0 && shootAngle==0 → 无散布武器不开放
 * - range (射程):  hitType != "longLine" → 非射线武器不开放
 * - ag (射速):    ArmsType.getAttackGapAdd(type) <= 0 → 激光武器不开放
 */
export function getPartLevel(lv: number, d0: ArmsDefine, partType: PartType): number {
  if (partType === 'acc' && d0.shakeAngle === 0 && d0.shootAngle === 0) return 0;
  if (partType === 'range' && d0.hitType !== 'longLine') return 0;
  if (partType === 'ag' && ArmsType.getAttackGapAdd(d0.armsType) <= 0) return 0;
  return lv;
}
