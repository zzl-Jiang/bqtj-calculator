// src\archive\models\arms\define\armsDefine.ts

import { Expose, Type, Transform } from 'class-transformer';

import { BulletDefine } from '../../bullet/define/bulletDefine';
import { ArmsCrossbowDefine } from './armsCrossbowDefine';
import { ArmsRecordDefine } from './armsRecordDefine';
import { takeFirstNumber, takeLastNumber } from '../../common/utils/formatUtils';

/**
 * 武器静态数据定义
 */
export class ArmsDefine extends BulletDefine {
  /** 是否为随机武器。数值没意义、只要 > 0 就是，虽然一般都是 1, 但还有设 0.0001 的 */
  @Expose()
  public randomPro: number = 0;

  /** 不知道干啥的，没啥用 */
  @Expose()
  public index: number = 1;

  /** 作为稀有武器可能掉落的关卡最低等级 */
  @Expose()
  public rareDropLevel: number = 1;
  
  /** 武器碎片掉落等级列表。注意这个不是最低 */
  @Expose() 
  public dropLevelArr: number[] = [];
  
  /** 武器定义颜色 */
  @Expose()
  public color: string = "";
  
  /** 武器碎片掉落限定 boss 名称 (或者是 baseLabel?) */
  @Expose() 
  public dropBodyArr: string[] = [];

  /** 是否可由碎片合成。不一定必须合成，比如炮仗 */
  @Expose()
  public chipB: boolean = false;

  /** 战斗力系数 */
  @Expose()
  public dpsMul: number = 1;

  /** 显示战斗力系数 */
  @Expose()
  public uiDpsMul: number = 1;

  /** 额外伤害加成 */
  @Expose()
  public extraMul: number = 1;

  /** 弹容 */
  @Expose()
  @Transform(({ value }) => takeFirstNumber(value))
  public capacity: number = 0;

  /** 装弹时间 */
  @Expose()
  @Transform(({ value }) => takeLastNumber(value))
  public reloadGap: number = 0;

  /** 射击几秒后不抖动 */
  @Expose()
  public noShakeTime: number = 0;

  /** 枪支数量 (只影响显示) */
  @Expose()
  public gunNum: number = 1;

  /** 持枪臂长比例 */
  @Expose()
  public armsArmMul: number = 0.5;

  /** 持枪下垂距离 */
  @Expose()
  public upValue: number = 0;

  /** 躯干转角限制 */
  @Expose()
  public focusAngleRange: number = 0;
  
  /** 射击时枪支震动角 */
  @Expose()
  public shootShakeAngle: number = 0;

  /** 连发概率 */
  @Expose()
  public twoShootPro: number = 0;

  /** 弩类型武器属性控制 */
  @Expose() 
  @Type(() => ArmsCrossbowDefine)
  public crossbowD: ArmsCrossbowDefine = new ArmsCrossbowDefine();
  
  /** 属性记录 (弦音 / 迅龙) */
  @Expose() 
  @Type(() => ArmsRecordDefine)
  public recordD: ArmsRecordDefine = new ArmsRecordDefine();
  
  /** 武器图像标签 */
  @Expose()
  public armsImgLabel: string = "";

  /** 武器图标 */
  @Expose()
  public iconUrl: string = "";
  
  /** 可替换的部件图像数组 */
  @Expose()
  public allImgPartArr: string[] = [];
  
  /** 替换范围数组 */
  @Expose()
  public allImgRange: string[] = [];
  
  /** 标签图像范围 */
  @Expose()
  public textureImgRange: string[] = [];

  /** 枪体图像范围 */
  @Expose()
  public bodyImgRange: string[] = [];

  /** 枪管图像范围 */
  @Expose()
  public barrelImgRange: string[] = [];

  /** 握把图像范围 */
  @Expose()
  public gripImgRange: string[] = [];

  /** 子弹图像范围 */
  @Expose()
  public bulletImgRange: string[] = [];

  /** 枪托图像范围 */
  @Expose()
  public stockImgRange: string[] = [];

  /** 瞄准镜 (?) 图像范围 */
  @Expose()
  public glassImgRange: string[] = [];
  
  /** 发射火焰特效 */
  @Expose()
  public fireImgType: string = "";

  /** 射击音效路径 */
  @Expose()
  public shootSoundUrl: string = "";

  /** 获得方式 */
  @Expose()
  public description: string = "";

  /** 额外提示/说明 */
  @Expose()
  public info: string = "";

  /** 最高进阶等级 */
  @Expose()
  public evoMaxLv: number = 0;

  /** 初始阶段的等同进阶等级 */
  @Expose()
  public evoMustFirstLv: number = 0;

  /** 合成所需碎片数量 */
  @Expose()
  public chipNum: number = 0;

  /** 合成所需等级 */
  @Expose()
  public composeLv: number = 81;

  /** 最多合成持有数量 */
  @Expose()
  public composeMax: number = 0;

  constructor() {
    super();
  }

  /** 是否为随机武器 */
  public isRandomB(): boolean {
    return this.randomPro > 0 || this.name === "shotgunLock";
  }
}