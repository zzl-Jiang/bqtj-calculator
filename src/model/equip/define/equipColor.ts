// src\archive\models\equip\define\equipColor.ts

export class EquipColor
{
  public static readonly WHITE: string = "white";
  
  public static readonly GREEN: string = "green";
  
  public static readonly BLUE: string = "blue";
  
  public static readonly PURPLE: string = "purple";
  
  public static readonly ORANGE: string = "orange";
  
  public static readonly RED: string = "red";
  
  public static readonly BLACK: string = "black";
  
  public static readonly DARKGOLD: string = "darkgold";
  
  public static readonly PURGOLD: string = "purgold";
  
  public static readonly YAGOLD: string = "yagold";
  
  public static readonly TYPE_ARR: string[] = [EquipColor.WHITE, EquipColor.GREEN, EquipColor.BLUE, EquipColor.PURPLE, EquipColor.ORANGE,
    EquipColor.RED, EquipColor.BLACK, EquipColor.DARKGOLD, EquipColor.PURGOLD, EquipColor.YAGOLD];
  
  public static readonly NORMAL_TYPE_ARR: string[] = [EquipColor.WHITE, EquipColor.GREEN, EquipColor.BLUE, EquipColor.PURPLE,
    EquipColor.ORANGE];
  
  public static readonly PARTS_TYPE_ARR: string[] = [EquipColor.WHITE, EquipColor.GREEN, EquipColor.BLUE, EquipColor.PURPLE,
    EquipColor.ORANGE, EquipColor.RED, EquipColor.BLACK];
  
  public static readonly RARE_MORE_ARR: string[] = [EquipColor.RED, EquipColor.BLACK, EquipColor.DARKGOLD, EquipColor.PURGOLD,
    EquipColor.YAGOLD];
  
  public static readonly moreBlackArr: string[] = [EquipColor.BLACK, EquipColor.DARKGOLD, EquipColor.PURGOLD, EquipColor.YAGOLD];
  
  public static readonly noStrengthenMoveArr: string[] = [EquipColor.DARKGOLD, EquipColor.PURGOLD, EquipColor.YAGOLD];
  
  public static readonly strengthenMustMul1_8: string[] = [EquipColor.DARKGOLD, EquipColor.PURGOLD, EquipColor.YAGOLD];
  
  public static readonly CN_ARR: string[] = ["白","绿","蓝","紫","橙","红","黑","金","紫金","氩金"];
  
  public static readonly CN_ARR2: string[] = ["白色","绿色","蓝色","紫色","橙色","红色","黑色","金色","紫金","氩金"];
  
  public static readonly whiteColor: number = 16777215;
  
  public static readonly greenColor: number = 65280;
  
  public static readonly blueColor: number = 65535;
  
  public static readonly purpleColor: number = 16724991;
  
  public static readonly orangeColor: number = 16763904;
  
  public static readonly redColor: number = 16730184;
  
  public static readonly blackColor: number = 7961023;
  
  public static readonly darkgoldColor: number = 16776960;
  
  public static readonly purgoldColor: number = 14825080;
  
  public static readonly yagoldColor: number = 65460;
  
  public static readonly whiteHtmlColor: string = "#FFFFFF";
  
  public static readonly greenHtmlColor: string = "#00FF00";
  
  public static readonly blueHtmlColor: string = "#00FFFF";
  
  public static readonly purpleHtmlColor: string = "#FF66FF";
  
  public static readonly orangeHtmlColor: string = "#FFCC00";
  
  public static readonly redHtmlColor: string = "#FF4848";
  
  public static readonly blackHtmlColor: string = "#7979BF";
  
  public static readonly darkgoldHtmlColor: string = "#BFBF00";
  
  public static readonly purgoldHtmlColor: string = "#E23678";
  
  public static readonly yagoldHtmlColor: string = "#00ffb4";
  
  public static readonly ID_ARR: string[] = ["08","07","06","05","04","03","02","01","00","10"];
  
  public static readonly PRICE_ARR: number[] = [1,1.1,1.5,2,3,5,8,20,100,200];

  /** 是否为暗金武器 */
  public static moreDarkgoldB(color0: string): boolean {
    return EquipColor.moreColorPan(color0,EquipColor.DARKGOLD);
  }
  
  /** 比较颜色定义索引的辅助函数 */
  public static moreColorPan(color0: string, mColor0: string): boolean {
    var f0: number = EquipColor.TYPE_ARR.indexOf(color0);
    var mf0: number = EquipColor.TYPE_ARR.indexOf(mColor0);
    if(f0 >= mf0) {
      return true;
    }
    return false;
  }

  /** 是否为黑色武器 */
  public static moreBlackB(color0: string): boolean {
    return EquipColor.moreBlackArr.includes(color0);
  }

  /** 根据装备颜色返回 id 字符 */
  public static getIDByType(type0: string): string {
    return EquipColor.ID_ARR[EquipColor.TYPE_ARR.indexOf(type0)];
  }

  /** 获取颜色索引 */
  public static getIndex(color0: string): number {
    return EquipColor.TYPE_ARR.indexOf(color0);
  }
}