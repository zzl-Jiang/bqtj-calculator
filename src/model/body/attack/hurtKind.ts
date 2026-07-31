// src\archive\models\body\attack\hurtKind.ts

import { processColor } from "../../common/utils/textUtils";
import { ElementHurt } from "./elementHurt";

export class HurtKind {

  public static readonly no: string = "";
  
  public static readonly fire: string = ElementHurt.fire;
  
  public static readonly electric: string = ElementHurt.electric;
  
  public static readonly water: string = "water";
  
  public static readonly poison: string = ElementHurt.poison;
  
  public static readonly soil: string = "soil";
  
  public static readonly wind: string = "wind";
  
  public static readonly boom: string = "boom";
  
  public static readonly hit: string = "hit";
  
  public static readonly wave: string = "wave";
  
  public static readonly particle: string = "particle";
  
  public static readonly light: string = "light";
  
  public static readonly arr: string[] = [HurtKind.no, HurtKind.fire, HurtKind.electric, HurtKind.water, HurtKind.poison, HurtKind.soil, HurtKind.wind, HurtKind.boom, HurtKind.hit,
    HurtKind.wave, HurtKind.particle, HurtKind.light];
  
  private static readonly cnObj: Record<string, string> = {
    "fire":"火",
    "electric":"电",
    "water":"水",
    "poison":"毒",
    "soil":"土",
    "wind":"风",
    "boom":"爆炸",
    "hit":"动能",
    "wave":"波",
    "particle":"粒子",
    "light":"光"
  };
  
  private static readonly colorObj: Record<string, string> = {
    "fire":"#FF4F4F",
    "electric":"#E03CFF",
    "water":"#3399FF",
    "poison":"#66FF00",
    "soil":"#A17316",
    "wind":"#ECFFD0",
    "boom":"#FF6600",
    "hit":"#FFFF00",
    "wave":"#807EFF",
    "particle":"#2AD29F",
    "light":"#80E6FF"
  };

  public static getColorOneCn(name0: string) : string {
      var cn0: string = HurtKind.getOneCn(name0);
      return processColor("[" + cn0 + "]",HurtKind.getColor(name0));
  }

  public static getColor(name0: string) : string {
      return HurtKind.colorObj[name0];
  }

  public static getCn(name0: string) : string {
      return HurtKind.cnObj[name0];
  }

  public static getOneCn(name0: string) : string
  {
      if(name0 == HurtKind.hit) return "动";
      if(name0 == HurtKind.boom) return "爆";
      if(name0 == HurtKind.particle) return "粒";
      return HurtKind.getCn(name0);
  }
}