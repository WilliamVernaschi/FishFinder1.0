import { Container, Text} from 'pixi.js'
import { config } from './fish-view.config'
import { UnitManager } from './UnitManager'

export class SensorDepthAndTemp extends Container{
  private depthText : Text
  private tempText : Text
  private depthUnit : string
  private temperatureUnit : string

  constructor(depthUnit : string, temperatureUnit : string){
    super()
    this.depthUnit = depthUnit
    this.temperatureUnit = temperatureUnit

    this.depthText = new Text({text: '0m', style: config.depthStyle})
    this.tempText = new Text({text: '25ºC', style: config.temperatureStyle})

    this.depthText.position = {x : 10, y : 10}
    this.tempText.position =  {x : 10, y : 10 + config.depthStyle.fontSize}

    this.addChild(this.depthText);
    this.addChild(this.tempText);
  }

  updateDepth(depth : number){
    this.depthText.text = `${UnitManager.convert("Metros", this.depthUnit, depth).toFixed(2)}${UnitManager.getUnitSymbol(this.depthUnit)}`
  }
  updateTemp(temp : number){
    this.tempText.text = `${UnitManager.convert("Celsius", this.temperatureUnit, temp)}${UnitManager.getUnitSymbol(this.temperatureUnit)}`
  }
}
