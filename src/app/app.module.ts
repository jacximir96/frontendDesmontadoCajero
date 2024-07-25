import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrincipalComponent } from './shared/components/principal/principal.component';
import { TableComponent } from './shared/components/table/table.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { MenuComponent } from './pages/menu/menu.component';
import { DesmontadoComponent } from './pages/desmontado/desmontado.component';
import { TecladoNumericoComponent } from './shared/components/teclado-numerico/teclado-numerico.component';
import { RetiroComponent } from './pages/retiro/retiro.component';
import { ArqueoCajaComponent } from './pages/arqueo-caja/arqueo-caja.component';
import { EfectivoComponent } from './pages/efectivo/efectivo.component';
import { TablaBilletesComponent } from './shared/components/tabla-billetes/tabla-billetes.component';
import { FormasPagoComponent } from './pages/formas-pago/formas-pago.component';
import { TecladoComponent } from './shared/components/teclado/teclado.component';
import { TarjetaFormaPagoComponent } from './shared/components/tarjeta-forma-pago/tarjeta-forma-pago.component';
import { AgregarFormaPagoComponent } from './pages/agregar-forma-pago/agregar-forma-pago.component';
import { ModalComponent } from './shared/components/modal/modal.component';
import { MenuPrincipalService } from './core/services/menu-principal.service';
import { RolesService } from './core/services/roles.service';
import { AccesoDenegadoComponent } from './shared/components/acceso-denegado/acceso-denegado.component';
import { FormsModule } from '@angular/forms';
import { BarraSuperiorComponent } from './shared/components/barra-superior/barra-superior.component';
import { ToastComponent } from './shared/components/toast/toast.component';
import { FilterItemsFormaPagoPipe } from './shared/pipes/filter-items-forma-pago.pipe';
import { FilterItemsFormaPagoDetallePipe } from './shared/pipes/filter-items-forma-pago-detalle.pipe';
import { CajaChicaComponent } from './pages/caja-chica/caja-chica.component';
import { CalendarComponent } from './shared/components/calendar/calendar.component';
import { CardFormaPagoComponent } from './shared/components/card-forma-pago/card-forma-pago.component';

@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    TableComponent,
    HeaderComponent,
    MenuComponent,
    DesmontadoComponent,
    TecladoNumericoComponent,
    RetiroComponent,
    ArqueoCajaComponent,
    EfectivoComponent,
    TablaBilletesComponent,
    FormasPagoComponent,
    TecladoComponent,
    TarjetaFormaPagoComponent,
    AgregarFormaPagoComponent,
    ModalComponent,
    AccesoDenegadoComponent,
    BarraSuperiorComponent,
    ToastComponent,
    FilterItemsFormaPagoPipe,
    FilterItemsFormaPagoDetallePipe,
    CajaChicaComponent,
    CalendarComponent,
    CardFormaPagoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [MenuPrincipalService,RolesService],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
