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
/*
data: {"type":"samples","transducerData":[{"depth":0,"intensity":0},{"depth":0.12,"intensity":0},{"depth":0.24,"intensity":0},{"depth":0.36,"intensity":0},{"depth":0.48,"intensity":0},{"depth":0.6,"intensity":0},{"depth":0.72,"intensity":0},{"depth":0.84,"intensity":0},{"depth":0.96,"intensity":0},{"depth":1.08,"intensity":0},{"depth":1.2,"intensity":0},{"depth":1.32,"intensity":0},{"depth":1.44,"intensity":0},{"depth":1.56,"intensity":0},{"depth":1.68,"intensity":0},{"depth":1.8,"intensity":0},{"depth":1.92,"intensity":0},{"depth":2.04,"intensity":0},{"depth":2.16,"intensity":0},{"depth":2.28,"intensity":0},{"depth":2.4,"intensity":0},{"depth":2.52,"intensity":0},{"depth":2.64,"intensity":0},{"depth":2.76,"intensity":0},{"depth":2.88,"intensity":0},{"depth":3,"intensity":0},{"depth":3.12,"intensity":0},{"depth":3.24,"intensity":0},{"depth":3.36,"intensity":0},{"depth":3.48,"intensity":0},{"depth":3.6,"intensity":0},{"depth":3.72,"intensity":0},{"depth":3.84,"intensity":0},{"depth":3.96,"intensity":0},{"depth":4.08,"intensity":0},{"depth":4.2,"intensity":0},{"depth":4.32,"intensity":0},{"depth":4.44,"intensity":0},{"depth":4.56,"intensity":0},{"depth":4.68,"intensity":0},{"depth":4.8,"intensity":0},{"depth":4.92,"intensity":0},{"depth":5.04,"intensity":0},{"depth":5.16,"intensity":0},{"depth":5.28,"intensity":0},{"depth":5.4,"intensity":0},{"depth":5.52,"intensity":0},{"depth":5.64,"intensity":0},{"depth":5.76,"intensity":0},{"depth":5.88,"intensity":0},{"depth":6,"intensity":0},{"depth":6.12,"intensity":0},{"depth":6.24,"intensity":0},{"depth":6.36,"intensity":0},{"depth":6.48,"intensity":0},{"depth":6.6,"intensity":0},{"depth":6.72,"intensity":0},{"depth":6.84,"intensity":0},{"depth":6.96,"intensity":0},{"depth":7.08,"intensity":0},{"depth":7.2,"intensity":0},{"depth":7.32,"intensity":0},{"depth":7.44,"intensity":0},{"depth":7.56,"intensity":0},{"depth":7.68,"intensity":0},{"depth":7.8,"intensity":0},{"depth":7.92,"intensity":0},{"depth":8.04,"intensity":0},{"depth":8.16,"intensity":0},{"depth":8.28,"intensity":0},{"depth":8.4,"intensity":0},{"depth":8.52,"intensity":0},{"depth":8.64,"intensity":0},{"depth":8.76,"intensity":0},{"depth":8.88,"intensity":0},{"depth":9,"intensity":0},{"depth":9.12,"intensity":0},{"depth":9.24,"intensity":0.6029667027722023},{"depth":9.36,"intensity":0.08643007784004074},{"depth":9.48,"intensity":0.3794780656997651},{"depth":9.6,"intensity":0.5714516119118249},{"depth":9.72,"intensity":0.24095516338537973},{"depth":9.84,"intensity":0.2500133999772644},{"depth":9.96,"intensity":0.7727963868778663},{"depth":10.08,"intensity":0},{"depth":10.2,"intensity":0},{"depth":10.32,"intensity":0},{"depth":10.44,"intensity":0},{"depth":10.56,"intensity":0},{"depth":10.68,"intensity":0},{"depth":10.8,"intensity":0},{"depth":10.92,"intensity":0},{"depth":11.04,"intensity":0},{"depth":11.16,"intensity":0},{"depth":11.28,"intensity":0},{"depth":11.4,"intensity":0},{"depth":11.52,"intensity":0},{"depth":11.64,"intensity":0},{"depth":11.76,"intensity":0},{"depth":11.88,"intensity":0},{"depth":12,"intensity":0},{"depth":12.12,"intensity":0},{"depth":12.24,"intensity":0},{"depth":12.36,"intensity":0},{"depth":12.48,"intensity":0},{"depth":12.6,"intensity":0},{"depth":12.72,"intensity":0},{"depth":12.84,"intensity":0},{"depth":12.96,"intensity":0},{"depth":13.08,"intensity":0},{"depth":13.2,"intensity":0},{"depth":13.32,"intensity":0},{"depth":13.44,"intensity":0},{"depth":13.56,"intensity":0},{"depth":13.68,"intensity":0},{"depth":13.8,"intensity":0},{"depth":13.92,"intensity":0},{"depth":14.04,"intensity":0},{"depth":14.16,"intensity":0},{"depth":14.28,"intensity":0},{"depth":14.4,"intensity":0},{"depth":14.52,"intensity":0},{"depth":14.64,"intensity":0},{"depth":14.76,"intensity":0},{"depth":14.88,"intensity":0},{"depth":15,"intensity":0},{"depth":15.12,"intensity":0},{"depth":15.24,"intensity":0},{"depth":15.36,"intensity":0},{"depth":15.48,"intensity":0},{"depth":15.6,"intensity":0.9957274568171963},{"depth":15.72,"intensity":0.9881264838643933},{"depth":15.84,"intensity":0.9806406771684509},{"depth":15.96,"intensity":0.9732674389942519},{"depth":16.08,"intensity":0.9660042491510115},{"depth":16.2,"intensity":0.9588486621202631},{"depth":16.32,"intensity":0.9517983043105552},{"depth":16.44,"intensity":0.944850871432376},{"depth":16.56,"intensity":0.9380041259872139},{"depth":16.68,"intensity":0.9312558948650037},{"depth":16.8,"intensity":0.9246040670445393},{"depth":16.92,"intensity":0.9180465913917412},{"depth":17.04,"intensity":0.9115814745509544},{"depth":17.16,"intensity":0.9052067789247239},{"depth":17.28,"intensity":0.8989206207377466},{"depth":17.4,"intensity":0.8927211681809347},{"depth":17.52,"intensity":0.8866066396317501},{"depth":17.64,"intensity":0.8805753019471804},{"depth":17.76,"intensity":0.8746254688259156},{"depth":17.88,"intensity":0.8687554992364801},{"depth":18,"intensity":0.8629637959082368},{"depth":18.12,"intensity":0.8572488038823544},{"depth":18.24,"intensity":0.8516090091199706},{"depth":18.36,"intensity":0.8460429371649381},{"depth":18.48,"intensity":0.8405491518586722},{"depth":18.6,"intensity":0.8351262541047452},{"depth":18.72,"intensity":0.829772880680997},{"depth":18.84,"intensity":0.8244877030970416},{"depth":18.96,"intensity":0.8192694264951614},{"depth":19.08,"intensity":0.8141167885926763},{"depth":19.2,"intensity":0.809028558663972},{"depth":19.32,"intensity":0.8040035365604691},{"depth":19.44,"intensity":0.7990405517668858},{"depth":19.56,"intensity":0.7941384624922425},{"depth":19.68,"intensity":0.7892961547941191},{"depth":19.8,"intensity":0.7845125417347607},{"depth":19.92,"intensity":0.7797865625676837},{"depth":20.04,"intensity":0.7751171819535061},{"depth":20.16,"intensity":0.7705033892037828},{"depth":20.28,"intensity":0.7659441975516894},{"depth":20.4,"intensity":0.7614386434484443},{"depth":20.52,"intensity":0.7569857858844182},{"depth":20.64,"intensity":0.7525847057339274},{"depth":20.76,"intensity":0.7482345051227486},{"depth":20.88,"intensity":0.7439343068174455},{"depth":21,"intensity":0.7396832536356316},{"depth":21.12,"intensity":0.7354805078763381},{"depth":21.24,"intensity":0.7313252507696922},{"depth":21.36,"intensity":0.7272166819451434},{"depth":21.48,"intensity":0.7231540189175168},{"depth":21.6,"intensity":0.7191364965901973},{"depth":21.72,"intensity":0.7151633667747819},{"depth":21.84,"intensity":0.7112338977265688},{"depth":21.96,"intensity":0.707347373695276},{"depth":22.08,"intensity":0.7035030944904105},{"depth":22.2,"intensity":0.6997003750607326},{"depth":22.32,"intensity":0.6959385450872877},{"depth":22.44,"intensity":0.6922169485894947},{"depth":22.56,"intensity":0.688534943543806},{"depth":22.68,"intensity":0.6848919015144737},{"depth":22.8,"intensity":0.6812872072959764},{"depth":22.92,"intensity":0.6777202585666781},{"depth":23.04,"intensity":0.67419046555331},{"depth":23.16,"intensity":0.6706972507058835},{"depth":23.28,"intensity":0.6672400483826573},{"depth":23.4,"intensity":0.6638183045447976},{"depth":23.52,"intensity":0.6604314764603854},{"depth":23.64,"intensity":0.6570790324174391},{"depth":23.76,"intensity":0.6537604514456339},{"depth":23.88,"intensity":0.6504752230464097},{"depth":24,"intensity":0.6472228469311776},{"depth":24.12,"intensity":0.6440028327673408},{"depth":24.24,"intensity":0.640814699931859},{"depth":24.36,"intensity":0.6376579772720962},{"depth":24.48,"intensity":0.6345322028737035},{"depth":24.6,"intensity":0.6314369238352951},{"depth":24.72,"intensity":0.628371696049687},{"depth":24.84,"intensity":0.6253360839914759},{"depth":24.96,"intensity":0.6223296605107477},{"depth":25.08,"intensity":0.6193520066327058},{"depth":25.2,"intensity":0.6164027113630263},{"depth":25.32,"intensity":0.6134813714987465},{"depth":25.44,"intensity":0.6105875914445071},{"depth":25.56,"intensity":0.6077209830339696},{"depth":25.68,"intensity":0.6048811653562407},{"depth":25.8,"intensity":0.602067764587142},{"depth":25.92,"intensity":0.5992804138251644},{"depth":26.04,"intensity":0.596518752931961},{"depth":26.16,"intensity":0.5937824283772272},{"depth":26.28,"intensity":0.5910710930878333},{"depth":26.4,"intensity":0.5883844063010706},{"depth":26.52,"intensity":0.5857220334218802},{"depth":26.64,"intensity":0.5830836458839438},{"depth":26.76,"intensity":0.580468921014509},{"depth":26.88,"intensity":0.5778775419028371},{"depth":27,"intensity":0.5753091972721579},{"depth":27.12,"intensity":0.5727635813550244},{"depth":27.24,"intensity":0.5702403937719627},{"depth":27.36,"intensity":0.5677393394133137},{"depth":27.48,"intensity":0.5652601283241726},{"depth":27.6,"intensity":0.5628024755923283},{"depth":27.72,"intensity":0.5603661012391148},{"depth":27.84,"intensity":0.5579507301130842},{"depth":27.96,"intensity":0.5555560917864185},{"depth":28.08,"intensity":0.5531819204539979},{"depth":28.2,"intensity":0.5508279548350448},{"depth":28.32,"intensity":0.5484939380772691},{"depth":28.44,"intensity":0.546179617663441},{"depth":28.56,"intensity":0.5438847453203174},{"depth":28.68,"intensity":0.5416090769298557},{"depth":28.8,"intensity":0.539352372442648},{"depth":28.92,"intensity":0.5371143957935084},{"depth":29.04,"intensity":0.5348949148191551},{"depth":29.16,"intensity":0.5326937011779239},{"depth":29.28,"intensity":0.530510530271457},{"depth":29.4,"intensity":0.5283451811683083},{"depth":29.52,"intensity":0.5261974365294126},{"depth":29.64,"intensity":0.5240670825353665},{"depth":29.76,"intensity":0.5219539088154658},{"depth":29.88,"intensity":0.5198577083784559}]}
 */
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
