import {Container, Graphics, Sprite, Texture} from "pixi.js";
import {Button, Slider} from "@pixi/ui";

export class DepthOptions extends Container{
  constructor(minDepth : number, maxDepth : number){
    super()
    const button = new Button(
      new Graphics().circle(0, 0, 30).fill(0xff0000)
    )
    const bg = new Sprite(Texture.WHITE);
    bg.tint = 0xab0790;
    bg.width = 300;
    bg.height = 50;

    const fill = new Sprite(Texture.WHITE);
    bg.tint = 0x03ff00;
    bg.width = 300;
    bg.height = 50;

    const sld = new Sprite(Texture.WHITE);
    bg.tint = 0x0403ff;
    bg.width = 50;
    bg.height = 50;


    const slider =
      new Slider(
        {bg,
          fill,
          slider: sld,
          min: minDepth,
          max: maxDepth,
          value: 50,
        });
    this.addChild(slider);
  }

}
