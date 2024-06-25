import {Container, Graphics, Sprite, Texture} from "pixi.js";
import {Button, Slider} from "@pixi/ui";

export class DepthOptions extends Container{
  constructor(minDepth : number, maxDepth : number){
    super()


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
    this.addChild(slider);

    slider.onUpdate.connect((value) => {
      console.log(`Profundidade : ${value}m`);
    })
  }

}
