// src\archive\models\bullet\define\bulletLineDefine.ts

import { Expose } from 'class-transformer';

/**
 * 定义子弹/武器的反弹属性的存档数据结构。
 * 这个类映射了从存档 JSON 文件中读取的 `lineD` 嵌套对象。
 */
export class BulletLineDefine {
  /**
   * 射线颜色
   */
  @Expose()
  public color: string = '0xFFFFFF';

  /**
   * 发光颜色
   */
  @Expose()
  public lightColor: string = '0xFFFF00';

  /**
   * 反弹后速度变化的乘数。
   */
  @Expose()
  public vMul: number = 1;

  /**
   * 射线尺寸，单位像素
   */
  @Expose()
  public size: number = 1;

  /**
   * 发光尺寸，单位像素
   */
  @Expose()
  public lightSize: number = 4;

  /**
   * 图层模式，默认正常
   */
  @Expose()
  public blendMode: string = 'normal';
  
  /**
   * 射线样式，默认为空
   */
  @Expose()
  public type: string = '';

  /**
   * 这几把是啥？
   */
  @Expose()
  public editB: boolean = false;
}