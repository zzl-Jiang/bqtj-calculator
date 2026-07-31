// src\archive\models\arms\define\armsRecordDefine.ts

import { Expose } from 'class-transformer';

export class ArmsRecordDefine {
    /** 弦音的。说实话静态定义就没啥必要，，， */
    @Expose() 
    public piano: string = "";
    
    /** 迅龙风雷的“动能” */
    @Expose()
    public moveGap: number = 0;
}