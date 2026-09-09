// src\calculate\core\bonus.ts

/**
 * 所有加成数据的汇总。
 * 有一说一，这个得手动维护，没啥办法。
 */
export class Bonus {
  /** 装备的数值战力 */
  public ea0_dps: number = 48800;

  /** 尸宠的数值战力 */
  public ea0_pet: number = 620250;

  /** 装备的数值伤害 */
  public ea0_hurt: number = 25118;

  /** 装备的百分比普战（带强化） */
  public ea0_dps_mul_equip: number = 2.80;

  /** 装置的百分比普战 */
  public ea0_dps_mul_device: number = 0.90;

  /** 副手的百分比普战 */
  public ea0_dps_mul_weapon: number = 0.55;

  /** 称号的百分比普战 */
  public ea0_dps_mul_title: number = 1.00;

  /** 军队的百分比普战 */
  public ea0_dps_mul_union: number = 0.59;

  /** 军衔的百分比普战 */
  public ea0_dps_mul_rank: number = 0.35;

  /** 争霸加成的百分比普战 */
  public ea0_dps_mul_battle: number = 0.76;

  /** 称号荣誉值的百分比普战 */
  public ea0_dps_mul_honor: number = 0.14;

  /** 成就勋章的百分比普战 */
  public ea0_dps_mul_medal: number = 0.18;

  /** 步枪的武器类型百分比普战 */
  public ea0_dps_mul_rifle: number = 0.34;

  /** 狙击的武器类型百分比普战 */
  public ea0_dps_mul_sniper: number = 0.12;

  /** 散弹的武器类型百分比普战 */
  public ea0_dps_mul_shotgun: number = 0.08;

  /** 手枪的武器类型百分比普战 */
  public ea0_dps_mul_pistol: number = 0.11;

  /** 火炮的武器类型百分比普战 */
  public ea0_dps_mul_rocket: number = 0.30;

  /** 喷火器的武器类型百分比普战 */
  public ea0_dps_mul_flamer: number = 0.32;

  /** 波动枪的武器类型百分比普战 */
  public ea0_dps_mul_wavegun: number = 0.05;

  /** vip 百分比战力加成 */
  public vip_dps_mul: number = 0.70;

  /** 特零加成 */
  public sp_dps_mul: number = 0.80;

  /** 装备的百分比普伤 */
  public ea0_hurt_mul_equip: number = 1.74;

  /** 成就勋章的百分比普伤 */
  public ea0_hurt_mul_medal: number = 0.195;

  /** 武器强化的百分比普伤 */
  public ea0_hurt_mul_strengthen: number = 5.30;

  /** 步枪的武器类型百分比普伤 */
  public ea0_hurt_mul_rifle: number = 0.06;

  /** 狙击的武器类型百分比普伤 */
  public ea0_hurt_mul_sniper: number = 0.20;

  /** 成就的全体战力加成 */
  public whole_dps_mul_achieve: number = 0.0510;

  /** 虚天塔的全体战力加成 */
  public whole_dps_mul_tower: number = 0.0450;

  /** 巅峰的全体战力加成 */
  public whole_dps_mul_peak: number = 0.1500;

  /** 装备的神战 */
  public dps_all_equip: number = 3.80;

  /** 时装的神战 */
  public dps_all_fashion: number = 0.23;

  /** 载具的神战 */
  public dps_all_vehicle: number = 0.30;

  /** 称号的神战（无需佩戴加成） */
  public dps_all_title: number = 0.05;

  /** 炊事馆的神战 */
  public dps_all_food: number = 0.53;

  /** 巅峰的神战 */
  public dps_all_peak: number = 0.15;

  /** 总统的神战 */
  public dps_all_president: number = 0.40;

  /** 魂卡的神战 */
  public dps_all_card: number = 0.11;

  /** 守望者的神战 */
  public dps_all_building: number = 0.15;

  /** 总统的神伤 */
  public hurt_all_president: number = 0.40;

  /** 魂卡的神伤 */
  public hurt_all_card: number = 0.11;

  /** 战神套的神伤 */
  public hurt_all_set: number = 1.55;

  /** 数值弹容加成 */
  public ea0_capacity: number = 48;

  /** 百分比弹容加成 */
  public ea0_capacity_mul: number = 0.87;

  /** 射速加成 */
  public ea0_attack_gap: number = 0.06;

  /** 装备的换弹速度 */
  public ea0_reload_equip: number = 2.08;

  /** 成就勋章的换弹速度 */
  public ea0_reload_medal: number = 0.285;

  /** 3暴概率 */
  public triple_crit: number = 0.14;

  /** 元素攻击倍率（百分比值，如 55 表示 55%） */
  public ea0_element: number = 0.55;

  /** 零件提供的 UI 显示战力乘数（单武器计算时为 0，后续统一调用时注入） */
  public ui_dps_mul_part: number = 0;

  /**
   * 获取百分比普战总和。
   * 注意不包括类型加成。
   */
  public getDpsMulP(): number {
    return this.ea0_dps_mul_battle + this.ea0_dps_mul_device + this.ea0_dps_mul_equip +
      this.ea0_dps_mul_honor + this.ea0_dps_mul_medal + this.ea0_dps_mul_rank +
      this.ea0_dps_mul_title + this.ea0_dps_mul_union + this.ea0_dps_mul_weapon;
  }

  /**
   * 获取类型百分比普战。
   */
  public getDpsMulT(type0: string): number {
    return (this as any)['ea0_dps_mul_' + type0] ?? 0;
  }

  /**
   * 获取百分比普伤总和。
   * 注意包含强化，不包括类型加成。
   */
  public getHurtMulP(): number {
    return this.ea0_hurt_mul_equip + this.ea0_hurt_mul_medal + this.ea0_hurt_mul_strengthen;
  }

  /**
   * 获取类型百分比普伤。
   */
  public getHurtMulT(type0: string): number {
    return (this as any)['ea0_hurt_mul_' + type0] ?? 0;
  }

  /**
   * 获取数值战力加成。
   * 不包含零件的（虽然也是固定值，但还是走个形式计算一下，就不在这里列了）。
   */
  public getDpsAdd(): number {
    return this.ea0_dps + this.ea0_pet;
  }

  /** 
   * 获取全体战力加成。
   */
  public getWholeDpsMul(): number {
    return this.whole_dps_mul_achieve + this.whole_dps_mul_peak + this.whole_dps_mul_tower;
  }

  /** 
   * 获取神级战力加成。
   */
  public getDpsAll(): number {
    return this.dps_all_building + this.dps_all_card + this.dps_all_equip + this.dps_all_fashion +
      this.dps_all_food + this.dps_all_peak + this.dps_all_president + this.dps_all_title + this.dps_all_vehicle;
  }

  /**
   * 获取神级伤害加成。
   */
  public getHurtAll(): number {
    return this.hurt_all_card + this.hurt_all_president + this.hurt_all_set;
  }

  /** 获取换弹速度加成总和 */
  public getReloadMulP(): number {
    return this.ea0_reload_equip + this.ea0_reload_medal;
  }

  /** 获取元素攻击倍率（已为小数，如 0.55 = 55%） */
  public getElementHurtMul(): number {
    return this.ea0_element;
  }
}