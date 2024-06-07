import { Column } from "./Column";
import { Container } from 'pixi.js';
import { Queue } from '@datastructures-js/queue';
import Denque from "denque";
import { gsap } from 'gsap';
import { SensorInterface } from '../sensor/SensorInterface'

export class Grid extends Container{
  private readonly W: number;
  private readonly H: number;
  private resolution: number;
  private columns: Denque<any>;
  private sensorInterface : SensorInterface;
  private readonly squareSize: number;
  private currDepthView : number;

  constructor(width : number, height : number, resolution : number){
    super();
    this.W = width;
    this.H = height;
    this.resolution = resolution;
    this.columns = new Denque();
    this.squareSize = height / resolution;
    this.currDepthView = 30;

    const numColumns = (2*this.squareSize + this.W - (-2*this.squareSize))/this.squareSize;
    this.sensorInterface = new SensorInterface(numColumns);

    this.setupGrid();
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
