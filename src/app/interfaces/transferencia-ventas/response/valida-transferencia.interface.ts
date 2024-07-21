// To parse this data:
//
//   import { Convert, ResponseTranseferenciaVentas } from "./file";
//
//   const responseTranseferenciaVentas = Convert.toResponseTranseferenciaVentas(json);

export interface ResponseTranseferenciaVentas {
    error:      boolean;
    resolucion: Resolucion;
    mensaje:    string;
}

export interface Resolucion {
    aplica_transferencia: boolean;
    valor_a_tansferir:    number;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toResponseTranseferenciaVentas(json: string): ResponseTranseferenciaVentas {
        return JSON.parse(json);
    }

    public static responseTranseferenciaVentasToJson(value: ResponseTranseferenciaVentas): string {
        return JSON.stringify(value);
    }
}
