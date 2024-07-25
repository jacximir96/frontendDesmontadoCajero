import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './shared/components/principal/principal.component';
import { MenuComponent } from './pages/menu/menu.component';
import { DesmontadoComponent } from './pages/desmontado/desmontado.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { TecladoNumericoComponent } from './shared/components/teclado-numerico/teclado-numerico.component';
import { RetiroComponent } from './pages/retiro/retiro.component';
import { ArqueoCajaComponent } from './pages/arqueo-caja/arqueo-caja.component';
import { EfectivoComponent } from './pages/efectivo/efectivo.component';
import { TablaBilletesComponent } from './shared/components/tabla-billetes/tabla-billetes.component';
import { FormasPagoComponent } from './pages/formas-pago/formas-pago.component';
import { TecladoComponent } from './shared/components/teclado/teclado.component';
import { TarjetaFormaPagoComponent } from './shared/components/tarjeta-forma-pago/tarjeta-forma-pago.component';
import { AgregarFormaPagoComponent } from './pages/agregar-forma-pago/agregar-forma-pago.component';
import { rolesGuard } from './core/guards/roles.guard';
import { AccesoDenegadoComponent } from './shared/components/acceso-denegado/acceso-denegado.component';
import { CajaChicaComponent } from './pages/caja-chica/caja-chica.component';

const routes: Routes = [

  { path: '', component: MenuComponent },
  { path: 'desmontado', component: DesmontadoComponent },
  { path: 'retiro', component: RetiroComponent ,canActivate:[rolesGuard],data: { expectedRoles: ['admin'] }},
  //{ path: 'arqueo', component: FormasPagoComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'teclado', component: TecladoNumericoComponent },
  // { path: 'efectivo', component: EfectivoComponent },
  { path: 'tabla', component: TablaBilletesComponent },
  //{ path: 'arqueo', component: FormasPagoComponent ,canActivate:[rolesGuard],data: { expectedRoles: ['admin'] }},
  { path: 'tecladoCompleto', component: TecladoComponent },
  { path: 'tarjeta-formapago', component: TarjetaFormaPagoComponent },
  { path: 'agregar-formapago', component: AgregarFormaPagoComponent,canActivate:[rolesGuard],data: { expectedRoles: ['admin'] } },
  { path: 'arqueo-caja', component: ArqueoCajaComponent,canActivate:[rolesGuard],data: { expectedRoles: ['admin'] } },
  { path: 'access-denied', component: AccesoDenegadoComponent},
  { path: 'billetes', component: TablaBilletesComponent},


  { path: 'arqueo', component: ArqueoCajaComponent ,canActivate:[rolesGuard],data: { expectedRoles: ['admin'] }},
  { path: 'caja-chica', component: CajaChicaComponent ,canActivate:[rolesGuard],data: { expectedRoles: ['admin'] }},










];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
