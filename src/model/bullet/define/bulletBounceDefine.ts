// src\archive\models\bullet\define\bulletBounceDefine.ts

import { Expose } from 'class-transformer';

/**
 * 定义子弹/武器的反弹属性的存档数据结构。
 * 这个类映射了从存档 JSON 文件中读取的 `bounceD` 嵌套对象。
 */
export class BulletBounceDefine {
  /** 击中反弹，击中敌人身体后的最大反弹次数 */
  @Expose()
  public body: number = 0;

  /** 地面反弹，击中墙壁/地面后的最大反弹次数 */
  @Expose()
  public floor: number = 0;
  
  /** 是否具有“粘滞地面”的特性，参考圣诞礼炮 */
  @Expose()
  public glueFloorB: boolean = false;

  /**
   * 反弹伤害比例。
   * 默认是指数衰减，如果填写了非零数值，就按反弹次数正比增加，最大 20 倍。
   */
  @Expose()
  public hurtNumAdd: number = 0;
  
  /** 反弹后是否寿命恢复 */
  @Expose()
  public liveInitB: boolean = false;

  /** 子弹是否在碰撞后不消失 */
  @Expose()
  public noDieB: boolean = false;

  /** 反弹后不碰撞时间 */
  @Expose()
  public noHitTime: number = 0;

  /** 这啥？只有定义没有调用。疑似冗余数据 */
  @Expose()
  public shakeString: string = '';

  /** 反弹速度系数 */
  @Expose()
  public vMul: number = 1;
}