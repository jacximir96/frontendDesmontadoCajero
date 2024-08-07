export interface GrupoFormasDePago{
    [x: string]: {};
    nombre: string;
    transacciones: TransaccionEstacion[];
    consolidado: Consolidado
}


export interface TransaccionEstacion {
    Estacion_est_nombre:                string;
    Control_Estacion_IDControlEstacion: string;
    Control_Estacion_IDUsersPos:        string;
    Formapago_IDFormapago:              string;
    Formapago_fmp_descripcion:          string;
    orden:                              number | string;
    total_retirado:                     number;
    estado_switch:                      number | string;
    agregador:                          string;
    total_pagar:                        number;
    diferencia:                         number;
    ingreso:                            number;
    egreso:                             number;
    numero_transacciones:               number;
    numero_transacciones_ingresadas:    number;
    Retiros_ultimo_retiro:              number;
    Formapago_Factura_fpf_swt:          string;
    transferencia?:                     string;
    monto_validado?:                    boolean; //Campo interno
    Formapago_padre?:                   string;  //Campo interno
    styleDisplay?:                      string;  //Campo interno
    cardSeleccionada?:                  boolean; //Campo interno
    valorDeclarado?:                    number;  //Campo interno
    imagen?:                            string;
    block?:                             boolean;
}

export interface Consolidado {
    Estacion_est_nombre:                string;
    Control_Estacion_IDControlEstacion: string;
    Control_Estacion_IDUsersPos:        string;
    Formapago_IDFormapago:              string | null;
    Formapago_fmp_descripcion:          string;
    orden:                              null;
    estado_switch:                      null;
    agregador:                          null;
    total_retirado:                     number;
    total_pagar:                        number;
    diferencia:                         number;
    ingreso:                            number;
    egreso:                             number;
    numero_transacciones:               number;
    numero_transacciones_ingresadas:    number;
    Retiros_ultimo_retiro:              number;
    imagen?:                            string;
    estado?:                            boolean;
    rule?:                              string;
    monto_validado?:                    boolean;
    valorDeclarado?:                    number;  //Campo interno
    block?:                             boolean;
}