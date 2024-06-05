import { Column } from "./Column";
import { Container } from 'pixi.js';
import { Queue } from '@datastructures-js/queue';
import Denque from "denque";
import { gsap } from 'gsap';

export class Grid extends Container{
  private readonly W: number;
  private readonly H: number;
  private resolution: number;
  private columns: Denque<any>;
  private readonly squareSize: number;
  private sensorInfo: null;
  private readonly depthHistory: any[];
  private depthSum: number;
  private currDepthView: number;

  constructor(width : number, height : number, resolution : number){
    super();
    this.W = width;
    this.H = height;
    this.resolution = resolution;
    this.columns = new Denque();
    this.squareSize = height / resolution;
    this.sensorInfo = null;
    this.depthHistory = [];
    this.depthSum = 0;
    this.currDepthView = 30;

    this.setupGrid();
  }
  get numColumns(){
    return (2*this.squareSize + this.W - (-2*this.squareSize))/this.squareSize;
  }

  setupGrid(){
    for(let pos = -2*this.squareSize; pos < 2*this.squareSize + this.W; pos += this.squareSize){
      const column = new Column(null, this.squareSize, this.H);
      column.x = pos;
      this.columns.push(column);
      this.addChild(column);

    }
  }

  updateSensorInfo(depth : number){
    if(this.depthHistory.length >= 100) this.depthSum -= this.depthHistory[0], this.depthHistory.shift();
    this.depthHistory.push(depth), this.depthSum += depth;
  }

  moveLeft(deltaTime : number){
    for(let i = 0; i < this.columns.length; i++){
      this.columns.peekAt(i).moveLeft(deltaTime);
    }
    if(this.columns.peekAt(0).x < -2*this.squareSize){
      const col = this.columns.shift();
      col.x = this.columns.peekBack().x + this.squareSize;
      col.redrawColumn(this.sensorInfo);
      this.columns.push(col);
    }
  }

  getMaxDepthView(){
    return Math.ceil(this.depthSum/this.depthHistory.length) + 2;
  }
  adjustDepthView(depthView : number){
    //if(depthView === this.columns.peekFront().currMVD) return;

    for(let i = 0; i < this.columns.length; i++){
      this.columns.peekAt(i).adjustDepth(depthView);
    }
    this.currDepthView = depthView;

  }


}
