// src\archive\models\arms\define\armsType.ts

import { HurtKind } from "../../body/attack/hurtKind";
import { EquipColor } from "../../equip/define/equipColor";
import { ArmsColor } from "./armsColor";
import type { ArmsDefine } from "./armsDefine";

export class ArmsType {
  public static readonly LINE: string = "line";
  
  public static readonly POINT: string = "point";
  
  public static readonly rifle: string = "rifle";
  
  public static readonly sniper: string = "sniper";
  
  public static readonly shotgun: string = "shotgun";
  
  public static readonly pistol: string = "pistol";
  
  public static readonly rocket: string = "rocket";
  
  public static readonly crossbow: string = "crossbow";
  
  public static readonly flamer: string = "flamer";
  
  public static readonly howitzer: string = "howitzer";
  
  public static readonly wavegun: string = "wavegun";
  
  public static readonly laser: string = "laser";
  
  public static readonly lightning: string = "lightning";
  
  public static readonly cutter: string = "cutter";
  
  public static readonly weather: string = "weather";
  
  public static readonly energy: string = "energy";
  
  public static readonly blink: string = "blink";
  
  public static readonly props: string = "props";
  
  public static readonly ranArr: string[] = [this.rifle, this.sniper, this.shotgun, this.pistol, this.rocket, this.laser];
  
  public static readonly filterArr: string[] = [this.rifle, this.sniper, this.shotgun, this.pistol, this.rocket, this.laser];
  
  public static readonly wearArr: string[] = [this.rifle, this.sniper, this.shotgun, this.pistol, this.rocket, this.crossbow, this.flamer, this.howitzer,
    this.wavegun, this.laser, this.lightning, this.weather, this.cutter, this.energy, this.blink];
  
  public static readonly TYPE_ARR: string[] = this.wearArr.concat([this.props]);
  
  public static readonly uiArr: string[] = [this.rifle, this.sniper, this.shotgun, this.pistol, this.rocket];
  
  public static readonly armsEditArr: string[] = [this.rifle, this.sniper, this.shotgun, this.pistol, this.rocket, this.crossbow, this.flamer, this.laser,
    this.lightning];
  
  public static readonly NORMAL_TYPE_ARR: string[] = [this.rifle, this.sniper, this.shotgun, this.pistol, this.rocket];
  
  public static readonly nocomArr: string[] = [this.rifle, this.sniper, this.pistol, this.crossbow, this.howitzer, this.wavegun, this.weather, this.cutter,
    this.lightning, this.flamer, this.energy];
  
  public static readonly otherArr: string[] = [this.howitzer, this.wavegun, this.lightning, this.cutter, this.weather, this.energy, this.blink];
  
  public static readonly onlyOneArr: string[] = [this.lightning, this.cutter, this.wavegun];
  
  public static readonly highSpeedArr: string[] = [this.rifle, this.pistol, this.flamer, this.energy];
  
  public static readonly lockAllSpecialArr: string[] = [this.howitzer, this.wavegun, this.laser, this.lightning, this.weather, this.cutter, this.energy,
    this.blink, this.props];
  
  public static readonly penetrationNumMore5Arr: string[] = [this.flamer, this.wavegun, this.weather, this.cutter, this.laser, this.blink];
  
  public static readonly penetrationNumMore5NameArr: string[] = ["greedySnake","flySnake"];
  
  public static readonly armsSpeed_jie: string[] = [this.rocket, this.crossbow, this.sniper, this.cutter, this.energy, this.rocket, this.crossbow];
  
  public static readonly armsSpeed_jieHurt: string[] = this.armsSpeed_jie.concat([this.flamer]);
  
  public static readonly ID_ARR: string[] = ["01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16"];
  
  public static readonly CapacityMul_arr: number[] = [4, 1, 1, 2, 1, 2, 7, 0.1, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 1];

  /** 根据武器类型获取对应定义ID */
  public static getIDByType(type0: string): string {
    return this.ID_ARR[this.TYPE_ARR.indexOf(type0)];
  }

  /** 武器类型子弹速度系数 */
  public static getBulletSpeedMul(type0: string): number {
    if (type0 === this.flamer) return 0.6;
    return 1;
  }

  /** 初始化伤害类型 */
  public static getHurtKind(type0: string): string {
    switch (type0) {
      case this.rocket:
      case this.howitzer:
        return HurtKind.boom;
      case this.flamer:
        return HurtKind.fire;
      case this.wavegun:
        return HurtKind.wave;
      case this.laser:
        return HurtKind.light;
      case this.lightning:
        return HurtKind.electric;
      case this.energy:
        return HurtKind.particle;
      default:
        return HurtKind.hit;
    }
  }

