// To parse this data:
//
//   import { Convert, ADEObtenerDenominacionBilleteMonedaComprometidoArqueoDineroEstacion } from "./file";
//
//   const aDEObtenerDenominacionBilleteMonedaComprometidoArqueoDineroEstacion = Convert.toADEObtenerDenominacionBilleteMonedaComprometidoArqueoDineroEstacion(json);

export interface DenominacionBilleteResponse {
    error:      boolean;
    resolucion: DenominacionesBilletes[];
    mensaje:    string;
}

export interface DenominacionesBilletes {
    Billete_Estacion_bte_cantidad?:             string;
    Billete_Estacion_bte_total:                 number;
    Billete_Denominacion_IDBilleteDenominacion: string;
    Billete_Denominacion_btd_Tipo:              BilleteDenominacionBtdTipo;
    Billete_Denominacion_btd_Valor:             number;
    Billete_Denominacion_btd_Descripcion:       string;
    valorDeclarado?:                            string;
}

export enum BilleteDenominacionBtdTipo {
    Billete = "BILLETE",
    Moneda = "MONEDA",
}

