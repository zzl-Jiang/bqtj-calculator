// src\archive\models\bullet\position\bulletPositionDefineGroup.ts

import { Expose, Type } from 'class-transformer';
import { BulletPositionDefine } from './bulletPositionDefine';

/**
 * 管理单次射击中多个子弹的定位方式。
 * 可以使用预定义的坐标列表，或者一种特殊的程序化逻辑（策略模式）。
 */
export class BulletPositionDefineGroup {

  /** 预定义的位置列表，在 specialType 未设置时使用。 */
  @Expose()
  @Type(() => BulletPositionDefine)
  public arr: BulletPositionDefine[] = [];

  /** 用于定位的特殊程序化逻辑的名称。 */
  @Expose()
  public specialType: string = "";

  /** 一个可复用的临时对象，用于避免在循环中频繁创建新实例（性能优化）。 */
  public tempD0: BulletPositionDefine = new BulletPositionDefine();
}