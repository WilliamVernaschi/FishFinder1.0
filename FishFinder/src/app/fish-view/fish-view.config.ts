import * as PIXI from 'pixi.js'

interface Config {
  resolution: number;
  receiverDelay: number;
  framesPerSecond: number;
  depthStyle: PIXI.TextStyle;
  temperatureStyle : PIXI.TextStyle;
  scaleStyle : PIXI.TextStyle;
}

export const config : Config = {
  "resolution": 100, // número de quadrados em uma coluna do visor
  "receiverDelay": 20, // período de recepção do sinal emitido pelo transmissor, em milissegundos
  "framesPerSecond" : 60,
  depthStyle : new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 72,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fill: '#ffffff',
    stroke: { color: '#4a1850', width: 5, join: 'round' },
  }),
  temperatureStyle : new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 36,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fill: '#ffffff',
    stroke: { color: '#4a1850', width: 4, join: 'round' },
  }),
  scaleStyle : new PIXI.TextStyle({
    fontFamily: 'Arial',
    fontSize: 28,
    fontStyle: 'italic',
    fontWeight: 'bold',
    fill: '#ffffff',
    stroke: { color: '#4a1850', width: 4, join: 'round' },
  })
}
