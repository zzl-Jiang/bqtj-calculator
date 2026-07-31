// src\archive\models\bullet\position\bulletPositionDefine.ts

import { Expose, Transform, Type } from 'class-transformer';
import { Point } from '../../common/utils/geom/point';
import { NormalDefine } from '../../common/normal/normalDefine';
import { takeLastNumber } from '../../common/utils/formatUtils';

export class BulletPositionDefine extends NormalDefine {
    /** 散射角度 */
    @Expose()
    @Transform(({ value }) => takeLastNumber(value))
    public shakeAngle: number = 0;

    /** 多发子弹的发射夹角 */
    @Expose()
    @Transform(({ value }) => takeLastNumber(value))
    public shootAngle: number = 0;

    /** 加特林模式下的子弹数量 */
    @Expose()
    public gatlinNum: number = 0;

    /** 加特林模式下的散射范围 */
    @Expose()
    public gatlinRange: number = 0;

    /** 固定的发射点偏移 */
    @Expose()
    @Type(() => Point)
    public shootPoint: Point = new Point();

    /** 子弹实体自身的角度（-1000表示不设置） */
    @Expose()
    public bulletAngle: number = -1000;

    /** 子弹实体角度的随机范围 */
    @Expose()
    public bulletAngleRange: number = 0;
}