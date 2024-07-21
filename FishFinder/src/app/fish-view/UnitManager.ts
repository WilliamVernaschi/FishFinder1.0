export class UnitManager {
    static getUnitSymbol(unit: string): string {
      switch (unit) {
        case "Metros":
          return "m";
        case "Celsius":
          return "ºC";
        case "Pés":
          return "ft";
        case "Jardas":
          return "yd";
        case "Quilômetros":
          return "km";
        case "Milhas":
          return "mi";
        case "Náutica (nm, pé)":
          return "nm (ft)";
        case "Náutica (nm, m)":
          return "nm (m)";
        case "Fahrenheit":
          return "ºF";
        default:
          return "";
      }
    }

     static convert(fromUnit: string, toUnit: string, value: number): number {

        if(fromUnit == toUnit) return value;
        
        const conversions: { [key: string]: number | Function } = {
        "Metros->Pés": 3.28084,
        "Pés->Metros": 0.3048,
        "Metros->Jardas": 1.09361,
        "Jardas->Metros": 0.9144,
        "Quilômetros->Milhas": 0.621371,
        "Milhas->Quilômetros": 1.60934,
        "Metros->Quilômetros": 0.001,
        "Quilômetros->Metros": 1000,
        "Pés->Jardas": 0.333333,
        "Jardas->Pés": 3,
        "Milhas->Pés": 5280,
        "Pés->Milhas": 0.000189394,
        "Milhas->Jardas": 1760,
        "Jardas->Milhas": 0.000568182,
        "Metros->Náutica (nm, pé)": 0.000539957,
        "Náutica (nm, pé)->Metros": 1852,
        "Metros->Náutica (nm, m)": 0.000539957,
        "Náutica (nm, m)->Metros": 1852,
        "Celsius->Fahrenheit": (value: number) => (value * 9/5) + 32,
        "Fahrenheit->Celsius": (value: number) => (value - 32) * 5/9,
        };

        const conversionKey = `${fromUnit}->${toUnit}`;
        const conversionValue = conversions[conversionKey];

        if (conversionValue !== undefined) {
        return typeof conversionValue === "function" ? conversionValue(value) : conversionValue * value;
        } else {
        throw new Error(`Conversion from ${fromUnit} to ${toUnit} is not supported.`);
        }
    }
  }
  