// To parse this data:
//
//   import { Convert, ResponseConsolidarCompromisoBillete } from "./file";
//
//   const responseConsolidarCompromisoBillete = Convert.toResponseConsolidarCompromisoBillete(json);

export interface ResponseConsolidarCompromisoBillete {
    error:      boolean;
    resolucion: boolean;
    mensaje:    string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toResponseConsolidarCompromisoBillete(json: string): ResponseConsolidarCompromisoBillete {
        return JSON.parse(json);
    }

    public static responseConsolidarCompromisoBilleteToJson(value: ResponseConsolidarCompromisoBillete): string {
        return JSON.stringify(value);
    }
}
