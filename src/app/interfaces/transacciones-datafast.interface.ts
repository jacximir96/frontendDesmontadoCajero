// To parse this data:
//
//   import { Convert, ResponseDataFast } from "./file";
//
//   const responseDataFast = Convert.toResponseDataFast(json);

export interface ResponseDataFast {
    error:      boolean;
    resolucion: Resolucion[];
    mensaje:    string;
}

export interface Resolucion {
    Estacion_est_nombre:                string;
    Control_Estacion_IDControlEstacion: string;
    Control_Estacion_IDUsersPos:        string;
    Formapago_IDFormapago:              string;
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
    imagen?:                            string;
    estado?:                            boolean;
    rule?:                              string;
    monto_validado?:                    boolean;
    valorDeclarado?:                    number;  //Campo interno
}
