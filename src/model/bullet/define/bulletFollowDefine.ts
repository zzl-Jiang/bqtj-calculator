// src\archive\models\bullet\define\bulletFollowDefine.ts

import { Expose } from 'class-transformer';

/**
 * 定义子弹/武器的追踪属性的存档数据结构。
 * 这个类映射了从存档 JSON 文件中读取的 `followD` 嵌套对象。
 */
export class BulletFollowDefine {
  /**
   * 追踪强度或转向速率。
   * @description 数值越大，子弹转向越灵活，追踪能力越强。
   */
  @Expose()
  public value: number = 0;

  /**
   * 追踪效果的最大持续时间。
   * @description 子弹从发射开始，追踪效果能持续的最长时间。超过这个时间后，子弹将变为直线飞行。
   */
  @Expose()
  public maxTime: number = 0;

  /**
   * 开始追踪前的延迟时间。
   * @description 子弹发射后，需要等待多久才开始启动追踪逻辑。
   */
  @Expose()
  public delay: number = 0;
  
  /**
   * 是否跟踪碰到的目标。
   */
  @Expose()
  public hitIsTargetB: boolean = false;
  
  /**
   * 如果为真，就强制将该子弹设置为非导弹类型。
   */
  @Expose()
  public noLM: boolean = false;
}