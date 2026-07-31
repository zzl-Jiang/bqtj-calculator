// src\archive\models\arms\define\armsCrossbowDefine.ts

import { Expose } from 'class-transformer';

export class ArmsCrossbowDefine {
    /** 是否蓄力 */
    @Expose()
    public focoB: boolean = false;

    /** 蓄力最短延迟 */
    @Expose()
    public minDelayMul: number = 0;

    /** 蓄力-速度关联系数 */
    @Expose()
    public vAtt: number = 0;
}