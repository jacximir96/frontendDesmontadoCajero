import { Pipe, PipeTransform } from '@angular/core';
import { FormasPago } from '../interfaces/transacciones-estacion.interface';

@Pipe({
  name: 'filterItemsFormaPago'
})
export class FilterItemsFormaPagoPipe implements PipeTransform {

  transform(formasDePago: FormasPago[], nombreFormaDePago: string): FormasPago[] {
    if (!formasDePago || !nombreFormaDePago) {
      return formasDePago;
    }

    return formasDePago.filter(formaDePago =>
      formaDePago.resumen.Formapago_fmp_descripcion.toLowerCase().includes(nombreFormaDePago.toLowerCase())
    );
  }

}
