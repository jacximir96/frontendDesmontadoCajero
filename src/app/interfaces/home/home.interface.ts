// To parse this data:
//
//   import { Convert, ObtenerFondoAsignadoUsuarioEstacion } from "./file";
//
//   const obtenerFondoAsignadoUsuarioEstacion = Convert.toObtenerFondoAsignadoUsuarioEstacion(json);

export interface ObtenerFondoAsignadoUsuarioEstacion {
    error:      boolean;
    resolucion: InfoCajero;
    mensaje:    string;
}

export interface InfoCajero {
    magnitud:        string;
    descripcionUsuarioEstacion: string;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toObtenerFondoAsignadoUsuarioEstacion(json: string): ObtenerFondoAsignadoUsuarioEstacion {
        return JSON.parse(json);
    }

    public static obtenerFondoAsignadoUsuarioEstacionToJson(value: ObtenerFondoAsignadoUsuarioEstacion): string {
        return JSON.stringify(value);
    }
}
