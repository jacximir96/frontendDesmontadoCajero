import { Pipe, PipeTransform } from '@angular/core';
import { Detalle, TransaccionesEstacion, TransaccionEstacion } from '../interfaces/transacciones-estacion.interface';

@Pipe({
  name: 'filterItemsFormaPagoDetalle'
})
export class FilterItemsFormaPagoDetallePipe implements PipeTransform {

  transform(formaDePago: TransaccionEstacion[], nombreFormaDePago: string): TransaccionEstacion[] {
    if (!formaDePago || !nombreFormaDePago) {
      return formaDePago;
    }

    return formaDePago.filter(formaDePagoDetalle =>
      formaDePagoDetalle.Formapago_fmp_descripcion.toLowerCase().includes(nombreFormaDePago.toLowerCase())
    );
  }

}
