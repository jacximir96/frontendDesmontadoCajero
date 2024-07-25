import { Consolidado, DenominacionBilleteConfirmado, DenominacionBilleteResponse, DenominacionesBilletes, TransaccionEstacion } from "../interfaces/shared";

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
            Formapago_padre: consolidado.Formapago_fmp_descripcion,
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
            Formapago_Factura_fpf_swt: "",
            imagen: consolidado.imagen,
            block: consolidado.block
        };
        return transaccionEstacion;
    }

    public static getBilletesComprometidos(billetesComprometidos: DenominacionBilleteResponse): DenominacionBilleteConfirmado[]{
        let billetesConfirmados: DenominacionBilleteConfirmado[] = [];
        billetesComprometidos.resolucion.forEach(billete => {
           let billeteConfirmado: DenominacionBilleteConfirmado = {}
            billetesConfirmados.push({
                Billete_Denominacion_IDBilleteDenominacion: billete.Billete_Denominacion_IDBilleteDenominacion,
                Billete_Denominacion_btd_Valor: billete.Billete_Denominacion_btd_Valor.toString(),
                valorImputRecibido: billete.Billete_Estacion_bte_cantidad,
                totalConfirmado: billete.Billete_Estacion_bte_total,
                isComprometido: true,
                isUpdate: false,
                
            })
        });
        return billetesConfirmados;
    }

    public static ordenarArray(arrayBilletes: DenominacionesBilletes[], campo: string) {
      arrayBilletes.sort((a: any, b: any) => {
        if (a[campo] < b[campo]) {
          return -1;
        } else if (a[campo] > b[campo]) {
          return 1;
        } else {
          return 0;
        }
      });
    }

    public static generaImagen(descripcion: string){
        let rutaImagen: string = ''
        switch (descripcion.toLowerCase()) {
          case 'efectivo':
            rutaImagen = 'Rectangle 290.svg'; break;
          case 'agregadores':
            rutaImagen = 'agregador.png'; break;
          case 'otras':
            rutaImagen = 'otros.png'; break;
          case 'datafono':
            rutaImagen = 'otros.png'; break;
          case 'creditos':
            rutaImagen = 'creditos.png'; break;
          case 'mastercard':
            rutaImagen = 'mastercard.png'; break;
          case 'tarjetas_pin_pad':
            rutaImagen = 'forma-pago-tarjetas.png'; break;
          case 'multimarca efectivo':
            rutaImagen = 'forma-pago-tarjetas.png'; break;
          case 'uber':
            rutaImagen = 'uber.png'; break;
          case 'rappi':
            rutaImagen = 'rappi.png'; break;
          case 'tarjetas datafast':
            rutaImagen = 'forma-pago-tarjetas.png'; break;
          case 'visa':
            rutaImagen = 'visa.png'; break;
          default:
            rutaImagen = 'otros.png'; break;
            break;
        }
        return rutaImagen
      }
}