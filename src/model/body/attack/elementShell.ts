// src\archive\models\body\attack\elementShell.ts

/**
 * 元素外壳静态数据
 */
export class ElementShell {
  
  /** 复合外壳 火焰敏感 */
  public static compound: string = "compound";
  
  /** 金属外壳 电磁敏感 */
  public static metal: string = "metal";
  
  /** 变异外壳 冷冻敏感 */
  public static variation: string = "variation";
  
  /** 普通外壳 生化敏感 */
  public static normal: string = "normal";
  
  /** 其他外壳 */
  public static other: string = "other";
  
  /** 总列表 */
  public static arr: string[] = [ElementShell.compound, ElementShell.metal, ElementShell.variation, ElementShell.normal, ElementShell.other];

}