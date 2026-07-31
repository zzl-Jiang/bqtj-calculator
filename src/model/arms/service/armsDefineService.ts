// src\archive\models\arms\service\armsDefineService.ts

import rawArmsData from '../../../data/arms.json';
import type { ArmsDefine } from '../define/armsDefine'; 
import type { ArmsRangeDefine } from '../define/armsRangeDefine';
import { createLogger } from '../../common/utils/logger';
import { ArmsRangeDefineGroup } from '../define/armsRangeDefineGroup';

const logger = createLogger("ArmsDefineService");

class ArmsDefineService {
  /** 静态定义的结构化存储对象 */
  private armsRangeDefG!: ArmsRangeDefineGroup;

  constructor() {
    this.initialize();
  }

  /**
   * 与武器相关的静态定义初始化逻辑，
   * 通过不同的静态 json 数据加载数据存储类。
   */
  private initialize(): void {
    this.armsRangeDefG = new ArmsRangeDefineGroup();
    this.armsRangeDefG.initialize(rawArmsData);
    logger.info(`初始化完成，共加载 ${this.armsRangeDefG.rangeArr.length} 把武器定义。`)
  }

  /**
   * 获取整体静态定义。
   */
  public getRangeDefG(): ArmsRangeDefineGroup {
    return this.armsRangeDefG;
  }

  /**
   * 根据武器的唯一名称（name）获取其静态定义。
   * @param name - 武器的唯一标识符 (例如 "shotgunSkunk")。
   * @returns 武器的定义对象（一个 ArmsDefine 实例）。
   */
  public getDefine(name: string): ArmsDefine {
    return this.armsRangeDefG.rangeObj[name].def;
  }
  
  /**
   * 根据武器的唯一名称（name）获取其范围定义。
   * @param name - 武器的唯一标识符 (例如 "shotgunSkunk")。
   * @returns 武器的定义对象（一个 ArmsRangeDefine 实例）。
   */
  public getRangeDefine(name: string): ArmsRangeDefine {
    return this.armsRangeDefG.rangeObj[name];
  }

  /**
   * 获取所有可用的武器定义。
   * @returns 一个包含所有武器定义实例的数组。
   */
  public getAllDefines(): ArmsDefine[] {
    const armsDef: ArmsDefine[] = [];
    for(const value of this.armsRangeDefG.rangeArr) {
      armsDef.push(value.def);
    }
    return armsDef;
  }
}

// 导出一个单例，以便在整个应用中共享和使用
export const armsDefineService = new ArmsDefineService();