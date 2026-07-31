// src\archive\models\common\normal\IO_NormalDefine.ts

import type { IO_Define } from "./IO_Define";

export interface IO_NormalDefine extends IO_Define {

  name: string;
  
  initialize?() : void;

}