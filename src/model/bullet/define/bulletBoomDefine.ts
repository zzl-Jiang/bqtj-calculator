// src\archive\models\bullet\define\bulletBoomDefine.ts

import { Expose } from 'class-transformer';

/**
 * 定义子弹/武器的爆炸效果属性的存档数据结构。
 * 这个类映射了从存档 JSON 文件中读取的 `BoomD` 嵌套对象。
 */
export class BulletBoomDefine {
  /**
   * 击中地面是否爆炸。
   */
  @Expose()
  public floorB: boolean = false;

  /**
   * 击中敌方单位是否爆炸。
   */
  @Expose()
  public bodyB: boolean = false;

  /**
   * 是否自爆。
   */
  @Expose()
  public selfB: boolean = false;

  /**
   * 爆炸角度？
   */
  @Expose()
  public radius: number = 0;

  /**
   * 伤害系数
   */
  @Expose()
  public hurtMul: number = 1;

  /**
   * 最大伤害单位数
   */
  @Expose()
  public maxHurtNum: number = 7;
  
  /**
   * 排除自身？
   */
  @Expose()
  public noExcludeBodyB: boolean = false;
  
  /**
   * 击中敌方单位后是否有特殊效果显示
   */
  @Expose()
  public haveBodyHitEffectB: boolean = false;
}