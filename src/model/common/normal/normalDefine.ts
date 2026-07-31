// src\archive\models\common\normal\normalDefine.ts

import { Expose } from "class-transformer";
import type { IO_NormalDefine } from "./IO_NormalDefine";

/**
 * 所有数据定义类的抽象基类，这个类不能被直接实例化 (不能 new NormalDefine())，
 * 只能被其他类继承。
 */
export abstract class NormalDefine implements IO_NormalDefine {
  /** 唯一标识符/名称 */
  @Expose()
  public name: string = '';

  /** 没啥通用的初始化方法，凑个接口 */
  public initialize?(): void {}

  /** 返回名称 */
  public getName(): string {
    return this.name;
  }
}