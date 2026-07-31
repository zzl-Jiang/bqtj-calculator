// src\archive\models\image\imageUrlDefine.ts

import { NormalDefine } from '../common/normal/normalDefine';
import { Expose } from 'class-transformer';

/**
 * 描述一个视觉/听觉效果的定义类。
 * 它可以是一个简单的图片URL，也可以是一个包含音效、震动、混合模式等复杂参数的完整效果。
 */
export class ImageUrlDefine extends NormalDefine {
  /** 图像资源的基础路径 (e.g., "effects/explosion") */
  @Expose()
  public url: string = '';
  
  /** 音效资源的基础路径 (e.g., "sounds/explosion_sound") */
  @Expose()
  public soundUrl: string = '';

  /** 震动效果的描述字符串 (e.g., "type:small,duration:0.2") */
  @Expose()
  public shake: string = '';
  
  /** 图像混合模式/图层效果 (e.g., "add", "filter") */
  @Expose()
  public con: string = '';
  
  /** 图像帧数或分段数量 (主要用于射线类效果) */
  @Expose()
  public len: number = 0;
  
  /** 动画/效果时长 (秒, -1 表示跟随动画长度) */
  @Expose()
  public time: number = -1;
  
  /** 是否在底层渲染 */
  @Expose()
  public bottomLayerB: boolean = false;
  
  /** 是否缓存此图像以提高性能 */
  @Expose()
  public cacheB: boolean = false;
  
  /** 颜色叠加，格式为 0xRRGGBB 的数字 */
  @Expose()
  public bodyColor: number = 0;
  
  /** 颜色叠加的透明度 (0-1) */
  @Expose()
  public bodyColorAlpha: number = 0;

  /** 效果是否持续刷新 (主要用于射线) */
  @Expose()
  public everFleshB: boolean = false;

  /** 射线波动角度 */
  @Expose()
  public waveAn: number = 0;

  /** 在X轴上的偏移量 */
  @Expose()
  public xGap: number = 0;

  /** 随机偏移范围 */
  @Expose()
  public randomRange: number = 0;

  /** 随机旋转角度范围 */
  @Expose()
  public ranAn: number = 0;

  /** 图片朝向数量 (e.g., 8方向图) */
  @Expose()
  public raNum: number = 1;

  /** 是否跟随父级部件的旋转 */
  @Expose()
  public followPartRaB: boolean = false;
  
  /** 是否完全不跟随父级移动（固定在屏幕上） */
  @Expose()
  public noFollowB: boolean = false;
  
  /** URL 随机后缀的最大值 (e.g., 3 -> url1, url2, url3) */
  @Expose()
  public urlRandomValue: number = 0;
  
  /** 音效随机后缀的最大值 (e.g., 3 -> sound1, sound2, sound3) */
  @Expose()
  public soundRan: number = 0;
  
  /** 音量 (-1 表示未设置, 1 为默认值) */
  @Expose()
  public soundVolume: number = -1;
  
  /** 效果消失的类型 */
  @Expose()
  public imgDieType: string = "";
  
  /** 烟雾效果的类型 (e.g., "one", "frame") */
  @Expose()
  public smokeType: string = "one";

  /** 是否不显示此效果 (用于逻辑占位) */
  @Expose()
  public noShowB: boolean = false;
  
  /** 关联的显示部位 (用于复杂模型) */
  @Expose()
  public partType: string[] = [];

  /** 不知道干啥的，先留着 */
  @Expose()
  public sm: string = "";
}