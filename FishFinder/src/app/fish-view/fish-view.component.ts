import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as PIXI from "pixi.js"
import { Grid } from './Grid'
import { config } from './fish-view.config'
import { Scale } from './Scale'
import { gsap } from 'gsap';
import { PixiPlugin } from "gsap/PixiPlugin";
import { SensorDepthAndTemp} from "./SensorDepthAndTemp";
import { SensorInterface, SensorData } from "../sensor/SensorInterface";
import { DepthOptions } from "./DepthOptions"


@Component({
  selector: 'app-fish-view',
  templateUrl: './fish-view.component.html',
  styleUrls: ['./fish-view.component.scss'],
  standalone: true
})

export class FishViewComponent implements OnInit, AfterViewInit {
  @ViewChild('pixiContainer', { static: true }) pixiContainer!: ElementRef;

  private grid : any
  private scale : any
  private sensorDepthAndTempData : any
  private app : any
  private sensorInterface : any

  _repositionAppElements(){
    this._removeGrid()
    this._addGrid()
    this._removeScale()
    this._addScale()
    this._removeSensorDepthAndTempData()
    this._addSensorDepthAndTempData()
  }

  constructor() { }

  ngOnInit() {
    // Initialize PixiJS application in ngAfterViewInit
  }

  _addGrid(){
    this.grid = new Grid(this.app.canvas.width,
      this.app.canvas.height,
      this.sensorInterface);
    this.app.stage.addChild(this.grid)
  }
  _removeGrid(){
    this.app.stage.removeChild(this.grid)
  }

  _addScale(){
    this.scale = new Scale(this.app.canvas.width,
      this.app.canvas.height,
      30
    )
    this.app.stage.addChild(this.scale)
  }
  _removeScale(){
    this.app.stage.removeChild(this.scale)


  }

  _addSensorDepthAndTempData(){
    this.sensorDepthAndTempData = new SensorDepthAndTemp()
    this.app.stage.addChild(this.sensorDepthAndTempData)
  }
  _removeSensorDepthAndTempData(){
    this.app.stage.removeChild(this.sensorDepthAndTempData)
  }

  async ngAfterViewInit() {

    gsap.registerPlugin(PixiPlugin);
    PixiPlugin.registerPIXI(PIXI);


    const app = new PIXI.Application();
    await app.init({resizeTo: window, background: 0x0000ff});

    this.app = app;

    this.pixiContainer.nativeElement.appendChild(app.canvas);


    const getNumColumns = Grid.getNumColumns(app.canvas.width, app.canvas.height)

    this.sensorInterface = new SensorInterface(getNumColumns, true);

    this._addGrid()
    this._addScale()
    this._addSensorDepthAndTempData()
    const dp = new DepthOptions(1, 30);
    this.app.stage.addChild(dp);
    dp.x = app.stage.width - 275;
    dp.y = 50;


    setInterval(() => {
      this.sensorDepthAndTempData.updateDepth(this.sensorInterface.getDepth())
      this.sensorDepthAndTempData.updateTemp(this.sensorInterface.getTemp())
    }, 1000)

    setInterval(() => {
      const depthView = this.sensorInterface.lowestDepthInCache + 2

      this.scale.adjustScale(depthView);
      this.grid.adjustDepthView(depthView)

    }, 3000)

    // Reposiciona os elementos quando houver rotação.
    this.app.renderer.on('resize', (width : number, height : number) => {
      this._repositionAppElements();
    })

    app.ticker.maxFPS = config.framesPerSecond
    app.ticker.minFPS = config.framesPerSecond

    this.start()

  }


  private start() : void {
    // @ts-ignore
    this.app.ticker.add(time => {
      this.grid.moveLeft(time.deltaTime)
      this.grid.repositionFirstColumn()
    });
  }
}
