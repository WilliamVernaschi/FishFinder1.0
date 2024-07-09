import { BleClient, numbersToDataView } from '@capacitor-community/bluetooth-le';

const TRANSDUCER_DATA_SERVICE = '990badb7-6950-4519-a146-fdfe650d4a45';
const TRANSDUCER_DATA_CHARACTERISTIC = '54070bf4-2509-4c82-9fa0-d01bb89056c3';


/*
typedef struct TransducerSignal{
  float period;
  unsigned char values[200];
} TransducerSignal;
 */
export async function initializeBluetooth(): Promise<void> {  try {
    await BleClient.initialize();

    const device = await BleClient.requestDevice({
      services: [TRANSDUCER_DATA_SERVICE],
    });

    // connect to device, the onDisconnect callback is optional
    await BleClient.connect(device.deviceId, (deviceId) => onDisconnect(deviceId));
    console.log('conectou ao dispositvo', device);

    await BleClient.startNotifications(
      device.deviceId,
      TRANSDUCER_DATA_SERVICE,
      TRANSDUCER_DATA_CHARACTERISTIC,
      (value) => {
        handleBluetoothData(parseTransducerData(value));
      }
    );

    // disconnect after 10 sec
    setTimeout(async () => {
      await BleClient.stopNotifications(device.deviceId, TRANSDUCER_DATA_SERVICE, TRANSDUCER_DATA_CHARACTERISTIC);
      await BleClient.disconnect(device.deviceId);
      console.log('disconnected from device', device);
    }, 10000);
  } catch (error) {
    console.error(error);
  }
}

function onDisconnect(deviceId: string): void {
  console.log(`device ${deviceId} disconnected`);
}

export interface DataPoint {
  depth: number;
  intensity: number;
}

export interface TransducerData {
  type: string;
  transducerData: DataPoint[];
}
function parseTransducerData(value: DataView): TransducerData {

  const transducerObj: TransducerData = { type: "samples", transducerData: [] };

  const period = value.getFloat32(0);
  for(let i = 0; i < 200; i++){
    const intensity = 5*value.getUint8(i+1)/255;
    const dataPoint = {
      depth: 30*(i/200),
      intensity
    }
    transducerObj.transducerData.push(dataPoint);
  }
  return transducerObj;
}
// This function will be defined in Angular component
let handleBluetoothData: (data: TransducerData) => void = () => {};

// Export a function to set the handler
export function setBluetoothDataHandler(handler: (data: TransducerData) => void) {
  handleBluetoothData = handler;
}
