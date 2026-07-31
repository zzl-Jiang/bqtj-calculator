// src\archive\models\bullet\define\bulletCritDefine.ts

import { Expose } from 'class-transformer';

/**
 * 定义子弹/武器的暴击属性的存档数据结构。
 * 这个类映射了从存档 JSON 文件中读取的 `critD` 嵌套对象。
 */
export class BulletCritDefine {
  /** 暴击概率 */
  @Expose()
  public pro: number = 0;

  /**
   * 暴击伤害倍率。
   * 有些时候可能由于奇奇怪怪的取整逻辑会多出一些莫名其妙的小数。
   */
  @Expose()
  public mul: number = 1;
}