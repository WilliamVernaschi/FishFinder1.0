import { Container, Text} from 'pixi.js'
import { config } from './fish-view.config'

export class SensorDepthAndTemp extends Container{
  private depthText : Text
  private tempText : Text

  constructor(){
    super()
    this.depthText = new Text({text: '0m', style: config.depthStyle});
    this.tempText = new Text({text: '25ºC', style: config.temperatureStyle});

    this.depthText.position = {x : 10, y : 10}
    this.tempText.position =  {x : 10, y : 10 + config.depthStyle.fontSize}

    this.addChild(this.depthText);
    this.addChild(this.tempText);
  }

  updateDepth(depth : number){
    this.depthText.text = `${depth.toFixed(2)}m`
  }
  updateTemp(temp : number){
    this.tempText.text = `${temp.toFixed(2)}m`
  }
}
