import { Pipe, PipeTransform } from '@angular/core';
import { TransaccionEstacion } from 'src/app/core/interfaces/shared';

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
