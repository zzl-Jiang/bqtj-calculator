// src\archive\models\body\attack\elementHurt.ts

import { ElementHurtDefine } from "./elementHurtDefine";
import { ElementShell } from "./elementShell";

export class ElementHurt {

  public static readonly no: string = "";
  
  public static readonly fire: string = "fire";
  
  public static readonly electric: string = "electric";
  
  public static readonly frozen: string = "frozen";
  
  public static readonly poison: string = "poison";
  
  public static readonly arr: string[] = [ElementHurt.fire, ElementHurt.electric, ElementHurt.frozen, ElementHurt.poison];

  /** 元素伤害定义对象 */
  private static defineObj: Record<string, ElementHurtDefine> = {};

  /** 宝石名称数组，英文的 */
  private static gemNameArr: string[] = [];

  /** 初始化逻辑 */
  public static initialize(): void {
    this.addDefine(ElementHurt.fire, "火焰", ElementShell.compound, ElementShell.metal, "#D75151");
    this.addDefine(ElementHurt.electric, "电磁", ElementShell.metal, ElementShell.normal, "#9C5588");
    this.addDefine(ElementHurt.frozen, "冷冻", ElementShell.variation, ElementShell.compound, "#03ADD7");
    this.addDefine(ElementHurt.poison, "生化", ElementShell.normal, ElementShell.variation, "#0B8809");
    
    // 初始化宝石名称数组，注意清空，防止重复调用导致数据翻倍...虽说理论上不会出现这个问题
    ElementHurt.gemNameArr = [];
    for(const ename0 of ElementHurt.arr) ElementHurt.gemNameArr.push(ename0 + "Gem");
  }

  /** 方便添加定义、复用的初始化辅助函数 */
  private static addDefine(name: string, cnName: string, breakS: any, defS: any, color: string): void {
    const d0: ElementHurtDefine = new ElementHurtDefine();
    d0.name = name;
    d0.cnName = cnName;
    d0.breakShell = breakS;
    d0.defenceShell = defS;
    d0.gatherColor = color;
    this.defineObj[name] = d0;
  }

  /** 获取定义 */
  public static getDefine(name0: string): ElementHurtDefine {
    return ElementHurt.defineObj[name0];
  }
}

ElementHurt.initialize();