// To parse this data:
//
//   import { Convert, RequestComprometerDinero } from "./file";
//
//   const requestComprometerDinero = Convert.toRequestComprometerDinero(json);

export interface RequestComprometerDinero {
    ipEstacion:            string;
    idUsersPosPerfilAdmin: string;
    dinero:                Dinero[];
}

export interface Dinero {
    idFormaPago:                   string;
    estadoSwitch:                  number;
    magnitudTotal:                 number;
    magnitudPOS:                   number;
    magnitudPretendida:            number;
    diferenciaMagnitud:            number;
    numeroTransacciones:           number;
    numeroTransaccionesIngresadas: number;
}

// Converts JSON strings to/from your types
/*export class Convert {
    public static toRequestComprometerDinero(json: string): RequestComprometerDinero {
        return JSON.parse(json);
    }

    public static requestComprometerDineroToJson(value: RequestComprometerDinero): string {
        return JSON.stringify(value);
    }
}*/
