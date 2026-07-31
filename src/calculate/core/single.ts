// src\calculate\core\single.ts

import { ArmsDefine } from "../../model/arms/define/armsDefine";
import { ArmsType } from "../../model/arms/define/armsType";
import { armsDefineService } from "../../model/arms/service/armsDefineService";
import { EquipColor } from "../../model/equip/define/equipColor";
import { ArmsDataCreator } from "../utils/armsDataCreator";
import { getBaseDPS, getCalculateLv, getRealBaseDPS } from "../utils/base";
import { getEvoHurtMul } from "../utils/evo";
import { getDpsValueByLv, getCapacityValueByLv, getAttackGapValueByLv, getReloadValueByLv, getPrecisionValueByLv, getShootRangeValueByLv, fPartEff, getPartLevel } from "../utils/parts";
import { Bonus } from "./bonus";

// 零件等级默认 96，不兼容的零件位自动置 0
const LV_PART: number = 96;
const LV_A: number = 99;

/** 武器计算结果（含各面板属性） */
export interface WeaponPowerResult {
  dps_final: number;
  hurt_3: number;
  ca_3: number;
  ag_3: number;
  rg_3: number;
  pre_3: number;
  sr_3: number;  // 模拟射程，面板 = sr_3 × 1.2
}

/**
 * 计算单把武器的最终显示战力及面板属性
 * @param armsName 武器名称标识符
 * @param b0       加成数据（调用前设置好 VIP/总统/ui_dps_mul_part 等）
 */
