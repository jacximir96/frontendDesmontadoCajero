// To parse this data:
//
//   import { Convert, ResponseGeneral } from "./file";
//
//   const responseGeneral = Convert.toResponseGeneral(json);

export interface ResponseGeneral {
    error:      boolean;
    resolucion: any[];
    mensaje:    string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toResponseGeneral(json: string): ResponseGeneral {
        return JSON.parse(json);
    }

    public static responseGeneralToJson(value: ResponseGeneral): string {
        return JSON.stringify(value);
    }
}
