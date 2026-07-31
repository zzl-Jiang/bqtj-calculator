// src\archive\models\bullet\define\bulletSpeedDefine.ts

import { Expose } from 'class-transformer';

/**
 * 定义子弹/武器的速度属性的存档数据结构。
 * 这个类映射了从存档 JSON 文件中读取的 `SpeedD` 嵌套对象。
 */
export class BulletSpeedDefine {
  /**
   * 最小飞行速度
   */
  @Expose()
  public min: number = 0;

  /**
   * 最大飞行速度
   */
  @Expose()
  public max: number = 0;

  /**
   * 子弹加速度
   */
  @Expose()
  public a: number = 0;

  /**
   * 子弹速度随机变化比例
   */
  @Expose()
  public random: number = 0;

  /**
   * 自转吗？不知道是啥，也不在意
   */
  @Expose()
  public selfVra: number = 0;

  /**
   * 后坐力？击退？不知道是啥，不在意
   */
  @Expose()
  public raBackV: number = 0;
}