export function calcWeaponPower(armsName: string, b0: Bonus): WeaponPowerResult {
  // 获取武器定义数据
  const d0: ArmsDefine = armsDefineService.getDefine(armsName);

  // 计算进阶等级（getEvoHurtMul 和 getUIDpsMul 共用）
  const evoLv: number = d0.evoMaxLv > 0 ? d0.evoMaxLv - 1 + d0.evoMustFirstLv : 0;

  // 各零件有效等级（不兼容类型自动置 0）
  const lv_part_acc: number = getPartLevel(LV_PART, d0, 'acc');
  const lv_part_range: number = getPartLevel(LV_PART, d0, 'range');
  const lv_part_ag: number = getPartLevel(LV_PART, d0, 'ag');

  /** 乘区一：基础属性构建 */
  // 获取计算等级。这里随机武器会默认传入 red，后续不用特殊处理
  const lv_c: number = getCalculateLv(LV_A, d0.color ?? 'red');
  // 获取基础战力
  const dps_bv: number = getBaseDPS(lv_c);
  // 获取实际（计算用）基础战力
  const dps_br: number = getRealBaseDPS(dps_bv, d0.color, d0.dpsMul);
  // 计算基础伤害
  const hurt_b: number = ArmsDataCreator.getHurt(d0, dps_br);

  /** 乘区二：战力加成 */
  // 先计算零件加成，这个还挺麻烦的
  const C_part_hurt: number = getDpsValueByLv(LV_PART); // 伤害零件系数
  const dps_base_part: number = getBaseDPS(LV_PART); // 零件基础战力
  const dps_add_part: number = C_part_hurt * dps_base_part; // 伤害零件的战力增量

  // 乘区主体计算过程
  const dps_mul_p: number = b0.getDpsMulP(); // 百分比普战
  const dps_mul_t: number = b0.getDpsMulT(d0.armsType); // 武器类型百分比普战
  const dps_add: number = b0.getDpsAdd() + dps_add_part; // 数值战力（包含尸宠、伤害零件）
  const dps_mul_bl: number = EquipColor.moreBlackB(d0.color) ? 1.3 : 1; // 黑色武器通用系数

  // console.log("全体战力加成:", b0.getWholeDpsMul());
  // 计算基础百分比增益后的战力
  const dps_1_base: number = dps_br * (1 + b0.sp_dps_mul) * (1 + dps_mul_p + dps_mul_t);
  // 计算总的数值战力加成
  const dps_1_add: number = dps_add * dps_mul_bl * d0.dpsMul;
  // 汇总计算理论加成后总战力
  const dps_1: number = (dps_1_base + dps_1_add) * (1 + b0.vip_dps_mul) * (1 + b0.getWholeDpsMul());
  // 战力转伤害
  const hurt_1_add: number = ArmsDataCreator.getHurt(d0, dps_1) - hurt_b;

  /** 乘区三：伤害加成 */
  const C_type_hurt: number = ArmsType.getHurtAdd(d0.armsType); // 获取伤害类型转换系数
  // 主体计算
  const hurt_2: number =
    hurt_b * (1 + b0.getHurtMulP() + b0.getHurtMulT(d0.armsType)) +
    b0.ea0_hurt * C_type_hurt +
    hurt_1_add;

  /** 乘区四：神级加成 */
  const C_evo: number = getEvoHurtMul(d0); // 进阶系数
  // 计算神级加成后伤害
  const hurt_3: number = hurt_2 * (1 + b0.getDpsAll() + b0.getHurtAll()) * C_evo;

  /** 乘区五：弹容加成 */
  const C_part_ca: number = getCapacityValueByLv(LV_PART); // 弹容零件系数
  const ca_mul_part: number = fPartEff(LV_PART, LV_A, C_part_ca); // 零件弹容百分比加成
  // 计算有效弹容
  const ca_3: number =
    d0.capacity * (1 + b0.ea0_capacity_mul + ca_mul_part) +
    b0.ea0_capacity * ArmsType.getCapacityMul(d0.armsType);

  /** 乘区六：射速加成 */
  const C_part_ag: number = getAttackGapValueByLv(lv_part_ag); // 攻击间隔零件系数（负值）
  const ag_mul_part: number = lv_part_ag > 0 ? fPartEff(lv_part_ag, LV_A, C_part_ag) : 0; // 零件攻击间隔百分比加成
  // 计算有效攻击间隔（下限 0.05 防止无限射速叠加）
  const ag_3: number = Math.max(
    0.05,
    d0.attackGap * (1 + ag_mul_part * ArmsType.getAttackGapAdd(d0.armsType)) / (1 + b0.ea0_attack_gap),
  );

  /** 乘区七：装弹时间加成 */
  const C_part_rg: number = getReloadValueByLv(LV_PART); // 装弹时间零件系数（负值）
  const rg_mul_part: number = fPartEff(LV_PART, LV_A, C_part_rg); // 零件装填时间百分比加成
  // 计算有效装弹时间（下限 0.7 × ag_3）
  const rg_3: number = Math.max(
    0.7 * ag_3,
    d0.reloadGap / (1 + b0.getReloadMulP() * ArmsType.getReloadGapMul(d0.armsType)) *
      (1 + rg_mul_part * ArmsType.getReloadGapMul(d0.armsType)),
  );

  /** 乘区八：精准度与射程加成 */
  const C_part_acc: number = getPrecisionValueByLv(lv_part_acc); // 精准度零件系数（负值）
  const angle_mul_part: number = lv_part_acc > 0 ? fPartEff(lv_part_acc, LV_A, C_part_acc) : 0; // 零件精准度百分比加成
  const C_part_range: number = getShootRangeValueByLv(lv_part_range); // 射程零件系数
  const range_add_part: number = lv_part_range > 0 ? fPartEff(lv_part_range, LV_A, C_part_range) : 0; // 零件射程数值加成
  // 获取基础模拟射程（面板射程 ÷ 1.2）
  const sr_b: number = ArmsDataCreator.getShootRange(d0) / 1.2;
  // 武器类型角度加成系数（散弹 = 0.3，其余 = 1）
  const C_type_angle: number = ArmsType.getAngleAdd(d0.armsType);

  // 计算有效模拟几何属性
  const sa_3: number = d0.shakeAngle * (1 + angle_mul_part * C_type_angle);
  const so_3: number = d0.shootAngle * (1 + angle_mul_part / 2 * C_type_angle);
  const sr_3: number = sr_b + range_add_part;

  // 精准度合成（重用乘区一公式 3.1.4 结构，入参替换为零件修正后的有效值）
  const sar_3: number = Math.max(1 - sa_3 / 30, 0.4);
  const sor_3: number = Math.max(1 - so_3 / 30, 0.3);
  const srr_3: number = Math.min((sr_3 + 500) / 1100, 1);
  const pre_3: number = sar_3 * sor_3 * srr_3;

  /** 乘区九：战力显示加成 */
  // 第一步：核心 DPS
  const dps_core: number = ArmsDataCreator.countDps(
    hurt_3, pre_3, d0.bulletNum ?? 1, d0.shootNum ?? 1, ag_3, rg_3, ca_3,
  ) / dps_mul_bl; // 注意这里的除数其实可以在 uiDpsMul 中乘回来，意义不明

  // 第二步：特性乘数 C_feature
  const godSkillNum0: number = d0.godSkillArr?.length ?? 0;
  const skillNum: number = d0.skillArr?.length ?? 0;
  const sp0: number = ArmsDataCreator.getSpecialNum(d0); // 特殊属性数量
  // 能进阶成无双后的武器神技数 +1
  const isSpecial: boolean = d0.color === 'black';
  const godSkillNum: number = godSkillNum0 + (isSpecial ? 1 : 0);
  const C_feature: number = 1 + godSkillNum * 0.2 + (skillNum + sp0) * 0.15;
  // console.log("技能属性加成:", C_feature);

  // 武器类型/颜色/进阶等级 UI 乘数
  const C_type_ui: number = ArmsType.getUIDpsMul(d0.armsType, 'yagold', evoLv, d0);
  console.log("类型ui:", C_type_ui);
  // 元素战力转换乘数
  const C_ele_display: number = 1 + b0.getElementHurtMul() * 0.3;

  // 显示战力初步计算
  const dps_display_pre: number =
    dps_core * C_feature * (1 + b0.ui_dps_mul_part) * C_type_ui * C_ele_display * d0.uiDpsMul;

  // 最终显示战力，向上取整
  const dps_final = Math.ceil(dps_display_pre / d0.dpsMul);

  return { dps_final, hurt_3, ca_3, ag_3, rg_3, pre_3, sr_3 };
}

