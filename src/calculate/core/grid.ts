// src\calculate\core\grid.ts
// 极限战力表生成

import { armsDefineService } from "../../model/arms/service/armsDefineService";
import { Bonus } from "./bonus";
import { calcWeaponPower } from "./single";

/** VIP 0~10 战力加成表 */
const VIP_BONUSES: number[] = [0, 0.1, 0.18, 0.26, 0.34, 0.42, 0.5, 0.55, 0.6, 0.65, 0.7];

/** 三暴加成 */
const TRIPLE_CRIT_COEFF: number = 1 + 0.28;

/** 赋予 show_dps_mul 的武器数 */
const SHOW_DPS_COUNT: number = 2;

/** show_dps_mul 加成值 */
const SHOW_DPS_MUL: number = 0.05;

/** 战力表列定义 */
interface ColumnDef {
  label: string;
  vip: number;
  topN: number;
  countCoeff: number;   // 武器数量系数
  typeCoeff: number;     // 武器种类系数
}

const COLUMNS: ColumnDef[] = [
  { label: "v0-4格", vip: 0, topN: 4, countCoeff: 0.75, typeCoeff: 1.8 },
  { label: "v0-5格", vip: 0, topN: 5, countCoeff: 0.7,  typeCoeff: 2 },
  { label: "v0-6格", vip: 0, topN: 6, countCoeff: 0.7,  typeCoeff: 2.2 },
  { label: "v1",     vip: 1, topN: 6, countCoeff: 0.7,  typeCoeff: 2.2 },
  { label: "v2",     vip: 2, topN: 6, countCoeff: 0.7,  typeCoeff: 2.2 },
  { label: "v3",     vip: 3, topN: 6, countCoeff: 0.7,  typeCoeff: 2.2 },
  { label: "v4",     vip: 4, topN: 6, countCoeff: 0.7,  typeCoeff: 2.2 },
  { label: "v5",     vip: 5, topN: 6, countCoeff: 0.7,  typeCoeff: 2.2 },
  { label: "v6",     vip: 6, topN: 6, countCoeff: 0.7,  typeCoeff: 2.2 },
  { label: "v7",     vip: 7, topN: 6, countCoeff: 0.7,  typeCoeff: 2.2 },
  { label: "v8",     vip: 8, topN: 6, countCoeff: 0.7,  typeCoeff: 2.2 },
  { label: "v9",     vip: 9, topN: 6, countCoeff: 0.7,  typeCoeff: 2.2 },
  { label: "v10",    vip: 10, topN: 6, countCoeff: 0.7, typeCoeff: 2.2 },
];

/** 导出列标签供渲染使用 */
export const COLUMN_LABELS: string[] = COLUMNS.map((c) => c.label);

/** 表尾备注（每列一行） */
export const FOOTER_NOTES: string[] = COLUMNS.map((c) => {
  if (c.vip <= 4) {
    const lv = getPresidentLevel(c.vip);
    return `总统${lv}级`;
  }
  return "总统10级+载具泰坦";
});

/** VIP → 总统等级映射 */
function getPresidentLevel(vip: number): number {
  if (vip <= 1) return 1;   // 0.04
  if (vip === 2) return 4;  // 0.16
  if (vip === 3) return 5;  // 0.20
  if (vip === 4) return 8;  // 0.32
  return 10;                 // v5+ → 0.40
}

/** 战力表：grid[president][col] = 人物总战力 */
export type PowerGrid = number[][];

interface WeaponResult {
  name: string;
  power: number;
}

/**
 * 生成极限战力表。
 * grid[president][col]：纵轴 总统 有/无，横轴依次为 v0-4格/v0-5格/v0-6格/v1~v10。
 */
export function generatePowerGrid(weaponList?: string[]): PowerGrid {
  const allNames: string[] = weaponList ?? [];

  // 缓存: `${name}|${vip}|${president}|${showMul}|${vehicleDps}` → 战力
  const cache = new Map<string, number>();

  function getPower(
    name: string, vip: number, president: number, showMul: number, vehicleDps: number,
  ): number {
    const key = `${name}|${vip}|${president}|${showMul}|${vehicleDps}`;
    if (cache.has(key)) return cache.get(key)!;
    const b = makeBonus(vip, president, showMul, vehicleDps);
    const r = calcWeaponPower(name, b);
    cache.set(key, r.dps_final);
    return r.dps_final;
  }

  const grid: PowerGrid = [];

  for (let president = 0; president <= 1; president++) {
    const row: number[] = [];

    for (const col of COLUMNS) {
      const vip = col.vip;

      // v0-v4: 载具神战降为 0.24
      const vehicleDps = vip <= 4 ? 0.24 : 0.30;

      // ---- 第一轮：全部武器无 show_dps_mul ----
      const firstPass: WeaponResult[] = allNames.map((name) => ({
        name,
        power: getPower(name, vip, president, 0, vehicleDps),
      }));

      // 取前 2 名
      firstPass.sort((a, b) => b.power - a.power);
      const top2Names = new Set(firstPass.slice(0, SHOW_DPS_COUNT).map((r) => r.name));

      // ---- 第二轮：前 2 名赋予 show_dps_mul，重新计算全部 ----
      const secondPass: WeaponResult[] = allNames.map((name) => {
        const showMul = top2Names.has(name) ? SHOW_DPS_MUL : 0;
        return { name, power: getPower(name, vip, president, showMul, vehicleDps) };
      });

      // 取前 topN 名求和
      secondPass.sort((a, b) => b.power - a.power);
      const topWeapons = secondPass.slice(0, col.topN);
      const topSum = topWeapons.reduce((sum, r) => sum + r.power, 0);

      // 应用系数
      const total = Math.ceil(
        topSum * col.countCoeff * col.typeCoeff * TRIPLE_CRIT_COEFF,
      );
      row.push(total);

      // ---- 输出选用武器 ----
      const presLabel = president ? "有总统" : "无总统";
      const nameMap = new Map(allNames.map((n) => [n, armsDefineService.getDefine(n).cnName]));
      console.log(
        `\n[${col.label} ${presLabel}] 选用武器 (系数 ${col.countCoeff}×${col.typeCoeff}):`,
      );
      topWeapons.forEach((r, i) => {
        const marker = top2Names.has(r.name) ? " ★调表" : "";
        console.log(
          `  ${i + 1}. ${nameMap.get(r.name) ?? r.name}  ${r.power.toLocaleString("zh-CN")}${marker}`,
        );
      });
      console.log(`  → 合计 ${topSum.toLocaleString("zh-CN")} × ${(col.countCoeff * col.typeCoeff * TRIPLE_CRIT_COEFF).toFixed(4)} = ${total.toLocaleString("zh-CN")}`);
    }

    grid.push(row);
  }

  return grid;
}

/** 创建指定参数的 Bonus 实例 */
function makeBonus(
  vip: number, president: number, showDpsMul: number, vehicleDps: number,
): Bonus {
  const b = new Bonus();

  b.vip_dps_mul = VIP_BONUSES[vip];
  b.dps_all_vehicle = vehicleDps;

  if (president) {
    const presLv = getPresidentLevel(vip);
    b.dps_all_president = presLv * 0.04;
    b.hurt_all_president = presLv * 0.04;
  } else {
    b.dps_all_president = 0;
    b.hurt_all_president = 0;
  }

  b.ui_dps_mul_part = showDpsMul;
  return b;
}
