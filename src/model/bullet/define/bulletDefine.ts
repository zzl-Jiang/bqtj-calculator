// src\archive\models\bullet\define\bulletDefine.ts

import { Expose, Transform, Type } from 'class-transformer';
import { BulletPositionDefine } from '../position/bulletPositionDefine';
import { BulletPositionDefineGroup } from '../position/bulletPositionDefineGroup';
import { ImageUrlDefine } from '../../image/imageUrlDefine';
import { BulletSpeedDefine } from './bulletSpeedDefine';
import { BulletFollowDefine } from './bulletFollowDefine';
import { BulletBounceDefine } from './bulletBounceDefine';
import { BulletCritDefine } from './bulletCritDefine';
import { BulletBoomDefine } from './bulletBoomDefine';
import { BulletBindingDefine } from './bulletBindingDefine';
import { BulletLineDefine } from './bulletLineDefine';
import { AttackType } from '../../body/attack/attackType';
import { takeFirstNumber } from '../../common/utils/formatUtils';

export class BulletDefine extends BulletPositionDefine {
  /** 子弹中文名称 */
  @Expose()
  public cnName: string = '';

  /** 伤害比例，是一个系数。也可能被后续覆盖 */
  @Expose()
  public hurtRatio: number = 0;

  /** 伤害种类 */
  @Expose()
  public kind: string = '';

  /** 基础武器 (子弹) 的标签，其实就是基础名称 */
  @Expose()
  public baseLabel: string = '';

  /** 武器类型。武器数据中已经补全 */
  @Expose()
  public armsType: string = '';

  /** 特殊设计动作/动画一类 */
  @Expose()
  public actionLabel: string = '';

  /** 百分比伤害，一般只用作子弹，武器不会有该属性 */
  @Expose()
  public hurtMul: number = 0;

  /**
   * 附身伤害比例。
   * 在附身状态下造成的伤害返还会乘以这个系数。
   */
  @Expose()
  public transBackMul: number = 1;

  /** 攻击类型 */
  @Expose()
  public attackType: string = AttackType.DIRECT;

  /** 击退值 */
  @Expose()
  public beatBack: number = 0;

  /** 射击目标振动值 */
  @Expose()
  public targetShakeValue: number = 0;
  
  /** 暴击定义 (通常是两倍暴击) */
  @Expose()
  @Type(() => BulletCritDefine)
  public critD: BulletCritDefine = new BulletCritDefine();

  /** 三倍暴击专属定义 */
  @Expose()
  @Type(() => BulletCritDefine)
  public critD3: BulletCritDefine = new BulletCritDefine();

  /** 是否判定为我方 (相同阵营) 子弹 */
  @Expose()
  public sameCampB: boolean = true;

  /** 子弹不发生碰撞 */
  @Expose()
  public noHitB: boolean = false;

  /**
   * 强制以子弹定义数据处理命中，不受伤害数据影响。
   * 但实际上我在测试中找不到任何区别。
   */
  @Expose()
  public noHurtEffectB: boolean = false;

  /** 
   * 鞭尸开关，受全局鞭尸控制。
   * 全局鞭尸开启，并且该属性为真时才能触发鞭尸。
   */
  @Expose()
  public whippB: boolean = true;

  /** 不受磁力场干扰 */
  @Expose()
  public noMagneticB: boolean = false;

  /** 不会被技能清除 */
  @Expose()
  public noBeClearB: boolean = false;

  /**
   * 名称中是否含有 "imploding"
   * 注意不要 expose, 这个初始化生成的
   */
  public implodingB: boolean = false;

  /** 子弹寿命 */
  @Expose()
  public bulletLife: number = 2;

  /** 寿命随机增加值 (范围，0~数值) */
  @Expose()
  public lifeRandom: number = 0

  /**
   * 寿命结束后图像延迟消失时间。
   * 感觉是用来优化动画视觉效果的，
   * 这样很多动画伤害判定时间就会小于动画时间。
   */
  @Expose()
  public imgClearDelay: number = 0;

  /** 射线控制射程，子弹控制子弹宽度 */
  @Expose()
  @Transform(({ value }) => takeFirstNumber(value))
  public bulletWidth: number = 7;

  /** 射程随机增加量。目前看来只有射线枪/子弹有正常设置 */
  @Expose()
  @Transform(({ value }) => takeFirstNumber(value))
  public bulletShakeWidth: number = 0;

  /** 子弹类型，loneline 是射线，rect 是子弹 */
  @Expose()
  public hitType: string = 'rect';

  /** 穿人个数 */
  @Expose()
  public penetrationNum: number = 0;

  /** 穿墙深度 */
  @Expose()
  public penetrationGap: number = 0;
  