// ============================================================
// 单武器调试入口
// ============================================================

export const ARMSNAMEARR: string[] = ["consArcher", "consLeo", "lightCone", "redFire", "shotgunSkunk", "pistolFox"];

/** 存最终战力的 */
export let dpsAllArr: number[] = [];

for (const armsName of ARMSNAMEARR) {
  // 获取武器定义数据
  const d0: ArmsDefine = armsDefineService.getDefine(armsName);

  // 该武器所有加成数据
  const b0: Bonus = new Bonus();

  const lv_part_acc: number = getPartLevel(LV_PART, d0, 'acc');
  const lv_part_range: number = getPartLevel(LV_PART, d0, 'range');
  const lv_part_ag: number = getPartLevel(LV_PART, d0, 'ag');
  console.log(`零件等级 — 伤害:${LV_PART} 弹容:${LV_PART} 装弹:${LV_PART} 精准:${lv_part_acc} 射程:${lv_part_range} 射速:${lv_part_ag}`);

  const r = calcWeaponPower(armsName, b0);

  // ---- 面板属性输出 ----
  console.log(`\n━━━━ ${armsName} (${d0.cnName}) ━━━━`);
  console.log(`  最终面板战力  ${r.dps_final.toLocaleString("zh-CN")}`);
  console.log(`  伤害          ${Math.round(r.hurt_3).toLocaleString("zh-CN")}`);
  console.log(`  弹容          ${Math.ceil(r.ca_3)}`);
  console.log(`  射速          ${(1 / r.ag_3).toFixed(4)}`);
  console.log(`  装弹时间      ${r.rg_3.toFixed(4)}s`);
  console.log(`  精准度        ${r.pre_3.toFixed(4)}`);
  console.log(`  射程          ${(r.sr_3 * 1.2).toFixed(2)}`);

  dpsAllArr.push(r.dps_final);
}
