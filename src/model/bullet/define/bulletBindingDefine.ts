// src\archive\models\bullet\define\bulletBindingDefine.ts

import { Expose } from 'class-transformer';

/**
 * 定义子弹/武器的关联 (单位) 属性的存档数据结构。
 * 这个类映射了从存档 JSON 文件中读取的 `BindingD` 嵌套对象。
 */
export class BulletBindingDefine {
  /**
   * 关联的单位名称
   */
  @Expose()
  public cnName: string = '';

  /**
   * 理论上来说是技能数组，但是技能还没写。
   * 就直接用 any 先凑合着，暂时也用不到。
   * TODO: 完善技能数组处理逻辑。
   */
  @Expose()
  public skillArr: any;

  /**
   * 单位生命系数
   */
  @Expose()
  public lifeMul: number = 1;

}