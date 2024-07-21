import { Text, Container, Texture } from 'pixi.js'
import { config } from './fish-view.config'
import { UnitManager } from './UnitManager';

export class Scale extends Container{
  private readonly canvasWidth : number;
  private readonly canvasHeight : number;
  private readonly depthUnit : string;

  constructor(canvasWidth : number, canvasHeight : number, depthView : number, depthUnit : string){
    super()
    this.canvasWidth = canvasWidth
    this.canvasHeight =  canvasHeight
    this.depthUnit = depthUnit
    this.adjustScale(depthView)
    

  }
  adjustScale(depthView : number){
    this.removeChildren();


    for(let i = 1; i < depthView; i += 3){

      const text = new Text({text: `${UnitManager.convert("Metros", this.depthUnit, i).toFixed(1)}`, style: config.scaleStyle});
      text.x = this.canvasWidth - config.scaleStyle.fontSize;
      text.y = i*this.canvasHeight/depthView;
      text.anchor.set(0.5);
      this.addChild(text);
    }
  }
}
