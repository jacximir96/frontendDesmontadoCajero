import { Pipe, PipeTransform } from '@angular/core';
import { GrupoFormasDePago } from 'src/app/core/interfaces/shared';
@Pipe({
  name: 'filterItemsFormaPago'
})
export class FilterItemsFormaPagoPipe implements PipeTransform {

  transform(formasDePago: GrupoFormasDePago[], nombreFormaDePago: string): GrupoFormasDePago[] {
    if (!formasDePago || !nombreFormaDePago) {
      return formasDePago;
    }

    return formasDePago.filter(formaDePago =>
      formaDePago.nombre.toLowerCase().includes(nombreFormaDePago.toLowerCase())
    );
  }

}
