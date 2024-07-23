import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  Input,
  numberAttribute, booleanAttribute
} from '@angular/core';
import * as PIXI from "pixi.js"
import { Grid } from './Grid'
import { config } from './fish-view.config'
import { Scale } from './Scale'
import { gsap } from 'gsap';
import { PixiPlugin } from "gsap/PixiPlugin";
import { SensorDepthAndTemp} from "./SensorDepthAndTemp";
import { SensorInterface, SensorData } from "../sensor/SensorInterface";
import { DepthOptions } from "./DepthOptions"
import {SensorConfigComponent} from "../sensor-config/sensor-config.component";
import { setBluetoothDataHandler, initializeBluetooth, TransducerData } from '../devices-list/connectSensor';
import { StateService } from '../state.service';
import { SensorInfoRowComponent } from '../sensor-info-row/sensor-info-row.component';



@Component({
  selector: 'app-fish-view',
  templateUrl: './fish-view.component.html',
  styleUrls: ['./fish-view.component.scss'],
  imports: [
    SensorConfigComponent,
    SensorInfoRowComponent
  ],
  standalone: true
})

export class FishViewComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('pixiContainer', { static: true }) pixiContainer!: ElementRef;
  @Input({transform: booleanAttribute}) isSimulation = true;



  private grid: any;
  private scale : any
  private sensorDepthAndTempData : any
  private app : any
  private sensorInterface : any
  private autoDepthInterval : any
  depthUnit: string;
  distanceUnit: string;
  temperatureUnit: string;
  viewType: string = "auto";

  _useManualDepth(depthView : number, scale : any, grid : any){

    scale.adjustScale(depthView)
    grid.adjustDepthView(depthView)

  }

  _useAutoDepth(){

    if (this.autoDepthInterval) {
      clearInterval(this.autoDepthInterval);
      console.log("Previous auto depth interval cleared");
    }
    this.autoDepthInterval = setInterval(() => {
      const depthView = this.sensorInterface.lowestDepthInCache + 2

      this.scale.adjustScale(depthView)
      this.grid.adjustDepthView(depthView)

    }, 3000)
  }

  _repositionAppElements(){
    this._removeGrid()
    this._addGrid()
    this._removeScale()
    this._addScale(this.depthUnit)
    this._removeSensorDepthAndTempData()
    this._addSensorDepthAndTempData(this.depthUnit, this.temperatureUnit)
  }

  constructor(private stateService: StateService) {
    this.depthUnit = this.stateService.getDepthUnit();
    this.temperatureUnit = this.stateService.getTemperatureUnit();
    this.distanceUnit = this.stateService.getDistanceUnit();


  }

  private handleBluetoothData(data: TransducerData) {
    console.log("Received Bluetooth Data:", data);
  }

  ngOnInit() {
    if(this.isSimulation) {
      //console.log("inicializando conexão bluetooth");
      //initializeBluetooth();

    }

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

  _addScale(depthUnit : string){

    this.scale = new Scale(this.app.canvas.width,
      this.app.canvas.height,
      30,
      depthUnit
    )
    this.app.stage.addChild(this.scale)
  }
  _removeScale(){
    this.app.stage.removeChild(this.scale)


  }

  _addSensorDepthAndTempData(depthUnit : string, temperatureUnit : string){
    console.log(`Adicionando nova informação de profundidade e temperatura ${depthUnit}, ${temperatureUnit}`)
    this.sensorDepthAndTempData = new SensorDepthAndTemp(depthUnit, temperatureUnit)
    this.app.stage.addChild(this.sensorDepthAndTempData)
  }
  _removeSensorDepthAndTempData(){
    this.app.stage.removeChild(this.sensorDepthAndTempData)
  }

  async ngAfterViewInit() {

    gsap.registerPlugin(PixiPlugin);
    PixiPlugin.registerPIXI(PIXI);


    const app = new PIXI.Application();

    await app.init({background: 0x0000ff, antialias: true})
    setTimeout(() => this.resizePixiApp(), 0);


    this.app = app;

    //app.renderer.autoResize = true;
    this.pixiContainer.nativeElement.appendChild(app.canvas);


    const getNumColumns = Grid.getNumColumns(app.canvas.width, app.canvas.height)

    this.sensorInterface = new SensorInterface(getNumColumns, this.isSimulation)

    this._addGrid()
    this._addScale(this.depthUnit)
    this._addSensorDepthAndTempData(this.depthUnit, this.temperatureUnit)



    setInterval(() => {
      this.sensorDepthAndTempData.updateDepth(this.sensorInterface.getDepth())
      this.sensorDepthAndTempData.updateTemp(this.sensorInterface.getTemp())
    }, 1000)

    this._useAutoDepth();
    //const dp = new DepthOptions(1, 30, this._useManualDepth,this.scale, this.grid, this.autoDepthInterval);
    //this.app.stage.addChild(dp);
    //dp.x = app.stage.width - 275;
    //dp.y = 100;

    // Reposiciona os elementos quando houver rotação.
    this.app.renderer.on('resize', (width : number, height : number) => {
      //this.resizePixiApp()
      this._repositionAppElements();
    })

    app.ticker.maxFPS = config.framesPerSecond
    app.ticker.minFPS = config.framesPerSecond

    this.stateService.depthUnit$.subscribe((unit : string) => {
      this.depthUnit = unit;
      this._removeScale();
      this._removeSensorDepthAndTempData();
      this._addScale(unit);
      this._addSensorDepthAndTempData(this.depthUnit, this.temperatureUnit);
    })

    this.stateService.distanceUnit$.subscribe((unit : string) => {
      this.distanceUnit = unit;
    })

    this.stateService.temperatureUnit$.subscribe((unit : string) => {
      this.temperatureUnit = unit;
      this._removeSensorDepthAndTempData();
      this._addSensorDepthAndTempData(this.depthUnit, this.temperatureUnit);
    })

    this.stateService.segmentValue$.subscribe(value => {
      if(value === 'Automático') {
        this.viewType = 'auto';
        this._useAutoDepth();
      }
      else if(value === "Manual"){
        this.viewType = 'manual';
      }
    });

    this.stateService.manualDepth$.subscribe(depth => {
      if (this.viewType === 'manual') {
        if(this.autoDepthInterval){
          clearInterval(this.autoDepthInterval)
          console.log("Cleared auto depth interval", this.autoDepthInterval)
        }
        this._useManualDepth(depth, this.scale, this.grid);
      }
    });

    this.start()



  }

  ngOnDestroy(){
    this.pixiContainer.nativeElement.removeChild(this.app.canvas);
    this.app.destroy();
    console.log("destroyed!");
    if (this.autoDepthInterval) {
      clearInterval(this.autoDepthInterval);
      console.log("Auto depth interval cleared on destroy");
    }
  }

  private resizePixiApp() {
    if (this.app && this.pixiContainer) {
      this.app.renderer.resize(this.pixiContainer.nativeElement.clientWidth, this.pixiContainer.nativeElement.clientHeight);
    }
  }


  private start() : void {
    // @ts-ignore
    this.app.ticker.add(time => {

      this.grid.moveLeft(time.deltaTime)
      this.grid.repositionFirstColumn()
    });
  }
}
