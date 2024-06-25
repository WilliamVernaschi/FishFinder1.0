
import { MinQueue } from "../minQueue/minQueue";
import {SignalGenerator} from "../simulator/signalGenerator";
import random from "random";

interface TransducerDataPoint {
  intensity : number,
  depth : number,
}

export interface SensorData {
  type : string,
  transducerData : Array<TransducerDataPoint>
}

export class SensorInterface{
  private dataPointsCache : MinQueue<number>;
  private lastSensorEvent : SensorData | null;
  private readonly dataPointsCacheMaxSize : number;

  constructor(dataPointsCacheMaxSize
 : number, simulation : boolean){
    this.lastSensorEvent = null
    this.dataPointsCache = new MinQueue<number>()
    this.dataPointsCacheMaxSize = dataPointsCacheMaxSize

    if(simulation){
      const generator = new SignalGenerator(0.005, 0.05, 200, 30);
      const sendSignals = () =>{
        this.lastSensorEvent = {type: "samples", transducerData: generator.nextSignal()}
        this.putInCache(this.lastSensorEvent)
        setTimeout(sendSignals, 10 + random.float(0, 5))
      }

      sendSignals()
    }
    else{
      const eventSource = new EventSource('http://localhost:3000/sensor');

      eventSource.onmessage = (event) => {
        this.lastSensorEvent = JSON.parse(event.data)
        this.putInCache(this.lastSensorEvent)
      }
    }


  }

  putInCache(element: SensorData | null){
    if(element){
      this.dataPointsCache.push(this.getDepth());
    }
    if(this.dataPointsCache.size > this.dataPointsCacheMaxSize) this.dataPointsCache.pop()
  }



  getDepth(){
    if(!this.lastSensorEvent) return 0

    return this.lastSensorEvent.transducerData.reduce(
      (acc, curr) => curr.intensity > acc.intensity ? curr : acc)
      .depth
  }

  getTemp(){
    return 25;
  }

  get lowestDepthInCache() {
    return this.dataPointsCache.getMin;
  }

  get getSensorInfo(){
    return this.lastSensorEvent;
  }
}