  /** 攻击间隔 */
  @Expose()
  @Transform(({ value }) => takeFirstNumber(value))
  public attackGap: number = 0;

  /** 攻击延迟，一般配合有动画的 */
  @Expose()
  public attackDelay: number = 0;

  /** 初始碰撞延迟 */
  @Expose()
  public noHitTime: number = 0;

  /**
   * 致命地雷埋下后，在经过多长时间后，如果未侦察 (离单位一定距离且不同阵营) 则隐藏 (看不见)。
   * 用于主线绿岛系列任务，地雷相关关卡。
   */
  @Expose()
  public hideTime: number = 0;

  /** 碰撞间隔，该子弹和所有单位的 */
  @Expose()
  public hitGap: number = 0;

  /** 连碰间隔，该子弹和同一单位的 */
  @Expose()
  public twoHitGap: number = 0;

  /** 一类 (同名) 子弹共享的连碰间隔。通常用于一组动画不同子弹避免多段判定 */
  @Expose()
  public twoHitSameNameB: boolean = false;

  /** 同个单位只碰1次 */
  @Expose()
  public oneHitBodyB: boolean = false;

  /** 子弹数量 */
  @Expose()
  public bulletNum: number = 1;

  /** 连射间隔，得有 shootNum > 1 才有效 */
  @Expose()
  public shootGap: number = 0;

  /** 连射次数 */
  @Expose()
  public shootNum: number = 1;

  /** 射击后坐力 */
  @Expose()
  public shootRecoil: number = 0;

  /** 射击时屏幕震动 */
  @Expose()
  public screenShakeValue: number = 0;

  /** AI射程 */
  @Expose()
  public aiShootRange: number = 0;

  /** 发射点偏移、特殊发射逻辑 */
  @Expose()
  @Type(() => BulletPositionDefineGroup)
  public positionD: BulletPositionDefineGroup | null = null;

  /** 子弹速度 */
  @Expose()
  public bulletSpeed: number = 0;

  /** 子弹重力 */
  @Expose()
  public gravity: number = 0;

  /** 子弹图像自转 */
  @Expose()
  public bulletVra: number = 0;

  /** 子弹速度控制 */
  @Expose()
  @Type(() => BulletSpeedDefine)
  public speedD: BulletSpeedDefine = new BulletSpeedDefine();

  /** 跟踪控制 */
  @Expose()
  @Type(() => BulletFollowDefine)
  public followD: BulletFollowDefine = new BulletFollowDefine();
  
  /** 反弹控制 */
  @Expose()
  @Type(() => BulletBounceDefine)
  public bounceD: BulletBounceDefine = new BulletBounceDefine();

  /** 普通技能 */
  @Expose()
  public skillArr: string[] = [];

  /** 神级技能 */
  @Expose()
  public godSkillArr: string[] = [];

  /** 子弹携带技能 */
  @Expose()
  public bulletSkillArr: string[] = [];

  /** 爆炸效果控制 */
  @Expose()
  @Type(() => BulletBoomDefine)
  public boomD: BulletBoomDefine = new BulletBoomDefine();

  /** 绑定单位控制 */
  @Expose()
  @Type(() => BulletBindingDefine)
  public bindingD: BulletBindingDefine = new BulletBindingDefine();
  
  /** 射线效果控制 */
  @Expose()
  @Type(() => BulletLineDefine)
  public lineD: BulletLineDefine = new BulletLineDefine();

  /** 子弹图像 */
  @Expose()
  @Type(() => ImageUrlDefine)
  public bulletImg: ImageUrlDefine = new ImageUrlDefine();

  /** 枪口火光 */
  @Expose()
  @Type(() => ImageUrlDefine)
  public fireImg: ImageUrlDefine = new ImageUrlDefine();
  
  /** 子弹图像 (向左) */
  @Expose()
  @Type(() => ImageUrlDefine)
  public bulletLeftImg: ImageUrlDefine = new ImageUrlDefine();
  
  /** 击中特效 */
  @Expose()
  @Type(() => ImageUrlDefine)
  public hitImg: ImageUrlDefine = new ImageUrlDefine();
  
  /** 击中地面特效 */
  @Expose()
  @Type(() => ImageUrlDefine)
  public hitFloorImg: ImageUrlDefine = new ImageUrlDefine();
  
  /** 尾烟特效 */
  @Expose()
  @Type(() => ImageUrlDefine)
  public smokeImg: ImageUrlDefine = new ImageUrlDefine();
  
  /** 自爆特效 */
  @Expose()
  @Type(() => ImageUrlDefine)
  public selfBoomImg: ImageUrlDefine = new ImageUrlDefine();

  // 构造函数与初始化
  constructor() {
    super();
    this.critD3.mul = 3;
    this.implodingB = this.name.includes("imploding");
  }
}