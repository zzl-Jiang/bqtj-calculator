// src\archive\models\body\attack\elementHurtDefine.ts

import { NormalDefine } from "../../common/normal/normalDefine";

export class ElementHurtDefine extends NormalDefine {
  /** 中文名称 */
  public cnName: string = "";

  /** 敏感外壳 */
  public breakShell: string = "";
  
  /** 抵抗外壳 */
  public defenceShell: string = "";
  
  /** 显示颜色 */
  public gatherColor: string = "";

  public getGemName(): string {
    return this.name + "Gem";
  }
  
  public getHurtCn(): string {
    return this.cnName + "伤害";
  }
}