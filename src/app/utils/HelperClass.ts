import { Consolidado, TransaccionEstacion } from "../interfaces/shared";

export class HelperClass {

    constructor() {
    }

    public static convertConsolidadoToTransaccionEstacion( consolidado: Consolidado): TransaccionEstacion {
        let transaccionEstacion:TransaccionEstacion = {
            Estacion_est_nombre: consolidado.Estacion_est_nombre,
            Control_Estacion_IDControlEstacion: consolidado.Control_Estacion_IDControlEstacion,
            Control_Estacion_IDUsersPos: consolidado.Control_Estacion_IDUsersPos,
            Formapago_IDFormapago: consolidado.Formapago_IDFormapago!,
            Formapago_fmp_descripcion: consolidado.Formapago_fmp_descripcion,
            orden: consolidado.orden!,
            total_retirado: consolidado.total_retirado,
            estado_switch: consolidado.estado_switch!,
            agregador: consolidado.agregador!,
            total_pagar: consolidado.total_pagar,
            diferencia: consolidado.diferencia,
            ingreso: consolidado.ingreso,
            egreso: consolidado.egreso,
            numero_transacciones: consolidado.numero_transacciones,
            numero_transacciones_ingresadas: consolidado.numero_transacciones_ingresadas,
            Retiros_ultimo_retiro: consolidado.Retiros_ultimo_retiro,
            Formapago_Factura_fpf_swt: ""
        };
        return transaccionEstacion;
    }
}