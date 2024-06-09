import { Column } from "./Column";
import { Container } from 'pixi.js';
import Denque from "denque";
import { SensorInterface } from '../sensor/SensorInterface'
import { config } from './fish-view.config'

export class Grid extends Container{
  private readonly W: number;
  private readonly H: number;
  private columns: Denque<any>;
  private sensorInterface : SensorInterface;
  private readonly squareSize: number;
  private currDepthView : number;
  private numColumns: number;

  constructor(width : number, height : number, sensorInterface : SensorInterface){
    super();
    this.W = width
    this.H = height
    this.columns = new Denque()
    this.squareSize = height / config.resolution
    this.currDepthView = 30
    this.numColumns = Math.round((2*this.squareSize + this.W - (-2*this.squareSize))/this.squareSize)
    this.sensorInterface = sensorInterface

    this.setupGrid();
  }

  static getNumColumns(width : number, height : number){
    const squareSize = height / config.resolution
    return Math.round((2*squareSize + width - (-2*squareSize))/squareSize)
  }

  setupGrid(){
    for(let pos = -2*this.squareSize; pos < 2*this.squareSize + this.W; pos += this.squareSize){
      const column = new Column(null, this.squareSize, this.H)
      column.x = pos
      this.columns.push(column)
      this.addChild(column)
    }
  }


  moveLeft(deltaTime : number){
    for(let i = 0; i < this.columns.length; i++){
      this.columns.peekAt(i).moveLeft(deltaTime)
    }
  }

  repositionFirstColumn(){
    if(this.columns.peekAt(0).x < -2*this.squareSize) {
      const col = this.columns.shift()
      col.x = this.columns.peekBack().x + this.squareSize
      col.redrawColumn(this.sensorInterface.getSensorInfo, this.currDepthView)
      this.columns.push(col)
    }
  }

  adjustDepthView(depthView : number){
    this.currDepthView = depthView;
    for(let i = 0; i < this.columns.length; i++){
      this.columns.peekAt(i).adjustDepth(depthView)
    }

  }


}
