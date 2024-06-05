
import { MinQueue } from "../minQueue/minQueue";

interface TransducerDataPoint {
  intensity : number,
  depth : number,
}

export interface SensorData {
  type : string,
  transducerData : Array<TransducerDataPoint>
}

export class SensorInterface{
  private dataPointsCache : MinQueue<SensorData>;
  private lastSensorEvent : SensorData | null;

  constructor(dataPointsCacheSize : number){

    const eventSource = new EventSource('http://localhost:3000/sensor');
    this.lastSensorEvent = null;
    this.dataPointsCache = new MinQueue<SensorData>();

    eventSource.onmessage = (event) => {
      this.lastSensorEvent = JSON.parse(event.data);
      if (this.lastSensorEvent) {
        this.dataPointsCache.push(this.lastSensorEvent);
      }

      if(this.dataPointsCache.size > dataPointsCacheSize) this.dataPointsCache.pop();
    };
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

  getSensorInfo(){
    return this.lastSensorEvent;
  }
}

