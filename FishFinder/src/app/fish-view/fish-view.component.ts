import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as PIXI from "pixi.js"
import { Grid } from './Grid'
import { config } from './fish-view.config'
import { Scale } from './Scale'
import { gsap } from 'gsap';
import { PixiPlugin } from "gsap/PixiPlugin";
import { SensorDepthAndTemp} from "./SensorDepthAndTemp";
import { SensorInterface, SensorData } from "../sensor/SensorInterface";


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

  constructor() { }

  ngOnInit() {
    // Initialize PixiJS application in ngAfterViewInit
  }

  async ngAfterViewInit() {

    gsap.registerPlugin(PixiPlugin);
    PixiPlugin.registerPIXI(PIXI);


    const app = new PIXI.Application();
    await app.init({resizeTo: window, background: 0xff0000});


    this.app = app;

    this.pixiContainer.nativeElement.appendChild(app.canvas);


    this.grid = new Grid(app.canvas.width,
      app.canvas.height,
      config.resolution)

    this.sensorInterface = new SensorInterface(this.grid.numColumns);


    this.scale = new Scale(app.canvas.width,
      app.canvas.height,
      30
    )

    this.sensorDepthAndTempData = new SensorDepthAndTemp()


    app.stage.addChild(this.grid)
    app.stage.addChild(this.scale)
    app.stage.addChild(this.sensorDepthAndTempData)


    setInterval(() => {
      this.sensorDepthAndTempData.updateDepth(this.sensorInterface.getDepth())
      this.sensorDepthAndTempData.updateTemp(this.sensorInterface.getTemp())
    }, 1000)

    setInterval(() => {
      const depthView = this.getDepthView();

      this.scale.adjustScale(depthView);
      this.grid.adjustDepthView(depthView);

    }, 3000)

    app.ticker.maxFPS = config.framesPerSecond
    app.ticker.minFPS = config.framesPerSecond

    this.start()

  }

  private getDepthView() : number {
    return 30;
  }

  private start() : void {
    // @ts-ignore
    this.app.ticker.add(time => {
      this.grid.moveLeft(time.deltaTime);
      this.grid.updateSensorInfo(this.sensorInterface.getDepth());
    });
  }
}
