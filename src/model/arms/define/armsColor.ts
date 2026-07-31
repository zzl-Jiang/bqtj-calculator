// src\archive\models\arms\define\armsColor.ts

import { EquipColor } from "../../equip/define/equipColor";

export class ArmsColor extends EquipColor {
  public static getUIDpsMul(color0: string): number {
    if(EquipColor.moreBlackB(color0)) return 1.3;
    return 1;
  }
}