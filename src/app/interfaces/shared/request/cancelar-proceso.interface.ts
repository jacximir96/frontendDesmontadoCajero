// To parse this data:
//
//   import { Convert, RequestCancelarArqueo } from "./file";
//
//   const requestCancelarArqueo = Convert.toRequestCancelarArqueo(json);

export interface RequestCancelarProceso {
    ipEstacion:            string;
    idUsersPosPerfilAdmin: string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toRequestCancelarArqueo(json: string): RequestCancelarProceso {
        return JSON.parse(json);
    }

    public static requestCancelarArqueoToJson(value: RequestCancelarProceso): string {
        return JSON.stringify(value);
    }
}
