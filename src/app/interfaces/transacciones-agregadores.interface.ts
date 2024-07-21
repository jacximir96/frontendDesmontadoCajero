// To parse this data:
//
//   import { Convert, ConsolidarTransaccionesAgregadoresEstacion } from "./file";
//
//   const consolidarTransaccionesAgregadoresEstacion = Convert.toConsolidarTransaccionesAgregadoresEstacion(json);

export interface ConsolidarTransaccionesAgregadoresEstacion {
    error:      boolean;
    resolucion: TransaccionesAgregadoresEstacion[];
    mensaje:    string;
}

export interface TransaccionesAgregadoresEstacion {
    resumen: Resumen;
    detalle: Detalle[];
}

export interface Detalle {
    Estacion_est_nombre:                string;
    Control_Estacion_IDControlEstacion: string;
    Control_Estacion_IDUsersPos:        string;
    Formapago_IDFormapago:              null;
    Formapago_fmp_descripcion:          string;
    orden:                              null;
    total_retirado:                     number;
    estado_switch:                      number;
    transferencia:                      string;
    agregador:                          string;
    total_pagar:                        number;
    diferencia:                         number;
    ingreso:                            number;
    egreso:                             number;
    numero_transacciones:               number;
    numero_transacciones_ingresadas:    number;
    imagen:                             string;
}

export interface Resumen {
    Formapago_fmp_descripcion:       string;
    total_pagar:                     number;
    diferencia:                      number;
    total_retirado:                  number;
    ingreso:                         number;
    egreso:                          number;
    num_transacciones:               number;
    numero_transacciones_ingresadas: number;
    imagen:                          string;
}
