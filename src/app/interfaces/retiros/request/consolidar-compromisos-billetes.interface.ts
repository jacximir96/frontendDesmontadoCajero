// To parse this data:
//
//   import { Convert, RequestConsolidarCompromisoBillete } from "./file";
//
//   const requestConsolidarCompromisoBillete = Convert.toRequestConsolidarCompromisoBillete(json);

export interface RequestConsolidarCompromisoBillete {
    ipEstacion:                    string;
    idUsersPosPerfilAdmin:         string;
    magnitudTotal:                 number;
    magnitudPOS:                   number;
    magnitudPretendida:            number;
    diferenciaMagnitud:            number;
    numeroTransacciones:           number;
    numeroTransaccionesIngresadas: number;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toRequestConsolidarCompromisoBillete(json: string): RequestConsolidarCompromisoBillete {
        return JSON.parse(json);
    }

    public static requestConsolidarCompromisoBilleteToJson(value: RequestConsolidarCompromisoBillete): string {
        return JSON.stringify(value);
    }
}
