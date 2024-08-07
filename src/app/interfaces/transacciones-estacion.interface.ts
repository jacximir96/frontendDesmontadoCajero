// To parse this data:
//
//   import { Convert, ConsolidarTransaccionesEstacion } from "./file";
//
//   const consolidarTransaccionesEstacion = Convert.toConsolidarTransaccionesEstacion(json);



export interface ConsolidarTransaccionesEstacion {
    error:      boolean;
    resolucion: TransaccionesEstacion[];
    mensaje:    string;
}

export interface TransaccionesEstacion {
    formas_pagos: FormasPago[];
}

export interface FormasPago {
    resumen: Resumen;
    detalle: Detalle[];
}

export interface Detalle {
    Formapago_fmp_descripcion:       string;
    total_retirado:                  number;
    estado_switch:                   number;
    transferencia:                   string;
    agregador:                       string;
    total_pagar:                     number;
    diferencia:                      number;
    ingreso:                         number;
    egreso:                          number;
    numero_transacciones:            number;
    numero_transacciones_ingresadas: number;
    imagen:                          string;
    monto_validado?:                 boolean; //Campo interno
    Formapago_padre?:                string;  //Campo interno
    styleDisplay?:                   string;  //Campo interno
    cardSeleccionada?:               boolean; //Campo interno
    valorDeclarado?:                 number;  //Campo interno
}

export interface Resumen {
    Formapago_fmp_descripcion:       string;
    Formapago_IDFormapago:           string;
    total_pagar:                     number;
    diferencia:                      number;
    total_retirado:                  number;
    ingreso:                         number;
    egreso:                          number;
    num_transacciones:               number;
    numero_transacciones_ingresadas: number;
    imagen:                          string;
    estado?:                         boolean;
    rule?:                           string;
    monto_validado?:                 boolean;
    valorDeclarado?:                 number;  //Campo interno
}
