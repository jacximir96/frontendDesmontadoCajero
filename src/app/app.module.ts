import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { TableComponent } from './components/table/table.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './pages/menu/menu.component';
import { DesmontadoComponent } from './pages/desmontado/desmontado.component';
import { TecladoNumericoComponent } from './components/teclado-numerico/teclado-numerico.component';
import { RetiroComponent } from './pages/retiro/retiro.component';
import { ArqueoCajaComponent } from './pages/arqueo-caja/arqueo-caja.component';
import { EfectivoComponent } from './pages/efectivo/efectivo.component';
import { TablaBilletesComponent } from './components/tabla-billetes/tabla-billetes.component';
import { FormasPagoComponent } from './pages/formas-pago/formas-pago.component';
import { TecladoComponent } from './components/teclado/teclado.component';
import { TarjetaFormaPagoComponent } from './components/tarjeta-forma-pago/tarjeta-forma-pago.component';
import { AgregarFormaPagoComponent } from './pages/agregar-forma-pago/agregar-forma-pago.component';
import { ModalComponent } from './components/modal/modal.component';
import { MenuPrincipalService } from './services/menu-principal.service';
import { RolesService } from './services/roles.service';
import { AccesoDenegadoComponent } from './components/acceso-denegado/acceso-denegado.component';
import { FormsModule } from '@angular/forms';
import { BarraSuperiorComponent } from './components/barra-superior/barra-superior.component';
import { ToastComponent } from './components/toast/toast.component';
import { FilterItemsFormaPagoPipe } from './pipes/filter-items-forma-pago.pipe';
import { FilterItemsFormaPagoDetallePipe } from './pipes/filter-items-forma-pago-detalle.pipe';
import { CajaChicaComponent } from './pages/caja-chica/caja-chica.component';
import { CalendarComponent } from './components/calendar/calendar.component';

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
    CalendarComponent
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
