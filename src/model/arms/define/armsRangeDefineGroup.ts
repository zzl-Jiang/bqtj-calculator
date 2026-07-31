// src\archive\models\arms\define\armsRangeDefineGroup.ts

import { plainToInstance } from "class-transformer";
import { ArmsRangeDefine } from "./armsRangeDefine";
import { EquipColor } from "../../equip/define/equipColor";
import { ArmsDefine } from "./armsDefine";

/**
 * 武器范围静态定义管理组。
 * 原游戏中不存在这个类，统一由 bulletDefineGroup 管理。
 * 我专门把它拆出来了，这样架构和管理更清晰一些。
 */
export class ArmsRangeDefineGroup {
  /** 范围的类型定义对象 */
  public rangeTypeObj: Record<string, ArmsRangeDefine[]> = {};

  /** 存储随机属性变化范围的 */
  public rangeRandomTypeObj: Record<string, number[]> = {};

  /** 这里只记录存在属性变化范围的数据 */
  public rangeRanTypeObj: Record<string, ArmsRangeDefine[]> = {};

  /** 武器 range 定义对象 */
  public rangeObj: Record<string, ArmsRangeDefine> = {};

  /** 武器 range 定义数组 */
  public rangeArr: ArmsRangeDefine[] = [];

  /** 随机武器列表 */
  public randomArr: ArmsRangeDefine[] = [];
  
  /** 稀有 (红色) 武器列表 */
  public rareArmsRangeArr: ArmsRangeDefine[] = [];
  
  /** 黑色武器列表 */
  public blackArmsRangeArr: ArmsRangeDefine[] = [];
  
  /** 暗金武器列表 */
  public darkgoldArmsRangeArr: ArmsRangeDefine[] = [];
  
  /** 紫金武器列表 */
  public purgoldArmsRangeArr: ArmsRangeDefine[] = [];
  
  /** 氩金武器列表 */
  public yagoldArmsRangeArr: ArmsRangeDefine[] = [];

  /** 初始化数据挂载 */
  public initialize(rawArmsRangeData: Record<string, any>[]): void {
    // 清空现有数据
    this.rangeArr = [];
    
    // 遍历每个 rangeDefine
    for (const raw of rawArmsRangeData) {
      const rd0 = new ArmsRangeDefine();

      // 手动将扁平数据映射到 def 属性中
      rd0.def = plainToInstance(ArmsDefine, raw, {
        excludeExtraneousValues: true,
        exposeDefaultValues: true
      });

      // 提取范围数据到 range 属性中
      rd0.range = {};
      for (const [key, value] of Object.entries(raw)) {
        if (Array.isArray(value) && value.length === 2 && typeof value[0] === "number") {
          rd0.range[key] = [value[0], value[1]];
        }
      }
      
      // 因为这个属性自己补全了，所以理论上是都有的
      const armsType0 = rd0.def.armsType;

      this.rangeArr.push(rd0);
      this.rangeObj[rd0.def.name] = rd0;

      if (!this.rangeTypeObj[armsType0]) this.rangeTypeObj[armsType0] = [];

      if (!this.rangeRandomTypeObj[armsType0]) {
        this.rangeRandomTypeObj[armsType0] = [];
        this.rangeRanTypeObj[armsType0] = [];
      }

      if (rd0.def.isRandomB()) this.randomArr.push(rd0); // 随机武器

      this.rangeTypeObj[armsType0].push(rd0);
      this.rangeRandomTypeObj[armsType0].push(rd0.def.randomPro);

      if (rd0.def.randomPro > 0) this.rangeRanTypeObj[armsType0].push(rd0);

      // 根据颜色填充武器类别列表
      if (rd0.def.color === EquipColor.RED) this.rareArmsRangeArr.push(rd0);
      else if (rd0.def.color === EquipColor.BLACK) this.blackArmsRangeArr.push(rd0);
      else if (rd0.def.color === EquipColor.DARKGOLD) this.darkgoldArmsRangeArr.push(rd0);
      else if (rd0.def.color === EquipColor.PURGOLD) this.purgoldArmsRangeArr.push(rd0);
      else if (rd0.def.color === EquipColor.YAGOLD) this.yagoldArmsRangeArr.push(rd0);
    }
  }

  /** 获取单个 rangeDefine */
  public getRangeDefine(name0: string): ArmsRangeDefine | undefined {
    return this.rangeObj[name0];
  }
}