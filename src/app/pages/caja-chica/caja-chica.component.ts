import { Component, OnInit } from '@angular/core';
import { Toast } from 'src/app/interfaces/toast.interface';
import { environment } from 'src/environments/environment.local';
import { ObtenerCajaChicaResponse } from 'src/app/interfaces/caja-chica/obtener-valor.interface';
import { CajaChicaService } from './../../services/caja-chica.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-caja-chica',
  templateUrl: './caja-chica.component.html',
  styleUrls: ['./caja-chica.component.scss']
})
export class CajaChicaComponent implements OnInit {

  constructor (
    private cajaChicaService: CajaChicaService
  ){

  }
  
  title: string = 'Caja chica local'
  toast: Toast = {
    mensaje: 'Informacion! El campo hasta, es la fecha en la que representan todos los gastos con caja chica',
    type: 'success',
    mostrar: true,
    fixed: true
  }
  currentDate: String = '';
  displayCalendar: boolean = false;
  dataCajaChica!: ObtenerCajaChicaResponse;
  valorCajaChica: string = '';

  ngOnInit(): void {
    localStorage.setItem('notificacion', JSON.stringify(this.toast));
  }

  getValorFecha(date: Date) {
    this.formatearFecha(date);
    this.displayCalendar = !this.displayCalendar;
  }

  formatearFecha(currentDate: Date){
    const anio = currentDate.getFullYear();
    const mes = String(currentDate.getMonth() + 1).padStart(2, '0'); // Mes 0-11
    const dia = String(currentDate.getDate()).padStart(2, '0'); // Día
    this.currentDate = `${anio}-${mes}-${dia}`;
  }

  pressInputFecha() {
    this.displayCalendar = !this.displayCalendar;
  }

  async consultarValor(){
    if(this.currentDate == ''){
      Swal.fire({
          customClass: {
            confirmButton: "text-white bg-blue-700 hover:bg-blue-800",
          },
          title: 'Atención!',
          text: 'Por favor debe de seleccionar una fecha',
          icon: 'warning',
          confirmButtonText: 'OK',
        })
    }else{
      try {
        let cajaChicaResponse = await this.cajaChicaService.obtenerValorCajaChica(environment.ip_estacion);
        this.dataCajaChica = cajaChicaResponse;
        if(!this.dataCajaChica.error){
          this.valorCajaChica = `$ ${this.dataCajaChica.resolucion[0].total_caja.toFixed(2)}`;
        }else{
          this.toast.mensaje  = 'Error! A ocurrido un error en el proceso por favor, vuelva a intentarlo.',
          this.toast.type     = 'danger',
          this.toast.mostrar  = true,
          this.toast.fixed    = true
        }
      } catch (error) {
        console.log(error)
      }
    }
    
  }
}
