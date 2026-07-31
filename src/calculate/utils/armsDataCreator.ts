// src\calculate\utils\armsDataCreator.ts

import { ArmsDefine } from "../../model/arms/define/armsDefine";
import { ArmsType } from "../../model/arms/define/armsType";

export class ArmsDataCreator {

  /** 获取实际精准 */
  public static getPrecision(def: ArmsDefine): number {
    let s0: number = 1 - def.shakeAngle / 30;
    if (s0 < 0.4) s0 = 0.4;

    let a0: number = 1 - def.shootAngle / 30;
    if (a0 < 0.3) a0 = 0.3;

    let l0: number = (ArmsDataCreator.getShootRange(def) / 1.2 + 500) / 1100;
    if (l0 > 1) l0 = 1;

    return s0 * a0 * l0;
  }

  /** 获取面板显示射程（sr_b × 1.2） */
  public static getShootRange(def: ArmsDefine): number {
    if (def.hitType === 'longLine') return def.bulletWidth * 1.2;
    if (def.armsType === ArmsType.blink) return def.aiShootRange;
    const speed0: number = def.bulletSpeed * ArmsType.getBulletSpeedMul(def.armsType);
    const maxLen0: number = speed0 * def.bulletLife * 30;
    const v0: number = speed0 * 30 * 0.7 + def.bulletWidth;
    const simulated = maxLen0 > v0 ? v0 : maxLen0;
    return simulated * 1.2;
  }

  /** 输入 def，根据基础战力反推单发伤害 */
  public static getHurt(d0: ArmsDefine, dps0: number): number {
    const r_mul0: number = 1 - d0.reloadGap / (d0.attackGap * d0.capacity + d0.reloadGap);
    // console.log(dps0, r_mul0, d0.bulletNum, d0.shootNum, d0.attackGap, d0.getPrecision());
    // console.log(dps0 / r_mul0 / (d0.bulletNum * (d0.shootNum ?? 1) / d0.attackGap * (d0.getPrecision() ?? 1)));
    return dps0 / r_mul0 / (d0.bulletNum * (d0.shootNum ?? 1) / d0.attackGap * (ArmsDataCreator.getPrecision(d0) ?? 1));
  }

  /** 根据属性计算战力 */
  public static countDps(
    hurtRatio0: number, precision: number, bulletNum: number, shootNum: number,
    attackGap: number, reloadGap: number, capacity: number
  ): number {
    const l_dps0: number = hurtRatio0 * bulletNum * shootNum / attackGap * precision;
    const r_mul0: number = 1 - reloadGap / (attackGap * capacity + reloadGap);
    return r_mul0 * l_dps0;
  }

  /** 输入 def，输出特殊属性数量 */
  public static getSpecialNum(d0: ArmsDefine): number {
    let num0: number = 0;
    if (d0.penetrationGap > 0) num0++;
    if (d0.penetrationNum > 0) num0++;
    if (d0.critD.mul > 1) num0++;
    if (d0.bounceD.floor > 0) num0++;
    if (d0.bounceD.body > 0) num0++;
    if (d0.twoShootPro > 0) num0++;
    return num0;
  }

}