  /** 武器类型伤害加成系数 */
  public static getHurtAdd(type0: string): number {
    switch (type0) {
      case this.rifle:
        return 0.4;
      case this.sniper:
        return 7;
      case this.shotgun:
        return 3.7 / 7;
      case this.pistol:
        return 1;
      case this.rocket:
        return 7.5;
      case this.crossbow:
        return 7;
      case this.howitzer:
        return 7;
      case this.wavegun:
        return 5;
      case this.cutter:
        return 5;
      case this.laser:
        return 0.3;
      case this.lightning:
        return 3.7 / 7;
      case this.weather:
        return 7;
      case this.flamer:
        return 0.3;
      default:
        return 0.5;
    }
  }

  /** 武器类型弹容加成系数 */
  public static getCapacityMul(type0: string): number {
    return this.CapacityMul_arr[this.TYPE_ARR.indexOf(type0)];
  }

  /** 武器类型攻击间隔加成系数 */
  public static getAttackGapAdd(type0: string): number {
    switch (type0) {
      case this.rifle:
        return 0.7;
      case this.flamer:
        return 0.5;
      case this.laser:
        return 0;
      case this.weather:
        return 0.2;
      default:
        return 1;
    }
  }

  /** 武器类型装弹加成系数 */
  public static getReloadGapMul(type0: string): number {
    return type0 === this.weather ? 0.5 : type0 === this.howitzer ? 0.5 : 1;
  }

  /** 武器类型角度加成系数 */
  public static getAngleAdd(type0: string): number {
    return type0 === this.shotgun ? 0.3 : 1;
  }

  /**
   * 计算在 UI 中显示的武器 DPS 倍率。
   * 这个倍率用于平衡不同类型武器在面板数值上的显示。
   * @param type0 - 武器类型 (e.g., 'rifle', 'sniper')
   * @param color0 - 武器颜色 (e.g., 'darkgold')
   * @param evoLv0 - 武器的进化等级
   * @param d0 - 武器的定义对象
   * @returns 用于 UI 显示的 DPS 倍率
   */
  public static getUIDpsMul(type0: string, color0: string, evoLv0: number, d0: ArmsDefine): number {
    // 基础倍率查找表，替代第一层 if/else 结构
    const baseMulMap: Record<string, number> = {
      [this.crossbow]: 1.6,
      [this.flamer]: 2,
      [this.howitzer]: 2,
      [this.wavegun]: 2,
      [this.laser]: 2,
      [this.lightning]: 2,
      [this.weather]: 2,
      [this.cutter]: 2,
    };

    let v0 = baseMulMap[type0] ?? 1;

    // 处理随机武器的特殊情况
    if (d0.isRandomB()) {
      return ArmsColor.getUIDpsMul(color0); // 如果是随机武器，直接返回颜色倍率
    }

    const isPurgold = color0 === EquipColor.PURGOLD;
    const isYagold = color0 === EquipColor.YAGOLD;
    const isAdvancedColor = color0 === EquipColor.DARKGOLD || isPurgold || isYagold;

    if (!isAdvancedColor) {
      return v0 * ArmsColor.getUIDpsMul(color0);
    }
    
    // 使用 switch 语句处理不同武器类型在高级颜色下的复杂逻辑
    switch (type0) {
      case this.sniper:
        v0 *= (isPurgold || isYagold) ? 1.35 : 1.3;
        break;
      
      case this.shotgun:
        if (isPurgold) v0 *= 1.23;
        else if (isYagold) v0 *= 1.21;
        else v0 *= 1.15;
        break;
        
      case this.rocket:
        if (isPurgold || isYagold) {
          v0 *= (d0.name === "rocketCate") ? 1.12 : 0.8;
        } else {
          v0 *= 0.95;
        }
        break;
        
      case this.rifle:
        if (isPurgold || isYagold) v0 *= 1.08;
        break;
        
      case this.pistol:
        if (isPurgold || isYagold) v0 *= 1.03;
        break;
        
      case this.flamer:
        if (evoLv0 >= 9) v0 *= 0.97;
        if (isPurgold) v0 *= 0.8;
        else if (isYagold) v0 *= 0.735;
        break;
        
      case this.laser:
        if (evoLv0 >= 9) v0 *= 0.965;
        if (isPurgold || isYagold) v0 *= 0.83;
        break;
        
      case this.energy:
        v0 = 1.462;
        if (isPurgold || isYagold) v0 *= 0.84;
        break;
        
      case this.lightning:
        if (isPurgold || isYagold) {
          if (d0.name === "extremeGun") v0 *= 0.84;
        }
        break;
      
      case this.blink:
        // 此分支在原始代码中为空，保持一致
        break;
    }

    return v0 * ArmsColor.getUIDpsMul(color0);
  }

  /** 根据武器类型生成初始化伤害类型 */
  public static setArmsType(type0: string, d0: ArmsDefine): void {
    if (!d0.armsType) d0.armsType = type0;
    if (!d0.kind) d0.kind = this.getHurtKind(type0);
  }
}