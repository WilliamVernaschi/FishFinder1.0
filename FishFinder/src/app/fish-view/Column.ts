import { Graphics, Sprite, Texture } from 'pixi.js'
import chroma from 'chroma-js';
import { gsap } from 'gsap';

const scale = chroma.scale(['blue', 'green', 'yellow', 'red']);


export class Column extends Graphics{
  private readonly H: number;
  private readonly squareSize : number;
  private signal : any;

  constructor(signal : any, squareSize : number, height : number){
    super();
    this.H = height;
    this.squareSize = squareSize;
    this.signal = signal;

    if(!signal){
      this._defaultColumn();
    }
    else if(signal.type === "samples"){
      this._columnFromSample(signal.transducerData);
    }
    else if(signal.type === "threshold"){
      this._columnFromThreshold(signal.transducerData)
    }
  }
  moveLeft(deltaTime : number){
    this.x -= 1 * deltaTime;
  }

  _defaultColumn(){
    this.rect(0, 0, this.squareSize, this.H)
      .fill(scale(0).hex());
  }

  _tintFromIntensity(intensity : number){

    return scale(intensity).hex();

  }
  _columnFromSample(data : any){



    if(data[0].depth < data[data.length - 1].depth)
      data.reverse();

    const range = data[0].depth;


    let dataPointsUsed = 0;
    for(let i = data.length - 1; i >= 0; i--){
      if(data[i].depth > range) break;
      dataPointsUsed++;
    }

    let maxHeight = this.H;
    const pixelsCoveredByEachDataPoint = maxHeight / dataPointsUsed;

    function getToDraw(){
      const toDraw = [];
      let length = pixelsCoveredByEachDataPoint;

      for(let i = data.length - dataPointsUsed, j = 0; i < data.length; i++, j++){
        if(i === data.length-1 || data[i+1].intensity != data[i].intensity){
          toDraw.push({endHeight : maxHeight - pixelsCoveredByEachDataPoint * (j+1), length, intensity : data[i].intensity});
          length = pixelsCoveredByEachDataPoint;
        }
        else{
          length += pixelsCoveredByEachDataPoint;
        }
      }
      return toDraw;
    }
    const toDraw = getToDraw();

    toDraw.forEach(point => {
      this.rect(0, point.endHeight, this.squareSize, point.length)
        .fill(this._tintFromIntensity(point.intensity));
    });


  }
  redrawColumn(signal : any, depthView : number){

    if(signal) this.signal = signal;
    if(!this.signal) return;

    this.clear();
    //this.scaleY = 30/depthView;
    this._columnFromSample(this.signal.transducerData);
  }
  adjustDepth(depthView : number){
    // depthView = 30, adjust to 1
    // depthView = 15, adjust to 2
    // depthView = 10, adjust to 3

    gsap.to(this, {pixi : {scaleY: 30/depthView}, duration: 0.75} );






  }
  _columnFromThreshold(data : any){
    // ...
  }
}
