// src\archive\models\arms\define\armsRangeDefine.ts

import { ArmsDefine } from './armsDefine';

/**
 * 武器范围定义 (ArmsRangeDefine)
 * 描述了一个武器模板，其中包含了一系列可以随机生成的属性范围。
 * 游戏中的每一把具体武器，都是基于这个模板随机生成出来的。
 * 这个类只负责存储静态的配置数据，不包含任何业务逻辑。
 */
export class ArmsRangeDefine {
  /**
   * 基础武器定义。
   * 它包含了该武器模板所有固定的、不可随机化的基础属性。
   * 同时，它的数值属性也作为随机范围的默认值或基础值。
   */
  public def: ArmsDefine = new ArmsDefine();

  /**
   * 可随机化属性的范围映射。
   * - 键 (key): 属性的名称，例如 'capacity', 'attackGap'。
   * - 值 (value): 一个包含两个数字的元组 [min, max]，代表该属性的随机范围。
   */
  public range: Record<string, [number, number]> = {};
}
