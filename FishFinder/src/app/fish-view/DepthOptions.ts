import {Container, Graphics, Sprite, Texture} from "pixi.js";
import {Button, Slider} from "@pixi/ui";

export class DepthOptions extends Container{
  _createSlider(){
    const bg = new Graphics().roundRect(0, 0, 200, 20, 5).fill(0xffffff);
    const fill = new Graphics().roundRect(0, 0, 200, 20, 5).fill(0);
    const sld = new Graphics().circle(0, 0, 5).fill(0xfbbfcb);
    const slider =
      new Slider({
        bg,
        fill,
        slider: sld,
        min: 0,
        max: 30,
        value: 15,
      });
    return slider;
  }
  constructor(minDepth : number, maxDepth : number, depthUpdateCbk: { (value: number, scale : any, grid : any): void; } , scale : any, grid : any, interval : any){
    super()

    const slider = this._createSlider();
    
    this.addChild(slider);
    const cbk = (value : number) => {clearInterval(interval); interval = null; depthUpdateCbk(value, scale, grid)};
    slider.onUpdate.connect(cbk);
  }

}
