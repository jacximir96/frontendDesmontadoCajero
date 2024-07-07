// To parse this data:
//
//   import { Convert, ObtenerOpcionesMenus } from "./file";
//
//   const obtenerOpcionesMenus = Convert.toObtenerOpcionesMenus(json);

export interface ObtenerOpcionesMenus {
    datosUsuario: DatosUsuario;
    menu:         Menu[];
}

export interface DatosUsuario {
    nombre:   string;
    apellido: string;
    user:     string;
    perfil:   string;
}

export interface Menu {
    titulo: string;
    orden:  number;
}

//Interface de Proceso de ObtenerEfectivoProcesoEstacion
export interface ObtenerDenominacionBilletes {
    error:      boolean;
    resolucion: DenominacionesBilletes[];
    mensaje:    string;
}

export interface DenominacionesBilletes {
    Billete_Denominacion_IDBilleteDenominacion: string;
    Billete_Denominacion_btd_Descripcion:       string;
    Billete_Denominacion_btd_Valor:             number;
    Billete_Denominacion_btd_Tipo:              BilleteDenominacionBtdTipo;
    Billete_Denominacion_IDStatus:              string;
    Billete_Denominacion_replica:               null | string;
    Billete_Denominacion_nivel:                 string;
    Billete_Denominacion_lastUser:              string | null;
    Billete_Denominacion_lastUpdate:            string | null;
    Status_IDStatus:                            string;
    Status_std_descripcion:                     string;
    Status_std_tipo_estado:                     string;
    Status_mdl_id:                              string;
    Status_replica:                             string;
    Status_factor:                              string;
    Status_nivel:                               string;
    Status_lastUser:                            string | null;
    Status_lastUpdate:                          string | null;
    valorDeclarado?:                            number;
}

export enum BilleteDenominacionBtdTipo {
    Billete = "BILLETE   ",
    Moneda = "MONEDA    ",
}

//Totales de Venta en Estacion
export interface CalcularTotalVentasEstacion {
    error:      boolean;
    resolucion: TotalVentaEstacion[];
    mensaje:    string;
}

export interface TotalVentaEstacion {
    total_ventas:                 number;
    total_diferencia_formas_pago: number;
    numero_transacciones:         number;
    total_retiros_formas_pago:    number;
    total_ingreso_caja:           number;
    total_egreso_caja:            number;
}

/**DataFast */
export interface ConsolidarTransaccionesDatafastEstacion {
    error:      boolean;
    resolucion: TransaccionesDataFast[];
    mensaje:    string;
}

export interface TransaccionesDataFast {
    Estacion_est_nombre:                string;
    Control_Estacion_IDControlEstacion: string;
    Control_Estacion_IDUsersPos:        string;
    Formapago_IDFormapago:              string | null;
    Formapago_fmp_descripcion:          string;
    orden:                              string | null;
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
    image?:                             string;
    estado?:                            boolean;
    rule?:                              string;
}
